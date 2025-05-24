import { deleteRecipes, getRecipe, updateRecipe } from "@/api/services/Recipe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const recipe = await getRecipe(id as string);
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ message: "Gabim gjatë marrjes së recetës." });
    }
  } else if (req.method === "PUT") {
    try {
      const newRecipe = req.body;
      const result = await updateRecipe(id as string, newRecipe);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Gabim gjatë përditësimit të recetës." });
    }
  } else if (req.method === "DELETE") {
    try {
      const result = await deleteRecipes(id as string);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Gabim gjatë fshirjes së recetës." });
    }
  } else {
    res.status(405).json({ message: "Metoda nuk mbështetet." });
  }
}
