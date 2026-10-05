import { NextRequest, NextResponse } from "next/server";
import { listAdminUsers, createAdminUser } from "@/lib/adminUsers";

export async function GET() {
  try {
    const users = await listAdminUsers();
    return NextResponse.json({ users });
  } catch (err) {
    console.error("Failed to list admin users:", err);
    return NextResponse.json({ error: "তালিকা আনা যায়নি" }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "অবৈধ অনুরোধ" }, { status: 400 });
  }

  const username = (body.username || "").trim();
  const password = body.password || "";
  if (username.length < 3) {
    return NextResponse.json({ error: "ইউজারনেম কমপক্ষে ৩ অক্ষরের হতে হবে" }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে" }, { status: 400 });
  }

  try {
    const id = await createAdminUser(username, password);
    return NextResponse.json({ id }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "অ্যাডমিন যোগ করা যায়নি";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
