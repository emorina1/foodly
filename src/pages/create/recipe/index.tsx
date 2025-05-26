import { useState } from "react";
import { useRouter } from "next/router";
import { Recipe } from "@/api/models/Recipe";
import useFetch from "hooks/useFetch";

export default function CreateRecipe() {
  const router = useRouter();
  const [newRecipe, setNewRecipe] = useState({ title: "", body: "", image: "" });
  const { post } = useFetch<Recipe[]>("/api/recipes");

  const handleCreate = async () => {
    if (!newRecipe.title || !newRecipe.body) {
      alert("Ju lutem plotësoni titullin dhe përmbajtjen.");
      return;
    }

    try {
      const result = await post(newRecipe);
      console.log("✅ Receta u krijua:", result);
      router.push("/recipes");
    } catch (error) {
      console.error("❌ Gabim gjatë krijimit:", error);
      alert("Gabim gjatë krijimit të recetës.");
    }
  };

  return (
    <div className="pt-12 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Shto recetën e re</h2>

      <input
        type="text"
        placeholder="Titulli"
        value={newRecipe.title}
        onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
        className="w-full mb-4 px-4 py-2 border rounded"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          const formData = new FormData();
          formData.append("image", file);

          fetch("/api/upload", {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.url) {
                setNewRecipe((prev) => ({ ...prev, image: data.url }));
              } else {
                alert("Upload dështoi: " + (data.error || "Gabim i panjohur"));
              }
            })
            .catch((err) => {
              console.error("Gabim gjatë upload-it:", err);
              alert("Gabim gjatë ngarkimit të fotos.");
            });
        }}
        className="w-full mb-4"
      />

      {newRecipe.image && (
        <img src={newRecipe.image} alt="Preview" className="mb-4 w-full h-48 object-cover rounded" />
      )}

      <textarea
        placeholder="Përmbajtja"
        value={newRecipe.body}
        onChange={(e) => setNewRecipe({ ...newRecipe, body: e.target.value })}
        className="w-full mb-4 px-4 py-2 border rounded"
        rows={6}
      />

      <button
        onClick={handleCreate}
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Krijo Recetën
      </button>
    </div>
  );
}

CreateRecipe.displayName = "CreateRecipe | My Application";
