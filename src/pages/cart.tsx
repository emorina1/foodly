import { useEffect, useState } from "react";
import { Product } from "@/api/models/Product";
import Head from "next/head";

export default function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  const handleRemove = (id: string) => {
    const updated = cartItems.filter(item => item._id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div className="pt-24 px-8 pb-12 min-h-screen bg-white">
      <Head><title>Your Cart</title></Head>

      <h1 className="text-5xl font-bold text-pink-700 mb-12 text-center">
        🛒 Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">Your cart is empty.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {cartItems.map(item => (
            <div key={item._id} className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold text-pink-800">{item.title}</h2>
              <p className="text-gray-600 mb-2">{item.body}</p>
              <p className="text-pink-600 font-bold mb-4">{item.price}€</p>
              <button
                onClick={() => handleRemove(item._id!)}
                className="bg-pink-500 hover:bg-pink-700 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
