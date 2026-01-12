import React from "react";

export default function Herooo() {
  return (
    <section className="w-full px-6 md:px-14 lg:px-20 py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
      
      {/* LEFT CONTENT */}
      <div className="flex-1">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          Explore. Learn. <br /> Achieve. Repeat.
        </h1>

        {/* Description */}
        <p className="text-gray-600 mt-4 max-w-md">
          At Neoplex, we make education accessible, interactive, and inspiring, helping
          you gain real-world skills through expert-led courses and a community of learners.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
            Explore Courses
          </button>

          <button className="px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition">
            How it works
          </button>
        </div>

        {/* User Count */}
        <div className="flex items-center gap-4 mt-8">
          {/* Profile images */}
          <div className="flex -space-x-3">
            <img
              src="https://i.pravatar.cc/40?img=1"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://i.pravatar.cc/40?img=2"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://i.pravatar.cc/40?img=3"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://i.pravatar.cc/40?img=4"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>

          <div>
            <p className="text-lg font-semibold">6M+</p>
            <p className="text-gray-600 text-sm">Users worldwide</p>
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="relative flex-1 flex justify-center">
        {/* Background gradient */}
        <div className="absolute -z-10 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-40"></div>

        {/* Hero Image */}
        <img
          src="/images/hero-person.png"
          alt="hero"
          className="w-[330px] md:w-[350px] lg:w-[380px] object-contain"
        />

        {/* Rating Card */}
        <div className="absolute bottom-10 left-4 md:left-10 bg-white shadow-lg p-4 rounded-xl flex items-center gap-3">
          <span className="text-blue-500 text-xl">⭐</span>
          <div>
            <p className="font-bold">4.9 <span className="text-gray-500 text-sm">/5.00</span></p>
            <p className="text-xs text-gray-600">Trusted by students</p>
          </div>
        </div>

        {/* Discount Badge */}
        <div className="absolute top-5 right-5 md:right-10 bg-white shadow-md px-4 py-2 rounded-full border border-blue-300">
          <p className="text-blue-600 font-semibold text-sm">20% OFF</p>
        </div>
      </div>
    </section>
  );
}
