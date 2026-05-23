"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const t = useTranslations("Pricing");

  const togglePlan = (plan: string) => {
    setSelectedPlan(selectedPlan === plan ? null : plan);
  };

  return (
    <section id="business" className="w-full py-20 md:py-32 bg-secondary/30 border-b border-border/40">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-bold text-foreground mb-4">
            {t("badge")}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-6">
            {t("title")}
          </h2>
          <p className="max-w-[800px] text-xl text-foreground/80 font-medium">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {/* Freemium */}
          <div 
            onClick={() => togglePlan('freemium')}
            className={cn(
              "flex flex-col p-8 rounded-3xl shadow-sm border relative cursor-pointer transition-all duration-300",
              selectedPlan === 'freemium' 
                ? "bg-primary/5 border-primary scale-105 shadow-xl z-10" 
                : "bg-card border-border/50 hover:border-primary/50"
            )}
          >
            {selectedPlan === 'freemium' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {t("freemium.badge")}
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">{t("freemium.title")}</h3>
              <p className="text-muted-foreground text-sm">{t("freemium.desc")}</p>
            </div>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-extrabold">{t("freemium.price")}</span>
            </div>
            
            {/* Expanded Content */}
            <div className={cn("overflow-hidden transition-all duration-300", selectedPlan === 'freemium' ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0")}>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm">{t("freemium.f1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm">{t("freemium.f2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm">{t("freemium.f3")}</span>
                </li>
              </ul>
              <div className="mt-auto">
                <div className="p-3 rounded-xl bg-secondary text-xs text-center text-muted-foreground font-medium">
                  {t("freemium.footer")}
                </div>
              </div>
            </div>
          </div>

          {/* Premium */}
          <div 
            onClick={() => togglePlan('premium')}
            className={cn(
              "flex flex-col p-8 rounded-3xl shadow-sm border relative cursor-pointer transition-all duration-300",
              selectedPlan === 'premium' 
                ? "bg-primary/5 border-primary scale-105 shadow-xl z-10" 
                : "bg-card border-border/50 hover:border-primary/50"
            )}
          >
            {selectedPlan === 'premium' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {t("premium.badge")}
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">{t("premium.title")}</h3>
              <p className="text-muted-foreground text-sm">{t("premium.desc")}</p>
            </div>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-extrabold">{t("premium.price")}</span>
            </div>

            {/* Expanded Content */}
            <div className={cn("overflow-hidden transition-all duration-300", selectedPlan === 'premium' ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0")}>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">{t("premium.f1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm">{t("premium.f2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm">{t("premium.f3")}</span>
                </li>
              </ul>
              <div className="mt-auto">
                <div className="p-3 rounded-xl bg-primary/10 text-xs text-center text-primary font-medium">
                  {t("premium.footer")}
                </div>
              </div>
            </div>
          </div>

          {/* B2B Corporativo */}
          <div 
            onClick={() => togglePlan('b2b')}
            className={cn(
              "flex flex-col p-8 rounded-3xl shadow-sm border relative cursor-pointer transition-all duration-300",
              selectedPlan === 'b2b' 
                ? "bg-primary/5 border-primary scale-105 shadow-xl z-10" 
                : "bg-card border-border/50 hover:border-primary/50"
            )}
          >
            {selectedPlan === 'b2b' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {t("b2b.badge")}
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">{t("b2b.title")}</h3>
              <p className="text-muted-foreground text-sm">{t("b2b.desc")}</p>
            </div>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-extrabold">{t("b2b.price")}</span>
            </div>

            {/* Expanded Content */}
            <div className={cn("overflow-hidden transition-all duration-300", selectedPlan === 'b2b' ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0")}>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm">{t("b2b.f1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm">{t("b2b.f2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm">{t("b2b.f3")}</span>
                </li>
              </ul>
              <div className="mt-auto">
                <div className="p-3 rounded-xl bg-secondary text-xs text-center text-muted-foreground font-medium">
                  {t("b2b.footer")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
