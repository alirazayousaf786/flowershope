"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const ImageGallery = () => {
  const galleryRef = useRef(null);

  // Direct paths array - no imports needed
  const images = [
    "/f10.jpg",
    "/f2.jpg",
    "/f3.jpg",
    "/f4.jpg",
    "/f5.jpg",
    "/f6.jpg",
    "/f7.jpg",
    "/f8.jpg",
    "/f9.jpg",
    "/m3.jpg",
    "/cack2.jpg",
    "/cack4.jpg",
    "/m3.jpg",
    "/m4.jpg",
    "/mesairi-1.jpg",
    "/mesairi-2.jpg",
    "/car3.jpg",
    "/car4.jpg"
  ];

  const scrollLeft = () => {
    galleryRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    galleryRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto mt-16 px-4 relative">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-rose-100 hover:scale-110 transition-all duration-300"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6 text-rose-600" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-rose-100 hover:scale-110 transition-all duration-300"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6 text-rose-600" />
      </button>

      {/* Image Scroll Container */}
      <div
        ref={galleryRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide py-4 scroll-smooth"
      >
        {images.map((imagePath, index) => (
          <div
            key={index}
            className="flex-shrink-0 group cursor-pointer"
          >
            <div className="relative w-64 h-64 md:w-72 md:h-72 overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500">
              <Image
                src={imagePath}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 33vw"
                loading={index < 6 ? "eager" : "lazy"}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Custom Scrollbar Hide (Tailwind utility) */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ImageGallery;