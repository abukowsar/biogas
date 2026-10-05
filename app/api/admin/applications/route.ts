import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { validateApplicationInput, buildApplicationDoc, type ApplicationInput } from "@/lib/validateApplication";
import { APPLICATION_STATUSES, type ApplicationStatus } from "@/lib/applicationStatus";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "biogas");
    const docs = await db
      .collection("applications")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const applications = docs.map((d) => ({
      id: d._id.toString(),
      name: d.name,
      phone: d.phone,
      address: d.address,
      cattle: d.cattle,
      members: d.members,
      note: d.note,
      status: d.status,
      source: d.source || "public",
      createdAt: d.createdAt instanceof Date ? d.createdAt.toISOString() : d.createdAt,
    }));

    return NextResponse.json({ applications });
  } catch (err) {
    console.error("Failed to list applications:", err);
    return NextResponse.json(
      { error: "সার্ভার থেকে তালিকা আনা যায়নি" },
      { status: 502 }
    );
  }
}

export async function POST(req: NextRequest) {
  let body: Partial<ApplicationInput> & { status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "অবৈধ ফরম্যাট" }, { status: 400 });
  }

  const error = validateApplicationInput(body);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const status: ApplicationStatus = APPLICATION_STATUSES.includes(body.status as ApplicationStatus)
    ? (body.status as ApplicationStatus)
    : "pending";

  const doc = buildApplicationDoc(body as ApplicationInput, { status, source: "admin" });

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "biogas");
    const result = await db.collection("applications").insertOne(doc);
    return NextResponse.json({ id: result.insertedId.toString() }, { status: 201 });
  } catch (err) {
    console.error("Failed to save application:", err);
    return NextResponse.json(
      { error: "সার্ভারে সংরক্ষণ করা যায়নি, একটু পরে আবার চেষ্টা করুন।" },
      { status: 502 }
    );
  }
}
