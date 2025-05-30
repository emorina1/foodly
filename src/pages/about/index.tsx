"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Head from "next/head";

import CakeImage from "@/assets/images/pink.png";
import BgTexture from "@/assets/images/dredhza.png";
import YjImage from "@/assets/images/local.png";
import User1 from "@/assets/images/p2.png";
import User2 from "@/assets/images/p1.png";
import { useRouter } from "next/navigation";

export default function AboutUs() {
  const router = useRouter();
  return (
    <section className="relative bg-pink-50 overflow-hidden">
      <Head>
        <title>About | Cake Shop</title>
      </Head>

      <div className="absolute inset-0 -z-10">
        <Image
          src={BgTexture}
          alt="Strawberry Pattern"
          layout="fill"
          objectFit="cover"
          className="opacity-30 blur-sm"
          priority
        />
      </div>

      <div className="relative z-10 px-6 py-24 md:px-20 space-y-32 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl font-extrabold text-pink-600 mb-8 leading-tight">
              We create sweet moments
            </h2>
            <p className="text-gray-700 text-xl leading-relaxed mb-6">
              At Cake Haven, every dessert is a masterpiece. We use fresh ingredients,
              traditional recipes, and love in every layer to bring joy to your celebrations.
            </p>
            <p className="text-gray-700 text-xl leading-relaxed mb-8">
              From a sweet breakfast to a grand birthday, we’re here to make every moment special.
              Our products reflect passion and commitment to quality and excellent taste.
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white text-lg font-semibold rounded-full shadow-lg transition"
              onClick={() => router.push("/recipes")}
            >
              Learn more
            </motion.button>
          </motion.div>

          <motion.div
            className="relative group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <div className="overflow-hidden rounded-full transform group-hover:scale-105 transition duration-500 w-[350px] h-[350px] mx-auto md:w-[550px] md:h-[550px]">
              <Image
                src={CakeImage}
                alt="About Cake"
                width={600}
                height={600}
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Our Advantages */}
        <div className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-5xl font-extrabold text-pink-600 mb-12 text-center">
              Our Advantages
            </h2>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              {[
                {
                  emoji: "🎂",
                  title: "100% Handmade",
                  desc: "Every cake is handcrafted with care and passion to guarantee the best quality and taste.",
                  bgColor: "bg-pink-200",
                },
                {
                  emoji: "🍓",
                  title: "Natural Ingredients",
                  desc: "We use only natural and fresh ingredients for an authentic and healthy flavor.",
                  bgColor: "bg-pink-300",
                },
                {
                  emoji: "✨",
                  title: "Unique Taste",
                  desc: "Creative combinations and exclusive recipes make every dessert special and unforgettable.",
                  bgColor: "bg-pink-200",
                },
              ].map(({ emoji, title, desc, bgColor }, i) => (
                <motion.div
                  key={i}
                  className={`${bgColor} p-10 rounded-3xl border-2 border-pink-300 shadow-md hover:shadow-2xl hover:scale-105 transition-transform transition-shadow cursor-default`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                >
                  <div className="text-6xl mb-5">{emoji}</div>
                  <h3 className="text-3xl font-semibold text-pink-700 mb-4">{title}</h3>
                  <p className="text-pink-900 text-lg">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid md:grid-cols-2 gap-10 items-center bg-pink-200 p-10 rounded-xl"
        >
          <div className="w-full max-w-sm mx-auto">
            <Image
              src={YjImage}
              alt="Our Story"
              width={400}
              height={400}
              className="rounded-2xl shadow-lg object-cover"
              priority
            />
          </div>
          <div>
            <h3 className="text-4xl font-bold text-pink-600 mb-6">Our Story</h3>
            <p className="text-gray-700 text-xl leading-relaxed">
              We started this journey from a simple love of baking. What began
              as a hobby turned into a mission to bring joy to every Albanian table.
              With dedication, creativity, and the support of our loyal customers,
              we have grown and built a community that loves sweets as much as we do.
              Today, we continue to improve, bringing new recipes and unforgettable experiences.
            </p>
          </div>
        </motion.div>

        {/* Testimonials */}
        <TestimonialsSlider />
      </div>
    </section>
  );
}

function TestimonialsSlider() {
  const testimonials = [
    {
      name: "Lena",
      text: "The best cake I have ever tried! Exceptional service.",
      img: User1,
    },
    {
      name: "Jack",
      text: "We ordered for our daughter’s birthday – everyone was amazed.",
      img: User2,
    },
  ];

  const [current, setCurrent] = useState(0);
  const length = testimonials.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearTimeout(timer);
  }, [current, length]);

  const variants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <section className="max-w-4xl mx-auto px-4 mt-20">
      <div className="relative bg-white rounded-2xl shadow-lg p-10 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <Image
              src={testimonials[current].img}
              alt={testimonials[current].name}
              width={100}
              height={100}
              className="rounded-full object-cover mb-6 shadow-md"
            />
            <p className="text-gray-700 italic text-xl mb-4">“{testimonials[current].text}”</p>
            <div className="text-pink-600 font-semibold text-2xl">— {testimonials[current].name}</div>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button
          onClick={() => setCurrent(current === 0 ? length - 1 : current - 1)}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-pink-600 hover:text-pink-800 transition"
          aria-label="Previous testimonial"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => setCurrent(current === length - 1 ? 0 : current + 1)}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-pink-600 hover:text-pink-800 transition"
          aria-label="Next testimonial"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
