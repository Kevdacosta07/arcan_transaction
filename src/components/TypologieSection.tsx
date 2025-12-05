"use client";

import FadeIn from "./FadeIn";

const assets = [
  { name: "Résidentiel", num: "01" },
  { name: "Commercial", num: "02" },
  { name: "Hôtellerie", num: "03" },
  { name: "Médico-social", num: "04" },
  { name: "Industriel", num: "05" },
  { name: "Mixte", num: "06" }
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
                  Arcan Transactions SA est spécialisé dans la transaction d&apos;immeubles de rendement de tous les types d&apos;affectation.
                </p>
              </FadeIn>

              {/* The List - Redesigned as elegant rows */}
              <div className="space-y-0 border-t border-gray-100">
                {assets.map((item, index) => (
                  <FadeIn key={index} delay={index * 100}>
                    <div className="group flex items-center justify-between py-5 border-b border-gray-100 hover:border-accent transition-colors duration-500 cursor-default">
                      <div className="flex items-baseline gap-8">
                        <span className="text-xs font-mono text-gray-300 group-hover:text-accent transition-colors duration-300">
                            {item.num}
                        </span>
                        <h3 className="text-3xl font-serif text-[#021024] group-hover:text-accent group-hover:translate-x-2 transition-all duration-500">
                            {item.name}
                        </h3>
                      </div>
                      <span className="opacity-0 group-hover:opacity-100 text-accent transform -translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-xl">
                        →
                      </span>
                    </div>
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
                            src="https://images.unsplash.com/photo-1659184435166-5c98ae74465f?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                            alt="Architecture Detail" 
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-[2s]"
                        />
                    </div>
                    
                    {/* Overlay Quote Box */}
                    <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 bg-[#021024] p-8 md:p-10 max-w-sm shadow-2xl z-20 hidden md:block">
                        <p className="text-white font-light leading-relaxed text-lg italic">
                            &ldquo;Avec un track record solide et un réseau étendu, nous sommes votre partenaire stratégique.&rdquo;
                        </p>
                        <div className="w-12 h-0.5 bg-accent mt-6"></div>
                    </div>
                </div>
              </FadeIn>
           </div>

        </div>
      </div>
    </section>
  );
}
