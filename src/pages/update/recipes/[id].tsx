import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Recipe } from "@/api/models/Recipe";
import useFetch from "hooks/useFetch";

export default function UpdateRecipe() {
  const router = useRouter();
  const { id } = router.query;

  const [newRecipe, setNewRecipe] = useState({ title: "", body: "" });
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    data: existingRecipe,
    loading,
    put,
  } = useFetch<Recipe>(id ? `/api/recipes/${id}` : "");

  useEffect(() => {
    if (existingRecipe) {
      setNewRecipe({
        title: existingRecipe.title,
        body: existingRecipe.body,
      });
    }
  }, [existingRecipe]);

  const handleUpdate = async () => {
    if (!newRecipe.title || !newRecipe.body || !id) return;

    try {
      setIsUpdating(true);
      await put(newRecipe);
      router.push("/recipes");
    } catch (err) {
      console.error("Error while updating recipe:", err);
      alert("An error occurred while updating the recipe.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!id || loading)
    return (
      <p className="text-center mt-10 text-pink-600 font-semibold text-xl animate-pulse">
        Loading...
      </p>
    );

  return (
    <>
      <Head>
        <title>Update Recipe | My Application</title>
      </Head>

      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 py-12 px-4">
        <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-xl space-y-6">
          <h1 className="text-3xl font-bold text-center text-pink-700">Update Recipe</h1>

          <div className="space-y-4">
            <label className="block">
              <span className="text-pink-700 font-medium">Title</span>
              <input
                type="text"
                value={newRecipe.title}
                onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
                className="mt-1 w-full border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800"
                placeholder="Recipe title..."
              />
            </label>

            <label className="block">
              <span className="text-pink-700 font-medium">Content</span>
              <textarea
                value={newRecipe.body}
                onChange={(e) => setNewRecipe({ ...newRecipe, body: e.target.value })}
                className="mt-1 w-full border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800 resize-none"
                rows={6}
                placeholder="Write the recipe steps..."
              />
            </label>
          </div>

          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className={`w-full py-3 rounded-xl text-white font-semibold text-xl shadow-md transition-all ${
              isUpdating
                ? "bg-pink-300 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700 active:bg-pink-800"
            }`}
          >
            {isUpdating ? "Updating..." : "Update Recipe"}
          </button>
        </div>
      </section>
    </>
  );
}

UpdateRecipe.displayName = "Update Recipe | My Application";
