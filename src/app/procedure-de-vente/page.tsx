"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState, useCallback } from "react";

// --- Elegant Animation Component ---
function RevealOnScroll({ 
    children, 
    className = "", 
    delay = 0,
    variant = "up",
    triggerOnMount = false
}: { 
    children: React.ReactNode, 
    className?: string, 
    delay?: number,
    variant?: "up" | "left" | "right" | "scale" | "mask" | "fade"
    triggerOnMount?: boolean
}) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (triggerOnMount) {
            const timer = setTimeout(() => setIsVisible(true), 50 + delay);
            return () => clearTimeout(timer);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [triggerOnMount, delay]);

    const getAnimationClass = useCallback(() => {
        if (!isVisible) return 'opacity-0';
        
        switch (variant) {
            case "up":
                return "animate-reveal-up";
            case "left":
                return "animate-reveal-left";
            case "right":
                return "animate-reveal-right";
            case "scale":
                return "animate-reveal-scale";
            case "mask":
                return "animate-mask-reveal";
            case "fade":
            default:
                return "animate-fade-in";
        }
    }, [isVisible, variant]);

    return (
        <div 
            ref={ref} 
            className={`${className} ${getAnimationClass()}`}
            style={{ animationDelay: isVisible ? `${delay}ms` : '0ms' }}
        >
            {children}
        </div>
    );
}

// Stagger animation for lists
function StaggerContainer({ 
    children, 
    className = "",
    staggerDelay = 100
}: { 
    children: React.ReactNode[], 
    className?: string,
    staggerDelay?: number
}) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={className}>
            {children.map((child, index) => (
                <div 
                    key={index}
                    className={isVisible ? 'animate-reveal-up' : 'opacity-0'}
                    style={{ animationDelay: `${index * staggerDelay}ms` }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
}



function AccordionItem({ title, children, isOpen, onClick }: { title: string, children: React.ReactNode, isOpen: boolean, onClick: () => void }) {
    return (
        <div className="border-b border-gray-200">
            <button 
                onClick={onClick}
                className="w-full py-6 md:py-8 flex items-center justify-between text-left group"
            >
                <span className={`text-xl md:text-2xl font-serif transition-colors duration-300 ${isOpen ? 'text-[#5483B3]' : 'text-[#021024] group-hover:text-[#5483B3]'}`}>
                    {title}
                </span>
                <div className={`relative w-6 h-6 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    <span className={`absolute w-full h-[1px] bg-current ${isOpen ? 'bg-[#5483B3]' : 'bg-gray-400'}`}></span>
                    <span className={`absolute h-full w-[1px] bg-current ${isOpen ? 'bg-[#5483B3]' : 'bg-gray-400'}`}></span>
                </div>
            </button>
            <div 
                className="grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0,
                    marginBottom: isOpen ? '2rem' : '0'
                }}
            >
                <div className="overflow-hidden">
                    <div className="text-gray-600 font-light leading-relaxed text-base md:text-lg pt-2 pb-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MandatAccordionItem({ 
    id, 
    title, 
    letter, 
    children, 
    isOpen, 
    onClick 
}: { 
    id: string, 
    title: string, 
    letter: string, 
    children: React.ReactNode, 
    isOpen: boolean, 
    onClick: () => void 
}) {
    return (
        <div id={id} className="scroll-mt-32 border-b border-white/10 last:border-0">
            <button 
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? 'bg-white text-[#021024]' : 'bg-[#5483B3] text-white group-hover:bg-white group-hover:text-[#021024]'}`}>
                        <span className="font-serif text-lg">{letter}</span>
                    </div>
                    <h3 className={`text-2xl font-serif transition-colors duration-300 ${isOpen ? 'text-[#5483B3]' : 'text-white group-hover:text-[#5483B3]'}`}>
                        {title}
                    </h3>
                </div>
                <div className={`relative w-6 h-6 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    <span className={`absolute w-full h-[1px] bg-current ${isOpen ? 'bg-[#5483B3]' : 'bg-gray-400'}`}></span>
                    <span className={`absolute h-full w-[1px] bg-current ${isOpen ? 'bg-[#5483B3]' : 'bg-gray-400'}`}></span>
                </div>
            </button>
            <div 
                className="grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0,
                    marginBottom: isOpen ? '2rem' : '0'
                }}
            >
                <div className="overflow-hidden">
                    <div className="text-gray-400 font-light leading-relaxed pl-[4.5rem] pb-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

function FormeDeVenteItem({ 
    id, 
    title, 
    subtitle,
    description,
    isOpen, 
    onClick,
    index
}: { 
    id: string, 
    title: string, 
    subtitle: string,
    description: React.ReactNode,
    isOpen: boolean, 
    onClick: () => void,
    index: number
}) {
    return (
        <div id={id} className="border-b border-white/10 last:border-0 scroll-mt-32">
            <button 
                onClick={onClick}
                className="w-full py-8 flex items-center justify-between text-left group"
            >
                <div className="flex items-center gap-6 md:gap-12">
                    <span className={`text-sm font-mono transition-colors duration-300 ${isOpen ? 'text-[#5483B3]' : 'text-white/40'}`}>
                        0{index}
                    </span>
                    <div>
                        <h3 className={`text-3xl md:text-5xl font-serif transition-colors duration-300 ${isOpen ? 'text-[#5483B3]' : 'text-white group-hover:text-[#5483B3]'}`}>
                            {title}
                        </h3>
                        <p className={`text-sm uppercase tracking-widest mt-2 transition-all duration-300 ${isOpen ? 'text-white/60' : 'text-white/30'}`}>
                            {subtitle}
                        </p>
                    </div>
                </div>
                <div className={`relative w-8 h-8 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={isOpen ? 'text-[#5483B3]' : 'text-white'}>
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </div>
            </button>
            <div 
                className="grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0,
                    marginBottom: isOpen ? '2rem' : '0'
                }}
            >
                <div className="overflow-hidden">
                    <div className="text-white/70 font-light leading-relaxed text-lg pl-[3.5rem] md:pl-[5rem] border-l border-[#5483B3]/30 ml-2 md:ml-4 pb-2">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProcessusPage() {
  // Independent state for each section to allow default open on both
  const [venteAccordion, setVenteAccordion] = useState<string | null>("vente-types");
  const [appelAccordion, setAppelAccordion] = useState<string | null>("appel-types");

  const toggleVente = (id: string) => setVenteAccordion(venteAccordion === id ? null : id);
  const toggleAppel = (id: string) => setAppelAccordion(appelAccordion === id ? null : id);

  const [mandatOpen, setMandatOpen] = useState<string | null>("mandat-exclusif");
  const toggleMandat = (id: string) => setMandatOpen(mandatOpen === id ? null : id);

  const [formesAccordion, setFormesAccordion] = useState<string | null>("asset-deal");
  const toggleFormes = (id: string) => setFormesAccordion(formesAccordion === id ? null : id);

  useEffect(() => {
      const handleHashChange = () => {
          if (window.location.hash) {
              const hash = window.location.hash.substring(1);
              if (hash === 'mandat-exclusif' || hash === 'mandat-simple') {
                  setMandatOpen(hash);
              }
              if (hash === 'asset-deal' || hash === 'share-deal' || hash === 'sale-leaseback') {
                  setFormesAccordion(hash);
                  setTimeout(() => {
                      const element = document.getElementById('formes-de-vente');
                      if (element) {
                          const yOffset = -50; // Adjust this value to control scroll position
                          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                  }, 300);
              }
          }
      };

      if (typeof window !== 'undefined') {
          // Handle initial load
          handleHashChange();

          // Handle query params (from navbar)
          const params = new URLSearchParams(window.location.search);
          const mandat = params.get('mandat');
          if (mandat === 'exclusif') setMandatOpen('mandat-exclusif');
          if (mandat === 'simple') setMandatOpen('mandat-simple');

          // Listen for hash changes
          window.addEventListener('hashchange', handleHashChange);
          return () => window.removeEventListener('hashchange', handleHashChange);
      }
  }, []);

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section - Corporate Portfolio */}
      <section className="h-[calc(100vh-6rem)] relative flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 overflow-hidden">
         
         {/* Background Image */}
         <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1721074488012-d2cadea78113?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Architecture Background" 
                className="w-full h-full object-cover"
            />
            {/* Overlay - Deep & Professional */}
            <div className="absolute inset-0 bg-[#021024]/60 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#021024] via-[#021024]/40 to-transparent"></div>
         </div>

         {/* Content */}
         <div className="relative z-10 max-w-[1800px] mx-auto w-full border-t border-white/10 pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
                
                {/* Title Area */}
                <div className="lg:col-span-7">
                    <RevealOnScroll variant="up" delay={100} triggerOnMount>
                        <span className="text-[#5483B3] font-medium tracking-widest uppercase text-sm mb-4 block">Méthodologie</span>
                    </RevealOnScroll>
                    <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9]">
                        <RevealOnScroll variant="left" delay={200} triggerOnMount>
                            <span className="block">Procédures</span>
                        </RevealOnScroll>
                        <RevealOnScroll variant="left" delay={350} triggerOnMount>
                            <span className="block text-white/80 italic font-light">de vente</span>
                        </RevealOnScroll>
                    </h1>
                </div>

                {/* Description Area - Restored Full Content */}
                <div className="lg:col-span-5 pb-2">
                    <RevealOnScroll variant="up" delay={500} triggerOnMount>
                        <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed text-justify">
                            Arcan Transactions SA s’occupe de la gestion complète du processus de vente en vue de maximiser le prix de vente de l’actif que se soit par le biais d’une vente directe ou d’un appel d’offres, en Asset Deal (vente en nom), Share Deal (vente en société) ou en Sale and lease-back.
                        </p>
                    </RevealOnScroll>
                </div>
            </div>
         </div>
      </section>


      {/* Type de Mandat Section */}
      <section id="type-mandat" className="scroll-mt-32 relative py-24 px-6 bg-[#021024] overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                
                {/* Left: Header */}
                <div>
                    <RevealOnScroll variant="left">
                        <span className="text-[#5483B3] font-medium tracking-widest uppercase text-sm mb-4 block">Avant-propos</span>
                        <h2 className="text-5xl md:text-6xl font-serif text-white leading-none mb-8">
                            Type de <span className="italic text-[#5483B3]">Mandat</span>
                        </h2>
                    </RevealOnScroll>
                    <RevealOnScroll variant="up" delay={150}>
                        <p className="text-lg text-gray-300 font-light leading-relaxed border-l-2 border-[#5483B3] pl-6">
                            Le type de mandat définit le cadre de notre collaboration et les modalités d'intervention pour la vente de votre bien.
                        </p>
                    </RevealOnScroll>
                </div>

                {/* Right: Accordion */}
                <div className="border-t border-white/10">
                    <RevealOnScroll variant="up" delay={200}>
                        <MandatAccordionItem 
                            id="mandat-simple"
                            title="Mandat Simple" 
                            letter="S"
                            isOpen={mandatOpen === "mandat-simple"}
                            onClick={() => toggleMandat("mandat-simple")}
                        >
                            Le propriétaire peut mandater plusieurs intermédiaires simultanément. Cette formule offre une plus grande flexibilité mais peut limiter l'investissement de chaque mandataire.
                        </MandatAccordionItem>
                    </RevealOnScroll>

                    <RevealOnScroll variant="up" delay={300}>
                        <MandatAccordionItem 
                            id="mandat-exclusif"
                            title="Mandat Exclusif" 
                            letter="E"
                            isOpen={mandatOpen === "mandat-exclusif"}
                            onClick={() => toggleMandat("mandat-exclusif")}
                        >
                            Arcan Transactions SA est le seul intermédiaire mandaté pour la vente du bien. Cette exclusivité nous permet de déployer l’ensemble de nos ressources et de garantir une approche et un contrôle optimal.
                        </MandatAccordionItem>
                    </RevealOnScroll>
                </div>
            </div>
        </div>
      </section>


      {/* Vente Directe - Corporate Accordion */}
      <section id="vente-directe" className="scroll-mt-32 relative py-32 px-6 bg-white overflow-hidden">
        {/* Background Design Elements - SVG Circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Top Left Cluster */}
            <svg className="absolute -left-[5%] -top-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] text-[#021024] opacity-[0.03]" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="50" />
            </svg>
            <svg className="absolute left-[10%] -top-[2%] w-[25vw] h-[25vw] max-w-[300px] max-h-[300px] text-[#5483B3] opacity-[0.05]" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="50" />
            </svg>
            
            {/* Bottom Right Cluster */}
            <svg className="absolute -right-[5%] bottom-[5%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] text-[#5483B3] opacity-[0.04]" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="50" />
            </svg>
            <svg className="absolute right-[15%] bottom-[15%] w-[15vw] h-[15vw] max-w-[200px] max-h-[200px] text-[#021024] opacity-[0.06]" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="50" />
            </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                {/* Header (Left) */}
                <div className="lg:col-span-5">
                    <div className="sticky top-32">
                        <RevealOnScroll variant="left">
                            <span className="text-[#5483B3] font-medium tracking-widest uppercase text-sm mb-4 block">01. Méthodologie</span>
                            <h2 className="text-5xl md:text-7xl font-serif text-[#021024] leading-none mb-8">
                                Vente<br/><span className="italic text-[#5483B3]">Directe</span>
                            </h2>
                        </RevealOnScroll>
                        
                        <RevealOnScroll variant="up" delay={150}>
                            <p className="text-lg text-gray-600 font-light leading-relaxed border-l-2 border-[#5483B3] pl-6 mb-12">
                                Une approche ciblée et confidentielle pour des transactions rapides et maîtrisées. Idéale pour les propriétaires souhaitant discrétion et rapidité.
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll variant="scale" delay={300}>
                            <div className="relative h-[300px] w-full overflow-hidden hidden lg:block">
                                <img 
                                    src="https://images.unsplash.com/photo-1620223715854-f3c2b1157fec?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                    alt="Meeting" 
                                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>

                {/* Accordions (Right) */}
                <div className="lg:col-span-7">
                    <RevealOnScroll variant="up" delay={200}>
                        <div className="border-t border-gray-200">
                            <AccordionItem 
                                title="Forme de la vente" 
                                isOpen={venteAccordion === "vente-types"} 
                                onClick={() => toggleVente("vente-types")}
                            >
                                <div className="space-y-8 pb-4">
                                    <div>
                                        <h4 className="text-xl font-serif text-[#021024] mb-2">Exclusive</h4>
                                        <p>L’objet est présenté à un seul prospect, au prix fixé. La vente se concrétise uniquement si le prix est accepté, garantissant une confidentialité totale.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-serif text-[#021024] mb-2">Sélective</h4>
                                        <p>L’objet est présenté au prix fixé à plusieurs investisseurs qualifiés. Le principe est simple : le premier offrant au prix obtient l’attribution (« first in, first served »).</p>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem 
                                title="Timeline" 
                                isOpen={venteAccordion === "vente-timeline"} 
                                onClick={() => toggleVente("vente-timeline")}
                            >
                                <div className="relative pb-4 pt-2">
                                    <div className="flex items-center justify-between mb-10 relative z-10">
                                        <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Processus & Timing</span>
                                        <div className="px-4 py-1.5 bg-white border border-gray-200 text-[#5483B3] text-sm font-serif rounded-full shadow-sm">
                                            3 sem. - 1.5 mois
                                        </div>
                                    </div>

                                    <div className="relative space-y-0 z-10">
                                        {[
                                            "Sélection de un ou plusieurs investisseur/s",
                                            "Envoi teaser + NDA",
                                            "Réception NDA signées & ouverture short-dataroom",
                                            "Réception NBO & ouverture full dataroom",
                                            "Due diligence",
                                            "Réception des BO et acceptation",
                                            "Revue du projet d’acte notarié",
                                            "Signing & closing"
                                        ].map((step, i, arr) => (
                                            <div key={i} className="relative pl-12 pb-8 last:pb-0 group">
                                                {/* Connecting Line */}
                                                {i !== arr.length - 1 && (
                                                    <div className="absolute left-[15px] top-8 bottom-0 w-[1px] bg-[#5483B3]/30"></div>
                                                )}

                                                {/* Node */}
                                                <div className="absolute left-0 top-0 w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm group-hover:border-[#5483B3] group-hover:text-[#5483B3] transition-all duration-300 z-10">
                                                    <span className="text-xs font-medium text-gray-400 group-hover:text-[#5483B3]">{i + 1}</span>
                                                </div>
                                                
                                                {/* Content */}
                                                <p className="text-gray-600 font-light text-base pt-1 group-hover:text-[#021024] transition-colors duration-300">
                                                    {step}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem 
                                title="Avantages" 
                                isOpen={venteAccordion === "vente-proscons"} 
                                onClick={() => toggleVente("vente-proscons")}
                            >
                                <div className="pb-4">
                                    <div>
                                        <ul className="space-y-2">
                                            {["Prix de vente fixé à l’avance", "Approche ciblée", "Souplesse de négociation", "Rapidité de la procédure", "Procédure d’attribution de gré à gré"].map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm">
                                                    <span className="text-gray-400">+</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </div>
      </section>

      {/* Appel d'Offres - Corporate Accordion */}
      <section id="appel-d-offres" className="scroll-mt-32 relative py-32 px-6 bg-[#F8F9FA] overflow-hidden">
        {/* Background Design Elements - SVG Circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Top Right Cluster */}
            <svg className="absolute -right-[10%] -top-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] text-[#021024] opacity-[0.03]" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="50" />
            </svg>
            <svg className="absolute right-[15%] top-[5%] w-[30vw] h-[30vw] max-w-[350px] max-h-[350px] text-[#5483B3] opacity-[0.05]" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="50" />
            </svg>

            {/* Bottom Left Cluster */}
            <svg className="absolute -left-[5%] bottom-[10%] w-[20vw] h-[20vw] max-w-[250px] max-h-[250px] text-[#5483B3] opacity-[0.06]" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="50" />
            </svg>
            <svg className="absolute left-[5%] bottom-[5%] w-[15vw] h-[15vw] max-w-[180px] max-h-[180px] text-[#021024] opacity-[0.04]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="50" cy="50" r="49" />
            </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                {/* Header (Left) */}
                <div className="lg:col-span-5 lg:order-2">
                    <div className="sticky top-32">
                        <RevealOnScroll variant="right">
                            <span className="text-[#5483B3] font-medium tracking-widest uppercase text-sm mb-4 block">02. Méthodologie</span>
                            <h2 className="text-5xl md:text-7xl font-serif text-[#021024] leading-none mb-8">
                                Appel<br/><span className="italic text-[#5483B3]">d'Offres</span>
                            </h2>
                        </RevealOnScroll>
                        
                        <RevealOnScroll variant="up" delay={150}>
                            <p className="text-lg text-gray-600 font-light leading-relaxed border-l-2 border-[#5483B3] pl-6 mb-12">
                                Un processus structuré pour maximiser la valeur par la concurrence. Recommandé pour les actifs à fort potentiel de marché.
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll variant="scale" delay={300}>
                            <div className="relative h-[300px] w-full overflow-hidden hidden lg:block">
                                <img 
                                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1470&auto=format&fit=crop" 
                                    alt="Signing" 
                                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>

                {/* Accordions (Right) */}
                <div className="lg:col-span-7 lg:order-1">
                    <RevealOnScroll variant="up" delay={200}>
                        <div className="border-t border-gray-200">
                            <AccordionItem 
                                title="Forme de la vente" 
                                isOpen={appelAccordion === "appel-types"} 
                                onClick={() => toggleAppel("appel-types")}
                            >
                                <div className="space-y-8 pb-4">
                                    <div>
                                        <h4 className="text-xl font-serif text-[#021024] mb-2">Sélective</h4>
                                        <p>Pour des objets très spécifiques, il convient de limiter le cercle des investisseurs potentiels à quelques prospects triés sur le volet.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-serif text-[#021024] mb-2">Ouverte</h4>
                                        <p>Pour des objets très recherchés par le marché, il convient d’ouvrir le cercle des investisseurs au maximum en vue de créer de la concurrence pour optimiser le prix de vente.</p>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem 
                                title="Timeline" 
                                isOpen={appelAccordion === "appel-timeline"} 
                                onClick={() => toggleAppel("appel-timeline")}
                            >
                                <div className="relative pb-4 pt-2">
                                    <div className="flex items-center justify-between mb-10 relative z-10">
                                        <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Processus & Timing</span>
                                        <div className="px-4 py-1.5 bg-white border border-gray-200 text-[#5483B3] text-sm font-serif rounded-full shadow-sm">
                                            2 à 3 mois
                                        </div>
                                    </div>

                                    <div className="relative space-y-0 z-10">
                                        {[
                                            "Sélection de multiples investisseurs",
                                            "Envoi teaser + NDA",
                                            "Réception NDA signées & envoi Information Memorandum",
                                            "Réception NBO, sélection de la short list & ouverture de la dataroom complète",
                                            "Due diligence",
                                            "Réception BO & adjudication",
                                            "Revue du projet d’acte notarié",
                                            "Signing & closing"
                                        ].map((step, i, arr) => (
                                            <div key={i} className="relative pl-12 pb-8 last:pb-0 group">
                                                {/* Connecting Line */}
                                                {i !== arr.length - 1 && (
                                                    <div className="absolute left-[15px] top-8 bottom-0 w-[1px] bg-[#5483B3]/30"></div>
                                                )}

                                                {/* Node */}
                                                <div className="absolute left-0 top-0 w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm group-hover:border-[#5483B3] group-hover:text-[#5483B3] transition-all duration-300 z-10">
                                                    <span className="text-xs font-medium text-gray-400 group-hover:text-[#5483B3]">{i + 1}</span>
                                                </div>
                                                
                                                {/* Content */}
                                                <p className="text-gray-600 font-light text-base pt-1 group-hover:text-[#021024] transition-colors duration-300">
                                                    {step}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem 
                                title="Avantages" 
                                isOpen={appelAccordion === "appel-proscons"} 
                                onClick={() => toggleAppel("appel-proscons")}
                            >
                                <div className="pb-4">
                                    <div>
                                        <ul className="space-y-2">
                                            {["Prix de vente « plancher »", "Processus structuré et contrôlé", "Délais fixés impératifs", "Concurrence & Surenchère", "Adapté aux institutionnels"].map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm">
                                                    <span className="text-gray-400">+</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </div>
      </section>

      {/* Formes de Vente - Split Layout with Image */}
      <section id="formes-de-vente" className="relative z-10 bg-[#021024] text-[#FDFBF7] py-24 md:py-32 px-6 overflow-hidden scroll-mt-24">
        
        {/* Background - Optimized with CSS gradients instead of blur */}
        <div className="absolute inset-0 pointer-events-none">
            {/* Optimized radial gradients - GPU accelerated, no blur computation */}
            <div 
                className="absolute top-0 right-0 w-[600px] h-[600px] -translate-y-1/3 translate-x-1/4"
                style={{ 
                    background: 'radial-gradient(circle, rgba(84,131,179,0.08) 0%, transparent 70%)',
                    willChange: 'transform'
                }}
            />
            <div 
                className="absolute bottom-0 left-0 w-[500px] h-[500px] translate-y-1/4 -translate-x-1/4"
                style={{ 
                    background: 'radial-gradient(circle, rgba(84,131,179,0.05) 0%, transparent 70%)',
                    willChange: 'transform'
                }}
            />
            
            {/* Single Elegant Line - Simplified */}
            <div 
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(135deg, transparent 0%, transparent 40%, rgba(84,131,179,0.15) 50%, transparent 60%, transparent 100%)',
                    opacity: 0.5
                }}
            />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
            
            {/* Centered Title */}
            <div className="text-center mb-16 lg:mb-24">
                <RevealOnScroll variant="up">
                    <span className="text-xs uppercase tracking-[0.3em] text-[#5483B3] mb-4 block">
                        Structuration
                    </span>
                    <h2 className="text-5xl md:text-7xl font-serif leading-none">
                        Formes de Vente
                    </h2>
                </RevealOnScroll>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                
                {/* Left Column: Image */}
                <div className="lg:col-span-5 sticky top-32 z-20">
                    <RevealOnScroll variant="scale" delay={150}>
                        <div className="relative h-[500px] w-full overflow-hidden rounded-sm shadow-2xl shadow-[#021024]/50">
                            <img 
                                src="https://images.unsplash.com/photo-1531062655013-ebcacdf1c350?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="Modern Architecture" 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </RevealOnScroll>
                </div>

                {/* Right Column: Accordion List */}
                <div className="lg:col-span-7">
                    <div className="space-y-0">
                        <RevealOnScroll variant="up" delay={100}>
                        <FormeDeVenteItem 
                            id="item-asset-deal"
                            title="Asset Deal"
                            subtitle="Vente en nom"
                            index={1}
                            isOpen={formesAccordion === "asset-deal"}
                            onClick={() => toggleFormes("asset-deal")}
                            description={
                                <>
                                    <p className="mb-4">
                                        Dans le cadre d&apos;un Asset Deal, c&apos;est l&apos;immeuble lui-même qui est vendu.
                                    </p>
                                    <p className="mb-4">
                                        La vente en nom présente moins de risques pour l’investisseur, car seuls ceux liés à l’immeuble sont transférés à l’acquéreur.
                                    </p>
                                    <p>
                                        Les frais de vente (notaire, registre foncier, droits de mutation) sont à la charge de l&apos;acheteur, conformément à l&apos;usage.
                                    </p>
                                </>
                            }
                        />
                        </RevealOnScroll>

                        <RevealOnScroll variant="up" delay={250}>
                        <FormeDeVenteItem 
                            id="item-share-deal"
                            title="Share Deal"
                            subtitle="Vente en société"
                            index={2}
                            isOpen={formesAccordion === "share-deal"}
                            onClick={() => toggleFormes("share-deal")}
                            description={
                                <>
                                    <p className="mb-4">
                                        Dans le cadre d’un Share Deal, ce sont les actions de la société propriétaire de l’immeuble qui sont vendues.
                                    </p>
                                    <p className="mb-4">
                                        La vente en société présente des avantages financiers et fiscaux pour le vendeur comme pour l’acquéreur. Ici, une due diligence plus approfondie est toutefois nécessaire, car l’acquéreur reprend l’ensemble des risques liés à l’historique de la société.
                                    </p>
                                </>
                            }
                        />
                        </RevealOnScroll>

                        <RevealOnScroll variant="up" delay={400}>
                        <FormeDeVenteItem
                            id="item-sale-leaseback"
                            title="Sale & Leaseback"
                            subtitle="Cession-bail"
                            index={3}
                            isOpen={formesAccordion === "sale-leaseback"}
                            onClick={() => toggleFormes("sale-leaseback")}
                            description={
                                <>
                                    <p className="mb-4">
                                        Le sale and leaseback peut prendre la forme soit d'un Asset Deal soit d'un Share Deal.
                                    </p>
                                    <p className="mb-4">
                                        Dans ce cas particulier, le propriétaire cède son immeuble tout en y demeurant locataire. Il convient ici de déterminer quelle option est la plus avantageuse pour le mandant : maximiser le prix de vente ou, à l'inverse, d'optimiser les conditions de location.
                                    </p>
                                </>
                            }
                        />
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
