import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, ROOT_USERNAME, createSessionCookieValue } from "@/lib/adminAuth";
import { normalizeUsername, verifyAdminUserPassword } from "@/lib/adminUsers";

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.SESSION_SECRET;
  if (!adminPassword || !sessionSecret) {
    return NextResponse.json(
      { error: "সার্ভারে ADMIN_PASSWORD/SESSION_SECRET সেট করা নেই" },
      { status: 500 }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "অবৈধ অনুরোধ" }, { status: 400 });
  }

  const username = normalizeUsername(body.username || "");
  const password = body.password || "";
  if (!password) {
    return NextResponse.json({ error: "পাসওয়ার্ড সঠিক নয়" }, { status: 401 });
  }

  let loginAs: string | null = null;

  if (!username || username === ROOT_USERNAME) {
    if (password === adminPassword) loginAs = ROOT_USERNAME;
  } else {
    const ok = await verifyAdminUserPassword(username, password).catch(() => false);
    if (ok) loginAs = username;
  }

  if (!loginAs) {
    return NextResponse.json({ error: "পাসওয়ার্ড সঠিক নয়" }, { status: 401 });
  }

  const token = await createSessionCookieValue(loginAs, sessionSecret);
  const res = NextResponse.json({ ok: true, username: loginAs });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
