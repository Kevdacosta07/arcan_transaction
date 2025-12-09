import Image from "next/image";
import CookieSettingsLink from "./CookieSettingsLink";

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
                quality={75}
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
                Contactez-nous pour toute demande d&apos;information ou pour convenir d&apos;un rendez-vous.
              </p>
            </div>
            
            <div className="flex flex-col justify-center items-start md:items-end gap-8">
              <a href="mailto:contact@arcan-transactions.ch" className="group">
                  <h4 className="text-2xl md:text-3xl font-serif group-hover:text-accent transition-colors">contact@arcan-transactions.ch</h4>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mt-1 text-right">Email</p>
              </a>
              <a href="tel:+41223463788" className="group text-right">
                  <h4 className="text-2xl md:text-3xl font-serif group-hover:text-accent transition-colors">+41 22 346 37 88</h4>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">Téléphone</p>
              </a>
            </div>
          </div>

          <div className="flex justify-center pt-10 border-t border-white/10">
             <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xs text-gray-600 uppercase tracking-widest">
               <p>&copy; {new Date().getFullYear()} Arcan Transactions SA</p>
               <div className="flex gap-6">
                   <a href="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</a>
                   <a href="/mentions-legales#confidentialite" className="hover:text-white transition-colors">Confidentialité</a>
                   <CookieSettingsLink />
               </div>
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
