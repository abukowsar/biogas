"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/app/_components/Icon";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "লগইন ব্যর্থ হয়েছে");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("সার্ভারের সঙ্গে সংযোগ করা যায়নি");
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-bg" aria-hidden="true" />
      <form className="admin-login-card" onSubmit={onSubmit}>
        <span className="admin-login-ic" aria-hidden="true">
          <Icon name="lock" size={22} />
        </span>
        <span className="eyebrow">প্রশাসনিক প্রবেশ</span>
        <h1>অ্যাডমিন প্যানেল</h1>
        <p className="admin-login-sub">আবেদনসমূহ দেখতে ও পরিচালনা করতে প্রবেশ করুন।</p>
        <div className="af-field">
          <label htmlFor="adminUsername">ইউজারনেম (ঐচ্ছিক)</label>
          <input
            id="adminUsername"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="প্রধান অ্যাডমিন হলে খালি রাখুন"
            autoComplete="username"
            autoFocus
          />
        </div>
        <div className="af-field">
          <label htmlFor="adminPassword">পাসওয়ার্ড</label>
          <input
            id="adminPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        {error && (
          <div className="af-status error" role="alert">
            <Icon name="alert" size={18} />
            <span>{error}</span>
          </div>
        )}
        <button className="btn lg" type="submit" disabled={loading}>
          {loading ? "প্রবেশ করা হচ্ছে…" : "প্রবেশ করুন"}
        </button>
        <Link href="/" className="admin-login-back">
          <Icon name="back" size={15} />
          পাবলিক সাইটে ফিরুন
        </Link>
      </form>
    </div>
  );
}
