"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import jsPDF from "jspdf";

export default function CriteresPage() {
  const router = useRouter();
    const t = useTranslations("investmentCriteria");
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
            if (!formData.companyName) newErrors.push(t("errors.step1.companyNameRequired"));
            if (!formData.address) newErrors.push(t("errors.step1.addressRequired"));
            if (!formData.contact1Name) newErrors.push(t("errors.step1.contact1NameRequired"));
            if (!formData.contact1Email) newErrors.push(t("errors.step1.contact1EmailRequired"));
            if (!formData.contact1Mobile) newErrors.push(t("errors.step1.contact1MobileRequired"));
    }

    if (step === 2) {
            if (formData.investmentVolume.length === 0) newErrors.push(t("errors.step2.investmentVolumeRequired"));
            if (formData.location.length === 0) newErrors.push(t("errors.step2.locationRequired"));
    }

    if (step === 3) {
            if (formData.objectType.length === 0) newErrors.push(t("errors.step3.objectTypeRequired"));
            if (formData.assignment.length === 0) newErrors.push(t("errors.step3.assignmentRequired"));
    }

    if (step === 4) {
            if (formData.propertyForm.length === 0) newErrors.push(t("errors.step4.propertyFormRequired"));
            if (formData.transactionNature.length === 0) newErrors.push(t("errors.step4.transactionNatureRequired"));
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

    type OptionItem = { id: string; label: string };

    const investmentVolumeOptions: OptionItem[] = [
        { id: "lt_5", label: t("options.investmentVolume.lt_5") },
        { id: "5_10", label: t("options.investmentVolume.5_10") },
        { id: "10_25", label: t("options.investmentVolume.10_25") },
        { id: "25_50", label: t("options.investmentVolume.25_50") },
        { id: "50_100", label: t("options.investmentVolume.50_100") },
        { id: "gt_100", label: t("options.investmentVolume.gt_100") }
    ];

    const locationOptions: OptionItem[] = [
        { id: "geneva", label: t("options.location.geneva") },
        { id: "lausanne", label: t("options.location.lausanne") },
        { id: "vaud", label: t("options.location.vaud") },
        { id: "fribourg", label: t("options.location.fribourg") },
        { id: "neuchatel", label: t("options.location.neuchatel") },
        { id: "valais", label: t("options.location.valais") },
        { id: "germanSwitzerland", label: t("options.location.germanSwitzerland") },
        { id: "allSwitzerland", label: t("options.location.allSwitzerland") }
    ];

    const objectTypeOptions: OptionItem[] = [
        { id: "plotNoPermit", label: t("options.objectType.plotNoPermit") },
        { id: "plotWithPermit", label: t("options.objectType.plotWithPermit") },
        { id: "building", label: t("options.objectType.building") },
        { id: "buildingLeasehold", label: t("options.objectType.buildingLeasehold") },
        { id: "portfolio", label: t("options.objectType.portfolio") }
    ];

    const assignmentOptions: OptionItem[] = [
        { id: "residential", label: t("options.assignment.residential") },
        { id: "office", label: t("options.assignment.office") },
        { id: "mixed", label: t("options.assignment.mixed") },
        { id: "hotel", label: t("options.assignment.hotel") },
        { id: "retailSales", label: t("options.assignment.retailSales") },
        { id: "logisticsIndustrial", label: t("options.assignment.logisticsIndustrial") },
        { id: "medicoSocial", label: t("options.assignment.medicoSocial") }
    ];

    const propertyFormOptions: OptionItem[] = [
        { id: "freehold", label: t("options.propertyForm.freehold") },
        { id: "coownership", label: t("options.propertyForm.coownership") },
        { id: "ppe", label: t("options.propertyForm.ppe") }
    ];

    const transactionNatureOptions: OptionItem[] = [
        { id: "assetDeal", label: t("options.transactionNature.assetDeal") },
        { id: "shareDeal", label: t("options.transactionNature.shareDeal") },
        { id: "saleLeaseback", label: t("options.transactionNature.saleLeaseback") }
    ];

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
        doc.text(t("pdf.title"), pageWidth / 2, 35, { align: "center" });
        
        let y = 45;
        const leftMargin = 20;
        const rightColX = pageWidth / 2 + 10;

        doc.setFontSize(9);
        
        // Société
        doc.setFont("times", "bold");
        doc.text(t("pdf.sections.company"), leftMargin, y);
        doc.setFont("times", "normal");
        doc.text(formData.companyName || "................................................................................................................................", leftMargin + 45, y);
        
        y += 12;
        
        // Contacts Header
        doc.setFont("times", "bold");
        doc.text(t("pdf.sections.contact", { index: 1 }), leftMargin, y);
        doc.text(t("pdf.sections.contact", { index: 2 }), rightColX, y);
        
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

            drawField(t("pdf.fields.name"), data[`contact${suffix}Name`]);
            drawField(t("pdf.fields.position"), data[`contact${suffix}Position`]);
            drawField(t("pdf.fields.email"), data[`contact${suffix}Email`]);
            drawField(t("pdf.fields.mobile"), data[`contact${suffix}Mobile`]);
            drawField(t("pdf.fields.directLine"), data[`contact${suffix}Direct`]);
            
            return currentY;
        };

        const yC1 = drawContact(leftMargin, "1", y);
        const yC2 = drawContact(rightColX, "2", y);
        
        y = Math.max(yC1, yC2) + 5;
        
        // Contact 3
        doc.setFont("times", "bold");
        doc.text(t("pdf.sections.contact", { index: 3 }), leftMargin, y);
        y += 5;
        doc.setFont("times", "normal");
        drawContact(leftMargin, "3", y);
        
        y += 25;
        
        // Adresse
        doc.setFontSize(9);
        doc.setFont("times", "bold");
        doc.text(t("pdf.sections.address"), leftMargin, y);
        doc.setFont("times", "normal");
        doc.text(formData.address || "................................................................................................................................................................................................", leftMargin + 20, y);
        
        y += 15;
        
        // Checkbox Helper
        const drawCheckboxGroup = (title: string, items: OptionItem[], selectedItems: string[], x: number, startY: number) => {
            doc.setFont("times", "bold");
            doc.text(title, x, startY);
            let currentY = startY + 5;
            doc.setFont("times", "normal");
            
            items.forEach(item => {
                // Box
                doc.rect(x, currentY - 3, 3, 3);
                // Check
                if (selectedItems.includes(item.id)) {
                    doc.text("x", x + 0.5, currentY - 0.5);
                }
                // Label
                doc.text(item.label, x + 5, currentY);
                currentY += 4;
            });
            return currentY;
        };

        // Row 1: Volume & Localisation
        const yVol = drawCheckboxGroup(t("pdf.groups.investmentVolume"), investmentVolumeOptions, formData.investmentVolume, leftMargin, y);
        const yLoc = drawCheckboxGroup(t("pdf.groups.location"), locationOptions, formData.location, rightColX, y);
        
        y = Math.max(yVol, yLoc) + 8;
        
        // Row 2: Type & Affectation
        const yType = drawCheckboxGroup(t("pdf.groups.objectType"), objectTypeOptions, formData.objectType, leftMargin, y);
        const yAff = drawCheckboxGroup(t("pdf.groups.assignment"), assignmentOptions, formData.assignment, rightColX, y);
        
        y = Math.max(yType, yAff) + 8;
        
        // Row 3: Forme & Nature
        const yForm = drawCheckboxGroup(t("pdf.groups.propertyForm"), propertyFormOptions, formData.propertyForm, leftMargin, y);
        const yNature = drawCheckboxGroup(t("pdf.groups.transactionNature"), transactionNatureOptions, formData.transactionNature, rightColX, y);
        
        y = Math.max(yForm, yNature) + 10;
        
        // Remarques
        doc.setFont("times", "bold");
        doc.text(t("pdf.sections.remarks"), leftMargin, y);
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
        doc.text(t("pdf.footer"), pageWidth / 2, footerY, { align: "center" });

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
                    alert(`${t("alerts.emailErrorPrefix")}: ${errorData.error || t("alerts.unknownError")}`);
                } else {
                    alert(`${t("alerts.serverErrorPrefix", { status: response.status })}`);
                }
            }
          } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : t("alerts.unknownError");
            console.error('PDF/Email error:', error);
            setIsSubmitting(false);
            alert(`${t("alerts.errorPrefix")}: ${errorMessage}`);
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
                <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase mb-4 block">{t("hero.label")}</span>
                <h1 className="text-4xl md:text-6xl font-serif text-[#021024] mb-6">{t("hero.title")}</h1>
                <p className="text-lg md:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                    {t("hero.description")}
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
                            {step === 1 && t("steps.identity")}
                            {step === 2 && t("steps.strategy")}
                            {step === 3 && t("steps.target")}
                            {step === 4 && t("steps.modalities")}
                        </span>
                    </div>
                ))}
            </div>
          </div>

          {/* Error Message Display */}
          {errors.length > 0 && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-sm">
                  <p className="font-bold mb-2">{t("errors.title")}</p>
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
                                {t("sections.company.title")}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Input 
                                    name="companyName" 
                                    value={formData.companyName} 
                                    onChange={handleInputChange} 
                                    label={t("fields.companyName.label")}
                                    placeholder={t("fields.companyName.placeholder")}
                                    required 
                                />
                                <Input 
                                    name="address" 
                                    value={formData.address} 
                                    onChange={handleInputChange} 
                                    label={t("fields.address.label")}
                                    placeholder={t("fields.address.placeholder")}
                                    required 
                                />
                            </div>
                        </div>

                        {/* Contacts Section */}
                        <div>
                            <h3 className="text-xl font-serif text-[#03081f] mb-8 pl-2">{t("sections.contacts.title")}</h3>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Contact 1 - Highlighted */}
                                <div className="bg-white p-8 border border-gray-100 shadow-md relative">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
                                    <h4 className="font-bold text-sm uppercase tracking-widest text-accent mb-6 flex justify-between items-center">
                                        {t("sections.contacts.contactPrimary")}
                                        <span className="text-[10px] bg-accent/10 text-accent px-2 py-1 rounded">{t("sections.contacts.requiredBadge")}</span>
                                    </h4>
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input name="contact1Name" value={formData.contact1Name} onChange={handleInputChange} label={t("fields.contact.nameRequired")} required />
                                            <Input name="contact1Position" value={formData.contact1Position} onChange={handleInputChange} label={t("fields.contact.position")} />
                                        </div>
                                        <Input name="contact1Email" value={formData.contact1Email} onChange={handleInputChange} label={t("fields.contact.emailRequired")} type="email" required />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input name="contact1Mobile" value={formData.contact1Mobile} onChange={handleInputChange} label={t("fields.contact.mobileRequired")} required />
                                            <Input name="contact1Direct" value={formData.contact1Direct} onChange={handleInputChange} label={t("fields.contact.directLine")} />
                                        </div>
                                    </div>
                                </div>

                                {/* Contact 2 */}
                                <div className="bg-white p-8 border border-gray-100 shadow-sm relative opacity-80 hover:opacity-100 transition-opacity">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200"></div>
                                    <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-6">{t("sections.contacts.contact", { index: 2 })}</h4>
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input name="contact2Name" value={formData.contact2Name} onChange={handleInputChange} label={t("fields.contact.name")} />
                                            <Input name="contact2Position" value={formData.contact2Position} onChange={handleInputChange} label={t("fields.contact.position")} />
                                        </div>
                                        <Input name="contact2Email" value={formData.contact2Email} onChange={handleInputChange} label={t("fields.contact.email")} type="email" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input name="contact2Mobile" value={formData.contact2Mobile} onChange={handleInputChange} label={t("fields.contact.mobile")} />
                                            <Input name="contact2Direct" value={formData.contact2Direct} onChange={handleInputChange} label={t("fields.contact.directLine")} />
                                        </div>
                                    </div>
                                </div>

                                {/* Contact 3 */}
                                <div className="bg-white p-8 border border-gray-100 shadow-sm relative opacity-80 hover:opacity-100 transition-opacity">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200"></div>
                                    <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-6">{t("sections.contacts.contact", { index: 3 })}</h4>
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input name="contact3Name" value={formData.contact3Name} onChange={handleInputChange} label={t("fields.contact.name")} />
                                            <Input name="contact3Position" value={formData.contact3Position} onChange={handleInputChange} label={t("fields.contact.position")} />
                                        </div>
                                        <Input name="contact3Email" value={formData.contact3Email} onChange={handleInputChange} label={t("fields.contact.email")} type="email" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input name="contact3Mobile" value={formData.contact3Mobile} onChange={handleInputChange} label={t("fields.contact.mobile")} />
                                            <Input name="contact3Direct" value={formData.contact3Direct} onChange={handleInputChange} label={t("fields.contact.directLine")} />
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
                            <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">{t("step2.investmentVolume.title")} <span className="text-sm font-sans text-gray-400 font-normal ml-2">({t("step2.investmentVolume.note")})</span></h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {investmentVolumeOptions.map(({ id, label }) => (
                                    <Checkbox 
                                        key={id} 
                                        label={label} 
                                        checked={formData.investmentVolume.includes(id)}
                                        onChange={() => handleCheckboxChange("investmentVolume", id)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">{t("step2.location.title")} <span className="text-sm font-sans text-gray-400 font-normal ml-2">({t("common.requiredOne")})</span></h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {locationOptions.map(({ id, label }) => (
                                    <Checkbox 
                                        key={id} 
                                        label={label} 
                                        checked={formData.location.includes(id)}
                                        onChange={() => handleCheckboxChange("location", id)}
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
                            <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">{t("step3.objectType.title")} <span className="text-sm font-sans text-gray-400 font-normal ml-2">({t("common.requiredOne")})</span></h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {objectTypeOptions.map(({ id, label }) => (
                                    <Checkbox 
                                        key={id} 
                                        label={label} 
                                        checked={formData.objectType.includes(id)}
                                        onChange={() => handleCheckboxChange("objectType", id)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">{t("step3.assignment.title")} <span className="text-sm font-sans text-gray-400 font-normal ml-2">({t("common.requiredOne")})</span></h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {assignmentOptions.map(({ id, label }) => (
                                    <Checkbox 
                                        key={id} 
                                        label={label} 
                                        checked={formData.assignment.includes(id)}
                                        onChange={() => handleCheckboxChange("assignment", id)}
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
                                <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">{t("step4.propertyForm.title")} <span className="text-sm font-sans text-gray-400 font-normal ml-2 block mt-1 lg:inline lg:mt-0">({t("common.requiredOne")})</span></h3>
                                <div className="space-y-4">
                                    {propertyFormOptions.map(({ id, label }) => (
                                        <Checkbox 
                                            key={id} 
                                            label={label} 
                                            checked={formData.propertyForm.includes(id)}
                                            onChange={() => handleCheckboxChange("propertyForm", id)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">{t("step4.transactionNature.title")} <span className="text-sm font-sans text-gray-400 font-normal ml-2 block mt-1 lg:inline lg:mt-0">({t("common.requiredOne")})</span></h3>
                                <div className="space-y-4">
                                    <Checkbox 
                                        label={transactionNatureOptions.find(o => o.id === "assetDeal")?.label || "Asset Deal"}
                                        infoLink="/procedure-de-vente#asset-deal" 
                                        infoTitle={t("moreInfo")}
                                        checked={formData.transactionNature.includes("assetDeal")}
                                        onChange={() => handleCheckboxChange("transactionNature", "assetDeal")}
                                    />
                                    <Checkbox 
                                        label={transactionNatureOptions.find(o => o.id === "shareDeal")?.label || "Share Deal"}
                                        infoLink="/procedure-de-vente#share-deal" 
                                        infoTitle={t("moreInfo")}
                                        checked={formData.transactionNature.includes("shareDeal")}
                                        onChange={() => handleCheckboxChange("transactionNature", "shareDeal")}
                                    />
                                    <Checkbox 
                                        label={transactionNatureOptions.find(o => o.id === "saleLeaseback")?.label || "Sale and lease back"}
                                        infoLink="/procedure-de-vente#sale-leaseback" 
                                        infoTitle={t("moreInfo")}
                                        checked={formData.transactionNature.includes("saleLeaseback")}
                                        onChange={() => handleCheckboxChange("transactionNature", "saleLeaseback")}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-serif text-[#03081f] mb-8 border-b border-gray-200 pb-4">{t("step4.remarks.title")}</h3>
                            <textarea 
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleInputChange}
                                className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-[#03081f] transition-colors min-h-[150px]"
                                placeholder={t("step4.remarks.placeholder")}
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
                ← {t("buttons.previous")}
            </button>

            {currentStep < 4 ? (
                <button 
                    onClick={nextStep}
                    className="px-8 py-3 bg-[#03081f] text-white text-sm font-bold tracking-widest uppercase hover:bg-[#5483B3] transition-colors"
                >
                    {t("buttons.next")} →
                </button>
            ) : (
                <button 
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-accent text-white text-sm font-bold tracking-widest uppercase hover:bg-[#03081f] transition-colors"
                >
                    {t("buttons.submit")}
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
                        <p className="text-[#03081f] font-serif text-xl animate-pulse">{t("overlays.loading")}</p>
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
            <h2 className="text-3xl md:text-4xl font-serif mb-4 animate-[fadeIn_0.5s_ease-out_0.8s_both]">{t("overlays.successTitle")}</h2>
            <p className="text-gray-300 text-lg animate-[fadeIn_0.5s_ease-out_1s_both]">{t("overlays.successRedirect")}</p>
            
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
    infoTitle?: string;
    checked: boolean;
    onChange: () => void;
}

function Checkbox({ label, infoLink, infoTitle, checked, onChange }: CheckboxProps) {
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
                    title={infoTitle}
                >
                    ?
                </a>
            )}
        </div>
    );
}
