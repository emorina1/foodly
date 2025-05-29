import clientPromise from "@/lib/mongodb";

export async function getAllUsers() {
  const client = await clientPromise;
  const db = client.db(); // You can specify db name if needed: client.db("mydb")
  const users = await db.collection("users").find().toArray();
  return users;
}

export async function getTotalRecipes() {
  const client = await clientPromise;
  const db = client.db();
  const count = await db.collection("recipes").countDocuments();
  return count;
}
