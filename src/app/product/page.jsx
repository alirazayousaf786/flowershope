"use client";

import { useState } from "react";
import Follawr from "@/component/flower.jsx";
import Mesairi from "@/component/mesairi.jsx";
import CarDecoration from "@/component/car.jsx";
import Bridthday from "@/component/bridthday.jsx";
import Stage from "@/component/stage.jsx";
import Cack from "@/component/cake.jsx";
import Jewelry from "@/component/jewelry.jsx";

export default function Products() {
  const [active, setActive] = useState("follawr");

  return (
    <section className="p-4">
      {/* Buttons */}
      <div className="flex justify-center">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mb-6">
          <button
            onClick={() => setActive("follawr")}
            className={`px-8 py-4 text-lg rounded-xl font-semibold transition
              ${active === "follawr" ? "bg-pink-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Bouquet
          </button>

          <button
            onClick={() => setActive("mesairi")}
            className={`px-8 py-4 text-lg rounded-xl font-semibold transition
              ${active === "mesairi" ? "bg-pink-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Mesairi Decor
          </button>

          <button
            onClick={() => setActive("car")}
            className={`px-8 py-4 text-lg rounded-xl font-semibold transition
              ${active === "car" ? "bg-pink-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Car Decor
          </button>

          <button
            onClick={() => setActive("birthday")}
            className={`px-8 py-4 text-lg rounded-xl font-semibold transition
              ${active === "birthday" ? "bg-pink-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Birthday Decor
          </button>

          <button
            onClick={() => setActive("stage")}
            className={`px-8 py-4 text-lg rounded-xl font-semibold transition
              ${active === "stage" ? "bg-pink-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Stage Decor
          </button>

          <button
            onClick={() => setActive("cack")}
            className={`px-8 py-4 text-lg rounded-xl font-semibold transition
              ${active === "cack" ? "bg-pink-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Cack
          </button>

          <button
            onClick={() => setActive("jewelry")}
            className={`px-8 py-4 text-lg rounded-xl font-semibold transition
              ${active === "jewelry" ? "bg-pink-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Jewelry
          </button>
        </div>
      </div>

      {/* Data Section */}
      <div className="w-full">
        {active === "follawr" && <Follawr />}
        {active === "mesairi" && <Mesairi />}
        {active === "car" && <CarDecoration />}
        {active === "birthday" && <Bridthday />}
        {active === "stage" && <Stage />}
        {active === "cack" && <Cack />}
        {active === "jewelry" && <Jewelry />}
      </div>
    </section>
  );
}
