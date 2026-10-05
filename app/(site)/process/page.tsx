import type { Metadata } from "next";
import PageHeader, { CtaBand } from "../../_components/PageHeader";
import Icon from "../../_components/Icon";
import Checklist from "../../_components/Checklist";
import { STEPS, SAFETY } from "@/lib/content";

export const metadata: Metadata = {
  title: "স্থাপন প্রক্রিয়া",
  description: "আবেদন থেকে হস্তান্তর পর্যন্ত বায়োগ্যাস প্ল্যান্ট স্থাপনের ছয়টি ধাপ, নিরাপত্তা নির্দেশনা ও প্রয়োজনীয় কাগজপত্র।",
};

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="ধাপে ধাপে"
        title="স্থাপন প্রক্রিয়া"
        lede="প্রতিটি ধাপ পরের ধাপের ওপর নির্ভরশীল — তাই ক্রম মেনে চলাই ভালো। সাধারণত আবেদন থেকে গ্যাস পাওয়া পর্যন্ত ৪–৮ সপ্তাহ সময় লাগে।"
      />
      <section className="tight-top">
        <div className="wrap">
          <ol className="steps">
            {STEPS.map((s) => (
              <li className="step" key={s.t}>
                <div className="step-top">
                  <span className="dot" aria-hidden="true" />
                  {s.time && (
                    <span className="step-time">
                      <Icon name="clock" size={13} />
                      {s.time}
                    </span>
                  )}
                </div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="alt">
        <div className="wrap two-col">
          <Checklist />
          <div className="caution">
            <h3>
              <Icon name="alert" size={18} />
              নিরাপত্তা ও রক্ষণাবেক্ষণ — অবহেলা নয়
            </h3>
            <ul>
              {SAFETY.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
