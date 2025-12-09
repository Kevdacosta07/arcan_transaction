"use client";

import { useState } from "react";

interface TeamMemberProps {
  name: string;
  role: string;
  email: string;
  linkedin: string;
}

export default function TeamMemberCard({ name, role, email, linkedin }: TeamMemberProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group flex flex-col h-full">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <div>
                <h4 className="text-2xl font-serif text-primary mb-1 group-hover:text-secondary transition-colors">{name}</h4>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">{role}</p>
            </div>
            <div className={`w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary border-primary rotate-180' : 'group-hover:border-primary'}`}>
                <svg className={`w-3 h-3 ${isOpen ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
        </div>
        <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="pb-4 flex flex-col gap-3 pt-2">
                 {/* Email */}
                 <a 
                    href={`mailto:${email}`} 
                    className={`flex items-center gap-3 text-gray-600 hover:text-[#0077b5] transition-all duration-500 delay-100 hover:delay-0 ease-out group/item ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                 >
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/item:bg-[#0077b5]/10 transition-colors duration-300 ease-out">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <span className="text-sm font-light">{email}</span>
                 </a>

                 {/* LinkedIn */}
                 <a 
                    href={linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`flex items-center gap-3 text-gray-600 hover:text-[#0077b5] transition-all duration-500 delay-200 hover:delay-0 ease-out group/item ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                 >
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/item:bg-[#0077b5]/10 transition-colors duration-300 ease-out">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.451V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </div>
                    <span className="text-sm font-light">LinkedIn</span>
                 </a>
            </div>
        </div>
    </div>
  );
}
