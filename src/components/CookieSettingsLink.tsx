"use client";

import { useTranslations } from 'next-intl';

export default function CookieSettingsLink() {
  const t = useTranslations('footer');
  
  const openBanner = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event("openCookieBanner"));
  };

  return (
    <button 
      onClick={openBanner} 
      className="hover:text-white transition-colors uppercase tracking-widest"
    >
      {t('cookies')}
    </button>
  );
}
