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
    <div className="pt-16 max-w-3xl mx-auto bg-pink-50 rounded-xl shadow-lg p-12">
      <h2 className="text-4xl font-extrabold mb-8 text-pink-700 text-center tracking-wide">
        Shto recetën e re
      </h2>

      <input
        type="text"
        placeholder="Titulli"
        value={newRecipe.title}
        onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
        className="w-full mb-6 px-6 py-4 border-4 border-pink-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-400 placeholder-pink-400 text-lg font-semibold transition"
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
        className="w-full mb-6"
      />

      {newRecipe.image && (
        <img
          src={newRecipe.image}
          alt="Preview"
          className="mb-6 w-full h-64 object-cover rounded-xl border-4 border-pink-200 shadow-lg"
        />
      )}

      <textarea
        placeholder="Përmbajtja"
        value={newRecipe.body}
        onChange={(e) => setNewRecipe({ ...newRecipe, body: e.target.value })}
        className="w-full mb-8 px-6 py-4 border-4 border-pink-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-400 placeholder-pink-400 text-lg font-semibold transition resize-none"
        rows={8}
      />

      <button
        onClick={handleCreate}
        className="w-full py-4 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition text-xl font-bold shadow-md shadow-pink-400/60"
      >
        Krijo Recetën
      </button>
    </div>
  );
}

CreateRecipe.displayName = "CreateRecipe | My Application";
