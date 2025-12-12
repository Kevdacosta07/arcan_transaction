"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function ContactPage() {
    const t = useTranslations("contactPage");

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
                        {t("title")}
                    </h1>

                    {/* Mobile Map */}
                    <div className="w-full h-64 mb-12 lg:hidden rounded-sm overflow-hidden animate-fade-in delay-100">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            title={t("mapTitle")}
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
                            <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">{t("office.label")}</h3>
                            <p className="font-serif text-[#021024] text-lg leading-relaxed">
                                {t("office.addressLine1")}<br/>
                                {t("office.addressLine2")}
                            </p>
                        </div>

                        {/* Téléphone */}
                        <div>
                            <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">{t("phone.label")}</h3>
                            <a href="tel:+41223463788" className="font-serif text-[#021024] text-lg hover:text-gray-600 transition-colors">+41 22 346 37 88</a>
                        </div>

                        {/* Email */}
                        <div className="sm:col-span-2">
                            <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">{t("email.label")}</h3>
                            <a href="mailto:contact@arcan-transactions.ch" className="font-serif text-[#021024] text-lg hover:text-gray-600 transition-colors whitespace-nowrap">contact@arcan-transactions.ch</a>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form className="mb-16 border-t border-gray-100 pt-12 animate-fade-in-up delay-500" autoComplete="on">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400">
                                {t("form.firstName")}
                            </label>
                            <input
                                name="firstName"
                                type="text"
                                autoComplete="given-name"
                                placeholder={t("form.placeholders.firstName")}
                                className="w-full bg-transparent border-b border-gray-200 py-3 text-[#021024] placeholder-gray-300 focus:outline-none focus:border-[#021024] transition-colors text-sm"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400">
                                {t("form.lastName")}
                            </label>
                            <input
                                name="lastName"
                                type="text"
                                autoComplete="family-name"
                                placeholder={t("form.placeholders.lastName")}
                                className="w-full bg-transparent border-b border-gray-200 py-3 text-[#021024] placeholder-gray-300 focus:outline-none focus:border-[#021024] transition-colors text-sm"
                            />
                        </div>

                        <div className="space-y-3 md:col-span-2">
                            <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400">
                                {t("form.email")}
                            </label>
                            <input
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder={t("form.placeholders.email")}
                                className="w-full bg-transparent border-b border-gray-200 py-3 text-[#021024] placeholder-gray-300 focus:outline-none focus:border-[#021024] transition-colors text-sm"
                            />
                        </div>

                        <div className="space-y-3 md:col-span-2">
                            <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400">
                                {t("form.message")}
                            </label>
                            <textarea
                                name="message"
                                rows={6}
                                placeholder={t("form.placeholders.message")}
                                className="w-full bg-transparent border-b border-gray-200 py-3 text-[#021024] placeholder-gray-300 focus:outline-none focus:border-[#021024] transition-colors resize-none text-sm"
                            />
                        </div>
                    </div>

                    <div className="mt-10 flex items-center justify-start">
                        <button
                            type="submit"
                            className="bg-[#021024] text-white px-10 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                        >
                            {t("form.submit")}
                        </button>
                    </div>
                </form>

            </div>
        </div>

        {/* Right Column: Map - Fixed/Sticky - Desktop Only */}
        <div className="hidden lg:flex lg:w-1/2 lg:sticky lg:top-0 lg:h-screen items-center justify-center px-12">
            <div className="relative h-[600px] w-full animate-fade-in delay-200 transition-all duration-700 shadow-2xl">
                <iframe 
                    width="100%" 
                    height="100%" 
                    title={t("mapTitle")}
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
