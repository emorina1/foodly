import { Recipe } from "@/api/models/Recipe";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UpdateRecipe() {
  const router = useRouter();
  const { id } = router.query;

  const [newRecipe, setNewRecipe] = useState({ title: "", body: "" });

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
    await put(newRecipe);
    router.push("/recipes");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
        <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-black text-2xl font-semibold mb-4">
            Update Recipe
          </h2>
          <input
            type="text"
            placeholder="Title"
            value={newRecipe.title}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, title: e.target.value })
            }
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />
          <textarea
            placeholder="Content"
            value={newRecipe.body}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, body: e.target.value })
            }
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Update Recipe
          </button>
        </div>
      </div>
    </div>
  );
}

UpdateRecipe.displayName = "Update Recipe | My Application";
