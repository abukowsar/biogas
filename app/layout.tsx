import type { Metadata, Viewport } from "next";
import { Manrope, Hind_Siliguri, Geist_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "বায়োগ্যাস সেবা পোর্টাল | যুব উন্নয়ন অধিদপ্তর",
    template: "%s | বায়োগ্যাস সেবা পোর্টাল",
  },
  applicationName: "বায়োগ্যাস সেবা পোর্টাল",
  formatDetection: { telephone: false },
  description:
    "বায়োগ্যাস প্ল্যান্ট স্থাপনে কারিগরি সহায়তা, খরচ হিসাব ও আবেদন প্রক্রিয়া — যুব উন্নয়ন অধিদপ্তর।",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7FAF8" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1512" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="bn"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${hindSiliguri.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
