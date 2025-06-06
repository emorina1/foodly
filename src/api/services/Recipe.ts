import clientPromise from "@/lib/mongodb";
import { Recipe } from "@/api/models/Recipe";
import { ObjectId } from "mongodb";

export async function createRecipe(data: Omit<Recipe, '_id'>) {
  try {
    const client = await clientPromise;
    const db = client.db("myapp");

    const result = await db.collection("recipes").insertOne({
      ...data,
      createdAt: new Date(),
    });

    return result;
  } catch (error) {
    console.error("❌ Error in createRecipe():", error);
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
    console.error("❌ Error in getRecipes():", error);
    throw error;
  }
}

export async function getRecipe(id: string) {
    const client = await clientPromise;
    const db = client.db("myapp");
    const recipe = await db.collection("recipes").findOne({ _id: new ObjectId(id) });
    return recipe;
  } 

export async function updateRecipe(id: string, data: Recipe) {
    const client = await clientPromise;
    const db = client.db("myapp");
    const result = await db
      .collection("recipes")
      .updateOne({ _id: new ObjectId(id) }, { $set: data });
    return result;
  } 
    
export async function deleteRecipe(id: string) {
    const client = await clientPromise;
    const db = client.db("myapp");

    const result = await db
      .collection("recipes")
      .deleteOne({ _id: new ObjectId(id) });

    return result;
  } 
export async function getTotalRecipes() {
  try {
    const client = await clientPromise;
    const db = client.db("myapp");
    const count = await db.collection("recipes").countDocuments();
    return count;
  } catch (error) {
    console.error("❌ Error in getTotalRecipes():", error);
    throw error;
  }
}
