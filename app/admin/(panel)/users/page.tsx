"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { fmtDateBn } from "@/lib/bn";

type AdminUser = { id: string; username: string; createdAt: string };

export default function AdminUsersPage() {
  const router = useRouter();
  const [me, setMe] = useState<string | null>(null);
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoadError("");
    try {
      const [meRes, usersRes] = await Promise.all([
        fetch("/api/admin/me", { cache: "no-store" }),
        fetch("/api/admin/users", { cache: "no-store" }),
      ]);
      if (meRes.status === 401 || usersRes.status === 401) {
        router.push("/admin/login");
        return;
      }
      const meData = await meRes.json();
      const usersData = await usersRes.json();
      if (!usersRes.ok) {
        setLoadError(usersData.error || "তালিকা আনা যায়নি");
        return;
      }
      setMe(meData.username);
      setUsers(usersData.users);
    } catch {
      setLoadError("সার্ভারের সঙ্গে সংযোগ করা যায়নি");
    }
  }

  useEffect(() => {
    load();
  }, []);

  function closeModal() {
    if (saving) return;
    setOpen(false);
    setUsername("");
    setPassword("");
    setConfirm("");
    setFormError("");
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setFormError("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "অ্যাডমিন যোগ করা যায়নি");
        setSaving(false);
        return;
      }
      setSaving(false);
      setOpen(false);
      setUsername("");
      setPassword("");
      setConfirm("");
      load();
    } catch {
      setFormError("সার্ভারের সঙ্গে সংযোগ করা যায়নি");
      setSaving(false);
    }
  }

  async function removeUser(id: string, uname: string) {
    if (!window.confirm(`"${uname}" ইউজারটি স্থায়ীভাবে মুছে ফেলবেন?`)) return;
    setActionError("");
    const prev = users;
    setUsers((list) => list?.filter((u) => u.id !== id) ?? list);
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setActionError(data.error || "মুছে ফেলা যায়নি");
        setUsers(prev);
      }
    } catch {
      setActionError("সার্ভারের সঙ্গে সংযোগ করা যায়নি");
      setUsers(prev);
    }
  }

  return (
    <main className="admin-main">
      <div className="admin-page-head">
        <div>
          <h1>অ্যাডমিন ইউজার</h1>
          <p>
            প্যানেলে প্রবেশের অনুমতিপ্রাপ্ত ইউজার পরিচালনা করুন।
            {me && (
              <>
                {" "}
                — আপনি প্রবেশ করেছেন <b>{me === "root" ? "প্রধান অ্যাডমিন (root)" : me}</b> হিসেবে।
              </>
            )}
          </p>
        </div>
        <button className="btn" type="button" onClick={() => setOpen(true)}>
          + নতুন অ্যাডমিন যোগ করুন
        </button>
      </div>

      {actionError && <div className="af-status error admin-action-error">{actionError}</div>}
      {loadError && <div className="af-status error">{loadError}</div>}
      {!users && !loadError && <p className="admin-empty">লোড হচ্ছে…</p>}

      {users && (
        <div className="tablewrap admin-tablewrap">
          <table>
            <thead>
              <tr>
                <th>ইউজারনেম</th>
                <th>যোগ হয়েছে</th>
                <th>কার্যক্রম</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>root (প্রধান অ্যাডমিন)</td>
                <td className="num">.env.local — ADMIN_PASSWORD</td>
                <td className="num" style={{ color: "var(--ink-soft)" }}>
                  স্থায়ী
                </td>
              </tr>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td className="num">{fmtDateBn(u.createdAt)}</td>
                  <td>
                    <button
                      type="button"
                      className="admin-delete"
                      onClick={() => removeUser(u.id, u.username)}
                    >
                      মুছুন
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <p className="admin-empty">কোনো অতিরিক্ত অ্যাডমিন যোগ করা হয়নি — শুধু root দিয়ে প্রবেশ করা যাচ্ছে।</p>
          )}
        </div>
      )}

      {open && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="addUserTitle"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-head">
              <h2 id="addUserTitle">নতুন অ্যাডমিন যোগ করুন</h2>
              <button type="button" className="admin-modal-close" aria-label="বন্ধ করুন" onClick={closeModal}>
                ✕
              </button>
            </div>
            <p className="admin-modal-sub">এই ইউজারনেম-পাসওয়ার্ড দিয়ে অ্যাডমিন প্যানেলে প্রবেশ করা যাবে।</p>

            <form onSubmit={submit}>
              <div className="af-grid">
                <div className="af-field af-span2">
                  <label htmlFor="newUsername">ইউজারনেম</label>
                  <input
                    id="newUsername"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="af-field">
                  <label htmlFor="newPassword">পাসওয়ার্ড</label>
                  <input
                    id="newPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </div>
                <div className="af-field">
                  <label htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              <div className="af-actions">
                <button className="btn" type="submit" disabled={saving}>
                  {saving ? "যোগ হচ্ছে…" : "অ্যাডমিন যোগ করুন"}
                </button>
                <button type="button" className="btn ghost-dark" onClick={closeModal} disabled={saving}>
                  বাতিল
                </button>
                {formError && <span className="af-status error">{formError}</span>}
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
