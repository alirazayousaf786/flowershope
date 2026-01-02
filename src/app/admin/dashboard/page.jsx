"use client";

import { useRouter } from "next/navigation";
import {
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
  FaLeaf,
} from "react-icons/fa";

export default function AdminDashboard() {
  const router = useRouter();

  // Logout function
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include", 
      });
      router.push("/admin"); // Redirect to login
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="space-y-10 p-6">
      {/* 🌸 Header */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 text-white p-8 rounded-3xl shadow-xl flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-wide">
            ParadiseFlower 🌸
          </h1>
          <p className="mt-2 text-lg text-pink-100">
            Premium Flower Shop Dashboard
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white text-red-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>

      {/* 📊 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Users */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-pink-100 text-pink-600 rounded-xl text-2xl">
              <FaUsers />
            </div>
            <div>
              <p className="text-gray-500">Customers</p>
              <p className="text-3xl font-bold">120</p>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-rose-100 text-rose-600 rounded-xl text-2xl">
              <FaShoppingCart />
            </div>
            <div>
              <p className="text-gray-500">Orders</p>
              <p className="text-3xl font-bold">45</p>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-green-100 text-green-600 rounded-xl text-2xl">
              <FaMoneyBillWave />
            </div>
            <div>
              <p className="text-gray-500">Revenue</p>
              <p className="text-3xl font-bold">Rs 320,000</p>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-purple-100 text-purple-600 rounded-xl text-2xl">
              <FaLeaf />
            </div>
            <div>
              <p className="text-gray-500">Flower Products</p>
              <p className="text-3xl font-bold">68</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🌹 Info Section */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-rose-700">
          Welcome to ParadiseFlower 🌷
        </h2>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          ParadiseFlower is a premium flower shop offering elegant bouquets,
          birthday flowers, anniversary arrangements, and luxury floral gifts.
          Manage your products, orders, and promotions from this powerful
          dashboard.
        </p>
      </div>

      {/* 🚀 Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold">Add New Flowers</h3>
          <p className="text-sm mt-2 text-pink-100">
            Upload new flower products & bouquets
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold">Manage Orders</h3>
          <p className="text-sm mt-2 text-green-100">
            Track & process customer orders
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold">Run Promotions</h3>
          <p className="text-sm mt-2 text-purple-100">
            Set discounts & special offers
          </p>
        </div>
      </div>
    </div>
  );
}
