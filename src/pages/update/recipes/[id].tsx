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

      <div className="pt-24 bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-12">
          <h2 className="text-pink-700 text-4xl font-extrabold mb-8 text-center tracking-wide drop-shadow-md">
            Përditëso Recetën
          </h2>

          <input
            type="text"
            placeholder="Titulli"
            value={newRecipe.title}
            onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
            className="w-full mb-8 px-8 py-5 border-4 border-pink-300 rounded-2xl focus:outline-none focus:ring-6 focus:ring-pink-400 placeholder-pink-400 text-pink-700 font-semibold text-2xl shadow-inner transition duration-300"
          />

          <textarea
            placeholder="Përmbajtja"
            value={newRecipe.body}
            onChange={(e) => setNewRecipe({ ...newRecipe, body: e.target.value })}
            className="w-full mb-10 px-8 py-6 border-4 border-pink-300 rounded-2xl focus:outline-none focus:ring-6 focus:ring-pink-400 placeholder-pink-400 text-pink-700 font-semibold text-2xl shadow-inner resize-none transition duration-300"
            rows={10}
          />

          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className={`w-full py-6 rounded-3xl text-white text-3xl font-extrabold shadow-lg shadow-pink-500/70 transition duration-300 ${
              isUpdating
                ? "bg-pink-300 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700 active:bg-pink-800"
            }`}
            aria-label="Përditëso Recetën"
          >
            {isUpdating ? "Duke u përditësuar..." : "Përditëso Recetën"}
          </button>
        </div>
      </div>
    </>
  );
}
