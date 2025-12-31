import React from 'react';
import Image from 'next/image';

const testimonials = [
  {
    name: "Sarah Khan",
    message: "Absolutely loved the flower arrangement! Made our anniversary special 🌹",
    img: "/image.png"  
  },
  {
    name: "Ali Raza",
    message: "Best service ever! My wedding decoration looked amazing thanks to Flower Shop 🌸",
    img: "/image1.png"  
  },
  {
    name: "Fatima Noor",
    message: "High quality flowers and fast delivery. Highly recommend! 💐",
    img: "/image2.png"  
  },
  {
    name: "Hassan Ali",
    message: "Creative and beautiful flower designs. Will order again! 🌷",
    img: "/image3.png"  
  },
];

const Testimonial = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 mt-16 mb-16">
      <h2 
        className="text-3xl md:text-4xl font-light text-rose-700 text-center mb-12"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        What Our Customers Say
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center"
          >
            <div className="relative w-20 h-20 mb-4">
              <Image
                src={t.img}
                alt={t.name}
                fill
                className="object-cover rounded-full border-4 border-rose-100"
                sizes="80px"
              />
            </div>
            <p 
              className="text-gray-600 mb-3 text-sm leading-relaxed"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {t.message}
            </p>
            <h4 
              className="text-rose-600 font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {t.name}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
