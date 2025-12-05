"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Petit délai pour laisser le site charger avant d'afficher la bannière
    const timer = setTimeout(() => {
      try {
        const consent = localStorage.getItem("cookieConsent");
        // Pour le débogage : décommentez la ligne suivante pour forcer l'affichage
        // localStorage.removeItem("cookieConsent"); 
        
        if (!consent) {
          setShowBanner(true);
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        setShowBanner(true);
      }
    }, 500);

    const handleOpenBanner = () => setShowBanner(true);
    window.addEventListener("openCookieBanner", handleOpenBanner);

    return () => {
      window.removeEventListener("openCookieBanner", handleOpenBanner);
    };
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
    // Ici, vous pouvez déclencher le chargement des scripts de suivi (Google Analytics, etc.)
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#FDFBF7] border-t border-[#5483B3]/20 shadow-lg p-4 md:p-6 font-montserrat animate-cookie-enter">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-[#1C1C1C] md:max-w-2xl">
          <p>
            Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
            En continuant à naviguer, vous acceptez notre utilisation des cookies.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 text-sm font-medium text-[#021024] bg-transparent border border-[#021024] hover:bg-[#021024]/5 rounded transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 text-sm font-medium text-white bg-[#021024] hover:bg-[#052659] rounded transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
