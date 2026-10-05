"use client";

import { useState } from "react";
import { toBn } from "@/lib/bn";

export type BarDatum = {
  key: string;
  label: string;
  count: number;
  color: string;
};

export default function HorizontalBarChart({
  title,
  ariaLabel,
  data,
  valueHeader = "সংখ্যা",
  labelHeader = "নাম",
}: {
  title: string;
  ariaLabel: string;
  data: BarDatum[];
  valueHeader?: string;
  labelHeader?: string;
}) {
  const [showTable, setShowTable] = useState(false);
  const max = Math.max(1, ...data.map((d) => d.count));

  return (
    <div className="dvz-card">
      <div className="dvz-card-head">
        <h3>{title}</h3>
        <button type="button" className="dvz-toggle" onClick={() => setShowTable((s) => !s)}>
          {showTable ? "চার্ট দেখুন" : "টেবিল দেখুন"}
        </button>
      </div>

      {!showTable ? (
        <div className="dvz-bars" role="img" aria-label={ariaLabel}>
          {data.map((d) => (
            <div className="dvz-row" key={d.key}>
              <div className="dvz-row-label">
                <span className="dvz-swatch" style={{ background: d.color }} aria-hidden="true" />
                {d.label}
              </div>
              <div className="dvz-track">
                <div
                  className="dvz-bar"
                  style={{ width: `${(d.count / max) * 100}%`, background: d.color }}
                />
              </div>
              <div className="dvz-value">{toBn(d.count)}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="dvz-table-wrap">
          <table>
            <thead>
              <tr>
                <th>{labelHeader}</th>
                <th>{valueHeader}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.key}>
                  <td>
                    <span className="dvz-swatch" style={{ background: d.color }} aria-hidden="true" />
                    {d.label}
                  </td>
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
