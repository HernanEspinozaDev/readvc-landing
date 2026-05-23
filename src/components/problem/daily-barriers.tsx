"use client";

import { Briefcase, HeartPulse, Building2, Headset } from "lucide-react";
import { useTranslations } from "next-intl";

export function DailyBarriers() {
  const t = useTranslations("Problem");
  
  const barriers = [
    {
      icon: <Briefcase className="w-8 h-8 text-primary" />,
      title: t("barriers.b1title"),
      desc: t("barriers.b1desc"),
      color: "bg-primary/10 border-primary/20",
    },
    {
      icon: <HeartPulse className="w-8 h-8 text-destructive" />,
      title: t("barriers.b2title"),
      desc: t("barriers.b2desc"),
      color: "bg-destructive/10 border-destructive/20",
    },
    {
      icon: <Building2 className="w-8 h-8 text-[#10B981]" />,
      title: t("barriers.b3title"),
      desc: t("barriers.b3desc"),
      color: "bg-[#10B981]/10 border-[#10B981]/20",
    },
    {
      icon: <Headset className="w-8 h-8 text-[#F59E0B]" />,
      title: t("barriers.b4title"),
      desc: t("barriers.b4desc"),
      color: "bg-[#F59E0B]/10 border-[#F59E0B]/20",
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-secondary/30 border-b border-border/40">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">{t("barriers.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("barriers.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {barriers.map((barrier, idx) => (
            <div key={idx} className="group relative bg-card p-6 rounded-3xl border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-50 transition-transform duration-500 group-hover:scale-150 ${barrier.color}`}></div>
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border ${barrier.color} bg-background`}>
                  {barrier.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{barrier.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {barrier.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
