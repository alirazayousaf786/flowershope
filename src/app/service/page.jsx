import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

const services = [
  {
    title: "Gift Deals",
    description:
      "Send love and happiness with our curated gift flower arrangements. Perfect for birthdays, anniversaries, or any special occasion.",
    img: "/gift.jpeg",
    rate: "Starting at 1000",
  },
  {
    title: "Anniversary Deals",
    description:
      "Make your anniversaries unforgettable with premium floral arrangements designed to impress your loved one.",
    img: "/f2.jpg",
    rate: "Starting at 2000",
  },
  {
    title: "Birthday Setup",
    description:
      "Celebrate birthdays with vibrant and fresh flowers. Our birthday bouquets are designed to brighten anyone’s day.",
    img: "/f5.jpg",
    rate: "Starting at 15000",
  },
  {
    title: "Rooms Decor",
    description:
      "Elegant and luxurious wedding flower arrangements to make your special day magical and memorable.",
    img: "/mesairi-2.jpg",
    rate: "Starting at 20000",
  },
  {
    title: "Car Decor",
    description:
      "Premium floral car decoration for weddings, anniversaries, and special celebrations.",
    img: "/car3.jpg",
    rate: "Starting at 15000",
  },
  {
    title: "Birthday Decoration",
    description:
      "Bring life and freshness to your home with our designer flower arrangements.",
    img: "/bridthday-1.jpg",
    rate: "Starting at 20000",
  },
  {
    title: "Cakes by Paradise",
    description:
      "Decorate your celebrations with delicious and beautifully designed cakes.",
    img: "/cack1.jpg",
    rate: "Starting at 3000",
  },
];

const Service = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-rose-700 text-center mb-12">
        Our Services 🌸
      </h1>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col"
          >
            <Image
              src={service.img}
              alt={service.title}
              width={400}
              height={250}
              className="w-full h-56 object-contain"
            />

            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-semibold text-rose-600 mb-2">
                {service.title}
              </h2>

              <p className="text-gray-600 mb-4 flex-grow">
                {service.description}
              </p>

              <p className="text-rose-700 font-bold mb-4">
                {service.rate}
              </p>

              {/* Order Now Button */}
              <a
                href={`https://wa.me/923013000940?text=I want to order: ${service.title}`}
                target="_blank"
                className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition"
              >
                <FaWhatsapp size={22} />
                Order Now
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Cities Section */}
      <div className="mt-16 bg-rose-50 rounded-3xl p-10 shadow-inner">
        <h3 className="text-3xl font-bold text-rose-700 mb-6 text-center">
          Service Cities in Pakistan 🇵🇰
        </h3>

        <p className="text-gray-700 text-lg md:text-xl text-center leading-relaxed">
          We proudly provide our flower and decoration services in the following cities:
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4 text-rose-700 font-semibold text-lg">
          <span>Arifwala</span>
          <span>• Pakpattan</span>
          <span>• Islamabad</span>
          <span>• Faisalabad</span>
          <span>• Okara</span>
          <span>• Sahiwal</span>
          <span>• Chichawatni</span>
        </div>
      </div>
    </div>
  );
};

export default Service;
