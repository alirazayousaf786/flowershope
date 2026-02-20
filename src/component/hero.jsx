"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      image: "/note.jpeg",
      title: "Money Bought",
      subtitle: "Celebrate your love with beautiful Money Bought arrangements",
      buttonText: "Book Decoration",
    },
    {
      image: "/h2.jpeg",
      title: "Room Decor",
      subtitle: "Make your special day unforgettable with elegant arrangements",
      buttonText: "View Collection",
    },
    {
      image: "/h1.jpeg",
      title: "Flower Bought",
      subtitle: "Celebrate your love with beautiful flower arrangements",
      buttonText: "Shop Anniversary",
    },
    {
      image: "/h5.jpeg",
      title: "Balloon Decor",
      subtitle: "Thoughtful gifts wrapped with love and care and Bacground Decorate",
      buttonText: "Explore Gifts",
    },
    {
      image: "/h4.jpeg",
      title: "Flower Jewelry",
      subtitle: "Fresh and elegant Flower Jewelry is the wedding for every occasion",
      buttonText: "Shop Now",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-rose-100">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-110"
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-contain"
              priority={index === 0}
            />
          </div>
          {/* <div className="absolute inset-0 bg-rose-100/20" /> */}
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative h-full flex items-center justify-center px-8 md:px-16 lg:px-24">
        <div className="text-center max-w-4xl">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ease-out ${
                index === currentSlide
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } absolute inset-0 flex flex-col items-center justify-center`}
            >
              <h1
                className="text-5xl md:text-7xl text-white lg:text-8xl font-light tracking-tight text-rose-800 mb-6"
                // style={{
                //   fontFamily: "'Playfair Display', serif",
                //   textShadow: "0 4px 20px rgba(225,29,72,0.3)",
                // }}
              >
                {slide.title}
              </h1>

              <p
                className="text-xl md:text-2xl lg:text-3xl text-rose-700 mb-10 text-white font-light tracking-wide max-w-3xl"
                // style={{
                //   fontFamily: "'Montserrat', sans-serif",
                //   textShadow: "0 2px 10px rgba(225,29,72,0.2)",
                // }}
              >
                {slide.subtitle}
              </p>

              <button
                onClick={() => setIsAutoPlaying(false)}
                className="group relative px-10 py-4 text-lg tracking-widest font-medium border-2 border-rose-600 text-rose-600 overflow-hidden transition-all duration-500 hover:scale-105"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span className="absolute inset-0 bg-rose-600/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  {slide.buttonText}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          setIsAutoPlaying(false);
          prevSlide();
        }}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 group"
        aria-label="Previous slide"
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-rose-600/60 backdrop-blur-sm bg-rose-100/20 flex items-center justify-center hover:scale-110 transition-all">
          <ChevronLeft className="w-8 h-8 text-rose-600" />
        </div>
      </button>

      <button
        onClick={() => {
          setIsAutoPlaying(false);
          nextSlide();
        }}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 group"
        aria-label="Next slide"
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-rose-600/60 backdrop-blur-sm bg-rose-100/20 flex items-center justify-center hover:scale-110 transition-all">
          <ChevronRight className="w-8 h-8 text-rose-600" />
        </div>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentSlide(index);
            }}
            className="focus:outline-none"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`h-1 transition-all duration-500 rounded-full ${
                index === currentSlide
                  ? "w-12 bg-rose-600"
                  : "w-8 bg-rose-600/70"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Hero;