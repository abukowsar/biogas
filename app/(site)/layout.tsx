import SiteNav from "../_components/SiteNav";
import SiteFooter from "../_components/SiteFooter";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        মূল বিষয়ে যান
      </a>
      <SiteNav />
      <main id="main" className="site-main">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
