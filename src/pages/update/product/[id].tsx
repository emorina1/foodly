import { Product } from "@/api/models/Product";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UpdateProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [newProduct, setNewProduct] = useState<Product>({
    title: "",
    body: "",
    image: "",
    price: 0,
  });

  const {
    data: existingProduct,
    loading,
    put,
  } = useFetch<Product>(id ? `/api/products/${id}` : "");

  useEffect(() => {
    if (existingProduct) {
      setNewProduct({
        title: existingProduct.title || "",
        body: existingProduct.body || "",
        image: existingProduct.image || "",
        price: existingProduct.price ?? 0,
      });
    }
  }, [existingProduct]);

  const handleUpdate = async () => {
    if (!newProduct.title || !newProduct.body || !id) return;
    await put(newProduct);
    router.push("/products");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
        <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-black text-2xl font-semibold mb-4">
            Update Product
          </h2>

          <input
            type="text"
            placeholder="Title"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />

          <textarea
            placeholder="Description"
            value={newProduct.body}
            onChange={(e) =>
              setNewProduct({ ...newProduct, body: e.target.value })
            }
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />

          <input
            type="number"
            step="0.01"
            placeholder="Price (€)"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
            }
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />

          <div className="w-full px-4 py-2 mb-4">
            <label className="block text-gray-600 mb-2">Image Upload</label>
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
                      alert("Upload dështoi: " + (data.error || "Gabim i panjohur"));
                    }
                  })
                  .catch((err) => {
                    console.error("Gabim gjatë upload-it:", err);
                    alert("Gabim gjatë ngarkimit të fotos.");
                  });
              }}
              className="block w-full text-sm text-gray-600 bg-pink-50 border border-pink-300 rounded cursor-pointer focus:outline-none"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}

UpdateProduct.displayName = "Update Product | My Application";
