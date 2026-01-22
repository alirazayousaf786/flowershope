"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const FlowerList = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const res = await axios.get("/api/flower");
        setFlowers(res.data.flowers); // API se flowers array
      } catch (err) {
        console.error("Error fetching flowers:", err);
      }
    };

    fetchFlowers();
  }, []);

  const whatsappNumber = "923013000940";

  const handleWhatsAppClick = (flower) => {
    const price = Number(flower.flowerPrice) || 0;
    const discount = (price * flower.promotionPercentage) / 100;
    const finalPrice = price - discount;

    const message = `Hello! I'm interested in: ${
      flower.flowerTitle
    }\nPrice: Rs ${finalPrice.toFixed(0)}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-rose-700 text-center mb-12">
        Our Flower Products
      </h1>

      {flowers.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No flowers available
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {flowers.map((flower) => {
            const originalPrice = Number(flower.flowerPrice) || 0;
            const discount =
              (originalPrice * flower.promotionPercentage) / 100;
            const discountedPrice = originalPrice - discount;

            return (
              <div
                key={flower._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition hover:-translate-y-2"
              >
                {/* Image */}
                <div className="w-full h-56 overflow-hidden relative">
                  <img
                    src={flower.imageFlowerURL}
                    alt={flower.flowerTitle}
                    className="w-full h-full object-contain transition"
                  />

                  {flower.promotionPercentage > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {flower.promotionPercentage}% OFF
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 bg-rose-50">
                  <h3 className="text-lg font-semibold text-rose-600 mb-3 text-center">
                    {flower.flowerTitle}
                  </h3>

                  {/* Price */}
                  <div className="mb-4 text-center">
                    {flower.promotionPercentage > 0 ? (
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
                    onClick={() => handleWhatsAppClick(flower)}
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

export default FlowerList;
