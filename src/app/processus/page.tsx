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
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({ opacity: 0, transform: "translateY(100px) scale(0.9)" });

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
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
        <div id={id} ref={ref} className={className} style={{ ...style, transition: 'transform 0.1s ease-out, opacity 0.1s ease-out' }}>
            {children}
        </div>
    );
}

export default function ProcessusPage() {
  return (
    <main className="bg-[#FDFBF7] min-h-screen">
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



      {/* Vente Directe - Sticky Split */}
      <section id="vente-directe" className="relative z-10 bg-[#FDFBF7]">
        <div className="flex flex-col lg:flex-row">
            {/* Sticky Header (Left) */}
            <div className="lg:w-1/2 lg:h-screen lg:sticky lg:top-0 bg-[#021024] text-[#FDFBF7] p-12 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] border border-[#FDFBF7] rounded-full"></div>
                </div>
                
                <div className="relative z-10">
                    <RevealOnScroll variant="slide" delay={200}>
                        <h2 className="text-6xl md:text-8xl font-serif leading-none mb-6">
                            Vente<br/>
                            <span className="text-[#5483B3] italic">Directe</span>
                        </h2>
                    </RevealOnScroll>
                    
                    <RevealOnScroll variant="fade" delay={400}>
                        <p className="text-xl font-light opacity-70 max-w-md mt-8 border-l border-[#5483B3] pl-6">
                            Une approche ciblée et confidentielle pour des transactions rapides et maîtrisées.
                        </p>
                    </RevealOnScroll>
                </div>

                <div className="absolute bottom-12 left-12 text-[12rem] font-serif opacity-5 font-bold leading-none select-none">01</div>
            </div>

            {/* Scrollable Content (Right) */}
            <div className="lg:w-1/2 p-12 md:p-24 space-y-32 bg-[#FDFBF7]">
                {/* Definitions */}
                <RevealOnScroll variant="fade">
                    <h3 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-12">Types de Mandat</h3>
                    <div className="space-y-16">
                        <div className="group">
                            <h4 className="text-4xl font-serif mb-6 group-hover:text-[#5483B3] transition-colors duration-300">Exclusive</h4>
                            <p className="text-gray-600 font-light leading-relaxed text-lg">
                                L’objet est présenté à un seul prospect, au prix fixé. La vente se concrétise uniquement si le prix est accepté, garantissant une confidentialité totale.
                            </p>
                        </div>
                        <div className="group">
                            <h4 className="text-4xl font-serif mb-6 group-hover:text-[#5483B3] transition-colors duration-300">Sélective</h4>
                            <p className="text-gray-600 font-light leading-relaxed text-lg">
                                L’objet est présenté au prix fixé à plusieurs investisseurs qualifiés. Le principe est simple : le premier offrant au prix obtient l’attribution (« first in, first served »).
                            </p>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* Timeline */}
                <RevealOnScroll variant="fade">
                    <div className="flex items-center justify-between mb-12">
                        <h3 className="text-xs uppercase tracking-[0.3em] text-gray-400">Timeline</h3>
                        <span className="text-lg font-serif text-[#5483B3]">3 sem. - 1.5 mois</span>
                    </div>
                    
                    <div className="relative border-l border-[#021024]/10 pl-12 space-y-12">
                        {[
                            "Sélection de deux ou trois investisseurs",
                            "Envoi teaser + NDA",
                            "Réception NDA signées & ouverture short-dataroom",
                            "Réception NBO & ouverture full dataroom",
                            "Réception des BO et acceptation",
                            "Revue du projet d’acte notarié",
                            "Signing & closing"
                        ].map((step, i) => (
                            <div key={i} className="relative group">
                                <span className="absolute -left-[53px] top-2 w-3 h-3 rounded-full bg-[#021024]/20 group-hover:bg-[#5483B3] transition-colors duration-300"></span>
                                <p className="text-xl font-light text-gray-800 group-hover:text-[#5483B3] transition-colors duration-300">{step}</p>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>

                {/* Pros/Cons */}
                <RevealOnScroll variant="fade">
                    <div className="grid grid-cols-1 gap-8">
                        <div className="bg-white p-10 shadow-lg border-t-4 border-[#5483B3]">
                            <h4 className="text-sm uppercase tracking-widest text-[#5483B3] mb-6">Avantages</h4>
                            <ul className="space-y-4">
                                {["Prix de vente fixé à l’avance", "Approche ciblée", "Souplesse de négociation", "Rapidité de la procédure", "Procédure d’attribution de gré à gré"].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600 font-light">
                                        <span className="text-[#5483B3] text-xl leading-none">+</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white p-10 shadow-lg border-t-4 border-gray-200">
                            <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-6">Inconvénients</h4>
                            <ul className="space-y-4">
                                {["Transaction moins structurée", "Délais non-impératifs", "Moins de concurrence", "Moins de surenchère"].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600 font-light">
                                        <span className="text-gray-400 text-xl leading-none">-</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </div>
      </section>

      {/* Appel d'Offres - Sticky Split (Reversed) */}
      <section id="appel-d-offres" className="relative z-10 bg-[#FDFBF7]">
        <div className="flex flex-col lg:flex-row-reverse">
            {/* Sticky Header (Right) */}
            <div className="lg:w-1/2 lg:h-screen lg:sticky lg:top-0 bg-[#021024] text-[#FDFBF7] p-12 flex flex-col justify-center relative overflow-hidden border-l border-[#FDFBF7]/5">
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                     <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border border-[#FDFBF7] rounded-full"></div>
                </div>

                <div className="relative z-10 text-right">
                    <RevealOnScroll variant="slide" delay={200}>
                        <h2 className="text-6xl md:text-8xl font-serif leading-none mb-6">
                            Appel<br/>
                            <span className="text-[#5483B3] italic">d'Offres</span>
                        </h2>
                    </RevealOnScroll>
                    
                    <RevealOnScroll variant="fade" delay={400}>
                        <p className="text-xl font-light opacity-70 max-w-md mt-8 border-r border-[#5483B3] pr-6 ml-auto">
                            Un processus structuré pour maximiser la valeur par la concurrence.
                        </p>
                    </RevealOnScroll>
                </div>

                <div className="absolute bottom-12 right-12 text-[12rem] font-serif opacity-5 font-bold leading-none select-none">02</div>
            </div>

            {/* Scrollable Content (Left) */}
            <div className="lg:w-1/2 p-12 md:p-24 space-y-32 bg-[#FDFBF7]">
                {/* Definitions */}
                <RevealOnScroll variant="fade">
                    <h3 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-12">Types de Mandat</h3>
                    <div className="space-y-16">
                        <div className="group">
                            <h4 className="text-4xl font-serif mb-6 group-hover:text-[#5483B3] transition-colors duration-300">Sélective</h4>
                            <p className="text-gray-600 font-light leading-relaxed text-lg">
                                Pour des objets très spécifiques, il convient de limiter le cercle des investisseurs à 5 ou 10 prospects triés sur le volet.
                            </p>
                        </div>
                        <div className="group">
                            <h4 className="text-4xl font-serif mb-6 group-hover:text-[#5483B3] transition-colors duration-300">Ouverte</h4>
                            <p className="text-gray-600 font-light leading-relaxed text-lg">
                                Pour des objets très recherchés par le marché, il convient d’ouvrir au maximum au cercle des investisseurs pour créer une émulation.
                            </p>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* Timeline */}
                <RevealOnScroll variant="fade">
                    <div className="flex items-center justify-between mb-12">
                        <h3 className="text-xs uppercase tracking-[0.3em] text-gray-400">Timeline</h3>
                        <span className="text-lg font-serif text-[#5483B3]">3 à 4 mois</span>
                    </div>
                    
                    <div className="relative border-l border-[#021024]/10 pl-12 space-y-12">
                        {[
                            "Sélection d’une vingtaine d’investisseurs",
                            "Envoi teaser + NDA",
                            "Réception NDA & envoi Information Memorandum",
                            "Réception NBO & sélection short list",
                            "Ouverture dataroom complète",
                            "Réception BO & adjudication",
                            "Revue acte notarié & closing"
                        ].map((step, i) => (
                            <div key={i} className="relative group">
                                <span className="absolute -left-[53px] top-2 w-3 h-3 rounded-full bg-[#021024]/20 group-hover:bg-[#5483B3] transition-colors duration-300"></span>
                                <p className="text-xl font-light text-gray-800 group-hover:text-[#5483B3] transition-colors duration-300">{step}</p>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>

                {/* Pros/Cons */}
                <RevealOnScroll variant="fade">
                    <div className="grid grid-cols-1 gap-8">
                        <div className="bg-white p-10 shadow-lg border-t-4 border-[#5483B3]">
                            <h4 className="text-sm uppercase tracking-widest text-[#5483B3] mb-6">Avantages</h4>
                            <ul className="space-y-4">
                                {["Prix de vente « plancher »", "Processus structuré et contrôlé", "Délais fixés impératifs", "Concurrence & Surenchère", "Adapté aux institutionnels"].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600 font-light">
                                        <span className="text-[#5483B3] text-xl leading-none">+</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white p-10 shadow-lg border-t-4 border-gray-200">
                            <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-6">Inconvénients</h4>
                            <ul className="space-y-4">
                                {["Risque sans offre au prix", "Lenteur de la procédure", "Objet diffusé si échec", "Moins adapté aux privés"].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600 font-light">
                                        <span className="text-gray-400 text-xl leading-none">-</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </RevealOnScroll>
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
                <ParallaxCard id="asset-deal" className="group">
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
                <ParallaxCard id="share-deal" className="group">
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
                                Cette forme de vente est donc plus complexe et nécessite une timeline plus longue.
                            </p>
                        </div>
                    </div>
                </ParallaxCard>

                {/* Sale & Leaseback */}
                <ParallaxCard id="sale-leaseback" className="group">
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
                            <h3 className="text-4xl md:text-7xl font-serif mb-4 md:mb-6 text-white">Sale & Leaseback</h3>
                            <p className="text-white/80 italic text-lg md:text-xl mb-8 md:mb-12">Cession-bail</p>
                            
                            <p className="text-base md:text-2xl text-white font-light leading-relaxed drop-shadow-sm">
                                Le sale and leaseback peut prendre la forme soit d’un Asset Deal, soit d’un Share Deal.
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
