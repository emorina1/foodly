import { createRecipe, getRecipes } from "@/api/services/Recipe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const recipes = await getRecipes();
      res.status(200).json(recipes);

    } else if (req.method === "POST") {
      const newRecipe = req.body;
      const result = await createRecipe(newRecipe);
      res.status(201).json(result);

    } else {
      res.status(405).json({ message: "Metoda e kërkesës nuk është e mbështetur." });
    }
  } catch (error) {
    console.error("❌ Error në /api/recipes:", error);
    res.status(500).json({ message: "Gabim serveri gjatë përpunimit të recetave." });
  }
}
