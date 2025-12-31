"use client";

import { useState } from "react";
import Image from "next/image";

const data = [
  {
    title: "Fresh Flowers Delivered",
    content: "We ensure fresh flowers are delivered on time, keeping your moments special.",
    img: "/flex.jpg",
  },
  {
    title: "Custom Arrangements",
    content: "Our expert florists create custom flower arrangements for any occasion.",
    img: "/flex.jpg",
  },
  {
    title: "Fast & Reliable Service",
    content: "Experience fast and reliable flower delivery across your city.",
    img: "/flex.jpg",
  },
  {
    title: "Affordable Prices",
    content: "Premium flowers without breaking the bank.",
    img: "/flex.jpg",
  },
];

const AccordionSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* LEFT - Accordion */}
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-rose-700 mb-4">
          Why Choose Flower Shop
        </h2>

        {data.map((item, index) => (
          <div key={index} className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
            <button
              className="w-full text-left px-6 py-4 bg-rose-50 text-gray-800 font-semibold flex justify-between items-center hover:bg-rose-100 transition"
              onClick={() => toggle(index)}
            >
              {item.title}
              <span className="text-2xl">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>
            {activeIndex === index && (
              <div className="px-6 py-4 bg-white text-gray-600 transition">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* RIGHT - Image */}
      <div className="flex justify-center md:justify-end">
        <div className="relative w-full max-w-md h-96 rounded-2xl shadow-lg overflow-hidden">
          <Image
            src={activeIndex !== null ? data[activeIndex].img : data[0].img}
            alt="Accordion"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default AccordionSection;
