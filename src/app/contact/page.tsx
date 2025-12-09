import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      <div className="lg:flex min-h-screen">
        
        {/* Left Column: Content - Scrollable */}
        <div className="lg:w-1/2 pt-12 pb-20 px-8 md:px-16 lg:px-24 flex flex-col">
            
            <div className="max-w-xl mx-auto w-full">
                {/* Header */}
                <div className="mb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-serif text-[#021024] mb-12">
                        Contact
                    </h1>

                    {/* Mobile Map */}
                    <div className="w-full h-64 mb-12 lg:hidden rounded-sm overflow-hidden animate-fade-in delay-100">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            title="Arcan Transactions Location"
                            src="https://maps.google.com/maps?q=81+route+de+Florissant+1206+Genève&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full"
                        ></iframe>
                    </div>

                    {/* Contact Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 animate-fade-in-up delay-200">
                        {/* Bureau */}
                        <div>
                            <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">Bureau</h3>
                            <p className="font-serif text-[#021024] text-lg leading-relaxed">
                                81 route de Florissant<br/>
                                1206 Genève
                            </p>
                        </div>

                        {/* Téléphone */}
                        <div>
                            <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">Téléphone</h3>
                            <a href="tel:+41223463788" className="font-serif text-[#021024] text-lg hover:text-gray-600 transition-colors">+41 22 346 37 88</a>
                        </div>

                        {/* Email */}
                        <div className="sm:col-span-2">
                            <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">Email</h3>
                            <a href="mailto:contact@arcan-transactions.ch" className="font-serif text-[#021024] text-lg hover:text-gray-600 transition-colors whitespace-nowrap">contact@arcan-transactions.ch</a>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form className="space-y-8 mb-16 border-t border-gray-100 pt-12 animate-fade-in-up delay-500">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Prénom</label>
                            <input type="text" className="w-full bg-transparent border-b border-gray-200 py-2 text-[#021024] focus:outline-none focus:border-[#021024] transition-colors text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Nom</label>
                            <input type="text" className="w-full bg-transparent border-b border-gray-200 py-2 text-[#021024] focus:outline-none focus:border-[#021024] transition-colors text-sm" />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email</label>
                        <input type="email" className="w-full bg-transparent border-b border-gray-200 py-2 text-[#021024] focus:outline-none focus:border-[#021024] transition-colors text-sm" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Message</label>
                        <textarea rows={3} className="w-full bg-transparent border-b border-gray-200 py-2 text-[#021024] focus:outline-none focus:border-[#021024] transition-colors resize-none text-sm"></textarea>
                    </div>
                    
                    <button type="submit" className="bg-[#021024] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                        Envoyer
                    </button>
                </form>

            </div>
        </div>

        {/* Right Column: Map - Fixed/Sticky - Desktop Only */}
        <div className="hidden lg:flex lg:w-1/2 lg:sticky lg:top-0 lg:h-screen items-center justify-center px-12">
            <div className="relative h-[600px] w-full animate-fade-in delay-200 transition-all duration-700 shadow-2xl">
                <iframe 
                    width="100%" 
                    height="100%" 
                    title="Arcan Transactions Location"
                    src="https://maps.google.com/maps?q=81+route+de+Florissant+1206+Genève&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full transition-all duration-700"
                ></iframe>
            </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}
