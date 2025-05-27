import Link from "next/link";
import { usePathname } from "next/navigation"; 
import Image from "next/image";
import Logo from "@/assets/icons/logo.png"; 
import cs from "classnames";

export function Header() {
    const pathname = usePathname(); 

    const items = [
        { name: "Home", pathName: "/" },
        { name: "About", pathName: "/about" },
        { name: "Contact Us", pathName: "/contact" },
        { name: "Blogs", pathName: "/blogs" },
        { name: "Recipes", pathName: "/recipes" }
    ];

    return (
        <div className="py-3 fixed z-50 bg-pink-50 border-b border-pink-200 w-full shadow-md transition-all duration-300">
            <div className="container mx-auto flex items-center px-6">
                {/* Logo */}
                <Link href="/">
                    <Image src={Logo} alt="Logo" width={48} height={48} className="drop-shadow-md" />
                </Link>

                {/* Navigation Items */}
                <div className="flex-1 flex gap-10 items-center justify-center">
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            href={item.pathName}
                            className={cs(
                                "text-pink-700 font-medium hover:text-pink-900 transition-colors duration-200",
                                {
                                    "underline underline-offset-4 decoration-pink-500 font-semibold": pathname === item.pathName,
                                }
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Login Button */}
                <div>
                    <Link href="/login">
                        <button className="bg-pink-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-pink-700 transition duration-200">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
