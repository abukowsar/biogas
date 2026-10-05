import Link from "next/link";
import Icon from "./Icon";

export default function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-header">
      <div className="hero-bg" aria-hidden="true" />
      <div className="wrap">
        <nav className="crumbs" aria-label="অবস্থান">
          <Link href="/">হোম</Link>
          <Icon name="chevron" size={14} />
          <span aria-current="page">{title}</span>
        </nav>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="page-title">{title}</h1>
        {lede && <p className="page-lede">{lede}</p>}
        {children}
      </div>
    </div>
  );
}

// প্রতিটি পাতার শেষে পরের ধাপের দিকে নেওয়ার ব্যানার
export function CtaBand({
  title = "আপনার বাড়িতে বায়োগ্যাস প্ল্যান্ট চান?",
  text = "অনলাইনে আবেদন করুন — উপজেলা কার্যালয় থেকে আপনার সঙ্গে যোগাযোগ করা হবে।",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="cta-section">
      <div className="wrap">
        <div className="cta-band">
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="cta-actions">
            <Link href="/apply" className="btn lg on-deep">
              আবেদন করুন
              <Icon name="arrow" size={18} />
            </Link>
            <a href="tel:333" className="btn lg ghost-deep">
              <Icon name="phone" size={18} />
              ৩৩৩-এ কল
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
