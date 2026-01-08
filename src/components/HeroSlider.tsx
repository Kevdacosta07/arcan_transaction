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
  const [imageFullyLoaded, setImageFullyLoaded] = useState<boolean[]>([false, false, false, false, false]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const handleImageLoad = (index: number) => {
    setImageFullyLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Placeholder animé - affiché tant que l'image courante n'est pas chargée */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          imageFullyLoaded[currentIndex] ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background: "linear-gradient(135deg, #0f2440 0%, #1a365d 50%, #0f2440 100%)",
          backgroundSize: "400% 400%",
          animation: "shimmer 3s ease-in-out infinite",
        }}
      />
      
      {/* Overlay sombre pour garantir la lisibilité du texte */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={`object-cover ${image.position || "object-center"}`}
            priority
            quality={85}
            sizes="100vw"
            unoptimized
            onLoad={() => handleImageLoad(index)}
          />
        </div>
      ))}

      {/* Keyframes pour l'animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
