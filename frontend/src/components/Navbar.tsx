"use client";

import { TOKEN_COOKIE } from "@/network/constants";
import { deleteCookie } from "cookies-next";
import Link from "next/link";

const Navbar = () => {
  const handleLogout = () => {
    deleteCookie(TOKEN_COOKIE);
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="cursor-pointer text-white px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </span>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {/* Logout Link */}
            <Link href="/login">
              <span
                className="cursor-pointer bg-gray-500 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                onClick={handleLogout}
              >
                Logout
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/about">
            <span className="cursor-pointer text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              About
            </span>
          </Link>
          <Link href="/services">
            <span className="cursor-pointer text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Services
            </span>
          </Link>
          <Link href="/contact">
            <span className="cursor-pointer text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Contact
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
