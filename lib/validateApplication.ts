import { isValidBdPhone, normalizeBdPhone, toAsciiDigits } from "./bdGeo";

export type ApplicationInput = {
  name: string;
  phone: string;
  address: string;
  cattle: string | number;
  members: string | number;
  note?: string;
};

export function validateApplicationInput(body: Partial<ApplicationInput>): string | null {
  if (!body.name || String(body.name).trim().length < 2) return "নাম দিন";
  if (!body.phone || !isValidBdPhone(normalizeBdPhone(String(body.phone))))
    return "সঠিক মোবাইল নম্বর দিন (০১ দিয়ে শুরু, ১১ সংখ্যা)";
  if (!body.address || String(body.address).trim().length < 3) return "ঠিকানা দিন";
  if (!body.cattle || Number(toAsciiDigits(String(body.cattle))) < 1) return "গবাদিপশুর সংখ্যা দিন";
  if (!body.members || Number(toAsciiDigits(String(body.members))) < 1) return "পরিবারের সদস্য সংখ্যা দিন";
  return null;
}

export function buildApplicationDoc(body: ApplicationInput, extra: { status: string; source: "public" | "admin" }) {
  return {
    name: String(body.name).trim(),
    phone: normalizeBdPhone(String(body.phone)),
    address: String(body.address).trim(),
    cattle: Number(toAsciiDigits(String(body.cattle))),
    members: Number(toAsciiDigits(String(body.members))),
    note: body.note?.trim() || "",
    status: extra.status,
    source: extra.source,
    createdAt: new Date(),
  };
}
