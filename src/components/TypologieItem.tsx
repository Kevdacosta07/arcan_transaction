"use client";

import { useState } from "react";

interface TypologieItemProps {
  num: string;
  name: string;
  items: string[];
}

export default function TypologieItem({ num, name, items }: TypologieItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full group flex items-center justify-between py-6 hover:border-[#021024] transition-colors duration-500 cursor-pointer text-left"
      >
        <div className="flex items-baseline gap-8">
          <span className={`text-xs font-mono transition-colors duration-300 ${isOpen ? 'text-[#021024]' : 'text-gray-300 group-hover:text-[#021024]'}`}>
              {num}
          </span>
          <h3 className={`text-3xl font-serif transition-transform duration-300 ${isOpen ? 'text-[#021024] translate-x-2' : 'text-[#021024] group-hover:translate-x-2'}`}>
              {name}
          </h3>
        </div>
        <div className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[#021024]">
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="12" y1="5" x2="12" y2="19" className={`transition-transform duration-300 origin-center ${isOpen ? 'scale-y-0' : 'scale-y-100'}`} />
          </svg>
        </div>
      </button>
      
      <div 
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <ul className="pl-14 md:pl-16 space-y-3 pb-8">
            {items.map((item, idx) => (
              <li key={idx} className="text-gray-900 font-normal text-base flex items-start gap-3">
                <span className="w-1 h-1 bg-[#021024] rounded-full mt-2.5 shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
