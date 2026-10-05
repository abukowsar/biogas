"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon, { type IconName } from "./Icon";
import Seal from "./Seal";
import { SITE_NAV } from "@/lib/siteNav";

const TABS: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "হোম", icon: "home" },
  { href: "/calculator", label: "হিসাব", icon: "gauge" },
  { href: "/apply", label: "আবেদন", icon: "plus" },
  { href: "/track", label: "অবস্থা", icon: "search" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ড্রয়ার খোলা থাকলে Esc চাপলে বন্ধ, আর পেছনের পাতা স্ক্রল বন্ধ
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <div className="govstrip">
        <div className="wrap">
          <span>
            গণপ্রজাতন্ত্রী বাংলাদেশ সরকার <i aria-hidden="true">•</i> <b>যুব ও ক্রীড়া মন্ত্রণালয়</b>
          </span>
          <span className="docket">হেল্পলাইন ৩৩৩</span>
        </div>
      </div>

      <header className={`masthead${scrolled ? " scrolled" : ""}`}>
        <div className="wrap">
          <Link href="/" className="brand" aria-label="বায়োগ্যাস সেবা পোর্টাল — হোম" onClick={close}>
            <Seal />
            <span className="brand-txt">
              <strong>বায়োগ্যাস সেবা পোর্টাল</strong>
              <span>যুব উন্নয়ন অধিদপ্তর</span>
            </span>
          </Link>
          <nav className="mast" aria-label="প্রধান নেভিগেশন">
            {SITE_NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={isActive(pathname, n.href) ? "on" : ""}
                aria-current={isActive(pathname, n.href) ? "page" : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mast-actions">
            <Link href="/track" className="btn ghost sm hide-md">
              আবেদনের অবস্থা
            </Link>
            <Link href="/apply" className="btn sm hide-sm">
              আবেদন করুন
            </Link>
            <button
              type="button"
              className="menu-btn"
              aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
              aria-expanded={menuOpen}
              aria-controls="mobileNav"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobileNav"
        className={`drawer${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="drawer-backdrop" onClick={close} />
        <nav className="drawer-panel" aria-label="মোবাইল মেনু">
          <div className="drawer-head">
            <span>সব পাতা</span>
            <button type="button" className="menu-btn" aria-label="মেনু বন্ধ করুন" onClick={close}>
              <Icon name="close" />
            </button>
          </div>
          <div className="drawer-grid">
            {[{ href: "/", label: "হোম", icon: "home" as IconName }, ...SITE_NAV, { href: "/track", label: "আবেদনের অবস্থা", icon: "search" as IconName }].map(
              (n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className={isActive(pathname, n.href) ? "on" : ""}
                  onClick={close}
                >
                  <span className="drawer-ic">
                    <Icon name={n.icon} size={20} />
                  </span>
                  {n.label}
                </Link>
              )
            )}
          </div>
          <Link href="/apply" className="btn lg drawer-cta" onClick={close}>
            অনলাইনে আবেদন করুন
            <Icon name="arrow" size={18} />
          </Link>
          <a href="tel:333" className="drawer-call">
            <Icon name="phone" size={18} />
            সহায়তার জন্য কল করুন <b>৩৩৩</b>
          </a>
        </nav>
      </div>

      <nav className="tabbar" aria-label="দ্রুত নেভিগেশন">
        {TABS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={`${isActive(pathname, t.href) ? "on" : ""}${t.href === "/apply" ? " tab-cta" : ""}`}
            aria-current={isActive(pathname, t.href) ? "page" : undefined}
            onClick={close}
          >
            <span className="tab-ic">
              <Icon name={t.icon} size={t.href === "/apply" ? 24 : 21} />
            </span>
            <span>{t.label}</span>
          </Link>
        ))}
        <button type="button" className={menuOpen ? "on" : ""} onClick={() => setMenuOpen((o) => !o)}>
          <span className="tab-ic">
            <Icon name="menu" size={21} />
          </span>
          <span>আরও</span>
        </button>
      </nav>
    </>
  );
}
