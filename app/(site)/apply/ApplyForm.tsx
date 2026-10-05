"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import Icon from "../../_components/Icon";
import { DIVISIONS, isValidBdPhone, normalizeBdPhone, toAsciiDigits } from "@/lib/bdGeo";

type Form = {
  name: string;
  phone: string;
  division: string;
  district: string;
  upazila: string;
  village: string;
  cattle: string;
  members: string;
  note: string;
};

export default function ApplyForm({ initialCattle, initialMembers }: { initialCattle: string; initialMembers: string }) {
  const empty: Form = {
    name: "",
    phone: "",
    division: "",
    district: "",
    upazila: "",
    village: "",
    cattle: initialCattle,
    members: initialMembers,
    note: "",
  };
  const [form, setForm] = useState<Form>(empty);
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [refId, setRefId] = useState("");
  const [copied, setCopied] = useState(false);

  const set = (key: keyof Form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value, ...(key === "division" ? { district: "" } : {}) }));

  const districts = DIVISIONS.find((d) => d.name === form.division)?.districts ?? [];
  const phone = normalizeBdPhone(form.phone);
  const phoneBad = form.phone.length >= 11 && !isValidBdPhone(phone);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!isValidBdPhone(phone)) {
      setStatus("error");
      setError("সঠিক মোবাইল নম্বর দিন — ০১ দিয়ে শুরু, ১১ সংখ্যা (যেমন ০১৭১২৩৪৫৬৭৮)।");
      return;
    }
    setStatus("loading");
    setError("");
    // জেলা "জেলা: …" আকারে রাখা হয় যাতে অ্যাডমিন ড্যাশবোর্ডের জেলাভিত্তিক চার্ট ঠিকমতো পড়তে পারে
    const address = [
      form.village && `গ্রাম/ইউনিয়ন: ${form.village.trim()}`,
      `উপজেলা: ${form.upazila.trim()}`,
      `জেলা: ${form.district}`,
      `বিভাগ: ${form.division}`,
    ]
      .filter(Boolean)
      .join(", ");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone,
          address,
          cattle: toAsciiDigits(form.cattle),
          members: toAsciiDigits(form.members),
          note: form.note,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(data.error || "আবেদন জমা দেওয়া যায়নি, আবার চেষ্টা করুন।");
        return;
      }
      setRefId(data.id);
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
      setError("সার্ভারের সঙ্গে সংযোগ করা যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।");
    }
  }

  async function copyRef() {
    try {
      await navigator.clipboard.writeText(refId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ক্লিপবোর্ড না থাকলে ব্যবহারকারী নিজে লিখে নেবেন */
    }
  }

  if (status === "success") {
    return (
      <div className="apply-form success-card" role="status">
        <span className="success-ic">
          <Icon name="check" size={30} />
        </span>
        <h2>আবেদন গৃহীত হয়েছে</h2>
        <p>ধন্যবাদ, {form.name}। আপনার উপজেলা কার্যালয় শীঘ্রই {phone} নম্বরে যোগাযোগ করবে।</p>
        <div className="ref-box">
          <span>আপনার রেফারেন্স নম্বর</span>
          <code>{refId}</code>
          <button type="button" className="btn ghost sm" onClick={copyRef}>
            <Icon name={copied ? "check" : "copy"} size={15} />
            {copied ? "কপি হয়েছে" : "কপি করুন"}
          </button>
        </div>
        <p className="fine">নম্বরটি লিখে রাখুন বা স্ক্রিনশট নিন — অবস্থা জানতে এটি লাগবে।</p>
        <div className="success-actions">
          <Link href={`/track?ref=${refId}`} className="btn">
            আবেদনের অবস্থা দেখুন
          </Link>
          <Link href="/" className="btn ghost">
            হোমে ফিরুন
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="apply-form" onSubmit={submit}>
      <fieldset>
        <legend>
          <span>১</span>ব্যক্তিগত তথ্য
        </legend>
        <div className="af-grid">
          <div className="af-field">
            <label htmlFor="appName">পূর্ণ নাম (NID অনুযায়ী)</label>
            <input id="appName" type="text" autoComplete="name" value={form.name} onChange={set("name")} required minLength={2} />
          </div>
          <div className="af-field">
            <label htmlFor="appPhone">মোবাইল নম্বর</label>
            <div className="phone-input">
              <span>+৮৮</span>
              <input
                id="appPhone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="০১XXXXXXXXX"
                maxLength={14}
                value={form.phone}
                onChange={set("phone")}
                aria-invalid={phoneBad}
                aria-describedby="phoneHelp"
                required
              />
            </div>
            <small id="phoneHelp" className={phoneBad ? "help bad" : "help"}>
              {phoneBad ? "নম্বরটি সঠিক নয় — ০১৩ থেকে ০১৯ দিয়ে শুরু হতে হবে" : "বাংলা বা ইংরেজি অঙ্কে লিখতে পারেন"}
            </small>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <span>২</span>ঠিকানা
        </legend>
        <div className="af-grid">
          <div className="af-field">
            <label htmlFor="appDivision">বিভাগ</label>
            <select id="appDivision" value={form.division} onChange={set("division")} required>
              <option value="">বিভাগ বাছাই করুন</option>
              {DIVISIONS.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className="af-field">
            <label htmlFor="appDistrict">জেলা</label>
            <select id="appDistrict" value={form.district} onChange={set("district")} required disabled={!form.division}>
              <option value="">{form.division ? "জেলা বাছাই করুন" : "আগে বিভাগ বাছাই করুন"}</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="af-field">
            <label htmlFor="appUpazila">উপজেলা</label>
            <input id="appUpazila" type="text" value={form.upazila} onChange={set("upazila")} required />
          </div>
          <div className="af-field">
            <label htmlFor="appVillage">গ্রাম / ইউনিয়ন</label>
            <input id="appVillage" type="text" value={form.village} onChange={set("village")} required />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <span>৩</span>খামারের তথ্য
        </legend>
        <div className="af-grid">
          <div className="af-field">
            <label htmlFor="appCattle">গবাদিপশুর সংখ্যা (গরু/মহিষ)</label>
            <input
              id="appCattle"
              type="text"
              inputMode="numeric"
              pattern="[0-9০-৯]{1,2}"
              value={form.cattle}
              onChange={set("cattle")}
              required
            />
          </div>
          <div className="af-field">
            <label htmlFor="appMembers">পরিবারের সদস্য</label>
            <input
              id="appMembers"
              type="text"
              inputMode="numeric"
              pattern="[0-9০-৯]{1,2}"
              value={form.members}
              onChange={set("members")}
              required
            />
          </div>
          <div className="af-field af-span2">
            <label htmlFor="appNote">অতিরিক্ত তথ্য (ঐচ্ছিক)</label>
            <textarea
              id="appNote"
              rows={3}
              placeholder="যেমন: হাঁস-মুরগির খামার আছে, পুকুরের পাশে জায়গা…"
              value={form.note}
              onChange={set("note")}
            />
          </div>
        </div>
      </fieldset>

      <label className="agree">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} required />
        <span>আমি নিশ্চিত করছি যে দেওয়া তথ্য সঠিক এবং কার্যালয় থেকে আমার সঙ্গে যোগাযোগ করা যাবে।</span>
      </label>

      {status === "error" && (
        <div className="af-status error" role="alert">
          <Icon name="alert" size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="af-actions">
        <button className="btn lg block-sm" type="submit" disabled={status === "loading" || !agree}>
          {status === "loading" ? "জমা হচ্ছে…" : "আবেদন জমা দিন"}
          {status !== "loading" && <Icon name="arrow" size={18} />}
        </button>
      </div>
    </form>
  );
}
