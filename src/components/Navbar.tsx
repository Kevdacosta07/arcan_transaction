"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import { type Locale } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';

function MobileLanguageButton({ code, label }: { code: Locale; label: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const isActive = locale === code;

  const handleClick = () => {
    if (code === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: code });
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`relative text-xl font-serif transition-all duration-500 ${
        isActive 
          ? 'text-white' 
          : 'text-white/20 hover:text-white/60'
      } ${isPending ? 'opacity-50 cursor-wait' : ''}`}
    >
      {label}
      {isActive && (
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#5483B3]"></span>
      )}
    </button>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessusOpen, setIsProcessusOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

    const setFormeDeVenteSelection = (forme: string) => {
        try {
            window.sessionStorage.setItem('arcan_forme_de_vente', forme);
        } catch {
            // Ignore if storage is unavailable
        }
    };

  const handleSmoothNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return; // No hash, let normal navigation happen
    
    const hash = href.substring(hashIndex + 1);
    const queryIndex = href.indexOf('?');
    const pathEndIndex = queryIndex !== -1 && queryIndex < hashIndex ? queryIndex : hashIndex;
    const path = href.substring(0, pathEndIndex);

        const formesValues = ['asset-deal', 'share-deal', 'sale-leaseback'] as const;

        // "Formes de Vente" is controlled by page state; we detect it either via legacy hashes
        // (#asset-deal, etc.) or via the newer query param (?forme=asset-deal) pattern.
        const isFormesDeVente = hash === 'formes-de-vente' || (formesValues as readonly string[]).includes(hash);
        
        // "Type de Mandat" is also controlled by page state via query param (?mandat=simple|exclusif)
        const isTypeMandat = hash === 'type-mandat';
        
        // These sections need the page to handle URL params to open the right accordion/tab
        const isPageControlled = isFormesDeVente || isTypeMandat;

    // Check if we're already on the same page
    // We need to check if the current pathname ends with the target path (handling locale prefix)
    const currentPath = pathname;
    const targetPath = path.startsWith('/') ? path : '/' + path;
    const isOnSamePage = currentPath === targetPath || 
                        (targetPath === '/' && (currentPath === '/' || currentPath === '/en' || currentPath === '/fr')) ||
                        currentPath.endsWith(targetPath);

    // Build the full href with locale prefix for browser history
    const localizedHref = `/${locale}${href.startsWith('/') ? href : '/' + href}`;

    if (isOnSamePage) {
      e.preventDefault();
      
      if (isPageControlled) {
          // Update hash and notify page to let it handle state and scrolling
          window.history.pushState(null, '', localizedHref);
          window.dispatchEvent(new Event('hashchange'));
      } else {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
      }
    } else {
      // For page-controlled sections, let the Link handle navigation so page can read URL params
      if (isPageControlled) {
        return;
      }

      // Navigate to the page, then scroll after load
      e.preventDefault();
      router.push(href);
      
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 h-24">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative w-40 md:w-52 h-12 md:h-16 block z-50">
            <Image
              src="/assets/logo/Arcan_Logo_Bleu.webp"
              alt="Arcan Transaction"
              fill
              className="object-contain object-left"
              sizes="(max-width: 768px) 160px, 208px"
              priority
            />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-6 2xl:gap-8">
            <div className="flex items-center gap-3 xl:gap-5 2xl:gap-6">

                <Link href="/" className="text-gray-600 hover:text-[#021024] font-sans text-xs xl:text-[13px] font-medium uppercase tracking-wider transition-colors whitespace-nowrap">
                    {t('home')}
                </Link>

                <div className="relative group h-full flex items-center">
                    <Link href="/procedures-de-vente" className="text-gray-600 hover:text-[#021024] font-sans text-xs xl:text-[13px] font-medium uppercase tracking-wider transition-colors flex items-center gap-1 h-full py-8 whitespace-nowrap">
                        {t('salesProcedures')}
                        <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path></svg>
                    </Link>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[520px] xl:min-w-[620px] 2xl:min-w-[700px]">
                        <div className="bg-white p-5 xl:p-6 2xl:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-t-2 border-[#021024] grid grid-cols-3 gap-6 xl:gap-8 2xl:gap-12 relative mt-0">
                            {/* Triangle pointer */}
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45"></div>

                            {/* Column 1 - Type de Mandat */}
                            <div>
                                <h4 className="font-serif text-base xl:text-lg text-[#021024] mb-4 xl:mb-6 italic border-b border-gray-100 pb-2">{t('mandateType')}</h4>
                                <ul className="space-y-3 xl:space-y-4">
                                    <li>
                                        <Link href="/procedures-de-vente?mandat=simple#type-mandat" onClick={(e) => handleSmoothNavigation(e, '/procedures-de-vente?mandat=simple#type-mandat')} className="group/link flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/link:bg-[#5483B3] transition-colors"></span>
                                            <span className="text-sm text-gray-500 group-hover/link:text-[#5483B3] transition-colors font-light">{t('simpleMandate')}</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/procedures-de-vente?mandat=exclusif#type-mandat" onClick={(e) => handleSmoothNavigation(e, '/procedures-de-vente?mandat=exclusif#type-mandat')} className="group/link flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/link:bg-[#5483B3] transition-colors"></span>
                                            <span className="text-sm text-gray-500 group-hover/link:text-[#5483B3] transition-colors font-light">{t('exclusiveMandate')}</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 2 - Processus de Vente */}
                            <div>
                                <h4 className="font-serif text-base xl:text-lg text-[#021024] mb-4 xl:mb-6 italic border-b border-gray-100 pb-2">{t('salesProcess')}</h4>
                                <ul className="space-y-3 xl:space-y-4">
                                    <li>
                                        <Link href="/procedures-de-vente#vente-directe" onClick={(e) => handleSmoothNavigation(e, '/procedures-de-vente#vente-directe')} className="group/link flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/link:bg-[#5483B3] transition-colors"></span>
                                            <span className="text-sm text-gray-500 group-hover/link:text-[#5483B3] transition-colors font-light">{t('directSale')}</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/procedures-de-vente#appel-d-offres" onClick={(e) => handleSmoothNavigation(e, '/procedures-de-vente#appel-d-offres')} className="group/link flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/link:bg-[#5483B3] transition-colors"></span>
                                            <span className="text-sm text-gray-500 group-hover/link:text-[#5483B3] transition-colors font-light">{t('callForTenders')}</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 3 - Formes de Vente */}
                            <div>
                                <h4 className="font-serif text-base xl:text-lg text-[#021024] mb-4 xl:mb-6 italic border-b border-gray-100 pb-2">{t('salesForms')}</h4>
                                <ul className="space-y-3 xl:space-y-4">
                                    <li>
                                        <Link
                                            href="/procedures-de-vente#formes-de-vente"
                                            onClick={(e) => {
                                                setFormeDeVenteSelection('asset-deal');
                                                handleSmoothNavigation(e, '/procedures-de-vente#formes-de-vente');
                                            }}
                                            className="group/link flex items-center gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/link:bg-[#5483B3] transition-colors"></span>
                                            <span className="text-sm text-gray-500 group-hover/link:text-[#5483B3] transition-colors font-light">{t('assetDeal')}</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/procedures-de-vente#formes-de-vente"
                                            onClick={(e) => {
                                                setFormeDeVenteSelection('share-deal');
                                                handleSmoothNavigation(e, '/procedures-de-vente#formes-de-vente');
                                            }}
                                            className="group/link flex items-center gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/link:bg-[#5483B3] transition-colors"></span>
                                            <span className="text-sm text-gray-500 group-hover/link:text-[#5483B3] transition-colors font-light">{t('shareDeal')}</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/procedures-de-vente#formes-de-vente"
                                            onClick={(e) => {
                                                setFormeDeVenteSelection('sale-leaseback');
                                                handleSmoothNavigation(e, '/procedures-de-vente#formes-de-vente');
                                            }}
                                            className="group/link flex items-center gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/link:bg-[#5483B3] transition-colors"></span>
                                            <span className="text-sm text-gray-500 group-hover/link:text-[#5483B3] transition-colors font-light">{t('saleLeaseback')}</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <Link href="/criteres" className="text-gray-600 hover:text-[#021024] font-sans text-xs xl:text-[13px] font-medium uppercase tracking-wider transition-colors whitespace-nowrap">
                    {t('investmentCriteria')}
                </Link>

                <Link href="/realisations" className="text-gray-600 hover:text-[#021024] font-sans text-xs xl:text-[13px] font-medium uppercase tracking-wider transition-colors whitespace-nowrap">
                    {t('realisations')}
                </Link>
            </div>
            
            <div className="h-7 w-[1px] bg-gray-200"></div>
            
            <LanguageSwitcher />

            <Link href="/contact" className="group flex items-center gap-1.5 xl:gap-2.5 text-primary hover:text-secondary transition-colors whitespace-nowrap">
                <span className="font-serif italic text-base xl:text-lg">{t('contact')}</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
            className="lg:hidden z-[60] relative w-12 h-12 flex flex-col justify-center items-end gap-1.5 group"
            onClick={() => setIsOpen(!isOpen)}
        >
            <span className={`h-[2px] transition-transform duration-300 ease-out ${isOpen ? 'w-6 rotate-45 translate-y-2 bg-white' : 'w-8 bg-[#021024]'}`}></span>
            <span className={`h-[2px] transition-all duration-200 ease-out ${isOpen ? 'w-0 opacity-0' : 'w-6 bg-[#021024] group-hover:w-8'}`}></span>
            <span className={`h-[2px] transition-transform duration-300 ease-out ${isOpen ? 'w-6 -rotate-45 -translate-y-2 bg-white' : 'w-4 bg-[#021024] group-hover:w-8'}`}></span>
        </button>

        {/* Mobile Menu Overlay - Minimalist Corporate */}
        <div 
            className={`fixed inset-0 z-50 bg-[#021024] lg:hidden transition-all duration-500 ease-out ${
                isOpen 
                    ? 'opacity-100 visible' 
                    : 'opacity-0 invisible pointer-events-none'
            }`}
        >
            {/* Background Ambient Effects */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#5483B3]/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-20%] w-[500px] h-[500px] bg-[#5483B3]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative flex flex-col h-full px-6 pt-28 pb-8">
                
                {/* Navigation Links */}
                <nav className="flex-1">
                    <ul className="flex flex-col">
                        {/* Accueil */}
                        <li className={`border-b border-white/10 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-100`}>
                            <Link 
                                href="/" 
                                onClick={() => setIsOpen(false)}
                                className="block py-5 text-2xl font-serif text-white hover:text-[#5483B3] transition-colors"
                            >
                                {t('home')}
                            </Link>
                        </li>

                        {/* Procédures */}
                        <li className={`border-b border-white/10 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-150`}>
                            <div>
                                <button 
                                    onClick={() => setIsProcessusOpen(!isProcessusOpen)}
                                    className="flex items-center justify-between w-full text-left group py-5"
                                >
                                    <span className={`text-2xl font-serif transition-colors ${isProcessusOpen ? 'text-[#5483B3]' : 'text-white group-hover:text-[#5483B3]'}`}>
                                        {t('salesProcedures')}
                                    </span>
                                    <span className={`transition-transform duration-300 ${isProcessusOpen ? 'rotate-180 text-[#5483B3]' : 'text-white/50'}`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </span>
                                </button>

                                {/* Submenu */}
                                <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${isProcessusOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="min-h-0 space-y-6 pl-4 border-l border-white/10 ml-1">
                                        
                                        {/* Type de Mandat */}
                                        <div className="space-y-2">
                                            <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">{t('mandateType')}</span>
                                            <Link href="/procedures-de-vente?mandat=simple#type-mandat" onClick={(e) => { setIsOpen(false); handleSmoothNavigation(e, '/procedures-de-vente?mandat=simple#type-mandat'); }} className="block text-base text-gray-300 hover:text-white transition-colors pl-2 border-l border-transparent hover:border-[#5483B3]">{t('simpleMandate')}</Link>
                                            <Link href="/procedures-de-vente?mandat=exclusif#type-mandat" onClick={(e) => { setIsOpen(false); handleSmoothNavigation(e, '/procedures-de-vente?mandat=exclusif#type-mandat'); }} className="block text-base text-gray-300 hover:text-white transition-colors pl-2 border-l border-transparent hover:border-[#5483B3]">{t('exclusiveMandate')}</Link>
                                        </div>

                                        {/* Processus de Vente */}
                                        <div className="space-y-2">
                                            <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">{t('salesProcess')}</span>
                                            <Link href="/procedures-de-vente#vente-directe" onClick={(e) => { setIsOpen(false); handleSmoothNavigation(e, '/procedures-de-vente#vente-directe'); }} className="block text-base text-gray-300 hover:text-white transition-colors pl-2 border-l border-transparent hover:border-[#5483B3]">{t('directSale')}</Link>
                                            <Link href="/procedures-de-vente#appel-d-offres" onClick={(e) => { setIsOpen(false); handleSmoothNavigation(e, '/procedures-de-vente#appel-d-offres'); }} className="block text-base text-gray-300 hover:text-white transition-colors pl-2 border-l border-transparent hover:border-[#5483B3]">{t('callForTenders')}</Link>
                                        </div>

                                        {/* Formes de Vente */}
                                        <div className="space-y-2">
                                            <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">{t('salesForms')}</span>
                                            <Link href="/procedures-de-vente#formes-de-vente" onClick={(e) => { setIsOpen(false); setFormeDeVenteSelection('asset-deal'); handleSmoothNavigation(e, '/procedures-de-vente#formes-de-vente'); }} className="block text-base text-gray-300 hover:text-white transition-colors pl-2 border-l border-transparent hover:border-[#5483B3]">{t('assetDeal')}</Link>
                                            <Link href="/procedures-de-vente#formes-de-vente" onClick={(e) => { setIsOpen(false); setFormeDeVenteSelection('share-deal'); handleSmoothNavigation(e, '/procedures-de-vente#formes-de-vente'); }} className="block text-base text-gray-300 hover:text-white transition-colors pl-2 border-l border-transparent hover:border-[#5483B3]">{t('shareDeal')}</Link>
                                            <Link href="/procedures-de-vente#formes-de-vente" onClick={(e) => { setIsOpen(false); setFormeDeVenteSelection('sale-leaseback'); handleSmoothNavigation(e, '/procedures-de-vente#formes-de-vente'); }} className="block text-base text-gray-300 hover:text-white transition-colors pl-2 border-l border-transparent hover:border-[#5483B3]">{t('saleLeaseback')}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        {/* Critères */}
                        <li className={`border-b border-white/10 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-200`}>
                            <Link 
                                href="/criteres" 
                                onClick={() => setIsOpen(false)}
                                className="block py-5 text-2xl font-serif text-white hover:text-[#5483B3] transition-colors"
                            >
                                {t('investmentCriteria')}
                            </Link>
                        </li>

                        {/* Réalisations */}
                        <li className={`border-b border-white/10 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-250`}>
                            <Link 
                                href="/realisations" 
                                onClick={() => setIsOpen(false)}
                                className="block py-5 text-2xl font-serif text-white hover:text-[#5483B3] transition-colors"
                            >
                                {t('realisations')}
                            </Link>
                        </li>

                        {/* Contact - Moved to main list */}
                        <li className={`border-b border-white/10 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-300`}>
                            <Link 
                                href="/contact" 
                                onClick={() => setIsOpen(false)}
                                className="block py-5 text-2xl font-serif text-white hover:text-[#5483B3] transition-colors"
                            >
                                {t('contact')}
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Footer - Language Only */}
                <div className={`mt-auto pt-8 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-300`}>
                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-6">
                            <MobileLanguageButton code="fr" label="FR" />
                            <MobileLanguageButton code="en" label="EN" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </header>
  );
}
