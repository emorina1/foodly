import clientPromise from "@/lib/mongodb";
import { Message } from "@/api/models/Message";

export async function createMessage(data: Message) {
  const client = await clientPromise;
  const db = client.db("myapp");

  const result = await db.collection("messages").insertOne({
    ...data,
    createdAt: new Date(),
  });

  return result;
}
