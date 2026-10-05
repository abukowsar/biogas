"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toBn, fmtDateBn } from "@/lib/bn";
import { APPLICATION_STATUSES, STATUS_LABEL_BN, type ApplicationStatus } from "@/lib/applicationStatus";
import type { Application } from "@/lib/types";
import AddApplicationModal from "../_components/AddApplicationModal";
import Icon from "@/app/_components/Icon";

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [filter, setFilter] = useState<"all" | ApplicationStatus>("all");
  const [search, setSearch] = useState("");

  async function load() {
    setLoadError("");
    try {
      const res = await fetch("/api/admin/applications", { cache: "no-store" });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setLoadError(data.error || "তালিকা আনা যায়নি");
        return;
      }
      setApplications(data.applications);
    } catch {
      setLoadError("সার্ভারের সঙ্গে সংযোগ করা যায়নি");
    }
  }

  useEffect(() => {
    load();
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: applications?.length || 0 };
    for (const s of APPLICATION_STATUSES) c[s] = 0;
    applications?.forEach((a) => {
      c[a.status] = (c[a.status] || 0) + 1;
    });
    return c;
  }, [applications]);

  const filtered = useMemo(() => {
    if (!applications) return [];
    const q = search.trim().toLowerCase();
    return applications.filter((a) => {
      if (filter !== "all" && a.status !== filter) return false;
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.phone.toLowerCase().includes(q) ||
        a.address.toLowerCase().includes(q)
      );
    });
  }, [applications, filter, search]);

  async function changeStatus(id: string, status: ApplicationStatus) {
    setActionError("");
    const prev = applications;
    setApplications((list) => list?.map((a) => (a.id === id ? { ...a, status } : a)) ?? list);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setActionError(data.error || "হালনাগাদ করা যায়নি");
        setApplications(prev);
      }
    } catch {
      setActionError("সার্ভারের সঙ্গে সংযোগ করা যায়নি");
      setApplications(prev);
    }
  }

  async function removeApplication(id: string, name: string) {
    if (!window.confirm(`"${name}" এর আবেদনটি স্থায়ীভাবে মুছে ফেলবেন?`)) return;
    setActionError("");
    const prev = applications;
    setApplications((list) => list?.filter((a) => a.id !== id) ?? list);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setActionError(data.error || "মুছে ফেলা যায়নি");
        setApplications(prev);
      }
    } catch {
      setActionError("সার্ভারের সঙ্গে সংযোগ করা যায়নি");
      setApplications(prev);
    }
  }

  return (
    <main className="admin-main">
      <div className="admin-page-head">
        <div>
          <h1>আবেদনসমূহ</h1>
          <p>সব আবেদন দেখুন, স্ট্যাটাস হালনাগাদ করুন ও প্রয়োজনে মুছুন।</p>
        </div>
        <div className="admin-page-head-actions">
          <button className="btn ghost" type="button" onClick={load}>
            <Icon name="refresh" size={16} />
            রিফ্রেশ
          </button>
          <AddApplicationModal onCreated={load} />
        </div>
      </div>

      <div className="admin-controls">
        <div className="admin-tabs">
          <button
            type="button"
            className={filter === "all" ? "on" : ""}
            onClick={() => setFilter("all")}
          >
            সব ({toBn(counts.all)})
          </button>
          {APPLICATION_STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              className={filter === s ? "on" : ""}
              onClick={() => setFilter(s)}
            >
              {STATUS_LABEL_BN[s]} ({toBn(counts[s] || 0)})
            </button>
          ))}
        </div>
        <label className="admin-search">
          <Icon name="search" size={17} />
          <input
            type="search"
            aria-label="আবেদন খুঁজুন"
            placeholder="নাম, মোবাইল বা ঠিকানা দিয়ে খুঁজুন…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      {actionError && <div className="af-status error admin-action-error">{actionError}</div>}

      {loadError && <div className="af-status error">{loadError}</div>}

      {!applications && !loadError && <p className="admin-empty">লোড হচ্ছে…</p>}

      {applications && filtered.length === 0 && (
        <div className="admin-empty">
          <Icon name="inbox" size={30} />
          <p>কোনো আবেদন পাওয়া যায়নি।</p>
        </div>
      )}

      {applications && filtered.length > 0 && (
        <div className="tablewrap admin-tablewrap">
          <table>
            <thead>
              <tr>
                <th>নাম</th>
                <th>মোবাইল</th>
                <th>ঠিকানা</th>
                <th>পশু</th>
                <th>সদস্য</th>
                <th>জমার তারিখ</th>
                <th>স্ট্যাটাস</th>
                <th>কার্যক্রম</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td>
                    {a.name}
                    {a.source === "admin" && <span className="admin-source-tag">অ্যাডমিন</span>}
                    {a.note && <div className="admin-note">{a.note}</div>}
                  </td>
                  <td className="num">{a.phone}</td>
                  <td>{a.address}</td>
                  <td className="num">{toBn(a.cattle)}</td>
                  <td className="num">{toBn(a.members)}</td>
                  <td className="num">{fmtDateBn(a.createdAt)}</td>
                  <td>
                    <select
                      className={`admin-status-select status-${a.status}`}
                      value={a.status}
                      onChange={(e) => changeStatus(a.id, e.target.value as ApplicationStatus)}
                    >
                      {APPLICATION_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABEL_BN[s]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="admin-delete"
                      onClick={() => removeApplication(a.id, a.name)}
                    >
                      <Icon name="trash" size={15} />
                      মুছুন
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
