"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image"; 
import { Button } from "./ui/button";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { src: "/features", name: "Features" },
  { src: "/impact", name: "Impact" },
  { src: "/track", name: "Track" },
  { src: "/about", name: "About" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
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
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5">
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
          <SignedOut>
            <Button size={"lg"} className="font-spaceGrotesk text-[16px] font-bold py-4 transition-all">
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white-1 border-t border-white-6 px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.src}
              className="font-spaceGrotesk font-bold"
              onClick={() => setMobileOpen(false)}
            >
              <div className="active:scale-[0.9] rounded-lg p-3 hover:bg-black-6 hover:text-white-5 transition-all">
                {item.name}
              </div>
            </Link>
          ))}
          <SignedOut>
            <Button size={"lg"} className="font-spaceGrotesk text-[16px] font-bold py-4 transition-all w-full">
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      )}
    </header>
  );
};

export default Navbar;
