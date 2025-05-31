import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image"; // importo Image

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params?.id}`
  );
  const post: Post = await res.json();
  return { props: { post } };
};

interface ProductProps {
  post: Post;
}

export default function Product({ post }: ProductProps) {
  return (
    <>
      <Head>
        <title>Events | Cake Event Details</title>
      </Head>

      <div className="pt-24 bg-pink-50 min-h-screen flex flex-col items-center justify-center px-6">
        <div className="max-w-4xl bg-white rounded-3xl shadow-2xl p-10 text-center">
          <h1 className="text-4xl font-bold text-pink-800 mb-6">
            🎂 Let&apos;s have fun together!
          </h1>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            🎉 You&apos;re invited to an unforgettable day at our Cake Shop!{" "}
            Enjoy hands-on cupcake decorating, live pastry demos, and exclusive
            offers just for attendees.
          </p>

          <div className="relative w-full max-w-xl h-96 mx-auto mb-6 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/uploads/cutee.jpg"
              alt="Cake Event Detail"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <p className="text-sm text-gray-500 italic mb-4">
            Rendered at build time. Event ID: {post.id}
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
