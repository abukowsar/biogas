import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { normalizeBdPhone } from "@/lib/bdGeo";

// রেফারেন্স নম্বর ও মোবাইল নম্বর দুটোই মিললে তবেই অবস্থা দেখানো হয় —
// শুধু রেফারেন্স দিয়ে অন্যের আবেদনের তথ্য দেখা যাবে না
export async function POST(req: NextRequest) {
  let body: { ref?: string; phone?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "অবৈধ ফরম্যাট" }, { status: 400 });
  }

  const ref = String(body.ref || "").trim().toLowerCase();
  const phone = normalizeBdPhone(String(body.phone || ""));
  if (!ObjectId.isValid(ref) || ref.length !== 24) {
    return NextResponse.json({ error: "রেফারেন্স নম্বরটি সঠিক নয়" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "biogas");
    const doc = await db.collection("applications").findOne({ _id: new ObjectId(ref), phone });
    if (!doc) {
      return NextResponse.json(
        { error: "এই রেফারেন্স ও মোবাইল নম্বরে কোনো আবেদন পাওয়া যায়নি" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      name: String(doc.name),
      status: doc.status,
      createdAt: doc.createdAt,
    });
  } catch (err) {
    console.error("Failed to track application:", err);
    return NextResponse.json({ error: "সার্ভারের সঙ্গে সংযোগ করা যায়নি" }, { status: 502 });
  }
}
