import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], // Do të gjenerohen statikisht në kërkesë
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<{ post: Post }> = async ({ params }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params?.id}`
  );
  const post: Post = await res.json();

  return {
    props: { post },
    revalidate: 10, // Revalidim në background pas 10 sekondash
  };
};

export default function Product({ post }: { post: Post }) {
  return (
    <>
      <Head>
        <title>{post.title} | Daily Treat Details</title>
      </Head>

      <div className="pt-24 bg-pink-50 min-h-screen flex flex-col items-center justify-center px-6">
        <div className="max-w-4xl w-full bg-white p-10 rounded-3xl shadow-2xl text-center">
          <h1 className="text-5xl font-bold text-pink-800 mb-6">
            🍭 {post.title}
          </h1>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {post.body}
          </p>

          <div className="relative w-full max-w-xl h-96 mx-auto mb-6 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/uploads/muffins.jpg"
              alt="Daily Treat"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <h2 className="text-3xl font-bold text-yellow-600 mb-4 uppercase">
            Handcrafted With Love & Sprinkles!
          </h2>

          <p className="text-gray-700 mb-6">
            This delightful treat was made fresh just for today — crafted with care, sweetness, and a sprinkle of joy.
          </p>

          <p className="text-sm text-gray-500 italic mt-4">
            Refreshed regularly to bring you the freshest treats available.
          </p>

          <Link href="/contact">
            <button className="mt-4 bg-[#E6007E] hover:bg-pink-800 text-white font-bold py-3 px-6 rounded-full transition">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
