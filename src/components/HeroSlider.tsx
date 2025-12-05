"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  {
    src: "/assets/illustration/geneva1.webp",
    alt: "Genève - Vue Panoramique",
  },
  {
    src: "/assets/illustration/geneva2.webp",
    alt: "Genève - Architecture",
    position: "object-top",
  },
  {
    src: "/assets/illustration/geneva3.webp",
    alt: "Genève - Lac Léman",
  },
  {
    src: "/assets/illustration/switzerland1.webp",
    alt: "Paysage Suisse",
  },
  {
    src: "/assets/illustration/switzerland2.webp",
    alt: "Alpes Suisses",
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Overlay sombre pour garantir la lisibilité du texte */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[3000ms] ease-in-out ${
            index === currentIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={`object-cover ${image.position || "object-center"}`}
            priority
            quality={100}
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  );
}
