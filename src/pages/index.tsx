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

        {/*About Section*/}
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
            Ne krijojme aplikacione te avancuara dyje perdorur teknologjite
            me te fundit. Fokusimi yne kryesor eshte te ofrojme produkte te 
            optimizuara dhe SEO-friendly.
          </p>
          <Image 
            src={CustomImage}
            alt="Imazh Rreth Nesh"
            width={500}
            height={300}
            className="rounded-xl"
          />
        </motion.section>

        {/* Features Section*/}
        <motion.section 
          className="w-full py-20 bg-gray-200 text-center"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        >
        <div className="contanier m-auto">
          <h2 className="text-4xl font-bold mb-6 text-yellow-600">
            Karakteristikat kryesore
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-black rounded-xl shadow-md">
              Shpejtesi & Performance
            </div>
            <div className="p-6 bg-black rounded-xl shadow-md">
              SEO e Avancuar
            </div>
            <div className="p-6 bg-black rounded-xl shadow-md">
              Renderim dinamik & statik 
            </div>
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
            Sherbimet Tona
          </h2>
          <p className="text-gray-700 mb-6">
            Ofrojme nje game te gjere sherbimesh duke perfshire zhvillimin e 
            aplikacioneve web, optimizimin per SEO dhe integrimin me API te 
            jashtme.
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
          <p> Email: contact@mycompany.com</p>
          <p> Tel: +383 123 456 789 </p>
          <p> Adresa: Prishtinë, Kosovë</p>
        </motion.section>
      </div>
    </div>
  );
}

Home.displayName = "My Application";

