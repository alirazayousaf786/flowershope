"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const StageList = () => {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/stage");
        // API mein key "stage" hai (singular), "stages" nahi
        setStages(res.data.stage || []);
      } catch (err) {
        console.error("Error fetching stages:", err);
        setStages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStages();
  }, []);

  const whatsappNumber = "923013000940";

  // Helper: Price formatting with commas
  const formatPrice = (price) => {
    return Math.round(price).toLocaleString("en-US");
  };

  // Helper: Calculate discounted price safely
  const calculateDiscountedPrice = (price, percentage) => {
    const discounted = price * (1 - percentage / 100);
    return Math.round(discounted); // round to nearest integer
  };

  const handleWhatsAppClick = (item) => {
    const originalPrice = Number(item.stagePrice) || 0;
    const discountedPrice = calculateDiscountedPrice(originalPrice, item.promotionPercentage);

    const message = `Assalam o Alaikum!

I'm interested in this beautiful stage:

🎤 ${item.stageTitle}
💰 Original Price: Rs ${formatPrice(originalPrice)}
${item.promotionPercentage > 0 
  ? `🔥 Discount: ${item.promotionPercentage}% OFF\n✅ Final Price: Rs ${formatPrice(discountedPrice)}`
  : `💲 Price: Rs ${formatPrice(originalPrice)}`
}

Please confirm availability and delivery details.

JazakAllah!`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-rose-700 text-center mb-12">
        Our Stage Designs
      </h1>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading beautiful stages...</p>
      ) : stages.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No stages available at the moment
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {stages.map((item) => {
            const originalPrice = Number(item.stagePrice) || 0;
            const discountedPrice = calculateDiscountedPrice(originalPrice, item.promotionPercentage);
            const savings = originalPrice - discountedPrice;

            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={item.imageStageURL || "/placeholder.jpg"} // fallback image
                    alt={item.stageTitle}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    priority={false}
                  />

                  {/* Promotion Badge */}
                  {item.promotionPercentage > 0 && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-md">
                      {item.promotionPercentage}% OFF
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 bg-rose-50">
                  <h3 className="text-lg font-semibold text-rose-700 mb-4 text-center min-h-16 flex items-center justify-center">
                    {item.stageTitle}
                  </h3>

                  {/* Price Section */}
                  <div className="mb-5 text-center">
                    {item.promotionPercentage > 0 ? (
                      <>
                        <div className="text-gray-500 line-through text-sm mb-1">
                          Rs {formatPrice(originalPrice)}
                        </div>
                        <div className="text-rose-600 font-bold text-3xl mb-2">
                          Rs {formatPrice(discountedPrice)}
                        </div>
                        <div className="text-green-600 font-medium text-sm">
                          Save Rs {formatPrice(savings)}!
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-800 font-bold text-3xl">
                        Rs {formatPrice(originalPrice)}
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Button */}
                  <button
                    onClick={() => handleWhatsAppClick(item)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.902.906-3.693-.222-.335a9.82 9.82 0 01-1.418-5.027c.016-5.363 4.394-9.717 9.777-9.717 2.606 0 5.057 1.016 6.902 2.858 1.845 1.841 2.858 4.294 2.858 6.902-.016 5.363-4.394 9.717-9.777 9.717m9.777-19.434c-6.074 0-11 4.926-11 11s4.926 11 11 11 11-4.926 11-11-4.926-11-11-11z"/>
                    </svg>
                    Order via WhatsApp
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

export default StageList;