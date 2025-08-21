// components/Header.js
"use client";
import React, { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";

const Header = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-black">Denmark Web</div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-black transition-colors"
            >
              Home
            </a>
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-black transition-colors">
                <span>Services</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Web Development
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    E-commerce
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Digital Marketing
                  </a>
                </div>
              )}
            </div>
            <a
              href="#About"
              className="text-gray-700 hover:text-black transition-colors"
            >
              About
            </a>
            <a
              href="#portfolio"
              className="text-gray-700 hover:text-black transition-colors"
            >
              Portfolio
            </a>

            <a
              href="#"
              className="text-gray-700 hover:text-black transition-colors"
            >
              Blogs
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-black transition-colors"
            >
              Career
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-black transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-black transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Language and CTA */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-700">
              <Globe className="w-5 h-5" />
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors flex items-center space-x-2">
              <span>Get Quote</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
