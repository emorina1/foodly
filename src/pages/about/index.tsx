import { motion } from "framer-motion";
import Image from "next/image";
import CustomImage from "@/assets/images/image.jpg";

export default function About() {
  return (
    <div className="pt-14">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/*Introduction Section*/}
        <motion.section 
            className="w-full py-20 bg-yellow-600 text-black text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
          <h1 className="text-5xl font-bold mb-4">Rreth Nesh</h1>
          <p className="text-xl">
            Ne jemi nje ekip pasionant qe ndertojme aplikacione moderne
            dhe te fuqishme me teknologji te avancuar.
          </p>
        </motion.section>

        {/*Our Mission Section*/}
        <motion.section 
            className="max-w-6xl py-20 px-6 text-center"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
          >
          <h2 className="text-4xl font-bold mb-6 text-yellow-600">Misioni Yne</h2>
          <p className="text-gray-700 mb-6">
            Misioni yne eshte qe te ofrojme zgjidhje inovative dhe te qendrueshme 
            per zhvillimin e aplikacioneve qe permbushin nevojat e klienteve 
            tane ne menyre te plote.
          </p>
        </motion.section>

        {/*Our Vision Section*/}
        <motion.section 
            className="w-full py-20 bg-gray-200 text-center"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
          >
          <div className="contanier mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-yellow-600">
              Vizioni Yne 
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-black rounded-xl shadow-md">
                <p>
                  Ne aspirojme te behemi lidere ne fushen e zhvillimit te aplikacioneve,
                  duke krijuar produkte te qendrueshme dhe te adaptueshme per te gjithe perdoruesit.
                </p>
              </div>
              <Image
                src={CustomImage}
                alt="Ekipi yne"
                width={500}
                height={300}
                className="rounded-xl"
              />
              </div>
            </div>
          </motion.section>

        {/* Contact Section */}
        <motion.section 
          className="w-full py-20 bg-yellow-600 text-black text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6">Na kontaktoni</h2>
          <p> Email: contact@mycompany.com</p>
          <p> Tel: +383 123 456 789 </p>
          <p> Adresa: Prishtinë, Kosovë</p>
        </motion.section>
      </div>
    </div>
  );
}
About.displayName = "About | My Aplication";