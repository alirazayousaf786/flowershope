"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function PromotionForm() {
  const [category, setCategory] = useState("");
  const [percentage, setPercentage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fixingPrices, setFixingPrices] = useState(false);
  const [message, setMessage] = useState("");

  const categories = [
    "mesairi",
    "car",
    "cake",
    "birthday",
    "flower",
    "stage",
    "jewelry",
  ];

  const submitPromotion = async () => {
    if (!category || !percentage) {
      setMessage("Please select category and enter discount ❌");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      await axios.post("/api/promotion", { category, percentage });
      setMessage("Promotion Applied Successfully 🎉");
      toast.success("Promotion Applied Successfully 🎉");
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      console.error(err);
      setMessage("Failed to apply promotion ❌");
      toast.error("Failed to apply promotion ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleFixPrices = async () => {
    const defaultPriceInput = prompt(
      `Enter default price for all ${category} items:`,
      "100"
    );
    if (!defaultPriceInput) return;

    const defaultPrice = Number(defaultPriceInput);
    if (isNaN(defaultPrice) || defaultPrice <= 0) {
      setMessage("Invalid price entered ❌");
      return;
    }

    setFixingPrices(true);
    setMessage("");

    try {
      const res = await axios.post("/api/promotion/fix-prices", {
        category,
        defaultPrice,
      });
      setMessage(
        res.data.message ||
          `✅ Fixed ${res.data.details?.fixedCount || 0} items with price $${defaultPrice}`
      );
      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error fixing prices ❌");
    } finally {
      setFixingPrices(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🎉 Set Promotion</h2>
          <p className="text-gray-600 text-sm">Apply discount to all items in a category</p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg text-center font-medium text-sm ${
              message.includes("❌")
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-green-50 text-green-700 border border-green-200"
            }`}
          >
            {message}
          </div>
        )}

        <div className="space-y-5">
          {/* Category Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Discount Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Discount Percentage
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="Enter discount percentage"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-lg"
                min={0}
                max={100}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">
                %
              </span>
            </div>

            {/* Quick select buttons */}
            <div className="flex gap-2 mt-3">
              {[10, 20, 30, 50].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setPercentage(val)}
                  className="flex-1 px-3 py-2 text-sm bg-gray-100 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-colors font-medium"
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>

          {/* Fix Prices Button */}
          <button
            type="button"
            onClick={handleFixPrices}
            disabled={fixingPrices}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {fixingPrices ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Fixing Prices...
              </span>
            ) : (
              "🔧 Fix Missing Prices First"
            )}
          </button>

          {/* Submit Button */}
          <button
            type="button"
            onClick={submitPromotion}
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:from-rose-700 hover:to-pink-700 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Applying...
              </span>
            ) : (
              "✨ Apply Promotion"
            )}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            💡 First fix prices, then apply promotion to see discounts
          </p>
        </div>
      </div>
    </div>
  );
}
