"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransition, useState, useRef, useEffect } from 'react';
import { type Locale } from '@/i18n/routing';

const languages: { code: Locale; label: string }[] = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`flex items-center gap-1 px-1 py-0.5 text-sm font-medium text-gray-700 hover:text-[#021024] transition-colors rounded hover:bg-gray-50 ${isPending ? 'opacity-50 cursor-wait' : ''}`}
      >
        <span>{currentLang.code.toUpperCase()}</span>
        <svg 
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <div 
        className={`absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden min-w-[140px] transition-all duration-200 origin-top-right ${
          isOpen 
            ? 'opacity-100 scale-100 visible' 
            : 'opacity-0 scale-95 invisible'
        }`}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => switchLocale(lang.code)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
              locale === lang.code 
                ? 'bg-gray-50 text-[#021024] font-medium' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-[#021024]'
            }`}
          >
            <span>{lang.label}</span>
            {locale === lang.code && (
              <svg className="w-4 h-4 ml-auto text-[#5483B3]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
