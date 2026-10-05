"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "../../_components/Icon";
import { DIVISIONS } from "@/lib/bdGeo";
import { toBn } from "@/lib/bn";

export default function OfficeFinder() {
  const [division, setDivision] = useState(DIVISIONS[0].name);
  const [district, setDistrict] = useState("");
  const [q, setQ] = useState("");

  const query = q.trim();
  const list = query
    ? DIVISIONS.flatMap((d) => d.districts.filter((x) => x.includes(query)).map((x) => ({ div: d.name, dist: x })))
    : (DIVISIONS.find((d) => d.name === division)?.districts ?? []).map((x) => ({ div: division, dist: x }));

  return (
    <div className="finder">
      <div className="finder-controls">
        <label className="admin-search finder-search">
          <Icon name="search" size={17} />
          <input
            type="search"
            aria-label="জেলার নাম লিখে খুঁজুন"
            placeholder="জেলার নাম লিখে খুঁজুন…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        {!query && (
          <div className="chips" role="tablist" aria-label="বিভাগ">
            {DIVISIONS.map((d) => (
              <button
                key={d.name}
                type="button"
                role="tab"
                aria-selected={division === d.name}
                className={division === d.name ? "on" : ""}
                onClick={() => {
                  setDivision(d.name);
                  setDistrict("");
                }}
              >
                {d.name}
                <span>{toBn(d.districts.length)}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {list.length === 0 ? (
        <div className="admin-empty">
          <Icon name="map" size={30} />
          <p>&ldquo;{query}&rdquo; নামে কোনো জেলা পাওয়া যায়নি।</p>
        </div>
      ) : (
        <div className="district-grid">
          {list.map(({ div, dist }) => {
            const open = district === dist;
            return (
              <div key={dist} className={`district${open ? " open" : ""}`}>
                <button type="button" aria-expanded={open} onClick={() => setDistrict(open ? "" : dist)}>
                  <span className="d-ic">
                    <Icon name="pin" size={18} />
                  </span>
                  <span className="d-txt">
                    <b>{dist}</b>
                    <span>{div} বিভাগ</span>
                  </span>
                  <Icon name="chevron" size={16} />
                </button>
                {open && (
                  <div className="district-body">
                    <p>
                      <b>উপপরিচালকের কার্যালয়</b>, যুব উন্নয়ন অধিদপ্তর, {dist}
                    </p>
                    <p>এবং {dist} জেলার প্রতিটি উপজেলায় উপজেলা যুব উন্নয়ন কর্মকর্তার কার্যালয়।</p>
                    <p className="fine">কার্যালয়ের ফোন নম্বর জানতে ৩৩৩-এ কল করুন। সেবা সময়: রবি–বৃহস্পতি, সকাল ৯টা – বিকেল ৫টা।</p>
                    <div className="district-actions">
                      <a href="tel:333" className="btn ghost sm">
                        <Icon name="phone" size={15} />
                        ৩৩৩-এ কল
                      </a>
                      <Link href="/apply" className="btn sm">
                        অনলাইনে আবেদন
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
