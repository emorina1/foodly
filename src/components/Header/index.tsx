import Link from "next/link";
import { usePathname } from "next/navigation"; 
import Logo from "@/assets/icons/logo.svg";
import cs from "classnames";

export function Header() {
    const pathname = usePathname(); 

    const items = [
        { 
          name: "Home", 
          pathName: "/" 
        },
        { 
          name: "About", 
          pathName: "/about" 
        },
        { 
          name: "Contact Us", 
          pathName: "/contact" 
        },
    ];

    return (
        <div className="py-2 fixed z-50 bg-white border-b w-full transition-all duration-300">
            <div className="container mx-auto flex items-center px-4">
                <Link href="/">
                    <picture>
                        <img className="h-10" src={Logo.src} alt="Logo" />
                    </picture>
                </Link>
                <div className="flex-1 flex gap-10 items-center justify-center">
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            href={item.pathName}
                            className={cs("text-black", {
                                "underline font-semibold": pathname === item.pathName,
                            })}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Header;
