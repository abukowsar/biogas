import type { Metadata } from "next";
import PageHeader, { CtaBand } from "../../_components/PageHeader";
import Icon from "../../_components/Icon";
import { BENEFITS, HOW_IT_WORKS } from "@/lib/content";

export const metadata: Metadata = {
  title: "বায়োগ্যাসের সুবিধা",
  description: "রান্নার জ্বালানি, জৈব সার, খরচ সাশ্রয় ও পরিবেশ রক্ষা — বায়োগ্যাস প্ল্যান্টের নয়টি সুবিধা।",
};

export default function BenefitsPage() {
  return (
    <>
      <PageHeader
        eyebrow="কেন বায়োগ্যাস"
        title="নয়টি সুবিধা, একটি চৌবাচ্চা থেকে"
        lede="গোবর ও জৈব বর্জ্য মাটির নিচে পচিয়ে মিথেন গ্যাস তৈরি হয়। সেই গ্যাস যায় চুলায়, আর অবশিষ্ট স্লারি যায় ফসলের ক্ষেতে।"
      />
      <section className="tight-top">
        <div className="wrap">
          <div className="benefits">
            {BENEFITS.map((b) => (
              <article className="ben" key={b.t}>
                <span className="ben-ic">
                  <Icon name={b.icon} />
                </span>
                <h3>{b.t}</h3>
                <p>{b.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">কীভাবে কাজ করে</span>
            <h2 className="sec">চার ধাপে গোবর থেকে গ্যাস ও সার</h2>
          </div>
          <ol className="flow">
            {HOW_IT_WORKS.map((h, i) => (
              <li key={h.t}>
                <span className="flow-ic">
                  <Icon name={h.icon} />
                  <span className="flow-n">{["১", "২", "৩", "৪"][i]}</span>
                </span>
                <h3>{h.t}</h3>
                <p>{h.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
