"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { ChangeEvent } from "react";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = e.target.value;
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="relative flex items-center space-x-1 border border-input rounded-md px-2 py-1 text-sm bg-background">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <select
        value={locale}
        onChange={onSelectChange}
        className="bg-transparent border-none outline-none cursor-pointer appearance-none pr-4 text-muted-foreground hover:text-foreground focus:ring-0"
        title="Change language"
      >
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
}
