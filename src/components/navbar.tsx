"use client"

import { Link, usePathname } from "@/i18n/routing"
import { ThemeToggle } from "./theme-toggle"
import { Button, buttonVariants } from "./ui/button"
import { Menu } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "./language-switcher"

export function Navbar() {
  const t = useTranslations("Navbar")
  const [activeSection, setActiveSection] = useState<string>("")
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["problem", "solution", "about", "faq", "contact"]
      let current = ""
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { id: "problem", label: t("problem") },
    { id: "solution", label: t("solution") },
    { id: "about", label: t("about") },
    { id: "faq", label: t("faq") },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLarge, setIsLarge] = useState(false)

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Detect viewport width on client and update `isLarge` for conditional rendering
  useEffect(() => {
    const check = () => setIsLarge(window.matchMedia('(min-width: 1024px)').matches)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        
        {/* Logo (Desktop & Mobile) */}
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/readvc_logo.webp" alt="ReadVC Logo" width={32} height={32} className="rounded-md" />
            <span className="font-bold text-xl text-primary">
              ReadVC
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              const href = pathname === "/" ? `/#${link.id}` : `/#${link.id}`
              return (
                <Link 
                  key={link.id}
                  href={href as any} 
                  className={`transition-colors relative py-1 ${
                    isActive 
                      ? "text-foreground font-semibold" 
                      : "text-foreground/60 hover:text-foreground/80"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute left-0 -bottom-[19px] w-full h-[2px] bg-primary" />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <ThemeToggle />
          {/* Contact button - desktop only (render only when viewport is large) */}
          {isLarge && (
            <Link 
              href={pathname === "/" ? "/#contact" : "/#contact"}
              className={buttonVariants({ className: "hidden lg:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 font-medium" })}
            >
              {t("contact")}
            </Link>
          )}
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menú</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-background border-b border-border/40 shadow-lg flex flex-col p-4 space-y-4 z-50">
          {navLinks.map((link) => (
            <Link 
              key={link.id}
              href={`/#${link.id}` as any} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors py-2 border-b border-border/20 last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={buttonVariants({ className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium mt-2" })}
          >
            {t("contact")}
          </Link>
        </div>
      )}
    </header>
  )
}
