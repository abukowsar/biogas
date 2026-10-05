import type { Metadata } from "next";
import Link from "next/link";
import PageHeader, { CtaBand } from "../../_components/PageHeader";
import Icon from "../../_components/Icon";
import { CostTable } from "../../_components/Calculator";
import { FINANCING } from "@/lib/content";

export const metadata: Metadata = {
  title: "খরচ ও ঋণ সুবিধা",
  description: "বিভিন্ন আকারের বায়োগ্যাস প্ল্যান্টের আনুমানিক নির্মাণব্যয় এবং যুবঋণ, ইডকল ও ব্যাংক ঋণের তথ্য।",
};

export default function CostPage() {
  return (
    <>
      <PageHeader
        eyebrow="বিনিয়োগ ও ফেরত"
        title="প্ল্যান্টের আকার ও আনুমানিক খরচ"
        lede="খরচ এলাকা, ইট-সিমেন্ট-রডের দাম ও শ্রমমজুরি অনুযায়ী কমবেশি হয়। আপনার জন্য কোন আকার উপযুক্ত তা ক্যালকুলেটরে দেখে নিন।"
      >
        <Link href="/calculator" className="btn">
          <Icon name="gauge" size={17} />
          আমার জন্য কোন আকার?
        </Link>
      </PageHeader>
      <section className="tight-top">
        <div className="wrap">
          <CostTable />
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">অর্থায়ন</span>
            <h2 className="sec">ঋণ ও কিস্তি সুবিধা</h2>
            <p className="sec-lede">একবারে পুরো টাকা দিতে না পারলে নিচের যেকোনো উৎস থেকে কিস্তিতে অর্থায়ন নিতে পারেন।</p>
          </div>
          <div className="fin-grid">
            {FINANCING.map((f) => (
              <div className="note-card" key={f.t}>
                <span className="note-ic">
                  <Icon name={f.icon} />
                </span>
                <div>
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
