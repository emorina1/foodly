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
      alert("Please fill in the title and content.");
      return;
    }

    try {
      const result = await post(newRecipe);
      console.log("✅ Recipe created:", result);
      router.push("/recipes");
    } catch (error) {
      console.error("❌ Error while creating recipe:", error);
      alert("An error occurred while creating the recipe.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 py-12 px-4">
      <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-pink-700">Create a New Recipe</h1>

        <div className="space-y-4">
          <label className="block">
            <span className="text-pink-700 font-medium">Title</span>
            <input
              type="text"
              value={newRecipe.title}
              onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
              className="mt-1 w-full border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800"
              placeholder="Delicious chocolate cake..."
            />
          </label>

          <label className="block">
            <span className="text-pink-700 font-medium">Image</span>
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
                      alert("Upload failed: " + (data.error || "Unknown error"));
                    }
                  })
                  .catch((err) => {
                    console.error("Upload error:", err);
                    alert("An error occurred while uploading the image.");
                  });
              }}
              className="mt-1 w-full text-sm text-gray-600"
            />
          </label>

          {newRecipe.image && (
            <img
              src={newRecipe.image}
              alt="Preview"
              className="rounded-xl w-full h-64 object-cover border border-pink-300"
            />
          )}

          <label className="block">
            <span className="text-pink-700 font-medium">Content</span>
            <textarea
              value={newRecipe.body}
              onChange={(e) => setNewRecipe({ ...newRecipe, body: e.target.value })}
              className="mt-1 w-full border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800 resize-none"
              rows={6}
              placeholder="Write the recipe steps here..."
            ></textarea>
          </label>
        </div>

        <button
          onClick={handleCreate}
          className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-all shadow-md"
        >
          Create Recipe
        </button>
      </div>
    </section>
  );
}

CreateRecipe.displayName = "CreateRecipe | My Application";
