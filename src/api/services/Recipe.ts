import clientPromise from "@/lib/mongodb";
import { Recipe } from "@/api/models/Recipe";
import { ObjectId } from "mongodb";

export async function createRecipe(data: Recipe) {
  try {
    const client = await clientPromise;
    const db = client.db("myapp");

    const { _id, ...rest } = data;
    const result = await db.collection("recipes").insertOne({
    ...rest,
  createdAt: new Date(),
});


    return result;
  } catch (error) {
    console.error("❌ Error in createRecipe():", error); // 👈 LOG THIS TOO
    throw error;
  }
}


export async function getRecipes() {
  try {
    const client = await clientPromise;
    const db = client.db("myapp");
    const recipes = await db
      .collection("recipes")
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    return recipes;
  } catch (error) {
    console.error("❌ Error in getRecipes():", error); // 👈 LOG THIS
    throw error;
  }
}


export async function getRecipe(id: string){
    const client = await clientPromise;
    const db = client.db("myapp");
    const recipes = await db.collection("recipes").findOne({ _id: new ObjectId(id)});
    return recipes;
}

export async function updateRecipe(id: string, data: Recipe) {
    const client = await clientPromise;
    const db = client.db("myapp");
    const recipes = await db
        .collection("recipes")
        .updateOne({ _id: new ObjectId(id) }, { $set: data });
    return recipes;
}

export async function deleteRecipes(id: string){
    const client = await clientPromise;
    const db = client.db("myapp");
    const recipes = await db
    .collection("recipes").deleteOne({_id: new ObjectId(id) });
    return recipes;
}