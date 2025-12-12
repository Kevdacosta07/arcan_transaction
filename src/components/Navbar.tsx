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
      className={`flex-1 py-3 text-sm font-medium uppercase tracking-wider rounded-lg transition-all ${
        isActive 
          ? 'bg-[#5483B3] text-white' 
          : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
      } ${isPending ? 'opacity-50 cursor-wait' : ''}`}
    >
      {label}
    </button>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessusOpen, setIsProcessusOpen] = useState(false);
  const t = useTranslations('nav');
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

    // Check if we're already on the same page
    // We need to check if the current pathname ends with the target path (handling locale prefix)
    const currentPath = pathname;
    const targetPath = path.startsWith('/') ? path : '/' + path;
    const isOnSamePage = currentPath === targetPath || 
                        (targetPath === '/' && (currentPath === '/' || currentPath === '/en' || currentPath === '/fr')) ||
                        currentPath.endsWith(targetPath);

    if (isOnSamePage) {
      e.preventDefault();
      
      if (isFormesDeVente) {
          // Update hash and notify page to let it handle state and scrolling
          window.history.pushState(null, '', href);
          window.dispatchEvent(new Event('hashchange'));
      } else {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
      }
    } else {
      // For Formes de Vente, let the page handle the hash on mount
      if (isFormesDeVente) {
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
              quality={100}
              priority
            />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
            <div className="flex items-center gap-4 xl:gap-6">

                <Link href="/" className="text-gray-600 hover:text-[#021024] font-sans text-xs font-medium uppercase tracking-wider transition-colors whitespace-nowrap">
                    {t('home')}
                </Link>

                <div className="relative group h-full flex items-center">
                    <Link href="/procedure-de-vente" className="text-gray-600 hover:text-[#021024] font-sans text-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-1 h-full py-8 whitespace-nowrap">
                        {t('salesProcedures')}
                        <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path></svg>
                    </Link>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[700px]">
                        <div className="bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-t-2 border-[#021024] grid grid-cols-3 gap-12 relative mt-0">
                            {/* Triangle pointer */}
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45"></div>

                            {/* Column 1 - Type de Mandat */}
                            <div>
                                <h4 className="font-serif text-lg text-[#021024] mb-6 italic border-b border-gray-100 pb-2">{t('mandateType')}</h4>
                                <ul className="space-y-4">
                                    <li>
                                        <Link href="/procedure-de-vente?mandat=simple#type-mandat" onClick={(e) => handleSmoothNavigation(e, '/procedure-de-vente?mandat=simple#type-mandat')} className="group/link flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/link:bg-[#5483B3] transition-colors"></span>
                                            <span className="text-sm text-gray-500 group-hover/link:text-[#5483B3] transition-colors font-light">{t('simpleMandate')}</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/procedure-de-vente?mandat=exclusif#type-mandat" onClick={(e) => handleSmoothNavigation(e, '/procedure-de-vente?mandat=exclusif#type-mandat')} className="group/link flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/link:bg-[#5483B3] transition-colors"></span>
                                            <span className="text-sm text-gray-500 group-hover/link:text-[#5483B3] transition-colors font-light">{t('exclusiveMandate')}</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 2 - Processus de Vente */}
                            <div>
                                <h4 className="font-serif text-lg text-[#021024] mb-6 italic border-b border-gray-100 pb-2">{t('salesProcess')}</h4>
                                <ul className="space-y-4">
                                    <li>
                                        <Link href="/procedure-de-vente#vente-directe" onClick={(e) => handleSmoothNavigation(e, '/procedure-de-vente#vente-directe')} className="group/link flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/link:bg-[#5483B3] transition-colors"></span>
                                            <span className="text-sm text-gray-500 group-hover/link:text-[#5483B3] transition-colors font-light">{t('directSale')}</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/procedure-de-vente#appel-d-offres" onClick={(e) => handleSmoothNavigation(e, '/procedure-de-vente#appel-d-offres')} className="group/link flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/link:bg-[#5483B3] transition-colors"></span>
                                            <span className="text-sm text-gray-500 group-hover/link:text-[#5483B3] transition-colors font-light">{t('callForTenders')}</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 3 - Formes de Vente */}
                            <div>
                                <h4 className="font-serif text-lg text-[#021024] mb-6 italic border-b border-gray-100 pb-2">{t('salesForms')}</h4>
                                <ul className="space-y-4">
                                    <li>
                                        <Link
                                            href="/procedure-de-vente#formes-de-vente"
                                            onClick={(e) => {
                                                setFormeDeVenteSelection('asset-deal');
                                                handleSmoothNavigation(e, '/procedure-de-vente#formes-de-vente');
                                            }}
                                            className="group/link flex items-center gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/link:bg-[#5483B3] transition-colors"></span>
                                            <span className="text-sm text-gray-500 group-hover/link:text-[#5483B3] transition-colors font-light">{t('assetDeal')}</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/procedure-de-vente#formes-de-vente"
                                            onClick={(e) => {
                                                setFormeDeVenteSelection('share-deal');
                                                handleSmoothNavigation(e, '/procedure-de-vente#formes-de-vente');
                                            }}
                                            className="group/link flex items-center gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/link:bg-[#5483B3] transition-colors"></span>
                                            <span className="text-sm text-gray-500 group-hover/link:text-[#5483B3] transition-colors font-light">{t('shareDeal')}</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/procedure-de-vente#formes-de-vente"
                                            onClick={(e) => {
                                                setFormeDeVenteSelection('sale-leaseback');
                                                handleSmoothNavigation(e, '/procedure-de-vente#formes-de-vente');
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

                <Link href="/criteres" className="text-gray-600 hover:text-[#021024] font-sans text-xs font-medium uppercase tracking-wider transition-colors whitespace-nowrap">
                    {t('investmentCriteria')}
                </Link>

                <Link href="/realisations" className="text-gray-600 hover:text-[#021024] font-sans text-xs font-medium uppercase tracking-wider transition-colors whitespace-nowrap">
                    {t('realisations')}
                </Link>
            </div>
            
            <div className="h-7 w-[1px] bg-gray-200"></div>
            
            <LanguageSwitcher />

            <Link href="/contact" className="group flex items-center gap-2.5 text-primary hover:text-secondary transition-colors whitespace-nowrap">
                <span className="font-serif italic text-lg">{t('contact')}</span>
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

        {/* Mobile Menu Overlay - Optimized for Performance */}
        <div 
            className={`fixed inset-0 z-50 bg-[#021024] lg:hidden transition-transform duration-500 ease-out will-change-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            {/* Background decorations - GPU optimized with no blur */}
            <div 
                className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
            />
            <div 
                className="absolute bottom-[20%] left-[-20%] w-[60vw] h-[60vw] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(84,131,179,0.08) 0%, transparent 70%)' }}
            />

            <div className="flex flex-col h-full relative z-10">
                {/* Scrollable Menu Area */}
                <div className="flex-1 overflow-y-auto px-6 pt-24 pb-6 scrollbar-hide">
                    <div className="flex flex-col gap-6">
                        <h4 className={`text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-1 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Navigation</h4>
                        
                        {/* 01. Accueil */}
                        <div className={`group transition-all duration-300 delay-75 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <span className="text-[9px] font-mono text-[#5483B3] mb-1 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-1 group-hover:translate-y-0">01</span>
                            <Link 
                                href="/" 
                                className="text-2xl font-serif text-white group-hover:text-[#5483B3] transition-colors block"
                                onClick={() => setIsOpen(false)}
                            >
                                Accueil
                            </Link>
                        </div>

                        {/* 02. Processus */}
                        <div className={`group transition-all duration-300 delay-100 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <span className="text-[9px] font-mono text-[#5483B3] mb-1 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-1 group-hover:translate-y-0">02</span>
                            <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsProcessusOpen(!isProcessusOpen)}>
                                <span className={`text-2xl font-serif transition-colors ${isProcessusOpen ? 'text-[#5483B3]' : 'text-white group-hover:text-[#5483B3]'}`}>Procédures de vente</span>
                                <div className={`w-6 h-6 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${isProcessusOpen ? 'bg-[#5483B3] border-[#5483B3] rotate-180' : 'group-hover:border-[#5483B3]'}`}>
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                            
                            {/* Dropdown */}
                            <div className={`overflow-hidden transition-all duration-300 ease-out ${isProcessusOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                                <div className="pl-4 border-l border-white/10 space-y-3">
                                    <div className="space-y-2">
                                        <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Type de Mandat</h4>
                                        <Link href="/procedure-de-vente?mandat=simple#type-mandat" className="block text-base text-gray-300 hover:text-white transition-colors" onClick={(e) => { setIsOpen(false); handleSmoothNavigation(e, '/procedure-de-vente?mandat=simple#type-mandat'); }}>Mandat Simple</Link>
                                        <Link href="/procedure-de-vente?mandat=exclusif#type-mandat" className="block text-base text-gray-300 hover:text-white transition-colors" onClick={(e) => { setIsOpen(false); handleSmoothNavigation(e, '/procedure-de-vente?mandat=exclusif#type-mandat'); }}>Mandat Exclusif</Link>
                                    </div>
                                    <div className="space-y-2 pt-2">
                                        <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Processus de Vente</h4>
                                        <Link href="/procedure-de-vente#vente-directe" className="block text-base text-gray-300 hover:text-white transition-colors" onClick={(e) => { setIsOpen(false); handleSmoothNavigation(e, '/procedure-de-vente#vente-directe'); }}>Vente Directe</Link>
                                        <Link href="/procedure-de-vente#appel-d-offres" className="block text-base text-gray-300 hover:text-white transition-colors" onClick={(e) => { setIsOpen(false); handleSmoothNavigation(e, '/procedure-de-vente#appel-d-offres'); }}>Appel d&apos;Offres</Link>
                                    </div>
                                    <div className="space-y-2 pt-2">
                                        <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Formes de Vente</h4>
                                        <Link href="/procedure-de-vente#formes-de-vente" className="block text-base text-gray-300 hover:text-white transition-colors" onClick={(e) => { setIsOpen(false); setFormeDeVenteSelection('asset-deal'); handleSmoothNavigation(e, '/procedure-de-vente#formes-de-vente'); }}>Asset Deal</Link>
                                        <Link href="/procedure-de-vente#formes-de-vente" className="block text-base text-gray-300 hover:text-white transition-colors" onClick={(e) => { setIsOpen(false); setFormeDeVenteSelection('share-deal'); handleSmoothNavigation(e, '/procedure-de-vente#formes-de-vente'); }}>Share Deal</Link>
                                        <Link href="/procedure-de-vente#formes-de-vente" className="block text-base text-gray-300 hover:text-white transition-colors" onClick={(e) => { setIsOpen(false); setFormeDeVenteSelection('sale-leaseback'); handleSmoothNavigation(e, '/procedure-de-vente#formes-de-vente'); }}>Sale & Leaseback</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 03. Critères */}
                        <div className={`group transition-all duration-300 delay-150 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <span className="text-[9px] font-mono text-[#5483B3] mb-1 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-1 group-hover:translate-y-0">03</span>
                            <Link 
                                href="/criteres" 
                                className="text-2xl font-serif text-white group-hover:text-[#5483B3] transition-colors block leading-tight"
                                onClick={() => setIsOpen(false)}
                            >
                                Critères <br/> d&apos;investissement
                            </Link>
                        </div>

                        {/* 04. Réalisations */}
                        <div className={`group transition-all duration-300 delay-200 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <span className="text-[9px] font-mono text-[#5483B3] mb-1 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-1 group-hover:translate-y-0">04</span>
                            <Link 
                                href="/realisations" 
                                className="text-2xl font-serif text-white group-hover:text-[#5483B3] transition-colors block"
                                onClick={() => setIsOpen(false)}
                            >
                                Réalisations
                            </Link>
                        </div>

                        {/* Language Switcher - Mobile */}
                        <div className={`pt-6 border-t border-white/10 transition-all duration-300 delay-250 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-4">{t('language') || 'Langue'}</h4>
                            <div className="flex gap-3">
                                <MobileLanguageButton code="fr" label="Français" />
                                <MobileLanguageButton code="en" label="English" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom White Panel - Contact */}
                <div className={`bg-white p-6 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] transition-transform duration-300 delay-250 will-change-transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-end">
                            <p className="text-[#021024] font-serif italic text-lg">Un projet ?</p>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Contact</span>
                        </div>
                        <Link href="/contact" onClick={() => setIsOpen(false)} className="flex items-center justify-between bg-[#021024] text-white px-5 py-4 rounded-xl group hover:bg-[#5483B3] transition-colors">
                            <span className="uppercase tracking-widest text-[10px] font-bold">Contactez nous</span>
                            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                <span className="group-hover:translate-x-0.5 transition-transform text-xs">→</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </header>
  );
}
