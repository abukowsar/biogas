// ঠিকানা একটি মুক্ত-টেক্সট ফিল্ড (ফর্মে placeholder: "গ্রাম, উপজেলা, জেলা"), তাই এখানে
// "জেলা" শব্দের পরের অংশ ধরে জেলার নাম আন্দাজ করা হয় — নিখুঁত নয়, কিন্তু কাঠামোগত
// ঠিকানা ফিল্ড ছাড়া এটাই ব্যবহারযোগ্য সবচেয়ে ভালো উপায়।
export function extractDistrict(address: string): string {
  // "উপজেলা" ends in "জেলা" too — a plain match grabs the upazila instead of the
  // district, so the lookbehind excludes any "জেলা" immediately preceded by "উপ".
  const match = address.match(/(?<!উপ)জেলা\s*[:：]?\s*([^,،|]+)/);
  if (!match) return "অজানা";
  const name = match[1].trim().replace(/[.।]+$/, "");
  return name || "অজানা";
}
