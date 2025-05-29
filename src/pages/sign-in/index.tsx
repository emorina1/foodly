import { getCsrfToken, signIn, getSession } from "next-auth/react";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else if (res?.ok) {
      const session = await getSession();
      const role = session?.user?.role;

      if (role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Sign In | My Application</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-pink-50 pt-24 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-pink-200">
          <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Welcome Back</h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none placeholder-pink-300 text-pink-800"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none placeholder-pink-300 text-pink-800"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-transform transform hover:scale-105 duration-300"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

SignIn.getInitialProps = async (context: any) => {
  return {
    csrfToken: await getCsrfToken(context),
  };
};
