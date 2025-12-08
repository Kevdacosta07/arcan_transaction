"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function MentionsLegales() {
  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="mb-16 border-b border-gray-100 pb-8">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-serif text-[#021024] mb-4">
                        Mentions Légales & <br/> <span className="text-[#5483B3] italic">Confidentialité</span>
                    </h1>
                </FadeIn>
            </div>

            <div className="space-y-16">
                
                {/* Informations Juridiques */}
                <section>
                    <FadeIn delay={100}>
                        <h2 className="text-2xl font-serif text-[#021024] mb-8 flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-[#5483B3]"></span>
                            Informations Juridiques
                        </h2>
                        
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-gray-600 font-light leading-relaxed">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#021024] mb-2">Raison Sociale</h3>
                                <p>Arcan Transactions SA</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#021024] mb-2">Siège Social</h3>
                                <p>Route de Florissant 81<br/>1206 Genève<br/>Suisse</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#021024] mb-2">Inscription</h3>
                                <p>Registre du Commerce de Genève</p>
                                <p>Date: 15 mai 2025</p>
                                <p>Numéro: 10439/2025</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#021024] mb-2">IDE / UID</h3>
                                <p>CHE-438.745.978</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#021024] mb-2">Forme Juridique</h3>
                                <p>Société Anonyme (SA)</p>
                                <p>Capital-actions: CHF 100'000.00 (libéré à 50%)</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#021024] mb-2">Administration</h3>
                                <ul className="space-y-1">
                                    <li><strong>Aurèle Layat</strong>, Président (Signature collective à 2)</li>
                                    <li><strong>Alexandre Arazi</strong>, Administrateur (Signature collective à 2)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-[#021024] mb-4">But Social</h3>
                            <p className="text-gray-600 font-light leading-relaxed text-justify">
                                La détention, l'achat, la vente, l'administration, la gestion, la location, le courtage, l'exploitation, la gérance d'immeubles, les promotions et pilotages de projets immobiliers ainsi que l'octroi de prêts et de garanties aux actionnaires ou à des tiers. Elle peut faire, soit pour son compte, soit pour le compte de tiers, toutes opérations financières, commerciales, mobilières ou immobilières se rattachant directement ou indirectement à son but social et s'intéresser, sous toutes formes, à toutes entreprises similaires. La société pourra également constituer des succursales et des filiales en Suisse et à l'étranger.
                            </p>
                        </div>
                    </FadeIn>
                </section>

                {/* Hébergement */}
                <section>
                    <FadeIn delay={200}>
                        <h2 className="text-2xl font-serif text-[#021024] mb-8 flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-[#5483B3]"></span>
                            Hébergement
                        </h2>
                        <div className="text-gray-600 font-light leading-relaxed">
                            <p>
                                Ce site est hébergé par :<br/>
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
                            Politique de Confidentialité
                        </h2>
                        
                        <div className="space-y-6 text-gray-600 font-light leading-relaxed text-justify">
                            <p>
                                Arcan Transactions SA accorde une grande importance à la protection de votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles, conformément à la Loi fédérale sur la protection des données (LPD) et, le cas échéant, au Règlement général sur la protection des données (RGPD).
                            </p>

                            <div>
                                <h3 className="text-lg font-serif text-[#021024] mb-2">Collecte des données</h3>
                                <p>
                                    Nous collectons uniquement les données personnelles que vous nous transmettez volontairement, notamment via notre formulaire de contact ou par email (nom, prénom, adresse email, numéro de téléphone). Ces données sont nécessaires pour répondre à vos demandes et vous fournir nos services.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-serif text-[#021024] mb-2">Utilisation des données</h3>
                                <p>
                                    Vos données sont utilisées exclusivement dans le cadre de notre relation commerciale. Elles ne sont jamais vendues à des tiers. Nous pouvons être amenés à partager certaines informations avec des prestataires de confiance (hébergement, maintenance informatique) uniquement dans la limite nécessaire à l'exécution de leurs missions.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-serif text-[#021024] mb-2">Cookies et Tracking</h3>
                                <p>
                                    Ce site peut utiliser des cookies pour améliorer votre expérience de navigation et analyser le trafic (statistiques anonymes). Vous avez la possibilité de configurer votre navigateur pour refuser les cookies.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-serif text-[#021024] mb-2">Vos droits</h3>
                                <p>
                                    Conformément à la législation en vigueur, vous disposez d'un droit d'accès, de rectification, de suppression et de limitation du traitement de vos données personnelles. Pour exercer ces droits, veuillez nous contacter à l'adresse suivante : <a href="mailto:contact@arcan-transactions.ch" className="text-[#5483B3] hover:underline">contact@arcan-transactions.ch</a>.
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
