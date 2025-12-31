"use client";

import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-20 grid grid-cols-1 md:grid-cols-2 gap-14">

      {/* LEFT - Form */}
      <div className="bg-white shadow-xl rounded-3xl p-10">
        <h2 className="text-3xl font-bold text-rose-700 mb-8">
          Get in Touch 🌸
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
            required
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-3 bg-rose-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-rose-700 transition"
          >
            <FaPaperPlane /> Send Message
          </button>
        </form>

        {submitted && (
          <p className="mt-5 flex items-center gap-2 text-green-600 font-semibold">
            <FaCheckCircle /> Message Sent Successfully!
          </p>
        )}
      </div>

      {/* RIGHT - Contact Details */}
      <div className="flex flex-col justify-center gap-6">
        <h2 className="text-3xl font-bold text-rose-700 mb-6">
          Contact Details
        </h2>

        <div className="flex items-start gap-4">
          <FaMapMarkerAlt className="text-rose-600 text-xl mt-1" />
          <p className="text-gray-700 font-semibold">
            Mission Chowk beside UBL Bank, Sahiwal
          </p>
        </div>

        <div className="flex items-center gap-4">
          <FaPhoneAlt className="text-rose-600 text-lg" />
          <p className="text-gray-700 font-semibold">
            +92 301 3000940
          </p>
        </div>

        <div className="flex items-center gap-4">
          <FaEnvelope className="text-rose-600 text-lg" />
          <p className="text-gray-700 font-semibold">
            paradiseflowerswl90@gmail.com
          </p>
        </div>

        <div className="flex items-center gap-4">
          <FaClock className="text-rose-600 text-lg" />
          <p className="text-gray-700 font-semibold">
            Mon – Sat: 9:00 AM – 6:00 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;