"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import jsPDF from "jspdf";

export default function CriteresPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    companyName: "",
    address: "",
    contact1Name: "",
    contact1Position: "",
    contact1Email: "",
    contact1Mobile: "",
    contact1Direct: "",
    contact2Name: "",
    contact2Position: "",
    contact2Email: "",
    contact2Mobile: "",
    contact2Direct: "",
    contact3Name: "",
    contact3Position: "",
    contact3Email: "",
    contact3Mobile: "",
    contact3Direct: "",
    // Step 2
    investmentVolume: [] as string[],
    location: [] as string[],
    // Step 3
    objectType: [] as string[],
    assignment: [] as string[],
    // Step 4
    propertyForm: [] as string[],
    transactionNature: [] as string[],
    remarks: ""
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors.length > 0) setErrors([]);
  };

  const handleCheckboxChange = (category: keyof typeof formData, value: string) => {
    setFormData(prev => {
      // Special case for investmentVolume: Single choice only
      if (category === "investmentVolume") {
          return { ...prev, [category]: [value] };
      }

      const currentList = prev[category] as string[];
      if (currentList.includes(value)) {
        return { ...prev, [category]: currentList.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...currentList, value] };
      }
    });
    if (errors.length > 0) setErrors([]);
  };

  const validateStep = (step: number) => {
    const newErrors: string[] = [];

    if (step === 1) {
      if (!formData.companyName) newErrors.push("Le nom de la société ou personne privée est requis.");
      if (!formData.address) newErrors.push("L'adresse complète est requise.");
      if (!formData.contact1Name) newErrors.push("Le nom du contact principal est requis.");
      if (!formData.contact1Email) newErrors.push("L'email du contact principal est requis.");
      if (!formData.contact1Mobile) newErrors.push("Le portable du contact principal est requis.");
    }

    if (step === 2) {
      if (formData.investmentVolume.length === 0) newErrors.push("Veuillez sélectionner au moins un volume d'investissement.");
      if (formData.location.length === 0) newErrors.push("Veuillez sélectionner au moins une localisation.");
    }

    if (step === 3) {
      if (formData.objectType.length === 0) newErrors.push("Veuillez sélectionner au moins un type d'objet.");
      if (formData.assignment.length === 0) newErrors.push("Veuillez sélectionner au moins une affectation.");
    }

    if (step === 4) {
      if (formData.propertyForm.length === 0) newErrors.push("Veuillez sélectionner au moins une forme de propriété.");
      if (formData.transactionNature.length === 0) newErrors.push("Veuillez sélectionner au moins une nature de transaction.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      scrollToForm();
    } else {
        // Scroll to top of form to show errors if needed, or just let user see them
        scrollToForm();
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors([]);
    scrollToForm();
  };

  const generatePDF = (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
    const doc = new jsPDF({ compress: true });
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Load Logo - use absolute URL for production
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const logoUrl = `${baseUrl}/assets/logo/Arcan_Logo_Bleu.png`;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = logoUrl;
    
    img.onerror = () => {
        reject(new Error(`Impossible de charger le logo: ${logoUrl}`));
    };
    
    img.onload = () => {
        try {
        // Header
        // Logo centered
        doc.addImage(img, "PNG", pageWidth / 2 - 30, 10, 60, 18); 
        
        doc.setFontSize(11);
        doc.setFont("times", "bold");
        doc.text("Critères d'investissement", pageWidth / 2, 35, { align: "center" });
        
        let y = 45;
        const leftMargin = 20;
        const rightColX = pageWidth / 2 + 10;

        doc.setFontSize(9);
        
        // Société
        doc.setFont("times", "bold");
        doc.text("Société / Personne privée", leftMargin, y);
        doc.setFont("times", "normal");
        doc.text(formData.companyName || "................................................................................................................................", leftMargin + 45, y);
        
        y += 12;
        
        // Contacts Header
        doc.setFont("times", "bold");
        doc.text("Contact (1)", leftMargin, y);
        doc.text("Contact (2)", rightColX, y);
        
        y += 5;
        doc.setFont("times", "normal");
        doc.setFontSize(9);
        
        const drawContact = (x: number, suffix: string, startY: number) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = formData as any;
            let currentY = startY;
            const labelWidth = 25;
            
            const drawField = (label: string, value: string) => {
                doc.text(label, x, currentY);
                doc.text(value || "................................................................................", x + labelWidth, currentY);
                currentY += 4;
            };

            drawField("Nom", data[`contact${suffix}Name`]);
            drawField("Position", data[`contact${suffix}Position`]);
            drawField("Email", data[`contact${suffix}Email`]);
            drawField("Portable", data[`contact${suffix}Mobile`]);
            drawField("Ligne directe", data[`contact${suffix}Direct`]);
            
            return currentY;
        };

        const yC1 = drawContact(leftMargin, "1", y);
        const yC2 = drawContact(rightColX, "2", y);
        
        y = Math.max(yC1, yC2) + 5;
        
        // Contact 3
        doc.setFont("times", "bold");
        doc.text("Contact (3)", leftMargin, y);
        y += 5;
        doc.setFont("times", "normal");
        drawContact(leftMargin, "3", y);
        
        y += 25;
        
        // Adresse
        doc.setFontSize(9);
        doc.setFont("times", "bold");
        doc.text("Adresse", leftMargin, y);
        doc.setFont("times", "normal");
        doc.text(formData.address || "................................................................................................................................................................................................", leftMargin + 20, y);
        
        y += 15;
        
        // Checkbox Helper
        const drawCheckboxGroup = (title: string, items: string[], selectedItems: string[], x: number, startY: number) => {
            doc.setFont("times", "bold");
            doc.text(title, x, startY);
            let currentY = startY + 5;
            doc.setFont("times", "normal");
            
            items.forEach(item => {
                // Box
                doc.rect(x, currentY - 3, 3, 3);
                // Check
                if (selectedItems.includes(item)) {
                    doc.text("x", x + 0.5, currentY - 0.5);
                }
                // Label
                doc.text(item, x + 5, currentY);
                currentY += 4;
            });
            return currentY;
        };

        // Row 1: Volume & Localisation
        const volItems = ["< CHF 5 millions", "Entre CHF 5 et CHF 10 millions", "Entre CHF 10 et CHF 25 millions", "Entre CHF 25 et CHF 50 millions", "Entre CHF 50 et CHF 100 millions", "> CHF 100 millions"];
        const locItems = ["Genève", "Lausanne", "Canton de Vaud", "Canton de Fribourg", "Canton de Neuchâtel", "Canton du Valais", "Suisse Alémanique", "Partout en Suisse"];
        
        const yVol = drawCheckboxGroup("Volume d'investissement :", volItems, formData.investmentVolume, leftMargin, y);
        const yLoc = drawCheckboxGroup("Localisation des objets :", locItems, formData.location, rightColX, y);
        
        y = Math.max(yVol, yLoc) + 8;
        
        // Row 2: Type & Affectation
        const typeItems = ["Parcelle sans permis de construire", "Parcelle avec permis de construire", "Bâtiment", "Bâtiment en droit de superficie", "Portefeuille"];
        const affItems = ["Résidentielle", "Commerciale – Bureau", "Mixte", "Hôtel", "Vente retail", "Logistique / Industrielle", "Médico-sociale"];
        
        const yType = drawCheckboxGroup("Type d'objet :", typeItems, formData.objectType, leftMargin, y);
        const yAff = drawCheckboxGroup("Affectation :", affItems, formData.assignment, rightColX, y);
        
        y = Math.max(yType, yAff) + 8;
        
        // Row 3: Forme & Nature
        const formItems = ["Pleine propriété", "Copropriété", "PPE"];
        const natureItems = ["Asset Deal", "Share Deal", "Sale and lease back"];
        
        const yForm = drawCheckboxGroup("Forme de la propriété :", formItems, formData.propertyForm, leftMargin, y);
        const yNature = drawCheckboxGroup("Nature de la transaction :", natureItems, formData.transactionNature, rightColX, y);
        
        y = Math.max(yForm, yNature) + 10;
        
        // Remarques
        doc.setFont("times", "bold");
        doc.text("Remarques:", leftMargin, y);
        y += 7;
        doc.setFont("times", "normal");
        
        if (formData.remarks) {
            const remarks = doc.splitTextToSize(formData.remarks, pageWidth - 40);
            doc.text(remarks, leftMargin, y);
        } else {
             const dotWidth = doc.getTextWidth(".");
             const availableWidth = pageWidth - 40;
             const numDots = Math.floor(availableWidth / dotWidth);
             const dots = ".".repeat(numDots);

             for(let i=0; i<4; i++) {
                 doc.text(dots, leftMargin, y + (i*6));
             }
        }

        // Footer
        const footerY = doc.internal.pageSize.getHeight() - 10;
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text("Arcan Transactions SA – Route de Florissant 81, 1206 Genève – Phone +41 22 346 37 88", pageWidth / 2, footerY, { align: "center" });

        resolve(doc.output('blob'));
        } catch (err) {
            reject(err);
        }
    };
    });
  };

  const handleSubmit = async () => {
      if (validateStep(4)) {
          setIsSubmitting(true);
          try {
            const pdfBlob = await generatePDF();
            console.log(`PDF Size: ${(pdfBlob.size / 1024 / 1024).toFixed(2)} MB`);
            
            const formDataToSend = new FormData();
            formDataToSend.append('file', pdfBlob, 'arcan_criteres_investissement.pdf');

            const response = await fetch('/api/send-email', {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                setIsSubmitting(false);
                setShowSuccess(true);
                setTimeout(() => {
                    router.push('/');
                }, 3000);
            } else {
                setIsSubmitting(false);
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    alert(`Erreur email: ${errorData.error || 'Erreur inconnue'}`);
                } else {
                    alert(`Erreur serveur (${response.status}): L'API send-email n'est pas accessible.`);
                }
            }
          } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
            console.error('PDF/Email error:', error);
            setIsSubmitting(false);
            alert(`Erreur: ${errorMessage}`);
          }
      }
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
                <p className="text-lg md:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
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

          {/* Error Message Display */}
          {errors.length > 0 && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-sm">
                  <p className="font-bold mb-2">Veuillez corriger les erreurs suivantes :</p>
                  <ul className="list-disc list-inside">
                      {errors.map((err, index) => (
                          <li key={index}>{err}</li>
                      ))}
                  </ul>
              </div>
          )}

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
                                <Input 
                                    name="companyName" 
                                    value={formData.companyName} 
                                    onChange={handleInputChange} 
                                    label="Nom de la société ou Personne privée*" 
                                    placeholder="Raison sociale..." 
                                    required 
                                />
                                <Input 
                                    name="address" 
                                    value={formData.address} 
                                    onChange={handleInputChange} 
                                    label="Adresse complète*" 
                                    placeholder="Rue, NPA, Ville, Pays" 
                                    required 
                                />
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
                                            <Input name="contact1Name" value={formData.contact1Name} onChange={handleInputChange} label="Nom*" required />
                                            <Input name="contact1Position" value={formData.contact1Position} onChange={handleInputChange} label="Position" />
                                        </div>
                                        <Input name="contact1Email" value={formData.contact1Email} onChange={handleInputChange} label="Email*" type="email" required />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input name="contact1Mobile" value={formData.contact1Mobile} onChange={handleInputChange} label="Portable*" required />
                                            <Input name="contact1Direct" value={formData.contact1Direct} onChange={handleInputChange} label="Ligne directe" />
                                        </div>
                                    </div>
                                </div>

                                {/* Contact 2 */}
                                <div className="bg-white p-8 border border-gray-100 shadow-sm relative opacity-80 hover:opacity-100 transition-opacity">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200"></div>
                                    <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-6">Contact (2)</h4>
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input name="contact2Name" value={formData.contact2Name} onChange={handleInputChange} label="Nom" />
                                            <Input name="contact2Position" value={formData.contact2Position} onChange={handleInputChange} label="Position" />
                                        </div>
                                        <Input name="contact2Email" value={formData.contact2Email} onChange={handleInputChange} label="Email" type="email" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input name="contact2Mobile" value={formData.contact2Mobile} onChange={handleInputChange} label="Portable" />
                                            <Input name="contact2Direct" value={formData.contact2Direct} onChange={handleInputChange} label="Ligne directe" />
                                        </div>
                                    </div>
                                </div>

                                {/* Contact 3 */}
                                <div className="bg-white p-8 border border-gray-100 shadow-sm relative opacity-80 hover:opacity-100 transition-opacity">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200"></div>
                                    <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-6">Contact (3)</h4>
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input name="contact3Name" value={formData.contact3Name} onChange={handleInputChange} label="Nom" />
                                            <Input name="contact3Position" value={formData.contact3Position} onChange={handleInputChange} label="Position" />
                                        </div>
                                        <Input name="contact3Email" value={formData.contact3Email} onChange={handleInputChange} label="Email" type="email" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input name="contact3Mobile" value={formData.contact3Mobile} onChange={handleInputChange} label="Portable" />
                                            <Input name="contact3Direct" value={formData.contact3Direct} onChange={handleInputChange} label="Ligne directe" />
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
                            <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">Volume d&apos;investissement <span className="text-sm font-sans text-gray-400 font-normal ml-2">(Choix unique)</span></h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {["< CHF 5 millions", "Entre CHF 5 et CHF 10 millions", "Entre CHF 10 et CHF 25 millions", "Entre CHF 25 et CHF 50 millions", "Entre CHF 50 et CHF 100 millions", "> CHF 100 millions"].map(label => (
                                    <Checkbox 
                                        key={label} 
                                        label={label} 
                                        checked={formData.investmentVolume.includes(label)}
                                        onChange={() => handleCheckboxChange("investmentVolume", label)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">Localisation des objets <span className="text-sm font-sans text-gray-400 font-normal ml-2">(1 obligatoire)</span></h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {["Genève", "Lausanne", "Canton de Vaud", "Canton de Fribourg", "Canton de Neuchâtel", "Canton du Valais", "Suisse Alémanique", "Partout en Suisse"].map(label => (
                                    <Checkbox 
                                        key={label} 
                                        label={label} 
                                        checked={formData.location.includes(label)}
                                        onChange={() => handleCheckboxChange("location", label)}
                                    />
                                ))}
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
                            <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">Type d&apos;objet <span className="text-sm font-sans text-gray-400 font-normal ml-2">(1 obligatoire)</span></h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {["Parcelle sans permis de construire", "Parcelle avec permis de construire", "Bâtiment", "Bâtiment en droit de superficie", "Portefeuille"].map(label => (
                                    <Checkbox 
                                        key={label} 
                                        label={label} 
                                        checked={formData.objectType.includes(label)}
                                        onChange={() => handleCheckboxChange("objectType", label)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">Affectation <span className="text-sm font-sans text-gray-400 font-normal ml-2">(1 obligatoire)</span></h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {["Résidentielle", "Commerciale – Bureau", "Mixte", "Hôtel", "Vente retail", "Logistique / Industrielle", "Médico-sociale"].map(label => (
                                    <Checkbox 
                                        key={label} 
                                        label={label} 
                                        checked={formData.assignment.includes(label)}
                                        onChange={() => handleCheckboxChange("assignment", label)}
                                    />
                                ))}
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
                                <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">Forme de la propriété <span className="text-sm font-sans text-gray-400 font-normal ml-2 block mt-1 lg:inline lg:mt-0">(1 obligatoire)</span></h3>
                                <div className="space-y-4">
                                    {["Pleine propriété", "Copropriété", "PPE"].map(label => (
                                        <Checkbox 
                                            key={label} 
                                            label={label} 
                                            checked={formData.propertyForm.includes(label)}
                                            onChange={() => handleCheckboxChange("propertyForm", label)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">Nature de la transaction <span className="text-sm font-sans text-gray-400 font-normal ml-2 block mt-1 lg:inline lg:mt-0">(1 obligatoire)</span></h3>
                                <div className="space-y-4">
                                    <Checkbox 
                                        label="Asset Deal" 
                                        infoLink="/procedure-de-vente#asset-deal" 
                                        checked={formData.transactionNature.includes("Asset Deal")}
                                        onChange={() => handleCheckboxChange("transactionNature", "Asset Deal")}
                                    />
                                    <Checkbox 
                                        label="Share Deal" 
                                        infoLink="/procedure-de-vente#share-deal" 
                                        checked={formData.transactionNature.includes("Share Deal")}
                                        onChange={() => handleCheckboxChange("transactionNature", "Share Deal")}
                                    />
                                    <Checkbox 
                                        label="Sale and lease back" 
                                        infoLink="/procedure-de-vente#sale-leaseback" 
                                        checked={formData.transactionNature.includes("Sale and lease back")}
                                        onChange={() => handleCheckboxChange("transactionNature", "Sale and lease back")}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">Remarques</h3>
                            <textarea 
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleInputChange}
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
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-accent text-white text-sm font-bold tracking-widest uppercase hover:bg-[#03081f] transition-colors"
                >
                    Envoyer le dossier
                </button>
            )}
          </div>

        </div>
      </main>

      <Footer />

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-[#03081f] rounded-full animate-spin mb-4"></div>
            <p className="text-[#03081f] font-serif text-xl animate-pulse">Génération et envoi du dossier en cours...</p>
        </div>
      )}

      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-[#03081f] z-50 flex flex-col items-center justify-center text-white">
            <div className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center mb-8 animate-[scaleIn_0.5s_ease-out]">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" className="animate-[drawCheck_0.5s_ease-out_0.5s_both]" />
                </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif mb-4 animate-[fadeIn_0.5s_ease-out_0.8s_both]">Dossier envoyé avec succès</h2>
            <p className="text-gray-300 text-lg animate-[fadeIn_0.5s_ease-out_1s_both]">Redirection vers l&apos;accueil...</p>
            
            <style jsx>{`
                @keyframes scaleIn {
                    from { transform: scale(0); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes drawCheck {
                    from { stroke-dasharray: 0 100; opacity: 0; }
                    to { stroke-dasharray: 100 100; opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
      )}
    </div>
  );
}

// Helper Components
interface InputProps {
    label: string;
    placeholder?: string;
    type?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

function Input({ label, placeholder, type = "text", name, value, onChange, required }: InputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {label}
            </label>
            <input 
                type={type} 
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`w-full bg-white border-b py-2 focus:outline-none transition-colors placeholder-gray-300 ${
                    required && !value ? 'border-red-200 focus:border-red-500' : 'border-gray-200 focus:border-[#03081f]'
                }`}
            />
        </div>
    );
}

interface CheckboxProps {
    label: string;
    infoLink?: string;
    checked: boolean;
    onChange: () => void;
}

function Checkbox({ label, infoLink, checked, onChange }: CheckboxProps) {
    return (
        <div className="flex items-center">
            <label className="flex items-center gap-4 cursor-pointer group">
                <div className={`w-5 h-5 border flex items-center justify-center transition-colors flex-shrink-0 ${
                    checked ? 'border-[#03081f] bg-white' : 'border-gray-300 bg-white group-hover:border-[#03081f]'
                }`}>
                    <input 
                        type="checkbox" 
                        className="peer sr-only" 
                        checked={checked}
                        onChange={onChange}
                    />
                    <div className={`w-3 h-3 bg-[#03081f] transition-opacity ${checked ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>
                <span className={`transition-colors ${checked ? 'text-[#03081f] font-medium' : 'text-gray-600 group-hover:text-[#03081f]'}`}>
                    {label}
                </span>
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
