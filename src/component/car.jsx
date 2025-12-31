"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("/api/car");
        setCars(res.data.cars); // API se cars array
      } catch (err) {
        console.error("Error fetching cars:", err);
      }
    };

    fetchCars();
  }, []);

  const whatsappNumber = "923013000940";

  const handleWhatsAppClick = (car) => {
    const price = Number(car.carPrice) || 0;
    const discount = (price * car.promotionPercentage) / 100;
    const finalPrice = price - discount;

    const message = `Hello! I'm interested in this car:
${car.carTitle}
Price: Rs ${finalPrice.toFixed(0)}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-rose-700 text-center mb-12">
        Our Car Collection
      </h1>

      {cars.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No cars available
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {cars.map((car) => {
            const originalPrice = Number(car.carPrice) || 0;
            const discount =
              (originalPrice * car.promotionPercentage) / 100;
            const discountedPrice = originalPrice - discount;

            return (
              <div
                key={car._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition hover:-translate-y-2"
              >
                {/* Image */}
                <div className="w-full h-56 overflow-hidden relative">
                  <img
                    src={car.imageCarURL}
                    alt={car.carTitle}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />

                  {car.promotionPercentage > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {car.promotionPercentage}% OFF
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 bg-rose-50">
                  <h3 className="text-lg font-semibold text-rose-600 mb-3 text-center">
                    {car.carTitle}
                  </h3>

                  {/* Price */}
                  <div className="mb-4 text-center">
                    {car.promotionPercentage > 0 ? (
                      <>
                        <div className="text-gray-500 line-through text-sm">
                          Rs {originalPrice}
                        </div>
                        <div className="text-rose-600 font-bold text-2xl">
                          Rs {discountedPrice}
                        </div>
                        <div className="text-green-600 text-xs">
                          Save Rs {discount}!
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-800 font-bold text-2xl">
                        Rs {originalPrice}
                      </div>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <button
                    onClick={() => handleWhatsAppClick(car)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CarList;
