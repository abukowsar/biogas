"use client";

import { useState } from "react";
import { toBn } from "@/lib/bn";

export type TimeSeriesDatum = {
  date: string;
  shortLabel: string;
  fullLabel: string;
  count: number;
};

export default function TimeSeriesChart({ data }: { data: TimeSeriesDatum[] }) {
  const [showTable, setShowTable] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const max = Math.max(1, ...data.map((d) => d.count));

  return (
    <div className="dvz-card">
      <div className="dvz-card-head">
        <h3>গত ১৪ দিনে জমা হওয়া আবেদন</h3>
        <button type="button" className="dvz-toggle" onClick={() => setShowTable((s) => !s)}>
          {showTable ? "চার্ট দেখুন" : "টেবিল দেখুন"}
        </button>
      </div>

      {!showTable ? (
        <div className="dvz-ts" role="img" aria-label="গত চৌদ্দ দিনে দৈনিক আবেদনের সংখ্যা">
          <div className="dvz-ts-plot">
            {data.map((d, i) => (
              <button
                key={d.date}
                type="button"
                className="dvz-ts-col"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                aria-label={`${d.fullLabel}: ${toBn(d.count)}টি আবেদন`}
              >
                {active === i && (
                  <span className="dvz-tooltip">
                    {d.fullLabel} · {toBn(d.count)}
                  </span>
                )}
                <span
                  className="dvz-ts-bar"
                  style={{ height: `${Math.max(3, (d.count / max) * 100)}%` }}
                />
              </button>
            ))}
          </div>
          <div className="dvz-ts-axis">
            {data.map((d) => (
              <span key={d.date}>{d.shortLabel}</span>
            ))}
          </div>
        </div>
      ) : (
        <div className="dvz-table-wrap">
          <table>
            <thead>
              <tr>
                <th>তারিখ</th>
                <th>সংখ্যা</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.date}>
                  <td>{d.fullLabel}</td>
                  <td className="num">{toBn(d.count)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
