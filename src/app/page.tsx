import Image from "next/image";
import HeroSlider from "@/components/HeroSlider";
import FadeIn from "@/components/FadeIn";
import Navbar from "@/components/Navbar";
import ExpertiseSection from "@/components/ExpertiseSection";

export default function Home() {
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
            <h1 className="text-4xl md:text-7xl font-sans font-thin text-white mb-8 animate-fade-in-up tracking-[0.2em] uppercase">
              Arcan Transactions
            </h1>
            
            <div className="w-16 h-[1px] bg-white/60 mb-8 animate-fade-in-up delay-100"></div>

            <p className="text-lg md:text-xl text-white font-light tracking-[0.3em] uppercase animate-fade-in-up delay-200 drop-shadow-md">
              Transactions Immobilières
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
          {/* Portfolio Style About & Team Section */}
          <section id="qui-sommes-nous" className="py-16 md:py-32 px-6 bg-white">
            <div className="max-w-[1800px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                {/* Left Column: Sticky Title & Image */}
                <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-32 lg:h-fit">
                   <FadeIn direction="right">
                     <span className="text-xs font-bold tracking-[0.2em] text-secondary uppercase">À Propos</span>
                     <h2 className="text-4xl md:text-5xl font-serif text-primary leading-none mt-4">Qui Sommes Nous ?</h2>
                     <div className="relative w-full aspect-[4/5] mt-12 overflow-hidden shadow-2xl">
                        <Image 
                          src="https://plus.unsplash.com/premium_photo-1742418026796-886301c359a9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                          alt="Architecture Suisse Moderne" 
                          fill 
                          className="object-cover"
                        />
                     </div>
                   </FadeIn>
                </div>

                {/* Right Column: Content & Team */}
                <div className="lg:col-span-7 flex flex-col gap-24 pt-8">
                   <FadeIn direction="left" delay={200}>
                     {/* Text Content */}
                     <div className="space-y-8 text-xl font-light text-gray-600 leading-relaxed">
                        <p>
                          <strong className="font-medium text-primary">ARCAN Transactions SA</strong> est une société spécialisée dans les transactions d&apos;immeubles de rendement en Suisse.
                        </p>
                        <p>
                          Nous intervenons exclusivement sur le segment institutionnel et professionnel, en lien direct avec les acteurs du marché immobilier.
                        </p>
                        <p>
                          Nous accompagnons nos clients propriétaires, investisseurs, caisses de pension, family offices et développeurs dans la vente, dans l&apos;acquisition et dans la structuration de transactions immobilières, tous segments confondus.
                        </p>
                     </div>

                     {/* Quote */}
                     <div className="border-l-2 border-primary pl-8 py-2 my-12">
                        <p className="text-3xl font-serif text-primary italic leading-tight">
                          &quot;Arcan Transactions SA est un acteur clé du Real Estate Capital Market en Suisse.&quot;
                        </p>
                     </div>

                     {/* Key Figures */}
                     <div className="relative my-20 p-8 md:p-12 bg-gray-50 border border-gray-100">
                        {/* Decorative Corner */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-secondary/30 -translate-x-2 -translate-y-2"></div>
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-secondary/30 translate-x-2 translate-y-2"></div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                           <div className="text-center md:text-left">
                              <p className="text-5xl md:text-6xl font-serif text-primary mb-2 relative inline-block">
                                30
                                <span className="absolute -top-2 -right-6 text-2xl text-secondary font-sans font-bold">+</span>
                              </p>
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Années d&apos;expérience cumulées</p>
                           </div>
                           
                           <div className="text-center md:text-left md:border-l md:border-gray-200 md:pl-12">
                              <p className="text-5xl md:text-6xl font-serif text-primary mb-2 relative inline-block">
                                100
                                <span className="absolute -top-2 -right-6 text-2xl text-secondary font-sans font-bold">+</span>
                              </p>
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Immeubles vendus</p>
                           </div>
                           
                           <div className="text-center md:text-left md:border-l md:border-gray-200 md:pl-12">
                              <p className="text-5xl md:text-6xl font-serif text-primary mb-2 relative inline-block">
                                2 Mrd
                                <span className="absolute -top-2 -right-8 text-2xl text-secondary font-sans font-bold">+</span>
                              </p>
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">CHF Volume de transaction</p>
                           </div>
                        </div>
                     </div>

                     {/* Button */}
                     <div className="mb-24">
                        <a href="#realisations" className="inline-block px-12 py-5 bg-primary text-white hover:bg-secondary transition-all duration-300 uppercase tracking-widest text-xs font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                          Nos réalisations
                        </a>
                     </div>

                     {/* Divider */}
                     <div className="w-full h-px bg-gray-200 mb-24"></div>

                     {/* Team Section */}
                     <div>
                        <h3 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-16">L&apos;Équipe</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                           {/* Member 1: Aurèle */}
                           <div className="group cursor-pointer max-w-[200px] mx-auto md:mx-0">
                              <div className="relative w-full aspect-[3/4] mb-6 overflow-hidden bg-gray-100">
                                 <Image 
                                    src="/assets/employe/aurele_arthur_laya.webp" 
                                    alt="Aurèle Arthur LAYA" 
                                    fill 
                                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                 />
                              </div>
                              <div className="border-t border-gray-200 pt-4 group-hover:border-primary transition-colors duration-500">
                                 <h4 className="text-xl font-serif text-primary mb-1">Aurèle Arthur LAYA</h4>
                                 <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">Managing Partner</p>
                                 <div className="space-y-1 text-xs font-light text-gray-400 group-hover:text-gray-600 transition-colors">
                                    <a href="mailto:a.laya@arcan-transactions.ch" className="block hover:text-primary">a.laya@arcan-transactions.ch</a>
                                    <a href="tel:+41792063736" className="block hover:text-primary">+41 79 206 37 36</a>
                                 </div>
                              </div>
                           </div>

                           {/* Member 2: Gilles */}
                           <div className="group cursor-pointer max-w-[200px] mx-auto md:mx-0">
                              <div className="relative w-full aspect-[3/4] mb-6 overflow-hidden bg-gray-100">
                                 <Image 
                                    src="/assets/employe/gilles_cohen.webp" 
                                    alt="Gilles COHEN" 
                                    fill 
                                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                 />
                              </div>
                              <div className="border-t border-gray-200 pt-4 group-hover:border-primary transition-colors duration-500">
                                 <h4 className="text-xl font-serif text-primary mb-1">Gilles COHEN</h4>
                                 <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">Transaction Director</p>
                                 <div className="space-y-1 text-xs font-light text-gray-400 group-hover:text-gray-600 transition-colors">
                                    <a href="mailto:g.cohen@arcan-transactions.ch" className="block hover:text-primary">g.cohen@arcan-transactions.ch</a>
                                    <a href="tel:+41786709121" className="block hover:text-primary">+41 78 670 91 21</a>
                                 </div>
                              </div>
                           </div>

                           {/* Member 3: Alexandre */}
                           <div className="group cursor-pointer max-w-[200px] mx-auto md:mx-0">
                              <div className="relative w-full aspect-[3/4] mb-6 overflow-hidden bg-gray-100">
                                 <Image 
                                    src="/assets/employe/alexandre_arazi.webp" 
                                    alt="Alexandre ARAZI" 
                                    fill 
                                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                 />
                              </div>
                              <div className="border-t border-gray-200 pt-4 group-hover:border-primary transition-colors duration-500">
                                 <h4 className="text-xl font-serif text-primary mb-1">Alexandre ARAZI</h4>
                                 <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">Managing Partner</p>
                                 <div className="space-y-1 text-xs font-light text-gray-400 group-hover:text-gray-600 transition-colors">
                                    <a href="mailto:a.arazi@arcan-transactions.ch" className="block hover:text-primary">a.arazi@arcan-transactions.ch</a>
                                    <a href="tel:+41795665204" className="block hover:text-primary">+41 79 566 52 04</a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                   </FadeIn>
                </div>
              </div>
            </div>
          </section>

          {/* Process Transition */}
          <section className="py-24 bg-[#021024] px-6 border-t border-white/10">
            <div className="max-w-6xl mx-auto text-center">
               <p className="text-3xl md:text-4xl font-serif text-white leading-relaxed italic mb-12">
                 Une maîtrise rigoureuse des processus de vente pour sécuriser et optimiser vos transactions.
               </p>
               <a href="#processus" className="inline-block px-8 py-4 border border-white text-white hover:bg-white hover:text-[#021024] transition-all duration-300 uppercase tracking-widest text-xs font-bold">
                  Découvrez nos processus de vente
               </a>
            </div>
          </section>

          {/* Expertise Section */}
          <ExpertiseSection />
        </div>
      </main>

      <footer className="bg-[#021024] text-white pt-20 pb-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 mb-20">
            <div>
              <div className="relative w-80 h-24 mb-8">
                <Image 
                  src="/assets/logo/Arcan_Logo_Blanc.webp" 
                  alt="Arcan Transaction" 
                  fill 
                  className="object-contain object-left" 
                  quality={100} 
                />
              </div>
              <p className="text-xl text-gray-400 font-light max-w-md leading-relaxed">
                Pour toute demande d&apos;information ou pour convenir d&apos;un entretien confidentiel.
              </p>
              <a href="mailto:contact@arcan-transaction.com" className="inline-block mt-8 text-2xl border-b border-white/30 pb-2 hover:text-accent hover:border-accent transition-all">
                contact@arcan-transaction.com
              </a>
            </div>
            
            <div className="grid gap-12">
              {/* Partner 1 */}
              <div className="flex items-start justify-between border-b border-white/10 pb-8 group">
                <div>
                  <h4 className="text-2xl font-serif group-hover:text-accent transition-colors">Gilles COHEN</h4>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">Transaction Director</p>
                </div>
                <div className="text-right text-sm font-light text-gray-400">
                  <a href="mailto:g.cohen@arcan-transactions.ch" className="block hover:text-white">g.cohen@arcan-transactions.ch</a>
                  <a href="tel:+41786709121" className="block hover:text-white">+41 78 670 91 21</a>
                </div>
              </div>

              {/* Partner 2 */}
              <div className="flex items-start justify-between border-b border-white/10 pb-8 group">
                <div>
                  <h4 className="text-2xl font-serif group-hover:text-accent transition-colors">Aurèle Arthur LAYA</h4>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">Managing Partner</p>
                </div>
                <div className="text-right text-sm font-light text-gray-400">
                  <a href="mailto:a.laya@arcan-transactions.ch" className="block hover:text-white">a.laya@arcan-transactions.ch</a>
                  <a href="tel:+41792063736" className="block hover:text-white">+41 79 206 37 36</a>
                </div>
              </div>

              {/* Partner 3 */}
              <div className="flex items-start justify-between border-b border-white/10 pb-8 group">
                <div>
                  <h4 className="text-2xl font-serif group-hover:text-accent transition-colors">Alexandre ARAZI</h4>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">Managing Partner</p>
                </div>
                <div className="text-right text-sm font-light text-gray-400">
                  <a href="mailto:a.arazi@arcan-transactions.ch" className="block hover:text-white">a.arazi@arcan-transactions.ch</a>
                  <a href="tel:+41795665204" className="block hover:text-white">+41 79 566 52 04</a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end pt-10 border-t border-white/10">
             <div className="relative w-48 h-12 mb-6 md:mb-0 opacity-80">
                <Image src="/assets/logo/Arcan_Logo_Blanc.webp" alt="Logo" fill className="object-contain object-left" quality={100} />
             </div>
             <div className="flex flex-col md:flex-row gap-8 text-xs text-gray-600 uppercase tracking-widest">
               <p>&copy; {new Date().getFullYear()} Arcan Transactions SA</p>
               <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
               <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
