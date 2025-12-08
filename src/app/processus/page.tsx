"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";

// --- Shared Animation Component ---
function RevealOnScroll({ 
    children, 
    className = "", 
    delay = 0,
    variant = "blur",
    triggerOnMount = false
}: { 
    children: React.ReactNode, 
    className?: string, 
    delay?: number,
    variant?: "blur" | "fade" | "slide" | "zoom" | "mask"
    triggerOnMount?: boolean
}) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (triggerOnMount) {
            const timer = setTimeout(() => setIsVisible(true), 100);
            return () => clearTimeout(timer);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [triggerOnMount]);

    const getVariantClasses = () => {
        switch (variant) {
            case "mask":
                return isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-[110%] opacity-0";
            case "blur": 
                return isVisible 
                    ? "opacity-100 blur-0 translate-y-0 scale-100" 
                    : "opacity-0 blur-xl translate-y-12 scale-90";
            case "slide": 
                return isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12";
            case "zoom": 
                return isVisible
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-110";
            case "fade": 
            default:
                return isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-10";
        }
    };

    if (variant === "mask") {
        return (
            <div ref={ref} className={`overflow-hidden ${className}`}>
                <div 
                    className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${getVariantClasses()}`}
                    style={{ transitionDelay: `${delay}ms` }}
                >
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div 
            ref={ref} 
            className={`${className} transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${getVariantClasses()}`} 
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

function ParallaxCard({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({ opacity: 0, transform: "translateY(100px) scale(0.9)" });

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Animation starts when element enters viewport
            // Completes when it's 20% up the screen
            const start = windowHeight;
            const end = windowHeight * 0.2;
            
            let progress = (start - rect.top) / (start - end);
            progress = Math.max(0, Math.min(progress, 1));
            
            // Easing
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setStyle({
                opacity: progress,
                transform: `translateY(${100 * (1 - ease)}px) scale(${0.9 + (0.1 * ease)})`
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div id={id} ref={containerRef} className={className}>
            <div style={{ ...style, transition: 'transform 0.1s ease-out, opacity 0.1s ease-out' }}>
                {children}
            </div>
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
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}
            >
                <div className="text-gray-600 font-light leading-relaxed text-base md:text-lg pt-2">
                    {children}
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
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[300px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}
            >
                <div className="text-gray-400 font-light leading-relaxed pl-[4.5rem]">
                    {children}
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

  useEffect(() => {
      if (typeof window !== 'undefined') {
          // Handle hash (direct links)
          if (window.location.hash) {
              const hash = window.location.hash.substring(1);
              if (hash === 'mandat-exclusif' || hash === 'mandat-simple') {
                  setMandatOpen(hash);
              }
          }

          // Handle query params (from navbar)
          const params = new URLSearchParams(window.location.search);
          const mandat = params.get('mandat');
          if (mandat === 'exclusif') setMandatOpen('mandat-exclusif');
          if (mandat === 'simple') setMandatOpen('mandat-simple');
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
                    <RevealOnScroll variant="fade" delay={200} triggerOnMount>
                        <span className="text-[#5483B3] font-medium tracking-widest uppercase text-sm mb-4 block">Méthodologie</span>
                    </RevealOnScroll>
                    <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9]">
                        <RevealOnScroll variant="slide" delay={400} triggerOnMount>
                            <span className="block">Processus</span>
                        </RevealOnScroll>
                        <RevealOnScroll variant="slide" delay={600} triggerOnMount>
                            <span className="block text-white/80 italic font-light">de Vente</span>
                        </RevealOnScroll>
                    </h1>
                </div>

                {/* Description Area - Restored Full Content */}
                <div className="lg:col-span-5 pb-2">
                    <RevealOnScroll variant="fade" delay={800} triggerOnMount>
                        <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed text-justify">
                            Arcan Transactions SA s’occupe de la gestion complète du processus de vente en vue de maximiser le prix de vente de l’actif que ça soit par le biais d’une vente directe ou d’un appel d’offres, en Asset Deal (vente en nom) ou en Share Deal (vente en société) ou en Sale and lease-back.
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
                    <RevealOnScroll variant="slide">
                        <span className="text-[#5483B3] font-medium tracking-widest uppercase text-sm mb-4 block">Avant-propos</span>
                        <h2 className="text-5xl md:text-6xl font-serif text-white leading-none mb-8">
                            Type de <span className="italic text-[#5483B3]">Mandat</span>
                        </h2>
                    </RevealOnScroll>
                    <RevealOnScroll variant="fade" delay={200}>
                        <p className="text-lg text-gray-300 font-light leading-relaxed border-l-2 border-[#5483B3] pl-6">
                            Le type de mandat définit le cadre de notre collaboration et les modalités d'intervention pour la vente de votre bien.
                        </p>
                    </RevealOnScroll>
                </div>

                {/* Right: Accordion */}
                <div className="border-t border-white/10">
                    <RevealOnScroll variant="fade" delay={300}>
                        <MandatAccordionItem 
                            id="mandat-exclusif"
                            title="Mandat Exclusif" 
                            letter="E"
                            isOpen={mandatOpen === "mandat-exclusif"}
                            onClick={() => toggleMandat("mandat-exclusif")}
                        >
                            Arcan Transactions SA est le seul intermédiaire mandaté pour la vente du bien. Cette exclusivité nous permet de déployer l'ensemble de nos ressources et de garantir une approche optimale.
                        </MandatAccordionItem>
                    </RevealOnScroll>

                    <RevealOnScroll variant="fade" delay={450}>
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
                        <RevealOnScroll variant="slide">
                            <span className="text-[#5483B3] font-medium tracking-widest uppercase text-sm mb-4 block">01. Méthodologie</span>
                            <h2 className="text-5xl md:text-7xl font-serif text-[#021024] leading-none mb-8">
                                Vente<br/><span className="italic text-[#5483B3]">Directe</span>
                            </h2>
                        </RevealOnScroll>
                        
                        <RevealOnScroll variant="fade" delay={200}>
                            <p className="text-lg text-gray-600 font-light leading-relaxed border-l-2 border-[#5483B3] pl-6 mb-12">
                                Une approche ciblée et confidentielle pour des transactions rapides et maîtrisées. Idéale pour les propriétaires souhaitant discrétion et efficacité.
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll variant="zoom" delay={400}>
                            <div className="relative h-[300px] w-full overflow-hidden hidden lg:block">
                                <img 
                                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1632&auto=format&fit=crop" 
                                    alt="Meeting" 
                                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>

                {/* Accordions (Right) */}
                <div className="lg:col-span-7">
                    <RevealOnScroll variant="fade" delay={300}>
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
                                title="Avantages & Inconvénients" 
                                isOpen={venteAccordion === "vente-proscons"} 
                                onClick={() => toggleVente("vente-proscons")}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-4">
                                    <div>
                                        <h4 className="text-xs uppercase tracking-widest text-[#5483B3] mb-4">Avantages</h4>
                                        <ul className="space-y-2">
                                            {["Prix de vente fixé à l’avance", "Approche ciblée", "Souplesse de négociation", "Rapidité de la procédure", "Procédure d’attribution de gré à gré"].map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm">
                                                    <span className="text-[#5483B3]">+</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Inconvénients</h4>
                                        <ul className="space-y-2">
                                            {["Transaction moins structurée", "Délais non-impératifs", "Moins de concurrence", "Moins de surenchère"].map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                                                    <span className="text-gray-400">-</span> {item}
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
                        <RevealOnScroll variant="slide">
                            <span className="text-[#5483B3] font-medium tracking-widest uppercase text-sm mb-4 block">02. Méthodologie</span>
                            <h2 className="text-5xl md:text-7xl font-serif text-[#021024] leading-none mb-8">
                                Appel<br/><span className="italic text-[#5483B3]">d'Offres</span>
                            </h2>
                        </RevealOnScroll>
                        
                        <RevealOnScroll variant="fade" delay={200}>
                            <p className="text-lg text-gray-600 font-light leading-relaxed border-l-2 border-[#5483B3] pl-6 mb-12">
                                Un processus structuré pour maximiser la valeur par la concurrence. Recommandé pour les actifs à fort potentiel de marché.
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll variant="zoom" delay={400}>
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
                    <RevealOnScroll variant="fade" delay={300}>
                        <div className="border-t border-gray-200">
                            <AccordionItem 
                                title="Forme de la vente" 
                                isOpen={appelAccordion === "appel-types"} 
                                onClick={() => toggleAppel("appel-types")}
                            >
                                <div className="space-y-8 pb-4">
                                    <div>
                                        <h4 className="text-xl font-serif text-[#021024] mb-2">Sélective</h4>
                                        <p>Pour des objets très spécifiques, il convient de limiter le cercle des investisseurs à 5 ou 10 prospects triés sur le volet.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-serif text-[#021024] mb-2">Ouverte</h4>
                                        <p>Pour des objets très recherchés par le marché, il convient d’ouvrir au maximum au cercle des investisseurs pour créer une émulation.</p>
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
                                            3 à 4 mois
                                        </div>
                                    </div>

                                    <div className="relative space-y-0 z-10">
                                        {[
                                            "Sélection de multiples investisseurs",
                                            "Envoi teaser + NDA",
                                            "Réception NDA & envoi Information Memorandum (plaquette de vente)",
                                            "Réception NBO, sélection de la short list & ouverture de la dataroom complète",
                                            "Due diligence",
                                            "Réception BO & adjudication",
                                            "Revue acte notarié & closing",
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
                                title="Avantages & Inconvénients" 
                                isOpen={appelAccordion === "appel-proscons"} 
                                onClick={() => toggleAppel("appel-proscons")}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-4">
                                    <div>
                                        <h4 className="text-xs uppercase tracking-widest text-[#5483B3] mb-4">Avantages</h4>
                                        <ul className="space-y-2">
                                            {["Prix de vente « plancher »", "Processus structuré et contrôlé", "Délais fixés impératifs", "Concurrence & Surenchère", "Adapté aux institutionnels"].map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm">
                                                    <span className="text-[#5483B3]">+</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Inconvénients</h4>
                                        <ul className="space-y-2">
                                            {["Risque sans offre au prix", "Lenteur de la procédure", "Objet diffusé si échec", "Moins adapté aux privés"].map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                                                    <span className="text-gray-400">-</span> {item}
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

      {/* Formes de Vente - Vertical Parallax */}
      <section id="formes-de-vente" className="relative z-10 bg-[#021024] text-[#FDFBF7] py-40 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <RevealOnScroll variant="fade">
                <div className="text-center mb-40">
                    <span className="text-xs uppercase tracking-[0.3em] text-[#5483B3] mb-4 block">
                        Structuration
                    </span>
                    <h2 className="text-6xl md:text-8xl font-serif">Formes de Vente</h2>
                </div>
            </RevealOnScroll>

            <div className="space-y-40">
                {/* Asset Deal */}
                <ParallaxCard id="asset-deal" className="group scroll-mt-48">
                    <div className="relative p-6 md:p-24 rounded-sm overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center justify-center">
                        
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0 z-0">
                            <img 
                                src="https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=2070&auto=format&fit=crop" 
                                alt="Asset Deal Building" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[#021024]/80 mix-blend-multiply"></div>
                            <div className="absolute inset-0 bg-black/40"></div>
                        </div>

                        <div className="absolute top-0 right-0 p-6 md:p-12 opacity-10 text-[8rem] md:text-[15rem] font-serif leading-none select-none text-white z-0">AD</div>
                        
                        <div className="relative z-10 max-w-4xl mx-auto text-center">
                            <h3 className="text-4xl md:text-7xl font-serif mb-4 md:mb-6 text-white">Asset Deal</h3>
                            <p className="text-white/80 italic text-lg md:text-xl mb-8 md:mb-12">Vente en nom</p>
                            
                            <p className="text-base md:text-2xl text-white font-light leading-relaxed drop-shadow-sm">
                                Dans le cadre d’un Asset Deal c’est l’immeuble lui-même qui est vendu.
                                <br/><br/>
                                La vente en nom présente moins de risque pour l’investisseur car seuls ceux liés à l’immeuble sont transférés à l’acquéreur.
                                <br/><br/>
                                <span className="text-[#5483B3] font-medium">Note :</span> In casu, des frais de vente incombe à l’acquéreur et les conséquences fiscales sont, pour le vendeur, moins avantageuse que dans un Share Deal.
                            </p>
                        </div>
                    </div>
                </ParallaxCard>

                {/* Share Deal */}
                <ParallaxCard id="share-deal" className="group scroll-mt-48">
                    <div className="relative p-6 md:p-24 rounded-sm overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center justify-center">
                        
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0 z-0">
                            <img 
                                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" 
                                alt="Share Deal Business" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[#021024]/80 mix-blend-multiply"></div>
                            <div className="absolute inset-0 bg-black/40"></div>
                        </div>

                        <div className="absolute top-0 left-0 p-6 md:p-12 opacity-10 text-[8rem] md:text-[15rem] font-serif leading-none select-none text-white z-0">SD</div>
                        
                        <div className="relative z-10 max-w-4xl mx-auto text-center">
                            <h3 className="text-4xl md:text-7xl font-serif mb-4 md:mb-6 text-white">Share Deal</h3>
                            <p className="text-white/80 italic text-lg md:text-xl mb-8 md:mb-12">Vente en société</p>
                            
                            <p className="text-base md:text-2xl text-white font-light leading-relaxed drop-shadow-sm">
                                Dans le cadre d’un Share Deal, ce sont les actions de la société propriétaire de l’immeuble qui sont vendues.
                                <br/><br/>
                                La vente en société présente des avantages financiers et fiscaux pour le vendeur et l’acquéreur. Toutefois, une due diligence plus approfondie devra intervenir ici car l’acquéreur reprend tous les risques liés à l’historique de la société.
                                <br/><br/>
                                <span className="text-[#5483B3] font-medium">Note :</span> Cette forme de vente est plus complexe et nécessite une timeline plus longue.
                            </p>
                        </div>
                    </div>
                </ParallaxCard>

                {/* Sale & Leaseback */}
                <ParallaxCard id="sale-leaseback" className="group scroll-mt-48">
                    <div className="relative p-6 md:p-24 rounded-sm overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center justify-center">
                        
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0 z-0">
                            <img 
                                src="https://images.unsplash.com/photo-1501864626935-8f8452e07087?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="Sale and Leaseback Architecture" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[#021024]/80 mix-blend-multiply"></div>
                            <div className="absolute inset-0 bg-black/40"></div>
                        </div>

                        <div className="absolute top-0 right-0 p-6 md:p-12 opacity-10 text-[8rem] md:text-[15rem] font-serif leading-none select-none text-white z-0">S&L</div>
                        
                        <div className="relative z-10 max-w-4xl mx-auto text-center">
                            <h3 className="text-4xl md:text-7xl font-serif mb-4 md:mb-6 text-white">
                                Sale & Leaseback <br/> <span className="text-3xl md:text-5xl">(Cas particulier)</span>
                            </h3>
                            <p className="text-white/80 italic text-lg md:text-xl mb-8 md:mb-12">Cession-bail</p>
                            
                            <p className="text-base md:text-2xl text-white font-light leading-relaxed drop-shadow-sm">
                                Le sale and leaseback peut prendre la forme soit d’un Asset Deal soit d’un Share Deal.
                                <br/><br/>
                                Dans ce cadre, le propriétaire cède son immeuble tout en y demeurant locataire. Il convient ici de déterminer quelle option est la plus avantageuse pour le mandant : s’agit-il de maximiser le prix de vente ou, à l’inverse, d’optimiser les conditions de location ?
                            </p>
                        </div>
                    </div>
                </ParallaxCard>
            </div>
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
