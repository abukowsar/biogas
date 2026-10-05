"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import Icon from "../../_components/Icon";
import { normalizeBdPhone } from "@/lib/bdGeo";
import { fmtDateBn } from "@/lib/bn";
import { STATUS_LABEL_BN, type ApplicationStatus } from "@/lib/applicationStatus";

type Result = { name: string; status: ApplicationStatus; createdAt: string };

const FLOW: { s: ApplicationStatus; d: string }[] = [
  { s: "pending", d: "আবেদন জমা হয়েছে, যাচাইয়ের অপেক্ষায়" },
  { s: "contacted", d: "কার্যালয় থেকে যোগাযোগ করা হয়েছে" },
  { s: "approved", d: "পরিদর্শন শেষে অনুমোদিত, নির্মাণের প্রস্তুতি" },
  { s: "completed", d: "প্ল্যান্ট স্থাপন ও হস্তান্তর সম্পন্ন" },
];

export default function TrackForm({ initialRef }: { initialRef: string }) {
  const [ref, setRef] = useState(initialRef);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/applications/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: ref.trim(), phone: normalizeBdPhone(phone) }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "তথ্য পাওয়া যায়নি");
      else setResult(data);
    } catch {
      setError("সার্ভারের সঙ্গে সংযোগ করা যায়নি।");
    } finally {
      setLoading(false);
    }
  }

  const current = result ? FLOW.findIndex((f) => f.s === result.status) : -1;

  return (
    <>
      <form className="apply-form track-form" onSubmit={submit}>
        <div className="af-grid">
          <div className="af-field af-span2">
            <label htmlFor="trRef">রেফারেন্স নম্বর</label>
            <input
              id="trRef"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder="২৪ অক্ষরের নম্বর"
              value={ref}
              onChange={(e) => setRef(e.target.value)}
              required
            />
          </div>
          <div className="af-field af-span2">
            <label htmlFor="trPhone">যে মোবাইল নম্বর দিয়ে আবেদন করেছেন</label>
            <input
              id="trPhone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="০১XXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        {error && (
          <div className="af-status error" role="alert">
            <Icon name="alert" size={18} />
            <span>{error}</span>
          </div>
        )}
        <div className="af-actions">
          <button className="btn lg block-sm" type="submit" disabled={loading}>
            <Icon name="search" size={18} />
            {loading ? "খোঁজা হচ্ছে…" : "অবস্থা দেখুন"}
          </button>
        </div>
      </form>

      {result && (
        <div className="track-result" aria-live="polite">
          <div className="tr-head">
            <div>
              <span className="ol-k">আবেদনকারী</span>
              <b>{result.name}</b>
            </div>
            <div>
              <span className="ol-k">জমার তারিখ</span>
              <b>{fmtDateBn(result.createdAt)}</b>
            </div>
            <span className={`status-badge status-${result.status}`}>{STATUS_LABEL_BN[result.status]}</span>
          </div>

          {result.status === "rejected" ? (
            <div className="af-status error">
              <Icon name="alert" size={18} />
              <span>
                আবেদনটি এই মুহূর্তে অনুমোদন পায়নি। বিস্তারিত জানতে উপজেলা যুব উন্নয়ন কার্যালয়ে যোগাযোগ করুন বা{" "}
                <a href="tel:333">৩৩৩</a>-এ কল করুন।
              </span>
            </div>
          ) : (
            <ol className="timeline">
              {FLOW.map((f, i) => (
                <li key={f.s} className={i < current ? "done" : i === current ? "now" : ""}>
                  <span className="tl-dot">{i <= current && <Icon name="check" size={13} />}</span>
                  <div>
                    <b>{STATUS_LABEL_BN[f.s]}</b>
                    <span>{f.d}</span>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      <p className="fine center">
        রেফারেন্স নম্বর হারিয়ে ফেলেছেন? <Link href="/offices">নিকটস্থ কার্যালয়ে</Link> মোবাইল নম্বর দিয়ে খোঁজ নিন।
      </p>
    </>
  );
}
