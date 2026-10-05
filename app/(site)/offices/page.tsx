import type { Metadata } from "next";
import PageHeader, { CtaBand } from "../../_components/PageHeader";
import OfficeFinder from "./OfficeFinder";
import { HELPLINES } from "@/lib/content";
import { toAsciiDigits } from "@/lib/bdGeo";

export const metadata: Metadata = {
  title: "নিকটস্থ কার্যালয়",
  description: "দেশের ৬৪ জেলার উপজেলা যুব উন্নয়ন কার্যালয়ে বায়োগ্যাস সেবা — কার্যালয় খুঁজুন ও হেল্পলাইন নম্বর।",
};

export default function OfficesPage() {
  return (
    <>
      <PageHeader
        eyebrow="যোগাযোগ"
        title="নিকটস্থ কার্যালয়"
        lede="দেশের সকল জেলা ও উপজেলায় যুব উন্নয়ন অধিদপ্তরের কার্যালয় থেকে বায়োগ্যাস সেবা দেওয়া হয়। আপনার জেলা বাছাই করুন।"
      />
      <section className="tight-top">
        <div className="wrap">
          <OfficeFinder />
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">হেল্পলাইন</span>
            <h2 className="sec">ফোনে সহায়তা</h2>
          </div>
          <div className="helplines">
            {HELPLINES.map((h) => (
              <a key={h.num} href={`tel:${toAsciiDigits(h.num)}`} className="helpline">
                <span className="hl-num">{h.num}</span>
                <span>
                  <b>{h.t}</b>
                  <span>{h.d}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
