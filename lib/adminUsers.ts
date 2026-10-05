import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { hashPassword, verifyPassword } from "@/lib/passwordHash";
import { ROOT_USERNAME } from "@/lib/adminAuth";

export type AdminUser = {
  id: string;
  username: string;
  createdAt: string;
};

async function collection() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || "biogas");
  return db.collection("adminUsers");
}

export function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}

export async function listAdminUsers(): Promise<AdminUser[]> {
  const col = await collection();
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map((d) => ({
    id: d._id.toString(),
    username: d.username,
    createdAt: d.createdAt instanceof Date ? d.createdAt.toISOString() : d.createdAt,
  }));
}

export async function createAdminUser(username: string, password: string) {
  const normalized = normalizeUsername(username);
  if (normalized === ROOT_USERNAME) {
    throw new Error(`"${ROOT_USERNAME}" সংরক্ষিত — অন্য ইউজারনেম দিন`);
  }
  const col = await collection();
  const existing = await col.findOne({ username: normalized });
  if (existing) {
    throw new Error("এই ইউজারনেম ইতিমধ্যে ব্যবহৃত হয়েছে");
  }
  const passwordHash = await hashPassword(password);
  const result = await col.insertOne({ username: normalized, passwordHash, createdAt: new Date() });
  return result.insertedId.toString();
}

export async function deleteAdminUser(id: string) {
  const col = await collection();
  const result = await col.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

export async function verifyAdminUserPassword(username: string, password: string): Promise<boolean> {
  const col = await collection();
  const doc = await col.findOne({ username: normalizeUsername(username) });
  if (!doc) return false;
  return verifyPassword(password, doc.passwordHash);
}
