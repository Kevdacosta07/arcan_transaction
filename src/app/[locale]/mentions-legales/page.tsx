"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { useTranslations } from 'next-intl';

export default function MentionsLegales() {
  const t = useTranslations('legal');
  
  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="mb-16 border-b border-gray-100 pb-8">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-serif text-[#021024] mb-4">
                        {t('pageTitle1')} <br/> <span className="text-[#5483B3] italic">{t('pageTitle2')}</span>
                    </h1>
                </FadeIn>
            </div>

            <div className="space-y-16">
                
                {/* Informations Juridiques */}
                <section>
                    <FadeIn delay={100}>
                        <h2 className="text-2xl font-serif text-[#021024] mb-8 flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-[#5483B3]"></span>
                            {t('juridicalInfo')}
                        </h2>
                        
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-gray-600 font-light leading-relaxed">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#021024] mb-2">{t('companyName')}</h3>
                                <p>Arcan Transactions SA</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#021024] mb-2">{t('headquarters')}</h3>
                                <p>Route de Florissant 81<br/>1206 Genève<br/>Suisse</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#021024] mb-2">{t('ideUid')}</h3>
                                <p>CHE-438.745.978</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-[#021024] mb-4">{t('purpose')}</h3>
                            <p className="text-gray-600 font-light leading-relaxed text-justify">
                                {t('purposeText')}
                            </p>
                        </div>
                    </FadeIn>
                </section>

                {/* Hébergement */}
                <section>
                    <FadeIn delay={200}>
                        <h2 className="text-2xl font-serif text-[#021024] mb-8 flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-[#5483B3]"></span>
                            {t('hosting')}
                        </h2>
                        <div className="text-gray-600 font-light leading-relaxed">
                            <p>
                                {t('hostedBy')}<br/>
                                <strong>OVH SAS</strong><br/>
                                2 rue Kellermann<br/>
                                59100 Roubaix<br/>
                                France<br/>
                                <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer" className="text-[#5483B3] hover:underline">www.ovhcloud.com</a>
                            </p>
                        </div>
                    </FadeIn>
                </section>

                {/* Confidentialité */}
                <section id="confidentialite">
                    <FadeIn delay={300}>
                        <h2 className="text-2xl font-serif text-[#021024] mb-8 flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-[#5483B3]"></span>
                            {t('privacyPolicy')}
                        </h2>
                        
                        <div className="space-y-6 text-gray-600 font-light leading-relaxed text-justify">
                            <p>
                                {t('privacyIntro')}
                            </p>

                            <div>
                                <h3 className="text-lg font-serif text-[#021024] mb-2">{t('dataCollection')}</h3>
                                <p>
                                    {t('dataCollectionText')}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-serif text-[#021024] mb-2">{t('dataUsage')}</h3>
                                <p>
                                    {t('dataUsageText')}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-serif text-[#021024] mb-2">{t('cookies')}</h3>
                                <p>
                                    {t('cookiesText')}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-serif text-[#021024] mb-2">{t('yourRights')}</h3>
                                <p>
                                    {t('yourRightsText')} <a href="mailto:contact@arcan-transactions.ch" className="text-[#5483B3] hover:underline">contact@arcan-transactions.ch</a>.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </section>

            </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
