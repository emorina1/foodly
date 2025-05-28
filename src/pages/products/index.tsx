import { CircularProgress } from "@mui/material";
import useFetch from "hooks/useFetch";
import { useState, useEffect } from "react"; 
import { motion } from "framer-motion"; 
import Link from "next/link";
import { Product } from "@/api/models/Product";
import { useRouter } from "next/router";

export interface Post {
  id: string;
  title: string;
  body: string;
}

export default function Products() {
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
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  // Products from your database
  const router = useRouter();
  const {
    data: productsData,
    loading: productsLoading,
    remove
  } = useFetch<Product[]>("/api/products");

  const handleDeleteProduct = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await remove(`/api/products/${id}`);
      alert("Product deleted successfully..");
      router.reload();
    } catch (error) {
      alert("Error while deleting product.");
      console.error(error);
    }
  };

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">

        {/* Products from your database */}
        {productsLoading ? (
          <CircularProgress />
        ) : (
          <div className="bg-gray-200 w-full">
            <h1 className="text-4xl font-bold pt-20 pb-6 text-black text-center">
              Displaying Products from our database
            </h1>
            <div className="grid grid-cols-3">
              {productsData && productsData.length > 0 ? (
                productsData.map((product: Product) => (
                  <motion.section
                    key={product._id}
                    className="max-w-6xl py-20 px-6 text-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <h2 className="text-4xl font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">
                      {product.title}
                    </h2>
                    <p className="text-gray-700 mb-6">{product.body}</p>
                    <div className="mb-6">
                      <Link href={`/update/product/${product._id}`}>
                        <button className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl transition">
                          Update
                        </button>
                      </Link>
                    </div>
                    <button
                      onClick={() => handleDeleteProduct(product._id!)}
                      className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                    >
                      Delete Product
                    </button>
                  </motion.section>
                ))
              ) : (
                <div className="col-span-3 py-20">
                  <p className="text-xl font-bold pb-10 text-black text-center">
                    There are no products in the database.
                  </p>
                </div>
              )}
            </div>
            <div className="text-center pb-10">
              <Link href={"/create/product"}>
                <button className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl transition">
                  Create Product
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Fake products: SSG */}
        {!loading && posts && (
          <div className="bg-gray-200">
            <h1 className="text-4xl font-bold pt-20 pb-6 text-black text-center">
              Product Display with Static Site Generation (SSG)
            </h1>
            {posts.slice(0, 3).map((post: Post) => (
              <motion.section
                key={post.id}
                className="max-w-6xl py-20 px-6 text-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-4xl font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">
                  {post.title}
                </h2>
                <p className="text-gray-700 mb-6">{post.body}</p>
                <div className="mb-6">
                  <Link href={`/products/ssg/${post.id}`}>
                    <button className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl transition">
                     View Details
                    </button>
                  </Link>
                </div>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                >
                  Delete Post
                </button>
              </motion.section>
            ))}
          </div>
        )}

        {/* SSR and ISR sections — same structure */}
        {/* Replace /blogs/ssr/ and /blogs/isr/ with /products/ssr/ and /products/isr/ if those routes exist */}

      </div>
    </div>
  );
}

Products.displayName = "Products | My Application";
