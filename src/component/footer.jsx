import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-rose-100 to-rose-50 mt-20 border-t border-rose-200">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* BRAND */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-4xl">🌸</span>
            <h2 className="text-2xl font-bold text-rose-700 dancing-heading">
              Paradise Flower
            </h2>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            Fresh & beautiful flowers delivered with love. Perfect for every
            special moment.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-6">
            {[
              {
                icon: <FaFacebookF />,
                color: "hover:bg-blue-600",
                link: "https://www.facebook.com/profile.php?id=61571733101535",
              },
              {
                icon: <FaInstagram />,
                color: "hover:bg-pink-500",
                link: "https://www.instagram.com/paradiseflowersahiwal",
              },
              {
                icon: <SiTiktok />,
                color: "hover:bg-black",
                link: "https://vt.tiktok.com/ZSPEBcSmr/",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-md text-rose-600 ${item.color} hover:text-white transition cursor-pointer`}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-5 text-lg">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <Link className="hover:text-rose-600 transition" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-rose-600 transition" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-rose-600 transition" href="/product">
                Shop
              </Link>
            </li>
            <li>
              <Link className="hover:text-rose-600 transition" href="/service">
                Services
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-5 text-lg">
            Support
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="hover:text-rose-600 cursor-pointer transition">
              FAQs
            </li>
            <li className="hover:text-rose-600 cursor-pointer transition">
              Privacy Policy
            </li>
            <li className="hover:text-rose-600 cursor-pointer transition">
              Terms & Conditions
            </li>
            <li className="hover:text-rose-600 cursor-pointer transition">
              Refund Policy
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-5 text-lg">
            Contact
          </h3>
          <ul className="space-y-4 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-rose-600 mt-1" />
              Mission Chowk beside UBL Bank, Sahiwal
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-rose-600" />
              +92 301 3000940
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-rose-600" />
              paradiseflowerswl90@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="text-center text-sm text-gray-600 py-5 border-t border-rose-200 flex items-center justify-center gap-1">
        © {new Date().getFullYear()} Paradise Flower Shop — Made with
        <FaHeart className="text-rose-500 mx-1 inline" />
        in Pakistan
      </div>
    </footer>
  );
}