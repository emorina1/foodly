import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/icons/logo.png";

export function Footer() {
  return (
    <div className="bg-pink-50 border-t border-pink-200">
      <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row items-center justify-between text-center gap-4">
        
        {/* Logo */}
        <Link href="/" className="hover:scale-105 transition-transform duration-300">
          <Image src={Logo} alt="Logo" width={48} height={48} className="drop-shadow" />
        </Link>

        {/* Text */}
        <p className="text-pink-600 font-medium">
          © {new Date().getFullYear()} Cake Haven. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
