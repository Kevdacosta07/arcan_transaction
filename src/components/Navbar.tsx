"use client";

import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 h-24">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="relative w-52 h-16">
            <Image
              src="/assets/logo/Arcan_Logo_Bleu.webp"
              alt="Arcan Transaction"
              fill
              className="object-contain object-left"
              quality={100}
              priority
            />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-16">
            <div className="flex items-center gap-12">
                <a href="#expertise" className="text-gray-600 hover:text-primary font-sans text-sm uppercase tracking-widest transition-colors">
                    Expertise
                </a>
                <a href="#qui-sommes-nous" className="text-gray-600 hover:text-primary font-sans text-sm uppercase tracking-widest transition-colors">
                    Qui Sommes-Nous
                </a>
            </div>
            
            <div className="h-8 w-[1px] bg-gray-200"></div>

            <a href="#contact" className="group flex items-center gap-3 text-primary hover:text-secondary transition-colors">
                <span className="font-serif italic text-lg">Prendre rendez-vous</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
        </nav>
      </div>
    </header>
  );
}
