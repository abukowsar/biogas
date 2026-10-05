import type { Metadata } from "next";
import PageHeader, { CtaBand } from "../../_components/PageHeader";
import Icon from "../../_components/Icon";
import { FAQS } from "@/lib/content";

export const metadata: Metadata = {
  title: "প্রশ্নোত্তর",
  description: "বায়োগ্যাস প্ল্যান্টের জায়গা, শীতকালের গ্যাস, বন্যাপ্রবণ এলাকা, স্লারি ও আয়ু নিয়ে সচরাচর জিজ্ঞাসা।",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="সচরাচর জিজ্ঞাসা"
        title="প্রশ্নোত্তর"
        lede="উত্তর না পেলে উপজেলা যুব উন্নয়ন কার্যালয়ে বা জাতীয় হেল্পলাইন ৩৩৩-এ যোগাযোগ করুন।"
      />
      <section className="tight-top">
        <div className="wrap narrow">
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>
                  {f.q}
                  <span className="sum-ic" aria-hidden="true">
                    <Icon name="plus" size={16} />
                  </span>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="আরও কিছু জানার আছে?" text="উপজেলা যুব উন্নয়ন কার্যালয়ে সরাসরি আসুন বা ৩৩৩-এ কল করে কার্যালয়ের নম্বর জেনে নিন।" />
    </>
  );
}
