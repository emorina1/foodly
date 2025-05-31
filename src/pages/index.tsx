import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Script from "next/script"; // <-- Import Script

import homee from "@/assets/images/homee.jpg";
import cake from "@/assets/images/cake.jpg";
import cupcake from "@/assets/images/cupcake.jpg";

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="pt-14 bg-white text-gray-800 font-sans">
      {/* Inline JavaScript script using next/script */}
      <Script id="url-rewrite-fix" strategy="afterInteractive">
        {`
          (function (l) {
            if (l.search[1] === "/") {
              var decoded = l.search
                .slice(1)
                .split("&")
                .map(function (s) {
                  return s.replace(/~and~/g, "&");
                })
                .join("?");
              window.history.replaceState(
                null,
                null,
                l.pathname.slice(0, -1) + decoded + l.hash
              );
            }
          })(window.location);
        `}
      </Script>

      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src={homee}
          alt="Cake background"
          fill
          className="object-cover z-0"
          priority
        />

        <div className="z-20 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg text-pink-500">
            Cooking. Tasting. Living.
          </h1>

          <Link href="/products">
            <button className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-pink-100 transition">
              Check Our Products
            </button>
          </Link>
        </div>
      </section>

      {/* Services Intro */}
      <motion.section
        className="text-center py-20 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={listVariants}
      >
        <motion.h2
          className="text-4xl font-extrabold text-pink-600 mb-6"
          variants={itemVariants}
        >
          Our Service
        </motion.h2>
      </motion.section>

      {/* Service 1 - Cake */}
      <motion.section
        className="flex flex-col md:flex-row items-center justify-between px-16 py-12 bg-pink-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={listVariants}
      >
        <motion.div
          className="md:w-1/2 flex justify-center"
          variants={itemVariants}
        >
          <Image
            src={cake}
            alt="Cake"
            width={400}
            height={400}
            className="rounded-3xl shadow-xl"
          />
        </motion.div>
        <motion.div
          className="md:w-1/2 mt-8 md:mt-0 md:pl-10"
          variants={itemVariants}
        >
          <h3 className="text-5xl font-bold text-gray-800 mb-4">Cake</h3>
          <p className="text-gray-600 text-lg md:text-xl mb-6 leading-relaxed">
            Discover the art of cake-making with our stunning and delicious creations.
            <br />
            Each cake is a masterpiece of flavor and design.
          </p>
          <Link href="/products?category=cake">
            <button className="bg-pink-500 text-white font-medium px-6 py-2 rounded-full hover:bg-pink-600 transition">
              Check it out
            </button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Service 2 - Cupcakes */}
      <motion.section
        className="flex flex-col md:flex-row-reverse items-center justify-between px-10 md:px-16 py-12 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={listVariants}
      >
        <motion.div
          className="md:w-1/2 flex justify-center"
          variants={itemVariants}
        >
          <Image
            src={cupcake}
            alt="Cupcakes"
            width={400}
            height={400}
            className="rounded-3xl shadow-xl"
          />
        </motion.div>
        <motion.div
          className="md:w-1/2 mt-8 md:mt-0 md:pr-4 md:pl-0 text-right"
          variants={itemVariants}
        >
          <h3 className="text-5xl font-bold text-gray-800 mb-4">Cupcakes</h3>
          <p className="text-gray-600 text-lg md:text-xl mb-6 leading-relaxed">
            Indulge in the irresistible charm of our freshly baked cupcakes,
            <br />
            crafted with love and the finest ingredients.
            <br />
            Each bite delivers a perfect balance of flavor and joy.
          </p>
          <Link href="/products?category=cupcake">
            <button className="bg-pink-500 text-white font-medium px-6 py-2 rounded-full hover:bg-pink-600 transition">
              Check it out
            </button>
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}
