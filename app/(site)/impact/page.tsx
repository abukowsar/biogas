import type { Metadata } from "next";
import PageHeader, { CtaBand } from "../../_components/PageHeader";
import Icon from "../../_components/Icon";
import { IMPACT } from "@/lib/content";

export const metadata: Metadata = {
  title: "ইমপ্যাক্ট প্রকল্পের বায়োগ্যাস প্ল্যান্ট — বাগাতিপাড়া, নাটোর",
  description:
    "যুব ও ক্রীড়া মন্ত্রণালয়ের ইমপ্যাক্ট প্রকল্পের বায়োগ্যাস প্ল্যান্ট: বাগাতিপাড়ার প্রায় ৩৯৭ পরিবার বায়োগ্যাস ব্যবহার করছে।",
};

const { lat, lng } = IMPACT;
const MAP_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.03}%2C${lat - 0.02}%2C${lng + 0.03}%2C${lat + 0.02}&layer=mapnik&marker=${lat}%2C${lng}`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

export default function ImpactPage() {
  return (
    <>
      <PageHeader
        eyebrow="মাঠের উদাহরণ"
        title="ইমপ্যাক্ট প্রকল্পের বায়োগ্যাস প্ল্যান্ট"
        lede="নাটোরের বাগাতিপাড়া উপজেলায় যুব ও ক্রীড়া মন্ত্রণালয়ের অধীন ইমপ্যাক্ট প্রকল্প খামারের বর্জ্য থেকে গ্যাস ও বিদ্যুৎ উৎপাদন করছে — একই সঙ্গে গ্রামীণ যুব ও নারীদের দিচ্ছে দক্ষতা প্রশিক্ষণ।"
      />

      <section className="tight-top">
        <div className="wrap">
          <div className="impact-stats">
            {IMPACT.stats.map((s) => (
              <div className="impact-stat" key={s.t}>
                <span className="impact-stat-ic">
                  <Icon name={s.icon} size={20} />
                </span>
                <b>{s.n}</b>
                <span className="impact-stat-t">{s.t}</span>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap two-col impact-about">
          <div>
            <span className="eyebrow">প্রকল্প পরিচিতি</span>
            <h2 className="sec">বর্জ্য থেকে জ্বালানি, যুবদের জন্য কাজ</h2>
            <p className="sec-lede">
              গবাদিপশু ও হাঁস-মুরগির খামার সম্প্রসারণের ফলে যে বর্জ্য তৈরি হয়, ইমপ্যাক্ট প্রকল্প তা ফেলে না দিয়ে বিকল্প
              জ্বালানি হিসেবে কাজে লাগায়। বাগাতিপাড়ায় প্রায় ৩৯৭টি পরিবার এই প্ল্যান্টের বায়োগ্যাস দিয়ে তাদের চাহিদা মেটাচ্ছে।
            </p>
            <ul className="goal-list">
              {IMPACT.goals.map((g) => (
                <li key={g}>
                  <span className="goal-ic">
                    <Icon name="check" size={14} />
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <aside className="history-card">
            <span className="history-year">১৯৭২</span>
            <h3>বাংলাদেশে বায়োগ্যাসের যাত্রা</h3>
            <p>
              দেশে বায়োগ্যাস প্রযুক্তির সূচনা ১৯৭২ সালে, বাংলাদেশ কৃষি বিশ্ববিদ্যালয়ে স্থাপিত প্ল্যান্টের মাধ্যমে। আজ সেই
              প্রযুক্তি বাগাতিপাড়ার মতো গ্রামে শত শত পরিবারের কাছে পৌঁছে গেছে।
            </p>
          </aside>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">সরেজমিনে দেখতে চান?</span>
            <h2 className="sec">কীভাবে যাবেন</h2>
            <p className="sec-lede">নিজের চোখে চালু প্ল্যান্ট দেখে আসা আবেদনের আগে সিদ্ধান্ত নিতে সাহায্য করে।</p>
          </div>
          <div className="visit-grid">
            <div className="map-card">
              <iframe
                title="বাগাতিপাড়া, নাটোর — ইমপ্যাক্ট বায়োগ্যাস প্ল্যান্টের অবস্থান"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="map-foot">
                <span>
                  <Icon name="pin" size={16} />
                  বাগাতিপাড়া উপজেলা, নাটোর
                </span>
                <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="btn ghost sm">
                  <Icon name="map" size={15} />
                  ম্যাপে দেখুন
                </a>
              </div>
            </div>

            <div className="visit-side">
              <ol className="route">
                {IMPACT.route.map((r, i) => (
                  <li key={r.t}>
                    <span className="route-dot">{["১", "২", "৩"][i]}</span>
                    <div>
                      <b>{r.t}</b>
                      <span>{r.d}</span>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="tips">
                {IMPACT.tips.map((t) => (
                  <div className="tip" key={t.t}>
                    <span className="tip-ic">
                      <Icon name={t.icon} size={17} />
                    </span>
                    <div>
                      <b>{t.t}</b>
                      <p>{t.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="fine source-note">
            তথ্যসূত্র:{" "}
            <a href={IMPACT.source} target="_blank" rel="noopener noreferrer">
              অফরোড বাংলাদেশ — Bio Gas Plant of IMPACT
            </a>
            । পরিদর্শনের আগে উপজেলা যুব উন্নয়ন কার্যালয় থেকে সময় ও অনুমতির বিষয়ে জেনে নিন।
          </p>
        </div>
      </section>

      <CtaBand
        title="আপনার এলাকাতেও এমন প্ল্যান্ট চান?"
        text="অনলাইনে আবেদন করুন — যুব উন্নয়ন অধিদপ্তরের কারিগরি কর্মী আপনার বাড়ি পরিদর্শন করবেন।"
      />
    </>
  );
}
