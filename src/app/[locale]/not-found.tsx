import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 text-center bg-[#021024] text-white relative overflow-hidden">
      
      <div className="relative z-10 flex flex-col items-center animate-[fadeInUp_0.8s_ease-out]">
        
        {/* Logo Flottant */}
        <div className="relative w-48 md:w-64 h-24 mb-8 animate-[float_6s_ease-in-out_infinite]">
           <Image
              src="/assets/logo/Arcan_Logo_Blanc.webp"
              alt="Arcan Transaction"
              fill
              className="object-contain"
              priority
            />
        </div>

        {/* 404 Text */}
        <h1 className="text-[clamp(4rem,10vw,8rem)] font-serif text-white font-light mb-2">
          404
        </h1>

        <div className="w-16 h-[1px] bg-white/60 mx-auto my-6"></div>
        
        <h2 className="text-xl md:text-2xl font-light tracking-wide mb-6 text-white">
          Page Introuvable
        </h2>
        
        <p className="text-white/70 text-base md:text-lg font-light max-w-md mx-auto mb-10">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <Link 
          href="/"
          className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden transition-all duration-300 border border-white hover:bg-white"
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-white group-hover:text-[#021024] transition-colors duration-300">
            Retour à l'accueil
          </span>
        </Link>
      </div>
    </div>
  );
}
