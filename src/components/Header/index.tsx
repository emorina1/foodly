import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/icons/logo.png";
import cs from "classnames";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAdmin = session?.user?.role === "admin";
  const isUser = session?.user && !isAdmin;

  const items = [
    { name: "Home", pathName: "/" },
    ...(!isAdmin
      ? [
          { name: "About", pathName: "/about" },
          { name: "Contact Us", pathName: "/contact" },
        ]
      : []),
    { name: "Products", pathName: "/products" },
    { name: "Events", pathName: "/events" },
    { name: "Recipes", pathName: "/recipes" },
    ...(isUser ? [{ name: "Cart", pathName: "/cart" }] : []),
  ];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="py-3 fixed z-50 bg-pink-50 border-b border-pink-200 w-full shadow-md transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" onClick={closeMenu}>
          <Image src={Logo} alt="Logo" width={48} height={48} className="drop-shadow-md" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 gap-10 items-center justify-center">
          {items.map((item) => (
            <Link
              key={item.pathName}
              href={item.pathName}
              className={cs(
                "text-pink-700 font-serif text-lg hover:text-pink-900 transition-colors duration-200",
                {
                  "underline underline-offset-4 decoration-pink-500 font-bold":
                    pathname === item.pathName,
                }
              )}
            >
              {item.name}
            </Link>
          ))}

          {isAdmin && (
            <Link
              href="/dashboard/admin"
              className={cs(
                "text-pink-700 font-serif text-lg hover:text-pink-900 transition-colors duration-200",
                {
                  "underline underline-offset-4 decoration-pink-500 font-bold":
                    pathname === "/dashboard/admin",
                }
              )}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex gap-5">
          {status === "authenticated" ? (
            <button
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
              className="bg-pink-500 hover:bg-pink-600 text-white font-sans font-semibold px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Log out
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push("/sign-up")}
                className="bg-pink-500 hover:bg-pink-600 text-white font-sans font-semibold px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Register
              </button>
              <button
                onClick={() => router.push("/sign-in")}
                className="bg-white border border-pink-500 text-pink-600 hover:bg-pink-50 font-sans font-semibold px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Login
              </button>
            </>
          )}
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-pink-700">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 bg-pink-50 border-t border-pink-200">
          {items.map((item) => (
            <Link
              key={item.pathName}
              href={item.pathName}
              onClick={closeMenu}
              className={cs(
                "text-pink-700 text-base font-medium hover:text-pink-900 transition-colors duration-200",
                {
                  "underline underline-offset-4 decoration-pink-500 font-bold":
                    pathname === item.pathName,
                }
              )}
            >
              {item.name}
            </Link>
          ))}

          {isAdmin && (
            <Link
              href="/dashboard/admin"
              onClick={closeMenu}
              className={cs(
                "text-pink-700 text-base font-medium hover:text-pink-900 transition-colors duration-200",
                {
                  "underline underline-offset-4 decoration-pink-500 font-bold":
                    pathname === "/dashboard/admin",
                }
              )}
            >
              Dashboard
            </Link>
          )}

          {status === "authenticated" ? (
            <button
              onClick={() => {
                closeMenu();
                signOut({ callbackUrl: "/sign-in" });
              }}
              className="mt-2 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-xl transition-all"
            >
              Log out
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  router.push("/sign-up");
                  closeMenu();
                }}
                className="mt-2 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-xl transition-all"
              >
                Register
              </button>
              <button
                onClick={() => {
                  router.push("/sign-in");
                  closeMenu();
                }}
                className="bg-white border border-pink-500 text-pink-600 hover:bg-pink-100 px-5 py-2 rounded-xl transition-all"
              >
                Login
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
