const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBn(n: number | string) {
  return String(n).replace(/[0-9]/g, (d) => bn[+d]);
}

export function fmt(n: number, dec = 0) {
  const s = Number(n).toFixed(dec);
  const p = s.split(".");
  p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return toBn(p.join("."));
}

const MONTHS_BN = [
  "জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন",
  "জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর",
];

export function fmtDateBn(iso: string) {
  const d = new Date(iso);
  return `${toBn(d.getDate())} ${MONTHS_BN[d.getMonth()]} ${toBn(d.getFullYear())}`;
}

export function dateKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function fmtDateShortBn(iso: string) {
  const d = new Date(iso);
  return `${toBn(d.getDate())}/${toBn(d.getMonth() + 1)}`;
}
