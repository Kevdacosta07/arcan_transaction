"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContactPage() {
    const t = useTranslations("contactPage");
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            const response = await fetch("/api/send-contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus("success");
                setFormData({ firstName: "", lastName: "", email: "", message: "" });
            } else {
                setSubmitStatus("error");
            }
        } catch {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                <form onSubmit={handleSubmit} className="mb-16 border-t border-gray-100 pt-12 animate-fade-in-up delay-500" autoComplete="on">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400">
                                {t("form.firstName")}
                            </label>
                            <input
                                name="firstName"
                                type="text"
                                autoComplete="given-name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
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
                                value={formData.lastName}
                                onChange={handleChange}
                                required
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
                                value={formData.email}
                                onChange={handleChange}
                                required
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
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder={t("form.placeholders.message")}
                                className="w-full bg-transparent border-b border-gray-200 py-3 text-[#021024] placeholder-gray-300 focus:outline-none focus:border-[#021024] transition-colors resize-none text-sm"
                            />
                        </div>
                    </div>

                    <div className="mt-10 flex items-center justify-start gap-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#021024] text-white px-10 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? t("form.sending") : t("form.submit")}
                        </button>
                        
                        {submitStatus === "success" && (
                            <span className="text-green-600 text-sm">{t("form.success")}</span>
                        )}
                        {submitStatus === "error" && (
                            <span className="text-red-600 text-sm">{t("form.error")}</span>
                        )}
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
