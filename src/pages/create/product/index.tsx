import { Product } from "@/api/models/Product";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";

export default function CreateProduct() {
  const router = useRouter();
  const [newProduct, setNewProduct] = useState({ title: "", body: "", image: "" });
  const { post } = useFetch<Product[]>("/api/products");

  const handleCreate = async () => {
    if (!newProduct.title || !newProduct.body) return;
    await post(newProduct);
    setNewProduct({ title: "", body: "", image: "" });
    router.push("/products");
  };

  return (
    <>
      <Head>
        <title>Create Product | My Application</title>
      </Head>
      <div className="pt-24 bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-pink-700 text-4xl font-extrabold mb-10 text-center tracking-wide drop-shadow-md">
            Add New Product
          </h2>

          <input
            type="text"
            placeholder="Title"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            className="w-full mb-6 px-6 py-4 border-4 border-pink-300 rounded-2xl placeholder-pink-400 text-pink-700 font-semibold text-xl shadow-inner focus:outline-none focus:ring-4 focus:ring-pink-400 transition"
          />

          <textarea
            placeholder="Description"
            value={newProduct.body}
            onChange={(e) => setNewProduct({ ...newProduct, body: e.target.value })}
            className="w-full mb-6 px-6 py-4 border-4 border-pink-300 rounded-2xl placeholder-pink-400 text-pink-700 font-semibold text-xl shadow-inner resize-none focus:outline-none focus:ring-4 focus:ring-pink-400 transition"
            rows={6}
          />

          <label className="block text-pink-600 font-semibold mb-2">Image Upload</label>
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
                    setNewProduct((prev) => ({ ...prev, image: data.url }));
                  } else {
                    alert("Upload failed: " + (data.error || "Unknown error"));
                  }
                })
                .catch((err) => {
                  console.error("Upload error:", err);
                  alert("Error uploading image.");
                });
            }}
            className="w-full mb-6 text-pink-700 bg-pink-50 border-2 border-pink-300 rounded-lg file:font-semibold file:text-pink-600 file:border-0 file:bg-pink-200 file:px-5 file:py-2 file:rounded-full"
          />

          {newProduct.image && (
            <div className="w-full flex justify-center mb-6">
              <img
                src={newProduct.image}
                alt="Uploaded preview"
                className="max-h-48 rounded-xl shadow-md"
              />
            </div>
          )}

          <button
            onClick={handleCreate}
            className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white text-xl font-bold rounded-2xl transition shadow-lg shadow-pink-400/60"
          >
            Add Product
          </button>
        </div>
      </div>
    </>
  );
}

CreateProduct.displayName = "Create Product | My Application";
