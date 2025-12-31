"use client"; 

import { useState } from "react";

const OfferBanner = () => {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(true);
  const couponCode = "FLOWER20";

  const copyCoupon = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (!visible) return null;

  return (
    <div className="max-w-7xl mx-auto px-5 mt-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg transition-all duration-500">

        {/* Close Button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 z-20 text-white text-xl hover:text-white/80 transition-colors"
          title="Close banner"
          aria-label="Close offer banner"
        >
          ✕
        </button>

        {/* Decorative Flower */}
        <div className="absolute -top-10 -right-10 text-white/20 text-[160px] md:text-[200px] pointer-events-none">
          🌸
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-12">

          {/* Left Text */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              🌷 Special Offer!
            </h2>
            <p className="mt-3 text-lg md:text-xl font-medium">
              Get <span className="font-bold underline">20% OFF</span> on your first order
            </p>
            <p className="mt-1 text-sm md:text-base text-white/90">
              Use coupon code below at checkout
            </p>
          </div>

          {/* Coupon Box */}
          <div className="bg-white text-rose-600 rounded-2xl px-6 py-5 flex items-center gap-4 shadow-xl min-w-[240px] md:min-w-[280px]">
            <span className="font-mono font-bold text-xl md:text-2xl tracking-wider">
              {couponCode}
            </span>

            <button
              onClick={copyCoupon}
              className="p-3 rounded-full bg-rose-100 hover:bg-rose-200 transition-colors duration-200"
              title="Copy coupon code"
              aria-label="Copy coupon code"
            >
              {/* Copy Icon */}
              <svg
                className="w-6 h-6 text-rose-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Copied Toast */}
        {copied && (
          <div className="absolute bottom-4 right-6 bg-white text-rose-600 px-5 py-3 rounded-full text-sm font-medium shadow-lg animate-bounce">
            ✅ Coupon Copied!
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferBanner;