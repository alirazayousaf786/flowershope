import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-rose-700 text-center mb-12">
        About Paradise Flower
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT - Founder Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/cliebt.jpg"
            alt="Founder"
            width={380}
            height={380}
            className="object-cover rounded-3xl shadow-2xl border-4 border-rose-100"
          />
        </div>

        {/* RIGHT - Description */}
        <div className="text-gray-700 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-rose-600">
            Our Founder: Muhammad Shahid Yar
          </h2>

          <p className="text-lg md:text-xl leading-relaxed">
            Paradise Flower Shop was founded with a simple yet passionate mission:
            to bring beauty, freshness, and love into every home, celebration,
            and special moment. 🌷
          </p>

          {/* Social Media Icons */}
          <div className="flex gap-6 items-center pt-4">
            <a
              href="https://www.facebook.com/share/p/1EvjntyFnY/"
              target="_blank"
              className="flex items-center gap-2 text-blue-600 hover:scale-110 transition"
            >
              <FaFacebook size={26} />
              <span className="font-semibold">Facebook</span>
            </a>

            <a
              href="https://www.instagram.com/paradise_flower90?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              className="flex items-center gap-2 text-pink-600 hover:scale-110 transition"
            >
              <FaInstagram size={26} />
              <span className="font-semibold">Instagram</span>
            </a>

            <a
              href="https://vt.tiktok.com/ZSPEBcSmr/"
              target="_blank"
              className="flex items-center gap-2 text-black hover:scale-110 transition"
            >
              <FaTiktok size={26} />
              <span className="font-semibold">TikTok</span>
            </a>
          </div>

          <button className="mt-6 bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 shadow-lg transition transform hover:-translate-y-1">
            Explore Our Shop
          </button>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mt-16 bg-rose-50 rounded-3xl p-10 shadow-inner">
        <h3 className="text-3xl font-bold text-rose-700 mb-6 text-center">
          Our Mission
        </h3>
        <p className="text-gray-700 text-lg md:text-xl text-center leading-relaxed">
          To deliver fresh, premium-quality flowers with love, creativity, and
          care, making every occasion a memorable celebration.
          <br />
          Pardesi Flower Shop is more than just a florist — it&apos;s a promise of
          joy, elegance, and unforgettable experiences.
        </p>
      </div>
    </div>
  );
};

export default About;
