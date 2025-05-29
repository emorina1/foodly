import { getCsrfToken, signIn } from "next-auth/react";
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
    } else if (res?.url) {
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>Sign In | My Application</title>
      </Head>
      <div className="pt-12">
        <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
          <div className="mb-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-black text-2xl font-semibold mb-4">Kyçu</h2>
            {error && (
              <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
                required
              />
              <input
                type="password"
                placeholder="Fjalëkalimi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                Kyçu
              </button>
            </form>
          </div>
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
