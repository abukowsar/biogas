import Link from "next/link";
import SiteNav from "./_components/SiteNav";
import SiteFooter from "./_components/SiteFooter";
import Icon from "./_components/Icon";

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main id="main" className="site-main">
        <div className="page-header">
          <div className="hero-bg" aria-hidden="true" />
          <div className="wrap narrow" style={{ textAlign: "center", padding: "48px 0 72px" }}>
            <span className="eyebrow">৪০৪</span>
            <h1 className="page-title">পাতাটি পাওয়া যায়নি</h1>
            <p className="page-lede" style={{ margin: "0 auto" }}>
              আপনি যে ঠিকানায় যেতে চেয়েছেন সেটি নেই বা সরিয়ে নেওয়া হয়েছে।
            </p>
            <div className="hero-cta" style={{ justifyContent: "center", marginTop: 26 }}>
              <Link href="/" className="btn lg">
                <Icon name="home" size={18} />
                হোমে ফিরুন
              </Link>
              <Link href="/apply" className="btn ghost lg">
                অনলাইনে আবেদন
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
