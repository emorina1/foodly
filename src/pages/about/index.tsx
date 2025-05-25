"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import CakeImage from "@/assets/images/cake1.png";
import BgTexture from "@/assets/images/dredhza.png";
import YjImage from "@/assets/images/local.png";
import User1 from "@/assets/images/p2.png";
import User2 from "@/assets/images/p1.png";

export default function AboutUs() {
  return (
    <section className="relative bg-pink-50 overflow-hidden">
      {/* Background texture */}
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
            <h2 className="text-5xl font-extrabold text-pink-600 mb-6 leading-tight">
              Ne krijojmë momente të ëmbla
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Në Cake Haven, çdo ëmbëlsirë është një vepër arti. Ne përdorim përbërës
              të freskët, receta tradicionale dhe dashuri në çdo shtresë për të sjellë
              gëzim në çdo festë tuajën.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Nga një mëngjes i ëmbël deri te një ditëlindje madhështore, ne jemi këtu
              për të bërë çdo moment më të veçantë. Produktet tona janë reflektim i
              pasionit dhe përkushtimit për cilësi dhe shije të shkëlqyer.
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-full shadow-lg transition"
            >
              Mëso më shumë
            </motion.button>
          </motion.div>

          <motion.div
            className="relative group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <div className="overflow-hidden rounded-full shadow-xl transform group-hover:scale-105 transition duration-500 w-[350px] h-[350px] mx-auto md:w-[550px] md:h-[550px]">
              <Image
                src={CakeImage}
                alt="About Cake"
                width={550}
                height={550}
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Avantazhet tona */}
<div className="-100 py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl font-extrabold text-pink-600 mb-12 text-center">
      Avantazhet tona
    </h2>
    <div className="grid md:grid-cols-3 gap-12 text-center">
      {[
        {
          emoji: "🎂",
          title: "100% Handmade",
          desc: "Çdo tortë është punuar me dorë, me kujdes dhe pasion për të garantuar cilësinë dhe shijen më të mirë.",
          bgColor: "bg-pink-200",
        },
        {
          emoji: "🍓",
          title: "Përbërës Natyral",
          desc: "Përdorim vetëm përbërës natyral dhe të freskët për një shije autentike dhe të shëndetshme.",
          bgColor: "bg-pink-300",
        },
        {
          emoji: "✨",
          title: "Shije Unike",
          desc: "Kombinime kreative dhe receta ekskluzive që e bëjnë çdo ëmbëlsirë të veçantë dhe të paharrueshme.",
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
          <h3 className="text-2xl font-semibold text-pink-700 mb-2">{title}</h3>
          <p className="text-pink-900 text-base">{desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</div>


        {/* Historia jonë */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid md:grid-cols-2 gap-10 items-center bg-pink-200 p-8 rounded-xl"
        >
          <div className="w-full max-w-sm mx-auto">
            <Image
              src={YjImage}
              alt="Historia jonë"
              width={400}
              height={400}
              className="rounded-2xl shadow-lg object-cover"
              priority
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-pink-600 mb-6">Historia jonë</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              E kemi nisur këtë udhëtim nga një dashuri e thjeshtë për pjekjen. Ajo që nisi
              si një hobi u kthye në një mision për të sjellë gëzim në çdo tavolinë shqiptare.
              Me përkushtim, kreativitet dhe mbështetjen e klientëve tanë besnikë, ne jemi
              rritur dhe kemi krijuar një komunitet që e do ëmbëlsinë po aq sa ne. Sot, ne
              vazhdojmë të përmirësohemi, duke sjellë receta të reja dhe përvoja të paharrueshme.
            </p>
          </div>
        </motion.div>

        {/* Testimonials slider */}
        <TestimonialsSlider />
      </div>
    </section>
  );
}

function TestimonialsSlider() {
  const testimonials = [
    {
      name: "Aulona",
      text: "Torta më e mirë që kam provuar ndonjëherë! Shërbim i jashtëzakonshëm.",
      img: User1,
    },
    {
      name: "Blendi",
      text: "Porositëm për ditëlindjen e vajzës – të gjithë ishin të mahnitur.",
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
      <div className="relative bg-white rounded-2xl shadow-lg p-8 text-center">
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
            <p className="text-gray-700 italic text-lg mb-4">“{testimonials[current].text}”</p>
            <div className="text-pink-600 font-semibold text-xl">— {testimonials[current].name}</div>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button
          onClick={() => setCurrent(current === 0 ? length - 1 : current - 1)}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-pink-600 hover:text-pink-800 transition"
          aria-label="Previous testimonial"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => setCurrent(current === length - 1 ? 0 : current + 1)}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-pink-600 hover:text-pink-800 transition"
          aria-label="Next testimonial"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="mt-6 flex justify-center space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Show testimonial ${index + 1}`}
              className={`w-3 h-3 rounded-full transition ${
                current === index ? "bg-pink-600" : "bg-pink-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
