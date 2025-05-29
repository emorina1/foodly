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

  const items = [
    { name: "Home", pathName: "/" },
    { name: "About", pathName: "/about" },
    { name: "Contact Us", pathName: "/contact" },
    { name: "Products", pathName: "/products" },
    { name: "Events", pathName: "/events" },
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
        </div>

        {/* Login/Logout Buttons */}
        <div className="flex gap-5">
          {status === "authenticated" ? (
            <Button onClick={() => signOut({ callbackUrl: "/sign-in" })} text="Dil" />
          ) : (
            <>
              <Button onClick={() => router.push("/sign-up")} text="Regjistrohu" />
              <Button onClick={() => router.push("/sign-in")} variant="secondary" text="Login" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
