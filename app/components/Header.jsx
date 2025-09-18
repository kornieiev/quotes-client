"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ toggleTheme, isDarkMode }) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Random" },
    { href: "/search", label: "Search" },
  ];

  return (
    <header className='max-w-6xl mx-auto px-12 py-4 w-full bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700'>
      <div className='flex justify-between items-center'>
        {/* Logo/Title */}
        <div className='flex items-center'>
          <Link
            // key={navLinks[0].link.href}
            // href={navLinks[0].link.href}
            key={"/"}
            href={"/"}
          >
            <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-200'>
              Quotes App
            </h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className='flex space-x-8'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      {/* Theme Toggle */}
      <ThemeToggle onClick={toggleTheme} isDarkMode={isDarkMode} />
    </header>
  );
}
