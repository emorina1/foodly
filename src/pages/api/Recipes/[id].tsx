import { deleteRecipes, getRecipe, updateRecipe } from "@/api/services/Recipe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "ID e recetës nuk është e vlefshme." });
  }

  try {
    switch (req.method) {
      case "GET":
        const recipe = await getRecipe(id);
        if (!recipe) {
          return res.status(404).json({ message: "Receta nuk u gjet." });
        }
        return res.status(200).json(recipe);

      case "PUT":
        const updatedRecipe = req.body;
        const updated = await updateRecipe(id, updatedRecipe);
        return res.status(200).json(updated);

      case "DELETE":
        const deleted = await deleteRecipes(id);
        return res.status(200).json(deleted);

      default:
        return res.status(405).json({ message: "Metoda e kërkesës nuk është e mbështetur." });
    }
  } catch (error) {
    console.error("❌ Error në /api/recipes/[id]:", error);
    return res.status(500).json({ message: "Gabim serveri gjatë përpunimit të recetës." });
  }
}
