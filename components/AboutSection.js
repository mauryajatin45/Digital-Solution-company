// components/AboutSection.js
"use client";
import React from "react";

const AboutSection = () => {
  return (
    <section className="bg-white relative py-20" id="About">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-5xl">
          {/* Divider with text (Who we are) */}
          <div className="flex items-center gap-4 mb-6" role="separator" aria-label="Who we are">
            <span className="text-sm font-medium tracking-wider uppercase text-gray-900">
              Who we are
            </span>
            <span className="h-px w-full bg-gray-300" />
          </div>

          {/* Heading with faded part and line breaks like Elementor */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
            We help ambitious companies grow by creating
            <br className="hidden md:block" /> extraordinary digital solutions.{" "}
            <span className="text-black/25">
              Our goal is to <br className="hidden md:block" />
              make you a market leader in your industry.
            </span>
          </h2>

          {/* Read More button */}
          <div className="pt-8">
            <a
              href="https://obtino.com/about/"
              className="inline-flex items-center gap-2 text-black font-medium border-b-2 border-black pb-1 hover:opacity-80 transition"
            >
              Read More
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
