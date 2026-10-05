"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Icon, { type IconName } from "@/app/_components/Icon";

const NAV: { href: string; label: string; icon: IconName }[] = [
  { href: "/admin", label: "ড্যাশবোর্ড", icon: "grid" },
  { href: "/admin/applications", label: "আবেদনসমূহ", icon: "list" },
  { href: "/admin/users", label: "অ্যাডমিন ইউজার", icon: "users" },
];

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <span className="admin-logo" aria-hidden="true">
            <Icon name="flame" size={20} />
          </span>
          <div>
            <strong>বায়োগ্যাস অ্যাডমিন</strong>
            <span>আবেদন ব্যবস্থাপনা</span>
          </div>
        </div>
        <nav className="admin-sidebar-nav" aria-label="অ্যাডমিন নেভিগেশন">
          <span className="admin-nav-label">মেনু</span>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "on" : ""}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-foot">
          <Link href="/" className="admin-sidebar-public" title="পাবলিক সাইটে ফিরুন">
            <Icon name="back" size={17} />
            <span>পাবলিক সাইটে ফিরুন</span>
          </Link>
          <button type="button" className="admin-sidebar-logout" onClick={logout} title="লগআউট">
            <Icon name="logout" size={17} />
            <span>লগআউট</span>
          </button>
        </div>
      </aside>
      <div className="admin-content">{children}</div>
    </div>
  );
}
