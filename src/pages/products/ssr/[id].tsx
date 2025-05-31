import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";  // importo Image

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
        <title>Events |🍓 Strawberry Surprise</title>
      </Head>
      <div className="pt-24 bg-pink-100 min-h-screen px-6 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full bg-white p-10 rounded-3xl shadow-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-800 mb-6">
            🍓 Strawberry Surprise Reveal!
          </h1>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Every day brings a new surprise in-store! This strawberry delight is
            only available today — made with fresh ingredients and a touch of
            pink magic. 💖 Come for the reveal, stay for the flavor!
          </p>

          <div className="relative w-full max-w-xl h-96 mx-auto mb-6 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/uploads/pinkish.jpg"
              alt="Strawberry Surprise Cake"
              fill
              style={{ objectFit: "cover" }}
              priority // për ngarkim më të shpejtë
            />
          </div>

          <h2 className="text-3xl font-bold text-pink-600 mb-4 uppercase">
            Contact us and be there!
          </h2>
          <p className="text-gray-700 mb-6">
            We will be happy if u join us! Click the button, contact us and take
            your friends with your!
          </p>

          <p className="text-sm text-gray-500 italic mb-6">
            Rendered on server for every request. Event ID: {post.id}
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
