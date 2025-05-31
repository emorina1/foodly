import useFetch from "hooks/useFetch";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";

export interface Post {
  id: string;
  title: string;
  body: string;
}

export default function Events() {
  const { data: posts, loading } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center gap-y-20">
        <Head>
          <title>Events | Cake Shop </title>
        </Head>

        {/* SSG Section */}
        {!loading && posts && (
          <div className="bg-pink-100 w-full py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-pink-800 mb-10">
                🎉 Upcoming Cake Shop Event
              </h1>
              {posts.slice(0, 1).map((post: Post) => (
                <motion.section
                  key={post.id}
                  className="bg-white p-10 rounded-3xl shadow-2xl text-center cursor-pointer"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{
                    scale: 1.03,
                    rotate: 0.5,
                    boxShadow: "0px 8px 30px rgba(0,0,0,0.15)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h2 className="text-3xl font-bold text-pink-700 mb-4 uppercase">
                    Pink Frosting Party!
                  </h2>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    🎂 Join us for the sweetest event of the season! Indulge in
                    handcrafted cupcakes, explore our brand-new raspberry
                    delights, and enjoy exclusive treats available only during
                    the event. Bring your friends and family — there&#39;s
                    frosting, fun, and flavor for everyone! 💖✨
                  </p>

                  <div className="flex justify-center gap-4 mb-6">
                    <img
                      src="/uploads/kjut.jpg"
                      className="rounded-xl shadow-md max-h-72 object-cover"
                      alt="event1"
                    />
                    <img
                      src="/uploads/kjutt.jpg"
                      className="rounded-xl shadow-md max-h-72 object-cover"
                      alt="event2"
                    />
                  </div>
                  <Link href={`/products/ssg/${post.id}`}>
                    <button className="bg-[#E6007E] hover:bg-pink-800 text-white font-bold py-3 px-6 rounded-full transition">
                      View Details
                    </button>
                  </Link>
                </motion.section>
              ))}
            </div>
          </div>
        )}

        {/* SSR Section */}
        {!loading && posts && (
          <div className="bg-pink-200 w-full py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-pink-900 mb-10">
                🍓 Special Surprise This Week
              </h1>
              {posts.slice(1, 2).map((post: Post) => (
                <motion.section
                  key={post.id}
                  className="bg-white p-10 rounded-3xl shadow-2xl text-center cursor-pointer"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{
                    scale: 1.03,
                    rotate: 0.5,
                    boxShadow: "0px 8px 30px rgba(0,0,0,0.15)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h2 className="text-3xl font-bold text-pink-700 mb-4 uppercase">
                    🍓 Come and try it yourself 🍓
                  </h2>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    🍓 Discover our surprise seasonal strawberry cake and
                    behind-the-scenes bakery tours.
                  </p>
                  <div className="flex justify-center mb-6">
                    <img
                      src="/uploads/pinkish.jpg"
                      className="rounded-xl shadow-md max-h-72 object-cover"
                      alt="event3"
                    />
                  </div>
                  <Link href={`/products/ssr/${post.id}`}>
                    <button className="bg-[#E6007E] hover:bg-pink-800 text-white font-bold py-3 px-6 rounded-full transition">
                      View Details
                    </button>
                  </Link>
                </motion.section>
              ))}
            </div>
          </div>
        )}

        {/* ISR Section */}
        {!loading && posts && (
          <div className="bg-pink-300 w-full py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-pink-950 mb-10">
                🍰 Fresh Drops Daily
              </h1>
              {posts.slice(2, 3).map((post: Post) => (
                <motion.section
                  key={post.id}
                  className="bg-white p-10 rounded-3xl shadow-2xl text-center cursor-pointer"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{
                    scale: 1.03,
                    rotate: 0.5,
                    boxShadow: "0px 8px 30px rgba(0,0,0,0.15)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h2 className="text-3xl font-bold text-pink-700 mb-4 uppercase">
                    Unwrap Today&#39;s Deals 🎁
                  </h2>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    🍰 Every visit brings a sweet new surprise. Ready to taste
                    it?
                  </p>
                  <div className="flex justify-center mb-6">
                    <img
                      src="/uploads/muffins.jpg"
                      className="rounded-xl shadow-md max-h-72 object-cover"
                      alt="event4"
                    />
                  </div>
                  <Link href={`/products/isr/${post.id}`}>
                    <button className="bg-[#E6007E] hover:bg-pink-800 text-white font-bold py-3 px-6 rounded-full transition">
                      View Details
                    </button>
                  </Link>
                </motion.section>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
