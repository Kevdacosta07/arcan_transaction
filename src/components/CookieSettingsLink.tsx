"use client";

export default function CookieSettingsLink() {
  const openBanner = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event("openCookieBanner"));
  };

  return (
    <button 
      onClick={openBanner} 
      className="hover:text-white transition-colors uppercase tracking-widest"
    >
      Cookies
    </button>
  );
}
