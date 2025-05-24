import { createRecipe, getRecipes } from "@/api/services/Recipe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const newRecipe = req.body;
      const result = await createRecipe(newRecipe);
      res.status(201).json(result);
    } catch (error) {
      console.error("❌ Error POST /api/recipes:", error);
      res.status(500).json({ message: "Gabim gjatë krijimit të recetës." });
    }
  } else if (req.method === "GET") {
    try {
      const recipes = await getRecipes();
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: "Gabim gjatë marrjes së recetave." });
    }
  } else {
    res.status(405).json({ message: "Metoda e kërkesës nuk mbështetet." });
  }
}
