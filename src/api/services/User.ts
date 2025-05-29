import clientPromise from "@/lib/mongodb";
import { User } from "@/api/models/User";
import { ObjectId } from "mongodb";

export async function createUser(data: User) {
  const client = await clientPromise;
  const db = client.db("myapp");
  return await db.collection("users").insertOne({ ...data, createdAt: new Date() });
}

export async function getUserByEmail(email: string) {
  const client = await clientPromise;
  const db = client.db("myapp");
  return await db.collection("users").findOne({ email });
}

export async function getUserById(id: string) {
  const client = await clientPromise;
  const db = client.db("myapp");
  return await db.collection("users").findOne({ _id: new ObjectId(id) });
}
