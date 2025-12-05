"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function CriteresPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    scrollToForm();
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    scrollToForm();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <FadeIn>
                <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Investissement</span>
                <h1 className="text-4xl md:text-6xl font-serif text-[#021024] mb-6">Critères d&apos;investissement</h1>
                <p className="text-gray-500 font-light max-w-2xl mx-auto">
                    Définissez votre profil et vos objectifs pour nous permettre de vous proposer des opportunités ciblées.
                </p>
            </FadeIn>
          </div>

          {/* Stepper Progress */}
          <div className="mb-16">
            <div className="flex justify-between items-center relative">
                {/* Progress Bar Background */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-gray-200 -z-10"></div>
                {/* Active Progress Bar */}
                <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-[#03081f] transition-all duration-500 -z-10"
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                ></div>

                {[1, 2, 3, 4].map((step) => (
                    <div key={step} className={`flex flex-col items-center gap-2 bg-white px-2 ${step <= currentStep ? 'text-[#03081f]' : 'text-gray-300'}`}>
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm font-serif transition-all duration-300 ${
                            step <= currentStep 
                                ? 'border-[#03081f] bg-[#03081f] text-white' 
                                : 'border-gray-200 bg-white'
                        }`}>
                            {step}
                        </div>
                        <span className="text-xs font-bold tracking-widest uppercase hidden md:block">
                            {step === 1 && "Identité"}
                            {step === 2 && "Stratégie"}
                            {step === 3 && "Cible"}
                            {step === 4 && "Modalités"}
                        </span>
                    </div>
                ))}
            </div>
          </div>

          {/* Form Content */}
          <div ref={formRef} className="bg-gray-50 p-8 md:p-12 border border-gray-100 shadow-sm min-h-[600px] scroll-mt-32">
            
            {/* Step 1: Identité */}
            {currentStep === 1 && (
                <FadeIn>
                    <div className="space-y-12">
                        {/* Société Section */}
                        <div className="bg-white p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#03081f]"></div>
                            <h3 className="text-xl font-serif text-[#03081f] mb-8 flex items-center gap-3">
                                Société / Personne privée
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Input label="Nom de la société ou Personne privée" placeholder="Raison sociale..." />
                                <Input label="Adresse complète" placeholder="Rue, NPA, Ville, Pays" />
                            </div>
                        </div>

                        {/* Contacts Section */}
                        <div>
                            <h3 className="text-xl font-serif text-[#03081f] mb-8 pl-2">Contacts</h3>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Contact 1 - Highlighted */}
                                <div className="bg-white p-8 border border-gray-100 shadow-md relative">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
                                    <h4 className="font-bold text-sm uppercase tracking-widest text-accent mb-6 flex justify-between items-center">
                                        Contact Principal (1)
                                        <span className="text-[10px] bg-accent/10 text-accent px-2 py-1 rounded">Requis</span>
                                    </h4>
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="Nom" />
                                            <Input label="Position" />
                                        </div>
                                        <Input label="Email" type="email" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="Portable" />
                                            <Input label="Ligne directe" />
                                        </div>
                                    </div>
                                </div>

                                {/* Contact 2 */}
                                <div className="bg-white p-8 border border-gray-100 shadow-sm relative opacity-80 hover:opacity-100 transition-opacity">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200"></div>
                                    <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-6">Contact (2)</h4>
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="Nom" />
                                            <Input label="Position" />
                                        </div>
                                        <Input label="Email" type="email" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="Portable" />
                                            <Input label="Ligne directe" />
                                        </div>
                                    </div>
                                </div>

                                {/* Contact 3 */}
                                <div className="bg-white p-8 border border-gray-100 shadow-sm relative opacity-80 hover:opacity-100 transition-opacity">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200"></div>
                                    <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-6">Contact (3)</h4>
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="Nom" />
                                            <Input label="Position" />
                                        </div>
                                        <Input label="Email" type="email" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="Portable" />
                                            <Input label="Ligne directe" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            )}

            {/* Step 2: Stratégie */}
            {currentStep === 2 && (
                <FadeIn>
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">Volume d&apos;investissement</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Checkbox label="< CHF 5 millions" />
                                <Checkbox label="Entre CHF 5 et CHF 10 millions" />
                                <Checkbox label="Entre CHF 10 et CHF 25 millions" />
                                <Checkbox label="Entre CHF 25 et CHF 50 millions" />
                                <Checkbox label="Entre CHF 50 et CHF 100 millions" />
                                <Checkbox label="> CHF 100 millions" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">Localisation des objets</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Checkbox label="Genève" />
                                <Checkbox label="Lausanne" />
                                <Checkbox label="Canton de Vaud" />
                                <Checkbox label="Canton de Fribourg" />
                                <Checkbox label="Canton de Neuchâtel" />
                                <Checkbox label="Canton du Valais" />
                                <Checkbox label="Suisse Alémanique" />
                                <Checkbox label="Partout en Suisse" />
                                <Checkbox label="France" />
                            </div>
                        </div>
                    </div>
                </FadeIn>
            )}

            {/* Step 3: Cible */}
            {currentStep === 3 && (
                <FadeIn>
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">Type d&apos;objet</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Checkbox label="Parcelle sans permis de construire" />
                                <Checkbox label="Parcelle avec permis de construire" />
                                <Checkbox label="Bâtiment" />
                                <Checkbox label="Bâtiment en droit de superficie" />
                                <Checkbox label="Portefeuille" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">Affectation</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Checkbox label="Résidentielle" />
                                <Checkbox label="Commerciale – Bureau" />
                                <Checkbox label="Mixte" />
                                <Checkbox label="Hôtel" />
                                <Checkbox label="Vente retail" />
                                <Checkbox label="Logistique / Industrielle" />
                                <Checkbox label="Médico-sociale" />
                            </div>
                        </div>
                    </div>
                </FadeIn>
            )}

            {/* Step 4: Modalités */}
            {currentStep === 4 && (
                <FadeIn>
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">Forme de la propriété</h3>
                                <div className="space-y-4">
                                    <Checkbox label="Pleine propriété" />
                                    <Checkbox label="Copropriété" />
                                    <Checkbox label="PPE" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">Nature de la transaction</h3>
                                <div className="space-y-4">
                                    <Checkbox label="Asset Deal" infoLink="/processus#asset-deal" />
                                    <Checkbox label="Share Deal" infoLink="/processus#share-deal" />
                                    <Checkbox label="Sale and lease back" infoLink="/processus#sale-leaseback" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">Remarques</h3>
                            <textarea 
                                className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-[#03081f] transition-colors min-h-[150px]"
                                placeholder="Vos remarques éventuelles..."
                            ></textarea>
                        </div>
                    </div>
                </FadeIn>
            )}

          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            <button 
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-8 py-3 text-sm font-bold tracking-widest uppercase transition-colors ${
                    currentStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-[#03081f] hover:text-accent'
                }`}
            >
                ← Précédent
            </button>

            {currentStep < 4 ? (
                <button 
                    onClick={nextStep}
                    className="px-8 py-3 bg-[#03081f] text-white text-sm font-bold tracking-widest uppercase hover:bg-[#5483B3] transition-colors"
                >
                    Suivant →
                </button>
            ) : (
                <button 
                    className="px-8 py-3 bg-accent text-white text-sm font-bold tracking-widest uppercase hover:bg-[#03081f] transition-colors"
                >
                    Envoyer le dossier
                </button>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

// Helper Components
function Input({ label, placeholder, type = "text" }: { label: string, placeholder?: string, type?: string }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">{label}</label>
            <input 
                type={type} 
                placeholder={placeholder}
                className="w-full bg-white border-b border-gray-200 py-2 focus:outline-none focus:border-[#03081f] transition-colors placeholder-gray-300"
            />
        </div>
    );
}

function Checkbox({ label, infoLink }: { label: string, infoLink?: string }) {
    return (
        <div className="flex items-center">
            <label className="flex items-center gap-4 cursor-pointer group">
                <div className="w-5 h-5 border border-gray-300 flex items-center justify-center group-hover:border-[#03081f] transition-colors bg-white flex-shrink-0">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-3 h-3 bg-[#03081f] opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-gray-600 group-hover:text-[#03081f] transition-colors">{label}</span>
            </label>
            {infoLink && (
                <a 
                    href={infoLink}
                    target="_blank"
                    className="ml-2 w-4 h-4 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center text-[10px] hover:border-[#5483B3] hover:text-[#5483B3] transition-colors flex-shrink-0"
                    title="En savoir plus"
                >
                    ?
                </a>
            )}
        </div>
    );
}