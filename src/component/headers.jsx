'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Active class function (without types)
  const navClass = (path) =>
    pathname === path
      ? "text-rose-600 font-semibold border-b-2 border-rose-600 pb-1"
      : "text-gray-700 hover:text-rose-600 transition";

  return (
    <header className="bg-rose-100/80 backdrop-blur sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-20 h-20 relative bg-rose-600 text-white flex items-center justify-center rounded-full overflow-hidden">
            <Image
              src="/logo.jpg"
              alt="Paradise Flower Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="text-3xl font-bold text-rose-700 dancing-heading">
            Paradise Flower
          </span>
        </Link>

        {/* NAV LINKS (DESKTOP) */}
        <nav className="hidden md:flex gap-8 text-sm">
          <Link href="/" className={navClass("/")}>
            Home
          </Link>
          <Link href="/about" className={navClass("/about")}>
            About
          </Link>
          <Link href="/product" className={navClass("/product")}>
            Product
          </Link>
          <Link href="/service" className={navClass("/service")}>
            Service
          </Link>
        </nav>

        {/* CONTACT BUTTON (DESKTOP) */}
        <div className="hidden md:block">
          <Link href="/contact">
            <button className="bg-rose-600 text-white px-6 py-2 rounded-full hover:bg-rose-700 shadow-md transition">
              Contact Me
            </button>
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-3xl text-rose-700"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-rose-50 px-6 pb-6 rounded-b-2xl shadow-inner">
          <nav className="flex flex-col gap-5 text-center text-base">
            <Link
              href="/"
              className={navClass("/")}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={navClass("/about")}
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link
              href="/product"
              className={navClass("/product")}
              onClick={() => setOpen(false)}
            >
              Product
            </Link>
            <Link
              href="/service"
              className={navClass("/service")}
              onClick={() => setOpen(false)}
            >
              Service
            </Link>

            <Link href="/contact" onClick={() => setOpen(false)}>
              <button className="mt-3 bg-rose-600 text-white py-2 rounded-full hover:bg-rose-700 w-full">
                Contact Me
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;