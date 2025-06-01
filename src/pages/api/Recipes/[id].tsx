import { getRecipe, updateRecipe, deleteRecipe } from "@/api/services/Recipe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    switch (method) {
      case "GET":
        const recipe = await getRecipe(id);
        if (!recipe) {
          return res.status(404).json({ message: "Recipe not found" });
        }
        return res.status(200).json(recipe);

      case "PUT":
        const updated = await updateRecipe(id, req.body);
        return res.status(200).json({ message: "Recipe updated", result: updated });

      case "DELETE":
        const deleted = await deleteRecipe(id);
        return res.status(200).json({ message: "Recipe deleted", result: deleted });

      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("❌ API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
