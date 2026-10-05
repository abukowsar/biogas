import type { IconName } from "@/app/_components/Icon";

export const SITE_NAV: { href: string; label: string; icon: IconName }[] = [
  { href: "/calculator", label: "হিসাব", icon: "gauge" },
  { href: "/benefits", label: "সুবিধা", icon: "sprout" },
  { href: "/process", label: "প্রক্রিয়া", icon: "list" },
  { href: "/cost", label: "খরচ ও ঋণ", icon: "wallet" },
  { href: "/faq", label: "প্রশ্নোত্তর", icon: "chat" },
  { href: "/offices", label: "কার্যালয়", icon: "pin" },
];
