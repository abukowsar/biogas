import Link from "next/link";
import Icon, { type IconName } from "../_components/Icon";
import { CtaBand } from "../_components/PageHeader";
import HeroScene from "../_components/HeroScene";
import { BENEFITS, HOW_IT_WORKS, HELPLINES } from "@/lib/content";
import { toAsciiDigits } from "@/lib/bdGeo";

const SERVICES: { href: string; icon: IconName; t: string; d: string; tone: string }[] = [
  { href: "/calculator", icon: "gauge", t: "খরচ ও লাভের হিসাব", d: "কত গ্যাস, কত সাশ্রয়", tone: "teal" },
  { href: "/apply", icon: "plus", t: "অনলাইনে আবেদন", d: "৫ মিনিটে আবেদন জমা", tone: "gold" },
  { href: "/track", icon: "search", t: "আবেদনের অবস্থা", d: "রেফারেন্স দিয়ে খুঁজুন", tone: "blue" },
  { href: "/offices", icon: "pin", t: "নিকটস্থ কার্যালয়", d: "৬৪ জেলার তথ্য", tone: "violet" },
  { href: "/cost", icon: "wallet", t: "খরচ ও ঋণ সুবিধা", d: "প্ল্যান্টের দাম ও অর্থায়ন", tone: "teal" },
  { href: "/faq", icon: "chat", t: "প্রশ্নোত্তর", d: "সাধারণ জিজ্ঞাসার উত্তর", tone: "gold" },
];

export default function Home() {
  return (
    <>
      <div className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="pill">
              <span className="pill-dot" />
              সরকারি কারিগরি সহায়তা · ৬৪ জেলায়
            </span>
            <h1 className="hero-title">
              <span className="sr-only">গোবর থেকে গ্যাস, সার ও সাশ্রয় — বর্জ্য থেকে সম্পদ</span>
              <span aria-hidden="true">
                গোবর থেকে{" "}
                <span className="rotator">
                  <span>গ্যাস,</span>
                  <span>সার,</span>
                  <span>সাশ্রয়,</span>
                </span>
                <br />
                <em>বর্জ্য থেকে সম্পদ</em>
              </span>
            </h1>
            <p className="hero-sub">
              বায়োগ্যাসের জ্বালানি, জৈব সার ও সাশ্রয়ী জীবন। আপনার গোয়ালঘরের গোবরেই চলতে পারে প্রতিদিনের রান্না —
              আর অবশিষ্ট স্লারি হবে ক্ষেতের সেরা জৈব সার।
            </p>
            <div className="hero-cta">
              <Link href="/calculator" className="btn lg">
                হিসাব করে দেখুন
                <Icon name="arrow" size={18} />
              </Link>
              <Link href="/apply" className="btn ghost lg">
                অনলাইনে আবেদন
              </Link>
            </div>
            <dl className="hero-stats">
              <div>
                <dt>প্ল্যান্টের আয়ু</dt>
                <dd>১৫–২০ বছর</dd>
              </div>
              <div>
                <dt>আবেদন থেকে গ্যাস</dt>
                <dd>৪–৮ সপ্তাহ</dd>
              </div>
              <div>
                <dt>খরচ শুরু</dt>
                <dd>৳৩৮,০০০</dd>
              </div>
            </dl>
          </div>

          <HeroScene />
        </div>
        <div className="wrap">
          <div className="hero-trust">
            <span>
              <Icon name="shield" size={17} />
              যুব উন্নয়ন অধিদপ্তরের তত্ত্বাবধান
            </span>
            <span>
              <Icon name="map" size={17} />
              ৮ বিভাগ · ৬৪ জেলা
            </span>
            <span>
              <Icon name="wallet" size={17} />
              কিস্তিতে ঋণ সুবিধা
            </span>
            <span>
              <Icon name="leaf" size={17} />
              ধোঁয়াহীন, পরিবেশবান্ধব
            </span>
          </div>
        </div>
      </div>

      <section className="services-sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">ই-সেবা</span>
            <h2 className="sec">এক জায়গায় সব সেবা</h2>
          </div>
          <div className="services">
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href} className="svc">
                <span className={`svc-ic ${s.tone}`}>
                  <Icon name={s.icon} />
                </span>
                <span className="svc-txt">
                  <b>{s.t}</b>
                  <span>{s.d}</span>
                </span>
                <Icon name="chevron" size={18} />
              </Link>
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

      <section>
        <div className="wrap">
          <div className="sec-head row">
            <div>
              <span className="eyebrow">কেন বায়োগ্যাস</span>
              <h2 className="sec">একটি চৌবাচ্চা, অনেক সুবিধা</h2>
            </div>
            <Link href="/benefits" className="btn ghost">
              সব সুবিধা দেখুন
              <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="benefits">
            {BENEFITS.slice(0, 6).map((b) => (
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

      <section className="alt tight">
        <div className="wrap">
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
