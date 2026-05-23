"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import Image from "next/image"

export function Footer() {
  const t = useTranslations("Footer")
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full relative overflow-hidden bg-background border-t border-border/20 pt-16 pb-8">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16">
          
          {/* Branding Column */}
          <div className="md:col-span-1 space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/readvc_logo.webp" alt="ReadVC Logo" width={36} height={36} className="rounded-md" />
              <span className="font-bold text-2xl text-primary">
                ReadVC
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("tagline")}
            </p>
            <p className="text-muted-foreground text-xs font-medium">
              {t("builtWith")}
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground tracking-wide">{t("product")}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/problem" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("problem")}
                </Link>
              </li>
              <li>
                <Link href="/solution" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("solution")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground tracking-wide">{t("company")}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground tracking-wide">{t("legal")}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/40 gap-4">
          <p className="text-sm text-muted-foreground">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  )
}
