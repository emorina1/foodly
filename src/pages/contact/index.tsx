import { useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        toast("Message sent successfully!", {
         className: "bg-pink-600 text-white font-semibold rounded-lg shadow-lg",
        });

        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error("Failed to send message.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | Cake Shop</title>
      </Head>

      <div className="pt-24 bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-pink-700 mb-6 text-center">Contact Form</h1>

          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded text-pink-700"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded text-pink-700"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Type your message"
              rows={4}
              className="w-full mb-6 px-4 py-2 border border-gray-300 rounded text-pink-700"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                loading
                  ? "bg-pink-300 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* Toast container must be outside the main UI container */}
      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        theme="colored" 
      />

    </>
  );
}
