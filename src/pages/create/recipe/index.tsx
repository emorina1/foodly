import { Recipe } from "@/api/models/Recipe";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateRecipe() {
  const router = useRouter();
  const [newRecipe, setNewRecipe] = useState({ title: "", body: "" });
  const { post } = useFetch<Recipe[]>("/api/recipes");

  const handleCreate = async () => {
    if (!newRecipe.title || !newRecipe.body) return;

    try {
      const result = await post(newRecipe);
      console.log("✅ Receta u dërgua:", result);
      setNewRecipe({ title: "", body: "" });
      router.push("/recipes");
    } catch (error) {
      console.error("❌ Gabim gjatë krijimit:", error);
      alert("Gabim gjatë krijimit të recetës.");
    }
  };

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
        <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-black text-2xl font-semibold mb-4">Shto recetën e re</h2>
          <input
            type="text"
            placeholder="Titulli"
            value={newRecipe.title}
            onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />
          <textarea
            placeholder="Përmbajtja"
            value={newRecipe.body}
            onChange={(e) => setNewRecipe({ ...newRecipe, body: e.target.value })}
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />
          <button
            onClick={handleCreate}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Shto Recetën
          </button>
        </div>
      </div>
    </div>
  );
}

CreateRecipe.displayName = "CreateRecipe | My Application";
