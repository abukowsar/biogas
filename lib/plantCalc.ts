export type PlantSize = { v: number; cattle: string; fam: string; cost: number };

// ঘনমিটার গ্যাস / কেজি গোবর — মাঠপর্যায়ের প্রচলিত গড়
export const YIELD = 0.037;

// দৈনিক গোবরের ডিফল্ট ধরে নেওয়া পরিমাণ (কেজি/পশু), আবেদনে সংগ্রহ করা হয় না বলে
// পাবলিক ক্যালকুলেটরের ডিফল্ট স্লাইডার মান ব্যবহার করা হয় অনুমান হিসেবে
export const DEFAULT_DUNG_PER_CATTLE = 10;

export const SIZES: PlantSize[] = [
  { v: 1.6, cattle: "২–৩ টি", fam: "৩–৪ জন", cost: 38000 },
  { v: 2.0, cattle: "৩–৪ টি", fam: "৪–৫ জন", cost: 45000 },
  { v: 2.4, cattle: "৪–৫ টি", fam: "৫–৬ জন", cost: 52000 },
  { v: 3.2, cattle: "৬–৮ টি", fam: "৭–৯ জন", cost: 66000 },
  { v: 4.8, cattle: "৯–১২ টি", fam: "১০–১২ জন", cost: 88000 },
  { v: 6.0, cattle: "১৩+ টি", fam: "১৩+ জন", cost: 108000 },
];

// SIZES-এর মতো একই থ্রেশহোল্ড ব্যবহার করে প্রস্তাবিত প্ল্যান্ট আকারের ইনডেক্স বের করে —
// পাবলিক ক্যালকুলেটরের সুপারিশের সাথে সামঞ্জস্যপূর্ণ থাকার জন্য
export function pickPlantSizeIndex(cattle: number, dungPerCattle = DEFAULT_DUNG_PER_CATTLE): number {
  const gas = cattle * dungPerCattle * YIELD;
  for (let i = 0; i < SIZES.length; i++) {
    if (SIZES[i].v >= gas) return i;
  }
  return SIZES.length - 1;
}

// validate_palette.js --ordinal, surface #FFFFFF: monotone L, adjacent ΔL >= 0.06,
// light-end contrast 2.06:1, hue spread 9° — passes all four ordinal checks.
export const PLANT_SIZE_RAMP = ["#99bcb5", "#77a69c", "#599286", "#3d7f71", "#226d5d", "#075c4a"];
