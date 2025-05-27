import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "@/assets/icons/logo.png";
import masterCard from "@/assets/images/mastercard.png";
import payPal from "@/assets/images/paypal.png";

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

export default function Footer() {
  return (
    <footer className="bg-pink-50 text-gray-700 mt-16 border border-red-500">

<div className="relative overflow-hidden leading-[0] -mt-[1px]">
  <svg
    className="relative block w-full h-[80px]"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 120"
    preserveAspectRatio="none"
  >
    <path d="M0,0 V0 Q600,120 1200,0 V0 Z" fill="#fce7ef" />
  </svg>
</div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Services */}
        <div>
          <h4 className="text-lg font-bold text-pink-700 mb-4">SERVICES</h4>
          <motion.ul
            className="space-y-2 text-gray-600"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={listVariants}
          >
            {["Wishlist", "How To Order", "Our Story", "Privacy Policy", "Terms & Conditions"].map((text, idx) => (
              <motion.li key={idx} variants={itemVariants} className="hover:text-pink-500 transition">
                {text}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-bold text-pink-700 mb-4">SUPPORT</h4>
          <motion.ul
            className="space-y-2 text-gray-600"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={listVariants}
          >
            {["Contact", "Our Branches", "About", "Careers"].map((text, idx) => (
              <motion.li key={idx} variants={itemVariants} className="hover:text-pink-500 transition">
                {text}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Payments */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-bold text-pink-700 mb-4">PAYMENT METHODS</h4>
          <div className="flex space-x-4">
            <Image src={masterCard} alt="MasterCard" width={40} height={24} />
            <Image src={payPal} alt="PayPal" width={60} height={24} />
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="border-t border-pink-200 bg-pink-100">
        <div className="container mx-auto py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/">
            <Image src={Logo} alt="Logo" width={40} height={40} className="h-10 w-auto" />
          </Link>
          <p className="text-sm text-gray-600 text-center md:text-left">
            © {new Date().getFullYear()} Cake Haven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
