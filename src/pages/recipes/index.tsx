import { CircularProgress } from "@mui/material"; 
import useFetch from "hooks/useFetch";
import { useState, useEffect } from "react"; 
import { motion } from "framer-motion"; 
import Link from "next/link";
import { Recipe } from "@/api/models/Recipe";
import { useRouter } from "next/router";

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
    const {
        data: recipesData, 
        loading: recipesLoading, 
        remove
    } = useFetch<Recipe[]>("/api/recipes");

    const handleDeleteRecipe = async(id: string) =>{
        const confirmed = confirm(
            "A jeni i sigurt që dëshironi ta fshini këtë recetë?"
        );
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
        <div className="pt-12">
            <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">

                {/* Recipes Section: FROM OUR DATABASE */}
                {recipesLoading ? (
                    <CircularProgress />
                ) : (
                    <div className="bg-gray-200 w-full">
                        <h1 className="text-4xl font-bold pt-20 pb-6 text-black text-center">
                            Shfaqja e Recetave nga databaza jonë
                        </h1>
                        <div className="grid grid-cols-3">
                            {recipesData && recipesData.length > 0 ? (
                                recipesData.map((recipe: Recipe) => (
                                    <motion.section
                                        key={recipe._id}
                                        className="max-w-6xl py-20 px-6 text-center"
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <h2 className="text-4xl font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">
                                            {recipe.title}
                                        </h2>
                                        <p className="text-gray-700 mb-6">{recipe.body}</p>
                                        <div className="mb-6">
                                            <Link href={"/update/recipes/" + recipe._id}>
                                                <button className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl transition">
                                                    Përditëso
                                                </button>
                                            </Link>    
                                        </div>  
                                        <button 
                                            onClick={() => handleDeleteRecipe(recipe._id!)}
                                            className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                                        >
                                            Fshij Recetën
                                        </button>
                                    </motion.section>
                                ))
                            ) : (
                                <div className="col-span-3 py-20">
                                    <p className="text-xl font-bold pb-10 text-black text-center">
                                        Nuk ka receta në databazë
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="text-center pb-10">
                            <Link href={"/create/recipe"}>
                                <button className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl transition">
                                    Krijo recetë
                                </button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Recipes Section: Static Site Generation (SSG) */}
                {loading ? (
                    <CircularProgress />  
                ) : (
                    <div className="bg-gray-200">
                        <h1 className="text-4xl font-bold pt-20 pb-6 text-black text-center">
                            Shfaqja e Recetës me Static Site Generation (SSG)
                        </h1>
                        <div className="">
                            {posts && 
                                posts
                                    .slice(0,3)
                                    .map((post: Post) => 
                                    <motion.section
                                        key={post.id}
                                        className="max-w-6xl py-20 px-6 text-center"
                                        initial={{ scale: 0.8}}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <h2 className="text-4xl font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-700 mb-6">{post.body}</p>
                                        <div className="mb-6">
                                            <Link href={"/recipes/ssg/" + post.id}>
                                                <button className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl transition">
                                                    Shiko Detajet
                                                </button>
                                            </Link>
                                        </div>
                                        <button 
                                            onClick={()=> handleDelete(post.id)}
                                            className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                                        >
                                            Fshij Recetën
                                        </button>
                                    </motion.section>)}
                        </div>
                    </div>
                )}

                {/* Recipes Section: Server-Side Rendering (SSR) */}
                {loading ? (
                    <CircularProgress />  
                ) : (
                    <div className="bg-gray-200">
                        <h1 className="text-4xl font-bold pt-20 pb-6 text-black text-center">
                            Shfaqja e Recetës me Server-Side Rendering (SSR)
                        </h1>
                        <div className="">
                            {posts && 
                                posts
                                    .slice(0,3)
                                    .map((post: Post) => 
                                    <motion.section
                                        key={post.id}
                                        className="max-w-6xl py-20 px-6 text-center"
                                        initial={{ scale: 0.8}}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <h2 className="text-4xl font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-700 mb-6">{post.body}</p>
                                        <div className="mb-6">
                                            <Link href={"/recipes/ssr/" + post.id}>
                                                <button className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl transition">
                                                    Shiko Detajet
                                                </button>
                                            </Link>
                                        </div>
                                        <button 
                                            onClick={()=> handleDelete(post.id)}
                                            className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                                        >
                                            Fshij Recetën
                                        </button>
                                    </motion.section>)}
                        </div>
                    </div>
                )}

                {/* Recipes Section: Incremental Static Regeneration (ISR) */}
                {loading ? (
                    <CircularProgress />  
                ) : (
                    <div className="bg-gray-200">
                        <h1 className="text-4xl font-bold pt-20 pb-6 text-black text-center">
                            Shfaqja e Recetës me Incremental Static Regeneration (ISR)
                        </h1>
                        <div className="">
                            {posts && 
                                posts
                                    .slice(0,3)
                                    .map((post: Post) => 
                                    <motion.section
                                        key={post.id}
                                        className="max-w-6xl py-20 px-6 text-center"
                                        initial={{ scale: 0.8}}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <h2 className="text-4xl font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-700 mb-6">{post.body}</p>
                                        <div className="mb-6">
                                            <Link href={"/recipes/isr/" + post.id}>
                                                <button className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl transition">
                                                    Shiko Detajet
                                                </button>
                                            </Link>
                                        </div>
                                        <button 
                                            onClick={()=> handleDelete(post.id)}
                                            className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                                        >
                                            Fshij Recetën
                                        </button>
                                    </motion.section>)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

Recipes.displayName = "Recipes | My Application";
