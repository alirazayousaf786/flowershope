"use client";
import React from "react";
import { Gift, Heart, Cake, Car } from "lucide-react";
import Image from "next/image";

const GiftingGrid = () => {
  const giftCategories = [
    {
      id: 1,
      title: "Anniversary Special",
      description: "Celebrate your love with beautiful flower arrangements",
      image: "/f10.jpg",
      icon: Heart,
    },
    {
      id: 2,
      title: "Cake Decor",
      description: "Thoughtful Cake gifts wrapped with love and care",
      image: "/cack1.jpg",
      icon: Gift,
    },
    {
      id: 3,
      title: "Room Decor",
      description: "Make their special day memorable with our arrangements",
      image: "/mesairi-1.jpg",
      icon: Cake,
    },
    {
      id: 4,
      title: "Balloon decor",
      description: "Beautiful flower decorations for your special occasions",
      image: "/bridthday-1.jpg",
      icon: Car,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {giftCategories.map((category, index) => {
            const IconComponent = category.icon;

            return (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`,
                }}
              >
                {/* Image */}
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={index < 2}
                  />

                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-rose-500/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-rose-600 transition-all">
                    <IconComponent className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Overlay Text */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl md:text-2xl font-light text-white mb-2 tracking-wide">
                    {category.title}
                  </h3>
                  <p className="text-sm text-white/90 font-light mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {category.description}
                  </p>
                  <button className="px-5 py-2 border border-white/70 text-white text-sm tracking-widest font-medium rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-rose-500 hover:border-rose-500 transition-all duration-300 delay-200">
                    SHOP NOW
                  </button>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Cities Section */}
      <div className="mt-20 max-w-7xl mx-auto bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-rose-100">
        <h3 className="text-4xl font-bold text-rose-800 mb-6 text-center">
          Service Cities in Pakistan 🇵🇰
        </h3>

        <p className="text-gray-700 text-lg md:text-xl text-center leading-relaxed mb-10 max-w-4xl mx-auto">
          We proudly provide our flower and decoration services in the following cities:
        </p>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-rose-700 font-medium text-lg">
          <span>• Arifwala</span>
          <span>• Pakpattan</span>
          <span>• Islamabad</span>
          <span>• Faisalabad</span>
          <span>• Okara</span>
          <span>• Sahiwal</span>
          <span>• Chichawatni</span>
        </div>
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default GiftingGrid;