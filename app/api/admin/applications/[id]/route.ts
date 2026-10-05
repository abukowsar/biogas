import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { APPLICATION_STATUSES } from "@/lib/applicationStatus";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "অবৈধ আইডি" }, { status: 400 });
  }

  let body: { status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "অবৈধ অনুরোধ" }, { status: 400 });
  }

  if (!body.status || !APPLICATION_STATUSES.includes(body.status as never)) {
    return NextResponse.json({ error: "অবৈধ স্ট্যাটাস" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "biogas");
    const result = await db
      .collection("applications")
      .updateOne({ _id: new ObjectId(id) }, { $set: { status: body.status } });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "আবেদন পাওয়া যায়নি" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to update application:", err);
    return NextResponse.json({ error: "হালনাগাদ করা যায়নি" }, { status: 502 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "অবৈধ আইডি" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "biogas");
    const result = await db.collection("applications").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "আবেদন পাওয়া যায়নি" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to delete application:", err);
    return NextResponse.json({ error: "মুছে ফেলা যায়নি" }, { status: 502 });
  }
}
