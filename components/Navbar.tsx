import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image"; 
import { Button } from "./ui/button";

const navItems = [
  { src: "/features", name: "Features" },
  { src: "/impact", name: "Impact" },
  { src: "/track", name: "Track" },
  { src: "/about", name: "About" },
];

const Navbar = () => {
  return (
    <header className="w-full bg-white-1 border-b border-white-6">
      <nav className="flex justify-between items-center px-6 md:px-20 py-4">
        <Link href="/" className="flex items-center gap-2">
          {/* Logo Image */}
          <Image
            src="/assets/images/ts.png" 
            alt="TourSafe Logo"
            width={300}  
            height={200} 
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.src}
              className="font-spaceGrotesk font-bold"
            >
              <div className="active:scale-[0.9] rounded-lg p-3 hover:bg-black-6 hover:text-white-5 transition-all">
                {item.name}
              </div>
            </Link>
          ))}

          {/* Conditional rendering based on sign-in state */}
          <SignedOut>
            <Button size={"lg"} className="font-spaceGrotesk text-[16px] font-bold py-4 transition-all">
              <SignInButton />
            </Button>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
