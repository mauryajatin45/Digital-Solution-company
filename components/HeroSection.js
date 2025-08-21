// components/HeroSection.js
"use client";
import React from "react";
import FloatingIcons from "./FloatingIcons";

const HeroSection = () => {
  const services = [
    "Websites",
    "Design Services",
    "Organic Search",
    "Paid Social",
    "CRO",
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-gray-600 text-lg tracking-wide">
                established 2018 • copenhagen, denmark
              </p>

              <h1 className="text-6xl lg:text-7xl font-bold text-black leading-tight">
                CREATIVE SOLUTIONS
                <span className="block border-b-4 border-black pb-2 inline-block">
                  .
                </span>
              </h1>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed max-w-lg">
                we craft exceptional digital experiences for ambitious
                businesses. from web development to hosting solutions, we've
                been denmark's trusted digital partner for over 6 years.
              </p>
            </div>

            {/* Service Tags */}
            <div className="flex flex-wrap gap-3 pt-4">
              {services.map((service, index) => (
                <span
                  key={service}
                  className="px-6 py-3 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  {service}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-3 group">
                <span>Start Your Project</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </button>
            </div>
          </div>

          {/* Right side - Visual space for floating icons */}
          <div className="relative h-96 lg:h-full">
            {/* This space is for the floating icons component overlay */}
          </div>
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent_50%)] pointer-events-none"></div>
      
      {/* Floating Icons - Only visible in Hero section */}
      <FloatingIcons section="hero" />
    </section>
  );
};

export default HeroSection;
