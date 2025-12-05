import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#021024] text-white pt-20 pb-10 border-t border-white/10">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <Image 
                src="https://images.unsplash.com/photo-1559744300-a3930c78b327?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Footer Background" 
                fill 
                className="object-cover"
                quality={90}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#021024]/85 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#021024] via-[#021024]/75 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
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

          <div className="mt-12 text-center">
             <a href="https://helveit.ch" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 uppercase tracking-widest hover:text-white transition-colors">
                Conceptualisé et développé par Helveit
             </a>
          </div>
        </div>
      </footer>
  );
}
