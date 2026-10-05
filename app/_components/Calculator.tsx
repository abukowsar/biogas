"use client";

import Link from "next/link";
import { useState } from "react";
import { toBn, fmt } from "@/lib/bn";
import { SIZES, YIELD } from "@/lib/plantCalc";
import Icon from "./Icon";

const NEED = 0.35; // ঘনমিটার / জন / দিন (রান্না)
const BURN = 0.4; // ঘনমিটার / ঘণ্টা (একক চুলা)
const LPG_KG = 0.43; // কেজি এলপিজি সমতুল্য / ঘনমিটার
const CYL_TK = 1450; // ১২ কেজি সিলিন্ডারের দাম (টাকা)
const CYL = 12;
const WOOD = 3.5; // কেজি কাঠ / ঘনমিটার গ্যাস সমতুল্য
const WOOD_TK = 8;
const SLURRY = 0.25;
const SLURRY_TK = 10;

type Fuel = "lpg" | "wood";

function compute(nC: number, nM: number, kg: number, fuel: Fuel) {
  const totalDung = nC * kg;
  const gas = totalDung * YIELD;
  const need = nM * NEED;
  const used = Math.min(gas, need);
  const cover = need > 0 ? Math.min(gas / need, 1) : 0;
  const idx = SIZES.findIndex((s) => s.v >= gas);
  const pick = SIZES[idx === -1 ? SIZES.length - 1 : idx];
  const dailyFuel = fuel === "lpg" ? ((used * LPG_KG) / CYL) * CYL_TK : used * WOOD * WOOD_TK;
  const dailySlurry = totalDung * SLURRY * SLURRY_TK * 0.6;
  const yearly = (dailyFuel + dailySlurry) * 365;
  return {
    gas,
    need,
    cover,
    pick,
    cookHours: used / BURN,
    monthlyFuel: dailyFuel * 30,
    slurryKg: totalDung * SLURRY * 365,
    payback: yearly > 0 ? pick.cost / yearly : 0,
  };
}

function coverNote(gas: number, need: number, cover: number) {
  if (gas >= need * 1.35)
    return "চাহিদার বেশি গ্যাস থাকছে — বাড়তি অংশ বাতি, পানি গরম বা ছোট জেনারেটরে কাজে লাগাতে পারেন।";
  if (cover >= 0.95) return "সারা দিনের রান্না এই প্ল্যান্টেই চলবে।";
  if (cover >= 0.6)
    return "বেশির ভাগ রান্না চলবে; রান্নাঘরের জৈব বর্জ্য ও হাঁস-মুরগির বিষ্ঠা যোগ করলে ঘাটতি কমবে।";
  return "গ্যাস কম পড়বে। পশুর সংখ্যা বাড়ানো বা প্রতিবেশীর সঙ্গে যৌথ প্ল্যান্টের কথা ভাবুন।";
}

function Slider({
  id,
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div className="ctl">
      <div className="ctl-top">
        <label htmlFor={id}>{label}</label>
        <span className="stepper">
          <button type="button" aria-label={`${label} কমান`} onClick={() => onChange(Math.max(min, value - 1))}>
            −
          </button>
          <span className="val">
            {toBn(value)} {unit}
          </span>
          <button type="button" aria-label={`${label} বাড়ান`} onClick={() => onChange(Math.min(max, value + 1))}>
            +
          </button>
        </span>
      </div>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={1}
        value={value}
        style={{ "--fill": fill + "%" } as React.CSSProperties}
        onChange={(e) => onChange(+e.target.value)}
      />
    </div>
  );
}

export default function Calculator({ showTable = false }: { showTable?: boolean }) {
  const [cattle, setCattle] = useState(4);
  const [members, setMembers] = useState(5);
  const [dung, setDung] = useState(10);
  const [fuel, setFuel] = useState<Fuel>("lpg");

  const r = compute(cattle, members, dung, fuel);
  const pct = Math.round(r.cover * 100);

  // ডায়াগ্রামের গ্যাস স্তর ও শিখার আকার
  const gasH = Math.max(4, Math.min(r.cover, 1.15) * 58);
  const flameRy = 9 + Math.min(r.cover, 1.2) * 12;
  const flameRx = 6 + Math.min(r.cover, 1.2) * 7;

  return (
    <>
      <div className="rig">
        <div className="rig-head">
          <h2>
            <Icon name="gauge" size={18} />
            প্ল্যান্ট সিমুলেটর
          </h2>
          <span className="tag">Fixed-dome · জনতা মডেল</span>
        </div>
        <div className="rig-body">
          <div className="stage">
            <svg viewBox="0 0 420 300" role="img" aria-labelledby="rigt">
              <title id="rigt">বায়োগ্যাস প্ল্যান্টের প্রস্থচ্ছেদ: ইনলেট, ডাইজেস্টার, গ্যাস ডোম, আউটলেট ও চুলা</title>
              <defs>
                <clipPath id="domeClip">
                  <path d="M120 196a90 62 0 0 1 180 0z" />
                </clipPath>
                <linearGradient id="slurry" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#7A6234" />
                  <stop offset="1" stopColor="#4E3E1F" />
                </linearGradient>
                <linearGradient id="gasg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#7FD3F2" stopOpacity=".85" />
                  <stop offset="1" stopColor="#2D8FBF" stopOpacity=".5" />
                </linearGradient>
                <radialGradient id="flameg" cx="50%" cy="70%" r="60%">
                  <stop offset="0" stopColor="#DFF6FF" />
                  <stop offset=".55" stopColor="#7FD3F2" />
                  <stop offset="1" stopColor="#2D8FBF" stopOpacity=".15" />
                </radialGradient>
              </defs>

              <rect className="sv-soil" x="0" y="96" width="420" height="204" />
              <line className="sv-ground" x1="0" y1="96" x2="420" y2="96" strokeWidth="1.5" />
              <g className="sv-strata" strokeWidth="1">
                <line x1="0" y1="120" x2="420" y2="120" />
                <line x1="0" y1="150" x2="420" y2="150" />
                <line x1="0" y1="182" x2="420" y2="182" />
                <line x1="0" y1="216" x2="420" y2="216" />
              </g>

              <path className="sv-box sv-line" d="M62 96 L96 96 L104 150 L74 150 Z" strokeWidth="1.6" />
              <path d="M70 132 L100 132 L104 150 L74 150 Z" fill="url(#slurry)" />
              <text className="sv-label" x="79" y="88" textAnchor="middle" fontSize="11">
                ইনলেট
              </text>

              <path className="sv-digester sv-line" d="M120 196a90 62 0 0 1 180 0v40a90 30 0 0 1-180 0z" strokeWidth="2" />
              <path d="M120 196v40a90 30 0 0 0 180 0v-40z" fill="url(#slurry)" opacity=".92" />
              <g clipPath="url(#domeClip)">
                <rect className="gasfill" x="118" y={196 - gasH} width="184" height={gasH} fill="url(#gasg)" />
              </g>
              <path className="sv-line" d="M120 196a90 62 0 0 1 180 0" fill="none" strokeWidth="2" />
              <text x="210" y="222" textAnchor="middle" fontSize="11.5" fill="#F7F1E3">
                ডাইজেস্টার
              </text>
              <g fill="#7FD3F2" opacity=".75">
                <circle cx="180" cy="230" r="3">
                  <animate attributeName="cy" values="238;200" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;.8;0" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="235" cy="236" r="2.4">
                  <animate attributeName="cy" values="242;198" dur="3.8s" begin="1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;.8;0" dur="3.8s" begin="1s" repeatCount="indefinite" />
                </circle>
                <circle cx="205" cy="240" r="2">
                  <animate attributeName="cy" values="244;202" dur="4.4s" begin="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;.7;0" dur="4.4s" begin="2s" repeatCount="indefinite" />
                </circle>
              </g>

              <path className="sv-box sv-line" d="M322 96 L372 96 L366 168 L328 168 Z" strokeWidth="1.6" />
              <path d="M330 130 L368 130 L366 168 L328 168 Z" fill="#6B5A2E" />
              <text className="sv-label" x="347" y="88" textAnchor="middle" fontSize="11">
                জৈব সার
              </text>
              <path className="sv-line" d="M300 216 L328 168" strokeWidth="2" fill="none" />

              <path className="sv-line" d="M210 134 L210 60 L128 60 L128 74" fill="none" strokeWidth="3" strokeLinecap="round" />
              <circle className="sv-box sv-line" cx="210" cy="98" r="6" strokeWidth="2" />
              <line className="sv-line" x1="206" y1="98" x2="214" y2="98" strokeWidth="2" />

              <rect className="sv-stove" x="106" y="74" width="44" height="9" rx="2" />
              <ellipse className="sv-stove-top" cx="128" cy="74" rx="20" ry="4" />
              <g transform="translate(128,70)" style={{ opacity: r.gas > 0.2 ? 1 : 0.25 }}>
                <ellipse
                  cx="0"
                  cy={(-flameRy * 0.62).toFixed(1)}
                  rx={flameRx.toFixed(1)}
                  ry={flameRy.toFixed(1)}
                  fill="url(#flameg)"
                />
              </g>
              <text className="sv-mono" x="128" y="46" textAnchor="middle" fontSize="10">
                CH₄ ~৬০%
              </text>
            </svg>
          </div>

          <div className="controls">
            <Slider id="cattle" label="গবাদিপশুর সংখ্যা" value={cattle} min={1} max={20} unit="টি" onChange={setCattle} />
            <Slider id="members" label="পরিবারের সদস্য" value={members} min={1} max={15} unit="জন" onChange={setMembers} />
            <Slider id="dung" label="দৈনিক গোবর (প্রতি পশু)" value={dung} min={5} max={18} unit="কেজি" onChange={setDung} />
            <div className="ctl">
              <div className="ctl-top">
                <span>এখন যে জ্বালানি ব্যবহার করেন</span>
              </div>
              <div className="seg" role="group" aria-label="বর্তমান জ্বালানি">
                <button type="button" aria-pressed={fuel === "lpg"} onClick={() => setFuel("lpg")}>
                  এলপিজি সিলিন্ডার
                </button>
                <button type="button" aria-pressed={fuel === "wood"} onClick={() => setFuel("wood")}>
                  কাঠ / খড়ি
                </button>
              </div>
            </div>
            <div className="verdict" aria-live="polite">
              <div className="verdict-top">
                <b>রান্নার চাহিদা পূরণ হবে</b>
                <span className={`verdict-pct${r.cover < 1 ? " warn" : ""}`}>{toBn(pct)}%</span>
              </div>
              <div className={`meter${r.cover < 1 ? " warn" : ""}`}>
                <i style={{ width: pct + "%" }}></i>
              </div>
              <span>{coverNote(r.gas, r.need, r.cover)}</span>
            </div>
          </div>
        </div>

        <div className="readout">
          <div className="cell">
            <div className="k">
              <Icon name="flame" size={15} />
              দৈনিক গ্যাস উৎপাদন
            </div>
            <div className="n">
              {fmt(r.gas, 1)}
              <small>ঘনমিটার</small>
            </div>
          </div>
          <div className="cell">
            <div className="k">
              <Icon name="clock" size={15} />
              দৈনিক রান্না চলবে
            </div>
            <div className="n">
              {fmt(r.cookHours, 1)}
              <small>ঘণ্টা</small>
            </div>
          </div>
          <div className="cell">
            <div className="k">
              <Icon name="cube" size={15} />
              প্রস্তাবিত প্ল্যান্ট আকার
            </div>
            <div className="n">
              {toBn(r.pick.v)}
              <small>ঘনমিটার</small>
            </div>
          </div>
          <div className="cell gold">
            <div className="k">
              <Icon name="wallet" size={15} />
              মাসিক জ্বালানি সাশ্রয়
            </div>
            <div className="n">
              ৳{fmt(r.monthlyFuel)}
              <small>টাকা</small>
            </div>
          </div>
          <div className="cell gold">
            <div className="k">
              <Icon name="sprout" size={15} />
              বছরে শুকনো জৈব সার
            </div>
            <div className="n">
              {fmt(r.slurryKg)}
              <small>কেজি</small>
            </div>
          </div>
          <div className="cell">
            <div className="k">
              <Icon name="trend" size={15} />
              খরচ উঠে আসবে
            </div>
            <div className="n">
              {fmt(r.payback, 1)}
              <small>বছরে</small>
            </div>
          </div>
        </div>

        <div className="rig-foot">
          <span>
            প্রস্তাবিত: <b>{toBn(r.pick.v)} ঘনমিটার</b> প্ল্যান্ট · আনুমানিক খরচ <b>৳ {fmt(r.pick.cost)}</b>
          </span>
          <Link
            href={`/apply?cattle=${cattle}&members=${members}`}
            className="btn"
          >
            এই হিসাবে আবেদন করুন
            <Icon name="arrow" size={17} />
          </Link>
        </div>
      </div>

      {showTable && <CostTable highlight={r.pick.v} />}
    </>
  );
}

export function CostTable({ highlight }: { highlight?: number }) {
  return (
    <div className="tablewrap cost-wrap">
      <table className="cost-table">
        <thead>
          <tr>
            <th>প্ল্যান্টের আকার</th>
            <th>উপযুক্ত গবাদিপশু</th>
            <th>পরিবারের সদস্য</th>
            <th>আনুমানিক নির্মাণব্যয়</th>
          </tr>
        </thead>
        <tbody>
          {SIZES.map((s) => (
            <tr key={s.v} className={s.v === highlight ? "on" : ""}>
              <td>
                <span className="size-cell">{toBn(s.v)} ঘনমিটার</span>
              </td>
              <td className="num">{s.cattle}</td>
              <td className="num">{s.fam}</td>
              <td className="num">৳ {fmt(s.cost)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
