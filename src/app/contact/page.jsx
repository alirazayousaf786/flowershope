"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Contact = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    
    // Yahan baad mein API call add kar sakte ho (jaise /api/contact)
    alert('Message sent successfully! 🎉');
    
    // Form reset
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      {/* Back Button */}
      <button
        onClick={() => router.push('/')} // Next.js way to navigate
        className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold mb-8 transition-colors duration-300 group"
      >
        <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
        <span>Back to Home</span>
      </button>

      <h2 
        className="text-3xl md:text-4xl font-light text-rose-700 text-center mb-12"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Contact Us
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-2xl font-semibold text-rose-600 mb-6">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                placeholder="+92 300 1234567"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none transition-all"
                placeholder="Your message here..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Address & Map */}
        <div className="space-y-8">
          {/* Address Section */}
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-rose-600 mb-6">Visit Us</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-rose-600 text-3xl">📍</span>
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">Address</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Mission Chowk, Sahiwal,<br />
                    Punjab, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-rose-600 text-3xl">📞</span>
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">Phone</h4>
                  <p className="text-gray-600">+92 300 1234567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-rose-600 text-3xl">✉️</span>
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">Email</h4>
                  <p className="text-gray-600">info@flowershop.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-rose-600 text-3xl">⏰</span>
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">Working Hours</h4>
                  <p className="text-gray-600">
                    Mon - Sat: 9:00 AM - 8:00 PM<br />
                    Sunday: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.123456789!2d73.10614!3d30.66797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922b63b2b2b2b2b%3A0x1234567890abcdef!2sMission%20Chowk%2C%20Sahiwal!5e0!3m2!1sen!2spk!4v1234567890123!5m2!1sen!2spk"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location - Mission Chowk, Sahiwal"
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;