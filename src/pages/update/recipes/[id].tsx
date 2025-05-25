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
    error,
  } = useFetch<Recipe>(id ? `/api/recipes/${id}` : "");

  // Mbush formën me të dhënat ekzistuese
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
      console.error("Gabim gjatë përditësimit:", err);
      alert("Gabim gjatë përditësimit të recetës.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!id || loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <Head>
        <title>Update Recipe | My Application</title>
      </Head>

      <div className="pt-12">
        <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
          <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-black text-2xl font-semibold mb-4">
              Përditëso Recetën
            </h2>

            <input
              type="text"
              placeholder="Titulli"
              value={newRecipe.title}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, title: e.target.value })
              }
              className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
            />

            <textarea
              placeholder="Përmbajtja"
              value={newRecipe.body}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, body: e.target.value })
              }
              className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
            />

            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className={`px-6 py-2 rounded-xl text-white transition ${
                isUpdating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isUpdating ? "Duke u përditësuar..." : "Përditëso Recetën"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
