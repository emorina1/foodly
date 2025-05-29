import { useState } from "react";
import { useRouter } from "next/router";
import { User } from "@/api/models/User";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState<User>({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gabim gjatë regjistrimit");
      } else {
        router.push("/sign-in");
      }
    } catch {
      setError("Gabim në rrjet ose server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
        <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-black text-2xl font-semibold mb-4">Regjistrohu</h2>
          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
              {error}
            </div>
          )}
          <input
            type="text"
            placeholder="Emri"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
            required
          />
          <input
            type="password"
            placeholder="Fjalëkalimi"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
            required
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Duke u regjistruar..." : "Regjistrohu"}
          </button>
        </div>
      </div>
    </div>
  );
}
