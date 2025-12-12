"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

function RevealOnScroll({ 
    children, 
    className = "", 
    delay = 0,
    variant = "fade",
    triggerOnMount = false
}: { 
    children: React.ReactNode, 
    className?: string, 
    delay?: number,
    variant?: "fade" | "slide" | "zoom" | "mask"
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
            { threshold: 0.1 }
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
                    : "translate-y-8 opacity-0";
            case "slide":
                return isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8";
            case "zoom":
                return isVisible
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95";
            case "fade":
            default:
                return isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-6";
        }
    };

    if (variant === "mask") {
        return (
            <div ref={ref} className={`overflow-hidden ${className}`}>
                <div 
                    className={`will-change-[opacity,transform] transition-[opacity,transform] duration-700 ease-out ${getVariantClasses()}`}
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
            className={`${className} will-change-[opacity,transform] transition-[opacity,transform] duration-700 ease-out ${getVariantClasses()}`} 
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

type ProjectCard = {
    id: "p1" | "p2" | "p3" | "p4" | "p5" | "p6";
    amount: string;
    date: string;
    color: string;
    textColor: string;
    borderColor: string;
};

const projectCards: ProjectCard[] = [
    {
        id: "p1",
        amount: "> CHF 11mios",
        date: "2025",
        color: "bg-[#FDFBF7]",
        textColor: "text-[#021024]",
        borderColor: "border-[#021024]/10"
    },
    {
        id: "p2",
        amount: "> CHF 14 mios",
        date: "2025",
        color: "bg-[#021024]",
        textColor: "text-[#FDFBF7]",
        borderColor: "border-[#FDFBF7]/10"
    },
    {
        id: "p3",
        amount: "Env. CHF 8 mios",
        date: "2024",
        color: "bg-[#FDFBF7]",
        textColor: "text-[#021024]",
        borderColor: "border-[#021024]/10"
    },
    {
        id: "p4",
        amount: "> CHF 26 mios",
        date: "2023",
        color: "bg-[#021024]",
        textColor: "text-[#FDFBF7]",
        borderColor: "border-[#FDFBF7]/10"
    },
    {
        id: "p5",
        amount: "> 250 mios",
        date: "2022",
        color: "bg-[#FDFBF7]",
        textColor: "text-[#021024]",
        borderColor: "border-[#021024]/10"
    },
    {
        id: "p6",
        amount: "> 500 mios",
        date: "2020",
        color: "bg-[#021024]",
        textColor: "text-[#FDFBF7]",
        borderColor: "border-[#FDFBF7]/10"
    }
];

export default function RealisationsPage() {
    const t = useTranslations('realisationsPage');

  return (
    <main className="relative bg-[#FDFBF7]">
      <Navbar />
      
      {/* Hero Section - Portfolio / Gallery Style */}
      <section className="h-[calc(100vh-6rem)] sticky top-24 flex flex-col justify-end pb-12 md:pb-20 px-6 md:px-12 overflow-hidden">
         
         {/* Background Image */}
         <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1530136015037-cd8ef889cbff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt={t('hero.imageAlt')} 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#021024]/70 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#021024] via-transparent to-transparent"></div>
         </div>

         {/* Top Label - Absolute Positioned in Section */}
         <div className="absolute top-6 right-6 md:top-12 md:right-12 z-20">
             <RevealOnScroll variant="fade" delay={200} triggerOnMount>
                <div className="text-right">
                    <span className="block text-[0.6rem] md:text-xs uppercase tracking-[0.3em] text-white/60 mb-1 md:mb-2">{t('hero.topLabel')}</span>
                    <span className="block text-2xl md:text-4xl font-serif text-white whitespace-nowrap">{t('hero.years')}</span>
                </div>
             </RevealOnScroll>
         </div>

         {/* Content */}
         <div className="relative z-10 w-full max-w-[1800px] mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end border-t border-white/10 pt-8 lg:pt-12">
                
                {/* Main Title */}
                <div className="lg:col-span-7">
                    <h1 className="font-serif text-white leading-none">
                        <RevealOnScroll variant="slide" delay={200} triggerOnMount>
                            <span className="block text-2xl md:text-3xl font-sans font-light tracking-widest uppercase mb-4 text-[#5483B3]">{t('hero.kicker')}</span>
                        </RevealOnScroll>
                        <RevealOnScroll variant="mask" delay={400} triggerOnMount>
                            <span className="block text-[11vw] lg:text-[7vw] tracking-tighter opacity-90 whitespace-nowrap">{t('hero.title')}</span>
                        </RevealOnScroll>
                    </h1>
                </div>

                {/* Stats & Description */}
                <div className="lg:col-span-5 flex flex-col justify-end mt-4 lg:mt-0">
                    
                    <RevealOnScroll variant="fade" delay={600} triggerOnMount>
                        <p className="text-[clamp(1rem,2vw,1.5rem)] font-light text-white/80 leading-relaxed mb-6 lg:mb-8 max-w-md lg:ml-auto text-left lg:text-right whitespace-nowrap">
                            {t('hero.tagline')}
                        </p>
                    </RevealOnScroll>

                    <div>
                        <RevealOnScroll variant="fade" delay={800} triggerOnMount>
                            <div className="text-left lg:text-right">
                                <span className="block text-[clamp(3.5rem,8vw,6rem)] font-serif text-white mb-2 lg:mb-4 whitespace-nowrap">{t('hero.volumeValue')}</span>
                                <span className="block text-[clamp(0.7rem,1.2vw,1rem)] uppercase tracking-[0.2em] text-white/60 whitespace-nowrap">{t('hero.volumeLabel')}</span>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* Stacking Cards Container */}
      <div className="relative z-10">
                {projectCards.map((card, index) => (
          <div 
            key={index} 
                        className={`sticky top-0 h-screen flex flex-col justify-center items-center ${card.color} ${card.textColor} overflow-hidden transition-transform duration-700 ease-out`}
          >
             {/* Decorative Background Elements */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full border border-current opacity-5"></div>
                <div className="absolute top-[40%] -left-[10%] w-[40vw] h-[40vw] rounded-full border border-current opacity-5"></div>
                
                {/* Large Number Background */}
                <div className="absolute bottom-[-5vh] left-[-2vw] text-[30vw] font-serif font-bold leading-none opacity-[0.04] select-none tracking-tighter">
                    0{index + 1}
                </div>
             </div>

             {/* Content Layout */}
             <div className="max-w-6xl w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                
                {/* Left: Title & Main Info (7 cols) */}
                <div className="lg:col-span-7">
                    <div className="flex flex-col gap-8">
                        <RevealOnScroll delay={100} variant="slide">
                            <div className="flex items-center gap-4 opacity-60">
                                <span className="text-sm tracking-[0.2em] uppercase">{card.date}</span>
                                <span className="w-12 h-[1px] bg-current"></span>
                                <span className="text-sm tracking-[0.2em] uppercase">{t(`projects.${card.id}.location`)}</span>
                            </div>
                        </RevealOnScroll>
                        
                        <RevealOnScroll delay={200} variant="fade">
                            <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-serif leading-[0.9] tracking-tight break-words">
                                {t(`projects.${card.id}.title`)}
                            </h2>
                        </RevealOnScroll>
                        
                        <RevealOnScroll delay={400} variant="fade">
                            <div className="inline-block border-b border-current pb-2">
                                <span className="text-3xl md:text-4xl font-light">{card.amount}</span>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>

                {/* Right: Details Table (5 cols) */}
                <div className={`lg:col-span-5 lg:border-l ${card.borderColor} lg:pl-12 pt-8 lg:pt-0 flex flex-col h-full justify-center`}>
                    
                    <div className="space-y-12">
                        <RevealOnScroll delay={500} variant="fade">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <span className="block text-xs uppercase tracking-[0.2em] opacity-50 mb-2">{t('labels.seller')}</span>
                                    <span className="font-serif text-2xl">{t(`projects.${card.id}.seller`)}</span>
                                </div>
                                <div>
                                    <span className="block text-xs uppercase tracking-[0.2em] opacity-50 mb-2">{t('labels.buyer')}</span>
                                    <span className="font-serif text-2xl">{t(`projects.${card.id}.buyer`)}</span>
                                </div>
                            </div>
                        </RevealOnScroll>
                        
                        <RevealOnScroll delay={600} variant="fade">
                            <div>
                                <span className="block text-xs uppercase tracking-[0.2em] opacity-50 mb-2">{t('labels.location')}</span>
                                <span className="font-serif text-2xl">{t(`projects.${card.id}.location`)}</span>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={700} variant="fade">
                            <div className="pt-8 opacity-40 text-sm max-w-xs leading-relaxed">
                                {t(`projects.${card.id}.description`)}
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
             </div>
             
             {/* Slide Number */}
             <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-sm font-mono opacity-30">
                <span className="text-3xl">{index + 1}</span>
                <span className="mx-2">/</span>
                     <span>{projectCards.length}</span>
             </div>
          </div>
        ))}
      </div>

      {/* Final CTA Section */}
      <section className="relative z-10 bg-[#FDFBF7] py-32 flex flex-col items-center justify-center text-center px-6">
        <a href="/contact" className="group relative">
            <span className="font-serif text-4xl md:text-5xl text-[#021024] italic group-hover:text-[#5483B3] transition-colors duration-300">
                                {t('cta')}
            </span>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-[#021024]/20 group-hover:w-full group-hover:bg-[#5483B3] transition-all duration-500 ease-out"></span>
        </a>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
