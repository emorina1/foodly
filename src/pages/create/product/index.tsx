import { Product } from "@/api/models/Product";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateProduct() {
  const router = useRouter();
  const [newProduct, setNewProduct] = useState({ title: "", body: "" });
  const { post } = useFetch<Product[]>("/api/products");

  const handleCreate = async () => {
    if (!newProduct.title || !newProduct.body) return;
    await post(newProduct);
    setNewProduct({ title: "", body: "" });
    router.push("/products");
  };

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
        <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-black text-2xl font-semibold mb-4">
            Add New Product
          </h2>
          <input
            type="text"
            placeholder="Titulli"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />
          <textarea
            placeholder="Përmbajtja"
            value={newProduct.body}
            onChange={(e) =>
              setNewProduct({ ...newProduct, body: e.target.value })
            }
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />
          <button
            onClick={handleCreate}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

CreateProduct.displayName = "Create Product | My Application";
