"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toBn, fmtDateBn, fmtDateShortBn, dateKey } from "@/lib/bn";
import { APPLICATION_STATUSES, STATUS_LABEL_BN, STATUS_CHART_COLOR } from "@/lib/applicationStatus";
import { SIZES, PLANT_SIZE_RAMP, pickPlantSizeIndex } from "@/lib/plantCalc";
import { extractDistrict } from "@/lib/parseDistrict";
import type { Application } from "@/lib/types";
import HorizontalBarChart from "./_components/HorizontalBarChart";
import TimeSeriesChart from "./_components/TimeSeriesChart";

const DISTRICT_COLOR = "#0E7C66"; // brand teal — single series, one color for every bar
const MAX_DISTRICT_ROWS = 6;

function last14Days(): Date[] {
  const today = new Date();
  const days: Date[] = [];
  for (let i = 13; i >= 0; i--) {
    days.push(new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i)));
  }
  return days;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    (async () => {
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
    })();
  }, [router]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: applications?.length || 0 };
    for (const s of APPLICATION_STATUSES) c[s] = 0;
    applications?.forEach((a) => {
      c[a.status] = (c[a.status] || 0) + 1;
    });
    return c;
  }, [applications]);

  const statusChartData = useMemo(
    () =>
      APPLICATION_STATUSES.map((s) => ({
        key: s,
        label: STATUS_LABEL_BN[s],
        count: counts[s] || 0,
        color: STATUS_CHART_COLOR[s],
      })),
    [counts]
  );

  const timeSeriesData = useMemo(() => {
    const buckets = new Map<string, number>();
    applications?.forEach((a) => {
      const key = dateKey(new Date(a.createdAt));
      buckets.set(key, (buckets.get(key) || 0) + 1);
    });
    return last14Days().map((d) => {
      const iso = d.toISOString();
      const key = dateKey(d);
      return {
        date: key,
        shortLabel: fmtDateShortBn(iso),
        fullLabel: fmtDateBn(iso),
        count: buckets.get(key) || 0,
      };
    });
  }, [applications]);

  const districtChartData = useMemo(() => {
    if (!applications) return [];
    const byDistrict = new Map<string, number>();
    applications.forEach((a) => {
      const d = extractDistrict(a.address);
      byDistrict.set(d, (byDistrict.get(d) || 0) + 1);
    });
    const sorted = [...byDistrict.entries()].sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, MAX_DISTRICT_ROWS);
    const restCount = sorted.slice(MAX_DISTRICT_ROWS).reduce((sum, [, n]) => sum + n, 0);
    const rows = top.map(([label, count]) => ({ key: label, label, count, color: DISTRICT_COLOR }));
    if (restCount > 0) rows.push({ key: "other", label: "অন্যান্য", count: restCount, color: DISTRICT_COLOR });
    return rows;
  }, [applications]);

  const plantSizeChartData = useMemo(() => {
    if (!applications) return [];
    const buckets = new Array(SIZES.length).fill(0);
    applications.forEach((a) => {
      buckets[pickPlantSizeIndex(a.cattle)]++;
    });
    return SIZES.map((s, i) => ({
      key: String(i),
      label: `${toBn(s.v)} ঘনমিটার (${s.cattle})`,
      count: buckets[i],
      color: PLANT_SIZE_RAMP[i],
    }));
  }, [applications]);

  return (
    <main className="admin-main">
      <div className="admin-page-head">
        <div>
          <h1>ড্যাশবোর্ড</h1>
          <p>আবেদনের সার্বিক পরিসংখ্যান ও প্রবণতা।</p>
        </div>
      </div>

      {loadError && <div className="af-status error">{loadError}</div>}

      {!applications && !loadError && <p className="admin-empty">লোড হচ্ছে…</p>}

      {applications && (
        <>
          <div className="admin-stats">
            <div className="stat stat-total">
              <div className="k">মোট আবেদন</div>
              <div className="n">{toBn(counts.all)}</div>
            </div>
            {APPLICATION_STATUSES.map((s) => (
              <div className="stat" key={s}>
                <div className="k">
                  <span className="dvz-swatch" style={{ background: STATUS_CHART_COLOR[s] }} aria-hidden="true" />
                  {STATUS_LABEL_BN[s]}
                </div>
                <div className="n">{toBn(counts[s] || 0)}</div>
              </div>
            ))}
          </div>

          {applications.length === 0 ? (
            <p className="admin-empty">এখনও কোনো আবেদন জমা পড়েনি — নতুন আবেদন এলে এখানে চার্ট দেখা যাবে।</p>
          ) : (
            <div className="dvz-grid">
              <HorizontalBarChart
                title="আবেদনের অবস্থা অনুযায়ী বিভাজন"
                ariaLabel="আবেদনের অবস্থা অনুযায়ী সংখ্যা"
                data={statusChartData}
                labelHeader="অবস্থা"
              />
              <TimeSeriesChart data={timeSeriesData} />
              <HorizontalBarChart
                title="জেলাভিত্তিক আবেদন"
                ariaLabel="জেলা অনুযায়ী আবেদনের সংখ্যা"
                data={districtChartData}
                labelHeader="জেলা"
              />
              <HorizontalBarChart
                title="প্রত্যাশিত প্ল্যান্ট আকারের চাহিদা"
                ariaLabel="প্ল্যান্টের আকার অনুযায়ী প্রত্যাশিত চাহিদা"
                data={plantSizeChartData}
                labelHeader="আকার"
              />
            </div>
          )}
        </>
      )}
    </main>
  );
}
