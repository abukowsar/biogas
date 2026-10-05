import Link from "next/link";
import Seal from "./Seal";
import Icon, { type IconName } from "./Icon";
import { SITE_NAV } from "@/lib/siteNav";

const SERVICES: { href: string; label: string; icon: IconName }[] = [
  { href: "/apply", label: "অনলাইনে আবেদন", icon: "plus" },
  { href: "/track", label: "আবেদনের অবস্থা", icon: "search" },
  { href: "/offices", label: "নিকটস্থ কার্যালয়", icon: "pin" },
  { href: "/admin", label: "অ্যাডমিন প্রবেশ", icon: "lock" },
];

const CONTACT: { icon: IconName; k: string; v: string }[] = [
  { icon: "building", k: "অধিদপ্তর", v: "যুব উন্নয়ন অধিদপ্তর" },
  { icon: "shield", k: "মন্ত্রণালয়", v: "যুব ও ক্রীড়া মন্ত্রণালয়" },
  { icon: "clock", k: "সেবা সময়", v: "রবি–বৃহস্পতি, সকাল ৯টা – বিকেল ৫টা" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="wrap footer-grid">
        <div className="footer-col footer-brand">
          <Link href="/" className="brand">
            <Seal size={44} />
            <span className="brand-txt">
              <strong>বায়োগ্যাস সেবা পোর্টাল</strong>
              <span>যুব উন্নয়ন অধিদপ্তর</span>
            </span>
          </Link>
          <p>বর্জ্যকে সম্পদে রূপান্তরের মাধ্যমে গ্রামীণ পরিবারের জ্বালানি নিরাপত্তা ও কৃষি উন্নয়নে কারিগরি সহায়তা।</p>
          <div className="footer-badges">
            <span>
              <Icon name="map" size={15} />
              ৬৪ জেলায় সেবা
            </span>
            <span>
              <Icon name="leaf" size={15} />
              পরিবেশবান্ধব জ্বালানি
            </span>
          </div>
        </div>

        <nav className="footer-col" aria-label="তথ্য">
          <h4>তথ্য</h4>
          <ul className="footer-links">
            {SITE_NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>
                  <Icon name="chevron" size={14} />
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-label="সেবা">
          <h4>ই-সেবা</h4>
          <ul className="footer-links">
            {SERVICES.map((s) => (
              <li key={s.href}>
                <Link href={s.href}>
                  <Icon name="chevron" size={14} />
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h4>যোগাযোগ</h4>
          <ul className="footer-contact">
            {CONTACT.map((c) => (
              <li key={c.k}>
                <span className="fc-ic">
                  <Icon name={c.icon} size={16} />
                </span>
                <span>
                  <small>{c.k}</small>
                  {c.v}
                </span>
              </li>
            ))}
          </ul>
          <a href="tel:333" className="footer-hotline">
            <span className="fh-ic">
              <Icon name="phone" size={18} />
            </span>
            <span>
              <small>জাতীয় হেল্পলাইন</small>
              <b>৩৩৩</b>
            </span>
          </a>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span>© ২০২৬ বায়োগ্যাস সেবা পোর্টাল — গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</span>
        <span className="stamp">হিসাবগুলো আনুমানিক · চূড়ান্ত নির্ধারণ কারিগরি পরিদর্শনের পর</span>
        <a href="#" className="footer-top" aria-label="পাতার উপরে যান">
          <Icon name="up" size={16} />
        </a>
      </div>
    </footer>
  );
}
