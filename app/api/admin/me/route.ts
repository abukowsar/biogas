import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifySessionCookieValue } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const sessionSecret = process.env.SESSION_SECRET;
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = sessionSecret ? await verifySessionCookieValue(token, sessionSecret) : null;
  if (!session) {
    return NextResponse.json({ error: "অনুমোদিত নয়" }, { status: 401 });
  }
  return NextResponse.json({ username: session.u });
}
