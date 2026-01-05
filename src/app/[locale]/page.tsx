"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import HeroSlider from "@/components/HeroSlider";
import FadeIn from "@/components/FadeIn";
import ScrollLine from "@/components/ScrollLine";
import TypologieSection from "@/components/TypologieSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamMemberCard from "@/components/TeamMemberCard";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="sticky top-24 h-[calc(100vh-6rem)] w-full overflow-hidden -z-10">
          <HeroSlider />
          
          {/* Minimalist Overlay */}
          <div className="absolute inset-0 bg-black/30 z-10" />

          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6">
            <div className="flex flex-col items-center w-fit mb-8 animate-fade-in-up">
                <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-[family-name:var(--font-cormorant-garamond)] font-light text-white uppercase leading-none tracking-widest pl-[0.1em]">
                    ARCAN
                </h1>
                <span className="text-xl md:text-4xl lg:text-5xl font-[family-name:var(--font-cormorant-garamond)] font-light text-white uppercase tracking-[0.75em] pl-[0.4em] leading-none mt-1 md:mt-2 block w-full text-center">
                    Transactions
                </span>
            </div>
            
            <div className="w-16 h-[1px] bg-white/60 mb-8 animate-fade-in-up delay-100"></div>

            <p className="text-lg md:text-xl text-white font-light tracking-[0.3em] uppercase animate-fade-in-up delay-200 drop-shadow-md">
              {t('hero.tagline')}
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer">
            <a href="#valeurs" className="text-white/70 hover:text-white transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </section>

        <div className="relative z-10 bg-background">
          {/* Redesigned About Section - Overlapping Layout */}
          <section id="qui-sommes-nous" className="py-24 bg-white overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6">
              
              {/* Main Content Area */}
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-32 relative">
                
                {/* Left Column: Typography & Text */}
                <div className="lg:w-5/12 pt-12 z-10">
                    <FadeIn>
                        <div className="flex flex-col gap-4 mb-8">
                            <span className="text-xs font-bold tracking-[0.2em] text-secondary uppercase block">{t('about.label')}</span>
                            <div className="w-12 h-px relative">
                                <ScrollLine color="bg-secondary" />
                            </div>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-serif text-primary leading-[0.9] mb-12">
                            {t('about.title1')} <br/> {t('about.title2')} <br/> <span className="italic text-gray-300">{t('about.title3')}</span>
                        </h2>
                    </FadeIn>
                    
                    <FadeIn delay={200}>
                      <div className="space-y-6 md:space-y-8 text-base md:text-lg text-gray-600 font-light leading-relaxed max-w-xl relative pl-8">
                            {/* Vertical Line Decoration */}
                            <div className="absolute left-0 top-2 bottom-2 w-px">
                                <ScrollLine direction="vertical" color="bg-secondary/30" />
                            </div>
                            
                        <p className="text-xl md:text-2xl text-primary font-normal leading-tight">
                                {t('about.intro')}
                            </p>
                            <p>
                                {t('about.text1')}
                            </p>
                            <p>
                                {t('about.text2')}
                            </p>

                        <div className="w-full h-[0.5px] relative overflow-hidden my-6 md:my-8">
                          <div className="absolute top-0 left-0 h-full w-full bg-secondary/80 animate-draw-line"></div>
                            </div>

                        <h3 className="text-xl md:text-2xl font-serif text-primary mb-4">{t('about.servicesTitle')}</h3>

                        <ul className="space-y-3">
                          {[
                            t('about.services.1'),
                            t('about.services.2'),
                            t('about.services.3'),
                            t('about.services.4'),
                            t('about.services.5')
                          ].map((text, index) => (
                            <li key={index} className="flex items-start gap-3 text-[15px] md:text-base text-gray-600 font-light">
                              <span className="mt-[0.6em] w-1.5 h-1.5 rounded-full bg-secondary/60 shrink-0"></span>
                              <span>{text}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-8">
                          <Link href="/realisations" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 hover:bg-[#052659]">
                            <span>{t('about.cta')}</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Right Column: Image & Floating Stats */}
                <div className="lg:w-7/12 relative mt-12 lg:mt-0">
                    <FadeIn direction="left" delay={300}>
                        <div className="relative">
                            <div className="relative h-[600px] w-full bg-gray-100 group overflow-hidden">
                                <Image 
                                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" 
                                    alt="Architecture Suisse" 
                                    fill 
                                    className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                                />
                                {/* Overlay Pattern */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                            </div>

                            {/* Stats Box - Horizontal & Overlapping */}
                            <div className="absolute -bottom-12 -left-4 lg:-bottom-16 lg:-left-24 bg-primary p-8 lg:p-10 shadow-2xl z-20 max-w-[90vw] lg:max-w-none">
                                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                                    <div className="group">
                                        <span className="text-4xl lg:text-5xl font-serif text-white block mb-2">30+</span>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold leading-relaxed max-w-[140px]">{t('about.stats.experience')}</p>
                                    </div>
                                    
                                    <div className="hidden md:block w-px bg-white/10"></div>
                                    
                                    <div className="group">
                                        <span className="text-4xl lg:text-5xl font-serif text-white block mb-2">100+</span>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold leading-relaxed max-w-[140px]">{t('about.stats.buildings')}</p>
                                    </div>

                                    <div className="hidden md:block w-px bg-white/10"></div>

                                    <div className="group">
                                      <span className="text-4xl lg:text-5xl font-serif text-white block mb-2">{t('about.stats.volumeValue')}</span>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold leading-relaxed max-w-[140px]">{t('about.stats.volume')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
              </div>

              {/* Team Section - Removed from here */}
            </div>
          </section>

          {/* Process Transition & Atouts */}
          <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image 
                src="https://images.unsplash.com/photo-1644661154323-5022528d2857?q=80&w=2054&auto=format&fit=crop"
                alt="Architecture"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#03081f]/85" />
            </div>
            
            <div className="relative z-10 w-full py-24 lg:py-32">
              
              {/* Header */}
              <div className="max-w-[1400px] mx-auto px-6 mb-20">
                <FadeIn>
                  <span className="inline-block text-accent text-xs font-bold tracking-[0.3em] uppercase mb-6">{t('process.label')}</span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.15] mb-8 max-w-4xl">
                    {t('process.title')} <span className="text-accent">{t('process.secure')}</span> {t('process.and')} <span className="text-accent">{t('process.optimize')}</span> {t('process.titleEnd')}
                  </h2>
                  <Link href="/procedures-de-vente" className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent/90 text-white text-sm font-medium tracking-wide transition-all duration-300 group">
                    <span>{t('process.cta')}</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </FadeIn>
              </div>

              {/* Infinite Scrolling Atouts */}
              <div className="relative">
                
                {/* Scrolling Track */}
                <div className="flex w-max animate-[scroll_30s_linear_infinite] hover:[animation-play-state:paused]">
                  {/* First Set */}
                  {[
                    { title: t('values.professionalism'), desc: t('values.professionalismDesc') },
                    { title: t('values.efficiency'), desc: t('values.efficiencyDesc') },
                    { title: t('values.network'), desc: t('values.networkDesc') },
                    { title: t('values.trust'), desc: t('values.trustDesc') },
                    { title: t('values.transparency'), desc: t('values.transparencyDesc') },
                    { title: t('values.flexibility'), desc: t('values.flexibilityDesc') }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-16 md:gap-32 px-8 md:px-16 shrink-0">
                      <div>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-1">{item.title}</h3>
                        <p className="text-xs md:text-sm text-accent/70 uppercase tracking-widest">{item.desc}</p>
                      </div>
                      <span className="text-accent/40 text-2xl md:text-4xl">✦</span>
                    </div>
                  ))}
                  {/* Duplicate Set for Seamless Loop */}
                  {[
                    { title: t('values.professionalism'), desc: t('values.professionalismDesc') },
                    { title: t('values.efficiency'), desc: t('values.efficiencyDesc') },
                    { title: t('values.network'), desc: t('values.networkDesc') },
                    { title: t('values.trust'), desc: t('values.trustDesc') },
                    { title: t('values.transparency'), desc: t('values.transparencyDesc') },
                    { title: t('values.flexibility'), desc: t('values.flexibilityDesc') }
                  ].map((item, index) => (
                    <div key={`dup-${index}`} className="flex items-center gap-16 md:gap-32 px-8 md:px-16 shrink-0">
                      <div>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-1">{item.title}</h3>
                        <p className="text-xs md:text-sm text-accent/70 uppercase tracking-widest">{item.desc}</p>
                      </div>
                      <span className="text-accent/40 text-2xl md:text-4xl">✦</span>
                    </div>
                  ))}
                </div>
              </div>


            </div>
          </section>

          {/* Typologie d'actifs Section */}
          <TypologieSection />

          {/* Team Section - Moved Here */}
          <section className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto px-6">
                  <div className="flex justify-between items-end mb-16 border-b border-gray-100 pb-8">
                      <FadeIn>
                        <h3 className="text-4xl font-serif text-primary">{t('team.title')}</h3>
                      </FadeIn>
                      <FadeIn delay={200}>
                        <Link href="/realisations" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                            {t('team.realisationsLink')} <span className="text-lg">→</span>
                        </Link>
                      </FadeIn>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
                       {[
                         { 
                            name: "Aurèle Arthur LAYA", 
                            role: "Managing Partner", 
                            email: "a.laya@arcan-transactions.ch",
                            linkedin: "https://www.linkedin.com/in/aur%C3%A8le-arthur-laya-495a10206/" 
                         },
                         { 
                            name: "Alexandre ARAZI", 
                            role: "Managing Partner", 
                            email: "a.arazi@arcan-transactions.ch",
                            linkedin: "https://www.linkedin.com/in/alexandre-arazi-a92466132/" 
                         },
                         { 
                            name: "Gilles COHEN", 
                            role: "Transaction Director", 
                            email: "g.cohen@arcan-transactions.ch",
                            linkedin: "https://www.linkedin.com/in/gilles-cohen-690b02210/" 
                         }
                       ].map((member, index) => (
                           <FadeIn key={index} delay={index * 150}>
                               <TeamMemberCard 
                                   name={member.name}
                                   role={member.role}
                                   email={member.email}
                                   linkedin={member.linkedin}
                               />
                           </FadeIn>
                       ))}
                  </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
