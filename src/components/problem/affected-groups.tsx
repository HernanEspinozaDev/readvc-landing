"use client";

import { useState } from "react";
import { EarOff, VolumeX, Users, AlertTriangle, Clock, Shield, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function AffectedGroups() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const t = useTranslations("Problem");

  const toggleGroup = (group: string) => {
    setSelectedGroup(selectedGroup === group ? null : group);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-background border-b border-border/40">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            {t("groups.badge")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">{t("groups.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("groups.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {/* Sordos e Hipoacúsicos */}
          <div 
            onClick={() => toggleGroup('sordos')}
            className={cn(
              "flex flex-col p-8 rounded-3xl shadow-sm border cursor-pointer transition-all duration-300",
              selectedGroup === 'sordos' 
                ? "bg-primary/5 border-primary scale-105 shadow-xl z-10" 
                : "bg-card border-border/50 hover:border-primary/50"
            )}
          >
            <div className="min-h-[180px]">
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <EarOff className="h-7 w-7" />
                </div>
                <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform duration-300", selectedGroup === 'sordos' && "rotate-180")} />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t("groups.g1.title")}</h3>
              <p className="text-muted-foreground text-sm font-medium">{t("groups.g1.subtitle")}</p>
            </div>
            
            <div className={cn("overflow-hidden transition-all duration-300", selectedGroup === 'sordos' ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0")}>
              <p className="text-muted-foreground mb-4">
                {t("groups.g1.desc")}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-sm">{t("groups.g1.i1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-sm">{t("groups.g1.i2")}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Trastornos del Habla */}
          <div 
            onClick={() => toggleGroup('habla')}
            className={cn(
              "flex flex-col p-8 rounded-3xl shadow-sm border cursor-pointer transition-all duration-300",
              selectedGroup === 'habla' 
                ? "bg-destructive/5 border-destructive scale-105 shadow-xl z-10" 
                : "bg-card border-border/50 hover:border-destructive/50"
            )}
          >
            <div className="min-h-[180px]">
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive">
                  <VolumeX className="h-7 w-7" />
                </div>
                <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform duration-300", selectedGroup === 'habla' && "rotate-180")} />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t("groups.g2.title")}</h3>
              <p className="text-muted-foreground text-sm font-medium">{t("groups.g2.subtitle")}</p>
            </div>
            
            <div className={cn("overflow-hidden transition-all duration-300", selectedGroup === 'habla' ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0")}>
              <p className="text-muted-foreground mb-4">
                {t("groups.g2.desc")}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-sm">{t("groups.g2.i1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-sm">{t("groups.g2.i2")}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Neurodivergencia */}
          <div 
            onClick={() => toggleGroup('tea')}
            className={cn(
              "flex flex-col p-8 rounded-3xl shadow-sm border cursor-pointer transition-all duration-300",
              selectedGroup === 'tea' 
                ? "bg-[#10B981]/5 border-[#10B981] scale-105 shadow-xl z-10" 
                : "bg-card border-border/50 hover:border-[#10B981]/50"
            )}
          >
            <div className="min-h-[180px]">
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 rounded-2xl bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                  <Users className="h-7 w-7" />
                </div>
                <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform duration-300", selectedGroup === 'tea' && "rotate-180")} />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t("groups.g3.title")}</h3>
              <p className="text-muted-foreground text-sm font-medium">{t("groups.g3.subtitle")}</p>
            </div>
            
            <div className={cn("overflow-hidden transition-all duration-300", selectedGroup === 'tea' ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0")}>
              <p className="text-muted-foreground mb-4">
                {t("groups.g3.desc")}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-sm">{t("groups.g3.i1")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
