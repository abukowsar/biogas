import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { deleteAdminUser } from "@/lib/adminUsers";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "অবৈধ আইডি" }, { status: 400 });
  }

  try {
    const deleted = await deleteAdminUser(id);
    if (!deleted) {
      return NextResponse.json({ error: "ইউজার পাওয়া যায়নি" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to delete admin user:", err);
    return NextResponse.json({ error: "মুছে ফেলা যায়নি" }, { status: 502 });
  }
}
