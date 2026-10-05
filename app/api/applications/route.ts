import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { validateApplicationInput, buildApplicationDoc, type ApplicationInput } from "@/lib/validateApplication";

export async function POST(req: NextRequest) {
  let body: Partial<ApplicationInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "অবৈধ ফরম্যাট" }, { status: 400 });
  }

  const error = validateApplicationInput(body);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const doc = buildApplicationDoc(body as ApplicationInput, { status: "pending", source: "public" });

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
