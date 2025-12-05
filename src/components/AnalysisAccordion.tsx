"use client";

import { useState } from "react";

interface AnalysisAccordionProps {
  advantages: string[];
  disadvantages: string[];
}

export default function AnalysisAccordion({ advantages, disadvantages }: AnalysisAccordionProps) {
  const [openSection, setOpenSection] = useState<"advantages" | "disadvantages" | null>(null);

  const toggleSection = (section: "advantages" | "disadvantages") => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="space-y-4">
      {/* Advantages */}
      <div className="border border-gray-200">
        <button
          onClick={() => toggleSection("advantages")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors"
        >
          <span className="text-xs font-bold text-[#021024] flex items-center gap-2 tracking-widest uppercase">
            <span className="text-lg leading-none">+</span> Avantages
          </span>
          <span className={`transform transition-transform duration-300 ${openSection === "advantages" ? "rotate-180" : ""}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            openSection === "advantages" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-6 pt-0">
            <ul className="space-y-3">
              {advantages.map((item, i) => (
                <li key={i} className="text-sm text-gray-600 leading-relaxed pl-4 border-l border-gray-200">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Disadvantages */}
      <div className="border border-gray-200">
        <button
          onClick={() => toggleSection("disadvantages")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors"
        >
          <span className="text-xs font-bold text-[#021024] flex items-center gap-2 tracking-widest uppercase">
            <span className="text-lg leading-none">-</span> Inconvénients
          </span>
          <span className={`transform transition-transform duration-300 ${openSection === "disadvantages" ? "rotate-180" : ""}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            openSection === "disadvantages" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-6 pt-0">
            <ul className="space-y-3">
              {disadvantages.map((item, i) => (
                <li key={i} className="text-sm text-gray-600 leading-relaxed pl-4 border-l border-gray-200">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
