import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import home from "@/assets/images/home.png";
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
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src={home}
          alt="Cake background"
          fill
          className="object-cover z-0"
          priority
        />
        <div className="absolute inset-0 bg-pink-950/40 z-10"></div>

        <div className="z-20 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
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
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-4xl font-extrabold text-pink-600 mb-6">Our Service</h2>
      </motion.section>

      {/* Service 1 - Cake */}
      <motion.section
        className="flex flex-col md:flex-row items-center justify-between px-16 py-12 bg-pink-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="md:w-1/2 flex justify-center">
          <Image
            src={cake}
            alt="Cake"
            width={400}
            height={400}
            className="rounded-3xl shadow-xl"
          />
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 md:pl-10">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Cake</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Discover the art of cake-making with our stunning and delicious creations.
            <br />
            Each cake is a masterpiece of flavor and design.
          </p>
          <Link href="/products?category=cake">
          <button className="bg-pink-500 text-white font-medium px-6 py-2 rounded-full hover:bg-pink-600 transition">
            Check it out
          </button>
          </Link>

        </div>
      </motion.section>

      {/* Service 2 - Cupcakes */}
      <motion.section
        className="flex flex-col md:flex-row-reverse items-center justify-between px-10 md:px-16 py-12 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="md:w-1/2 flex justify-center">
          <Image
            src={cupcake}
            alt="Cupcakes"
            width={400}
            height={400}
            className="rounded-3xl shadow-xl"
          />
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 md:pr-4 md:pl-0 text-right">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Cupcakes</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Indulge in the irresistible charm of our freshly baked cupcakes,
            <br />
            crafted with love and the finest ingredients.
            <br />
            Each bite delivers a perfect balance of flavor and joy.
          </p>
          <button className="bg-pink-500 text-white font-medium px-6 py-2 rounded-full hover:bg-pink-600 transition">
            Check it out
          </button>
        </div>
      </motion.section>
    </div>
  );
}
