// services/Product.ts
import clientPromise from "@/lib/mongodb";
import { Product } from "@/api/models/Product";
import { ObjectId } from "mongodb";

export async function createProduct(data: Product) {
  try {
    const client = await clientPromise;
    const db = client.db("myapp");

    const { _id, ...rest } = data;
    const result = await db.collection("products").insertOne({
      ...rest,
      createdAt: new Date(),
    });

    return result;
  } catch (error) {
    console.error("❌ Error in createProduct():", error);
    throw error;
  }
}

export async function getProducts() {
  try {
    const client = await clientPromise;
    const db = client.db("myapp");
    const products = await db
      .collection("products")
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    return products;
  } catch (error) {
    console.error("❌ Error in getProducts():", error);
    throw error;
  }
}

export async function getProduct(id: string) {
  const client = await clientPromise;
  const db = client.db("myapp");
  const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
  return product;
}

export async function updateProduct(id: string, data: Product) {
  const client = await clientPromise;
  const db = client.db("myapp");
  const product = await db
    .collection("products")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
  return product;
}

export async function deleteProduct(id: string) {
  const client = await clientPromise;
  const db = client.db("myapp");
  const product = await db
    .collection("products")
    .deleteOne({ _id: new ObjectId(id) });
  return product;
}
