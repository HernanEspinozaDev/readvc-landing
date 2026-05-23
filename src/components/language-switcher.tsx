"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function toggleLanguage() {
    const nextLocale = locale === "es" ? "en" : "es";
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button
      onClick={toggleLanguage}
      className="relative flex items-center p-1 w-16 h-8 bg-secondary/50 rounded-full border border-input cursor-pointer transition-colors hover:bg-secondary/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      title={locale === 'es' ? "Cambiar a Inglés" : "Switch to English"}
      aria-label="Toggle language"
    >
      <div className="absolute inset-0 flex items-center justify-between px-[6px] z-10 text-[11px] font-bold select-none pointer-events-none">
        <span className={`w-1/2 text-center transition-colors duration-300 ${locale === 'es' ? 'text-foreground' : 'text-muted-foreground'}`}>ES</span>
        <span className={`w-1/2 text-center transition-colors duration-300 ${locale === 'en' ? 'text-foreground' : 'text-muted-foreground'}`}>EN</span>
      </div>
      
      <div 
        className={`w-6 h-6 bg-background shadow-md rounded-full transition-transform duration-300 ease-out ${
          locale === 'en' ? 'translate-x-8' : 'translate-x-0'
        }`}
      />
    </button>
  );
}
