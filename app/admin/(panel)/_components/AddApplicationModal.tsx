"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { APPLICATION_STATUSES, STATUS_LABEL_BN, type ApplicationStatus } from "@/lib/applicationStatus";

type Form = {
  name: string;
  phone: string;
  address: string;
  cattle: string;
  members: string;
  note: string;
  status: ApplicationStatus;
};

const EMPTY: Form = { name: "", phone: "", address: "", cattle: "", members: "", note: "", status: "pending" };

export default function AddApplicationModal({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(key: keyof Form) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function close() {
    if (saving) return;
    setOpen(false);
    setForm(EMPTY);
    setError("");
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "আবেদন যোগ করা যায়নি");
        setSaving(false);
        return;
      }
      setSaving(false);
      setOpen(false);
      setForm(EMPTY);
      onCreated();
    } catch {
      setError("সার্ভারের সঙ্গে সংযোগ করা যায়নি");
      setSaving(false);
    }
  }

  return (
    <>
      <button type="button" className="btn" onClick={() => setOpen(true)}>
        + নতুন আবেদন যোগ করুন
      </button>

      {open && (
        <div className="admin-modal-overlay" onClick={close}>
          <div
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="addAppTitle"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-head">
              <h2 id="addAppTitle">নতুন আবেদন যোগ করুন</h2>
              <button type="button" className="admin-modal-close" aria-label="বন্ধ করুন" onClick={close}>
                ✕
              </button>
            </div>
            <p className="admin-modal-sub">ফোনে বা সরাসরি অফিসে আসা আবেদনকারীর তথ্য এখানে যোগ করুন।</p>

            <form onSubmit={submit}>
              <div className="af-grid">
                <div className="af-field">
                  <label htmlFor="mName">পূর্ণ নাম</label>
                  <input id="mName" type="text" value={form.name} onChange={update("name")} required />
                </div>
                <div className="af-field">
                  <label htmlFor="mPhone">মোবাইল নম্বর</label>
                  <input
                    id="mPhone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="01XXXXXXXXX"
                    value={form.phone}
                    onChange={update("phone")}
                    required
                  />
                </div>
                <div className="af-field af-span2">
                  <label htmlFor="mAddress">ঠিকানা (গ্রাম, উপজেলা, জেলা)</label>
                  <input id="mAddress" type="text" value={form.address} onChange={update("address")} required />
                </div>
                <div className="af-field">
                  <label htmlFor="mCattle">গবাদিপশুর সংখ্যা</label>
                  <input
                    id="mCattle"
                    type="number"
                    min="1"
                    max="50"
                    value={form.cattle}
                    onChange={update("cattle")}
                    required
                  />
                </div>
                <div className="af-field">
                  <label htmlFor="mMembers">পরিবারের সদস্য</label>
                  <input
                    id="mMembers"
                    type="number"
                    min="1"
                    max="30"
                    value={form.members}
                    onChange={update("members")}
                    required
                  />
                </div>
                <div className="af-field">
                  <label htmlFor="mStatus">প্রাথমিক অবস্থা</label>
                  <select id="mStatus" value={form.status} onChange={update("status")}>
                    {APPLICATION_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABEL_BN[s]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="af-field af-span2">
                  <label htmlFor="mNote">অতিরিক্ত তথ্য (ঐচ্ছিক)</label>
                  <textarea id="mNote" rows={3} value={form.note} onChange={update("note")} />
                </div>
              </div>

              <div className="af-actions">
                <button className="btn" type="submit" disabled={saving}>
                  {saving ? "সংরক্ষণ হচ্ছে…" : "আবেদন যোগ করুন"}
                </button>
                <button type="button" className="btn ghost-dark" onClick={close} disabled={saving}>
                  বাতিল
                </button>
                {error && <span className="af-status error">{error}</span>}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
