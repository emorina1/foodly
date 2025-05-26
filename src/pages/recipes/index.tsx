import { CircularProgress } from "@mui/material";
import useFetch from "hooks/useFetch";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Recipe } from "@/api/models/Recipe";
import { useRouter } from "next/router";
import recetaImage from "@/assets/images/i.png"; // Vetëm një foto

export interface Post {
  id: string;
  title: string;
  body: string;
}

export default function Recipes() {
  const { data: initialPosts, loading } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  const handleDelete = (id: string) => {
    if (posts) {
      setPosts(posts?.filter((post) => post.id !== id));
    }
  };

  const router = useRouter();
  const { data: recipesData, loading: recipesLoading, remove } = useFetch<Recipe[]>("/api/recipes");

  const handleDeleteRecipe = async (id: string) => {
    const confirmed = confirm("A jeni i sigurt që dëshironi ta fshini këtë recetë?");
    if (!confirmed) return;

    try {
      await remove(`/api/recipes/${id}`);
      alert("Receta u fshi me sukses.");
      router.reload();
    } catch (error) {
      alert("Gabim gjatë fshirjes së recetës.");
      console.error(error);
    }
  };

  return (

  <div className="pt-12 bg-[#ffe6ea] min-h-screen">
  {/* Hero Section - Static Image */}
  <div
    className="bg-cover bg-center h-[70vh] w-full flex items-center justify-start px-10"
    style={{ backgroundImage: `url(${recetaImage.src})` }}
  >
<div className="flex justify-end" style={{ paddingTop: '20rem', paddingRight: '10rem' }}>
  <button className="ml-4 në ml-6 ose ml-25 px-8 py-4 bg-[#f78da7] text-white text-lg rounded-xl font-semibold hover:bg-[#f57c9b] transition shadow-lg">
    Get Started
  </button>
</div>




  </div>





      

      {/* Recipes Grid */}
      <div className="py-16 px-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto mb-10">
          <h2 className="text-4xl font-bold text-[#4b2e2e] font-serif">
            Popular Products
          </h2>
          <Link href="/recipes/all">
            <p className="text-[#a5556c] cursor-pointer hover:underline">See all</p>
          </Link>
        </div>

        {recipesLoading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {recipesData && recipesData.length > 0 ? (
              recipesData.map((recipe: Recipe) => (
                <motion.div
                  key={recipe._id}
                  className="bg-white p-5 rounded-2xl shadow-md text-center hover:shadow-xl transition"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src="https://via.placeholder.com/150"
                    alt={recipe.title}
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-lg font-bold text-[#a5556c] mb-2">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {recipe.body}
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link href={`/update/recipes/${recipe._id}`}>
                      <button className="px-4 py-2 bg-[#fbb6ce] text-white rounded-lg hover:bg-[#f78da7] transition">
                        Përditëso
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteRecipe(recipe._id!)}
                      className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition"
                    >
                      Fshij
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-lg text-gray-600 col-span-3">
                Nuk ka receta në databazë.
              </p>
            )}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/create/recipe">
            <button className="px-6 py-3 bg-[#f78da7] text-white rounded-lg font-medium hover:bg-[#f57c9b] transition">
              Krijo Recetë
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

Recipes.displayName = "Recipes | My Application";
