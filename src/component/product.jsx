import React from "react";
import Image from "next/image"; 
import Link from "next/link"; 

const products = [
  { id: 1, name: "Gift", img: "/f1.jpg", rate: "PKR 2,400" },
  { id: 2, name: "Flower Box", img: "/f2.jpg", rate: "PKR 1,800" },
  { id: 3, name: "Bouquet", img: "/f3.jpg", rate: "PKR 2,200" },
  { id: 4, name: "Bouquet", img: "/f4.jpg", rate: "PKR 2,200" },
  { id: 5, name: "Bouquet", img: "/f4.jpg", rate: "PKR 2,200" },
];

const Product = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-rose-700">
          Our Products 🌸
        </h1>

        <Link href="/product">
          <button className="px-6 py-3 border-2 border-rose-600 text-rose-600 font-semibold rounded-xl hover:bg-rose-600 hover:text-white transition duration-300">
            More Products
          </button>
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
          >
            <div className="relative h-52 md:h-64">
              <Image
                src={product.img}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                priority={product.id <= 3}
              />
            </div>

            <div className="p-5 text-center">
              <h2 className="text-xl font-semibold text-rose-600 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-800 font-bold text-lg">
                {product.rate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;