"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";

const services = [
  {
    id: "01",
    title: "Vente & Acquisition",
    description: "Identification d'opportunités off-market et accompagnement complet dans les processus de transaction d'immeubles de rendement.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    details: ["Sourcing d'actifs", "Due Diligence", "Négociation"]
  },
  {
    id: "02",
    title: "Structuration",
    description: "Montage d'opérations complexes et optimisation des structures de détention pour maximiser la valeur de vos actifs.",
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=800",
    details: ["Share Deal / Asset Deal", "Sale & Leaseback", "Financement"]
  },
  {
    id: "03",
    title: "Conseil Stratégique",
    description: "Analyse approfondie de portefeuilles et définition de stratégies de valorisation à long terme.",
    image: "https://images.unsplash.com/photo-1462826303086-329426d1aef5?auto=format&fit=crop&q=80&w=800",
    details: ["Analyse de marché", "Valorisation d'actifs", "Arbitrage"]
  }
];

export default function ExpertiseSection() {
  return (
    <section id="expertise" className="py-32 px-6 bg-white">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header */}
        <div className="mb-20 border-b border-gray-200 pb-8">
            <FadeIn>
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                    <div>
                        <span className="text-xs font-bold tracking-[0.2em] text-secondary uppercase mb-4 block">Nos Services</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-primary">Notre Expertise</h2>
                    </div>
                    <p className="text-gray-600 font-light max-w-xl md:text-right leading-relaxed">
                        Une approche globale et sur-mesure pour accompagner les acteurs institutionnels et privés dans leurs opérations immobilières.
                    </p>
                </div>
            </FadeIn>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
            {services.map((service, index) => (
                <div key={service.id} className="bg-white p-8 lg:p-12 flex flex-col h-full hover:bg-gray-50 transition-colors duration-300">
                    <FadeIn delay={index * 100}>
                        <div className="mb-8">
                            <span className="text-6xl font-serif text-gray-100 block mb-4">{service.id}</span>
                            <h3 className="text-2xl font-serif text-primary">{service.title}</h3>
                        </div>
                        
                        <div className="relative w-full h-48 mb-8 overflow-hidden bg-gray-100">
                             <Image 
                                src={service.image} 
                                alt={service.title} 
                                fill 
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>

                        <p className="text-gray-600 font-light leading-relaxed mb-8 flex-grow">
                            {service.description}
                        </p>

                        <ul className="space-y-3 border-t border-gray-100 pt-8">
                            {service.details.map((detail, i) => (
                                <li key={i} className="flex items-center text-sm text-gray-500">
                                    <span className="w-1 h-1 bg-secondary rounded-full mr-3"></span>
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </FadeIn>
                </div>
            ))}
        </div>

        {/* Quote / Bottom */}
        <FadeIn direction="up" delay={200}>
            <div className="mt-24 text-center">
                <p className="text-2xl md:text-3xl font-serif font-normal text-primary italic max-w-4xl mx-auto leading-relaxed">
                    &quot;Un partenaire de confiance pour vos transactions immobilières institutionnelles.&quot;
                </p>
            </div>
        </FadeIn>
      </div>
    </section>
  );
}
