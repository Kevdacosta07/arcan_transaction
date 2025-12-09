"use client";

import FadeIn from "./FadeIn";
import TypologieItem from "./TypologieItem";

const assets = [
  { 
    name: "Résidentiel", 
    num: "01",
    items: [
      "Immeubles de logement",
      "Immeubles mixtes (prédominance résidentielle)"
    ]
  },
  { 
    name: "Commercial", 
    num: "02",
    items: [
      "Immeubles de bureaux",
      "Surfaces retail",
      "Centres commerciaux",
      "Immeubles mixtes (prédominance commerciale)"
    ]
  },
  { 
    name: "Hôtellerie", 
    num: "03",
    items: [
      "Mur et exploitation",
      "Mur",
      "Exploitation"
    ]
  },
  { 
    name: "Médico-social", 
    num: "04",
    items: [
      "EMS / Senior",
      "Résidences étudiantes",
      "Hôpitaux",
      "Cliniques"
    ]
  },
  { 
    name: "Industriel", 
    num: "05",
    items: [
      "Industriel à proprement parler",
      "Logistique",
      "Data centers",
      "Dépôts, parkings…"
    ]
  },
  { 
    name: "Terrains", 
    num: "06",
    items: [
      "Parcelles avec ou sans permis",
      "De tout type d'affectation"
    ]
  }
];

export default function TypologieSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 border-[20px] border-gray-50 rounded-full -translate-x-1/2 translate-y-1/2 -z-10"></div>

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
           
           {/* Left Column: Content & List */}
           <div>
              <FadeIn>
                <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase mb-6 block">
                  Nos Domaines
                </span>
                <h2 className="text-5xl md:text-6xl font-serif text-[#021024] mb-8 leading-tight">
                  Typologie <br/> d&apos;actifs
                </h2>
                <p className="text-lg text-gray-500 font-light mb-12 max-w-md leading-relaxed">
                  Arcan Transactions SA est spécialisée dans la transaction d&apos;immeubles de rendement, de tous types affectation.
                </p>
              </FadeIn>

              {/* The List - Redesigned as elegant rows */}
              <div className="space-y-0 border-t border-gray-100">
                {assets.map((item, index) => (
                  <FadeIn key={index} delay={index * 100}>
                    <TypologieItem 
                      num={item.num}
                      name={item.name}
                      items={item.items}
                    />
                  </FadeIn>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-12">
                <FadeIn delay={600}>
                  <a href="/criteres" className="inline-flex items-center gap-3 px-8 py-4 bg-[#021024] text-white rounded-sm hover:bg-[#5483B3] transition-colors group">
                      <span className="text-sm font-medium">Critères d&apos;investissement</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </FadeIn>
              </div>
           </div>

           {/* Right Column: Image & Quote */}
           <div className="relative pt-12 lg:pt-0">
              <FadeIn delay={300}>
                {/* Main Image Container */}
                <div className="relative aspect-[4/5] w-full">
                    {/* Decorative offset border */}
                    <div className="absolute inset-0 border border-[#021024] translate-x-4 translate-y-4 z-0"></div>
                    
                    {/* Image */}
                    <div className="relative h-full w-full overflow-hidden bg-gray-200 z-10">
                        <img 
                            src="https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=kevin-matos-Nl_FMFpXo2g-unsplash.jpg" 
                            alt="Architecture Detail" 
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-[2s]"
                        />
                    </div>
                </div>
              </FadeIn>
           </div>

        </div>
      </div>
    </section>
  );
}
