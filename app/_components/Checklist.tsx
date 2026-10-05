"use client";

import { CHECKLIST } from "@/lib/content";
import Icon from "./Icon";

export default function Checklist() {
  return (
    <div className="checklist">
      <div className="checklist-head">
        <div>
          <h3>কার্যালয়ে যাওয়ার আগে সঙ্গে নিন</h3>
          <p>কাগজপত্র মিলিয়ে নিন — টিক দিয়ে রাখতে পারেন।</p>
        </div>
        <button className="btn ghost sm" type="button" onClick={() => window.print()}>
          <Icon name="print" size={16} />
          প্রিন্ট
        </button>
      </div>
      <div className="checklist-grid">
        {CHECKLIST.map((c) => (
          <label key={c}>
            <input type="checkbox" />
            <span className="cb" aria-hidden="true">
              <Icon name="check" size={13} />
            </span>
            <span className="cl-txt">{c}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
