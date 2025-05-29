import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import useFetch from "hooks/useFetch";
import { Recipe } from "@/api/models/Recipe";
import recetaImage from "@/assets/images/po.jpg";
import { useSession } from "next-auth/react";

export default function Recipes() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const router = useRouter();
  const { data: recipesData, loading, remove } = useFetch<Recipe[]>("/api/recipes");

  const handleDeleteRecipe = async (id: string) => {
    const confirmed = confirm("Are u sure u want to delete this recipe?");
    if (!confirmed) return;

    try {
      await remove(`/api/recipes/${id}`);
      alert("Recipe deleted successfully.");
      router.reload();
    } catch (error) {
      alert("Error while deleting recipe.");
      console.error(error);
    }
  };

  return (
    <div className="pt-12 bg-[#ffe6ea] min-h-screen">
      <div
        className="bg-cover bg-center h-[70vh] w-full flex flex-col items-start justify-center px-10"
        style={{ backgroundImage: `url(${recetaImage.src})` }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-pink-700 font-serif leading-tight tracking-tight">
          <span className="block">Scroll, choose,</span>
          <span className="block">and start baking magic.</span>
        </h1>

        <div className="flex justify-end pt-40 pr-40">
          <Link href="/events?category=cake">
            <button className="bg-gradient-to-r from-pink-500 to-pink-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out">
              🎉 Check Our Events!
            </button>
          </Link>
        </div>
      </div>

      <div className="py-16 px-8 max-w-[120rem] mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-[#4b2e2e] font-serif">Popular Recipes</h2>
          <Link href="/recipes/all">
            <p className="text-[#a5556c] cursor-pointer hover:underline">See all</p>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : recipesData && recipesData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {recipesData.map((recipe) => (
              <motion.div
                key={recipe._id}
                className="bg-white rounded-2xl overflow-hidden shadow-xl transition hover:shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-6 bg-[#f9f9f9]">
                  <h3 className="text-xl font-bold text-[#4b2e2e] mb-4 font-serif">
                    {recipe.title}
                  </h3>

                  <div className="text-left space-y-2 text-sm text-gray-700">
                    <p><span className="font-semibold text-[#a5556c]">Serving:</span> 1</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {recipe.body?.split('\n').map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  </div>

                  {isAdmin && (
                    <div className="flex justify-between mt-6">
                      <Link href={`/update/recipes/${recipe._id}`}>
                        <button className="px-4 py-2 bg-[#fbb6ce] text-white rounded-lg hover:bg-[#f78da7] transition text-sm">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteRecipe(recipe._id!)}
                        className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">There are no recipes in the database</p>
        )}

        {isAdmin && (
          <div className="text-center mt-12">
            <Link href="/create/recipe">
              <button className="px-6 py-3 bg-[#f78da7] text-white rounded-lg font-medium hover:bg-[#f57c9b] transition">
                Create a Recipe
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

Recipes.displayName = "Recipes | My Application";
