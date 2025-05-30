import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/icons/logo.png";
import cs from "classnames";
import { signOut, useSession } from "next-auth/react";
import Button from "../shared/Button";
import { useRouter } from "next/router";

export function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const isAdmin = session?.user?.role === "admin";

  const items = [
    { name: "Home", pathName: "/" },
    // Hide both About and Contact for admin users
    ...(!isAdmin ? [
      { name: "About", pathName: "/about" },
      { name: "Contact Us", pathName: "/contact" },
    ] : []),
    { name: "Products", pathName: "/products" },
    { name: "Events", pathName: "/events" },
    { name: "Recipes", pathName: "/recipes" },
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
          {items.map((item) => (
            <Link
              key={item.pathName}
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

          {isAdmin && (
            <Link
              href="/dashboard/admin"
              className={cs(
                "text-pink-700 font-medium hover:text-pink-900 transition-colors duration-200",
                {
                  "underline underline-offset-4 decoration-pink-500 font-semibold": pathname === "/dashboard/admin",
                }
              )}
            >
              Dashboard
            </Link>
          )}
        </div>

        <div className="flex gap-5">
          {status === "authenticated" ? (
            <button
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Log out
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push("/sign-up")}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Register
              </button>
              <button
                onClick={() => router.push("/sign-in")}
                className="bg-white border border-pink-500 text-pink-600 hover:bg-pink-50 font-semibold px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
