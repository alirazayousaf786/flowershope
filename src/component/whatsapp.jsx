"use client"
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  const phoneNumber = "+923013000940"; 
  const message = "Hello! I want to inquire about your flowers."; 
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg  hover:scale-110 transition transform z-50"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
};

export default WhatsappButton;
