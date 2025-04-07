import Image from "next/image";
import { motion } from "framer-motion";
import CustomImage from "@/assets/images/image.jpg";

export default function Home() {
  return (
    <div className="pt-14">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

        {/* Hero Section */}
        <motion.section 
          className="w-full py-20 bg-yellow-600 text-black text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold mb-4">
            Mirë se Vini në Aplikacionin Tonë!
          </h1>
          <p className="text-xl">
            Ndërtoni aplikacione të fuqishme dhe të shpejta me Next.js
          </p>
        </motion.section>

        {/* About Section */}
        <motion.section 
          className="max-w-6xl py-30 px-6 text-center"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-yellow-600">
            Rreth Nesh
          </h2>
          <p className="text-gray-700 mb-6">
            Ne krijojmë aplikacione të avancuara duke përdorur teknologjitë më të fundit.
            Fokusimi ynë kryesor është të ofrojmë produkte të optimizuara dhe SEO-friendly.
          </p>
          <Image 
            src={CustomImage}
            alt="Imazh Rreth Nesh"
            width={500}
            height={300}
            className="rounded-xl"
          />
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="w-full py-20 bg-gray-200 text-center"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-10 text-yellow-600">
              Karakteristikat kryesore
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Feature 1 */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-2xl font-semibold text-black mb-2">
                  Shpejtësi & Performance
                </h3>
                <p className="text-gray-700 mb-4">
                  Aplikacionet tona janë të optimizuara për performancë maksimale dhe ngarkim të shpejtë.
                </p>
                <button className="bg-yellow-600 text-black font-medium px-4 py-2 rounded-full hover:bg-yellow-700 transition">
                  Mëso më shumë
                </button>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-2xl font-semibold text-black mb-2">
                  SEO e Avancuar
                </h3>
                <p className="text-gray-700 mb-4">
                  Ne e strukturojmë përmbajtjen në mënyrë që të jetë e lehtë për motorët e kërkimit të indeksojnë.
                </p>
                <button className="bg-yellow-600 text-black font-medium px-4 py-2 rounded-full hover:bg-yellow-700 transition">
                  Mëso më shumë
                </button>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-2xl font-semibold text-black mb-2">
                  Renderim Dinamik & Statik
                </h3>
                <p className="text-gray-700 mb-4">
                  Mbështesim të dyja metodat e renderimit për fleksibilitet maksimal në ndërtimin e aplikacioneve.
                </p>
                <button className="bg-yellow-600 text-black font-medium px-4 py-2 rounded-full hover:bg-yellow-700 transition">
                  Mëso më shumë
                </button>
              </motion.div>

            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section 
          className="max-w-6xl py-30 px-6 text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-yellow-600">
            Shërbimet Tona
          </h2>
          <p className="text-gray-700 mb-6">
            Ofrojmë një gamë të gjerë shërbimesh duke përfshirë zhvillimin e aplikacioneve web, 
            optimizimin për SEO dhe integrimin me API të jashtme.
          </p>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          className="w-full py-20 bg-yellow-600 text-black text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6">Kontaktoni me Ne</h2>
          <p>Email: contact@mycompany.com</p>
          <p>Tel: +383 123 456 789</p>
          <p>Adresa: Prishtinë, Kosovë</p>
        </motion.section>
      </div>
    </div>
  );
}

Home.displayName = "My Application";
