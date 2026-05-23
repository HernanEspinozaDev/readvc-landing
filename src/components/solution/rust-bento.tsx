"use client";

import { ShieldCheck, Zap, Smartphone, Lock } from "lucide-react";
import { useTranslations } from "next-intl";

export function RustBento() {
  const t = useTranslations("Solution");

  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: t("bento.b1title"),
      desc: t("bento.b1desc"),
      colSpan: "md:col-span-2",
      bg: "bg-primary/5 border-primary/20 hover:border-primary/50"
    },
    {
      icon: <Zap className="w-8 h-8 text-[#F59E0B]" />,
      title: t("bento.b2title"),
      desc: t("bento.b2desc"),
      colSpan: "md:col-span-1",
      bg: "bg-card border-border/50 hover:border-[#F59E0B]/50"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-[#10B981]" />,
      title: t("bento.b3title"),
      desc: t("bento.b3desc"),
      colSpan: "md:col-span-1",
      bg: "bg-card border-border/50 hover:border-[#10B981]/50"
    },
    {
      icon: <Lock className="w-8 h-8 text-destructive" />,
      title: t("bento.b4title"),
      desc: t("bento.b4desc"),
      colSpan: "md:col-span-2",
      bg: "bg-destructive/5 border-destructive/20 hover:border-destructive/50"
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-background border-t border-border/40">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            {t("bento.badge")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">{t("bento.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("bento.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col p-8 rounded-3xl border shadow-sm transition-all duration-300 hover:shadow-lg ${feature.colSpan} ${feature.bg}`}
            >
              <div className="mb-6 bg-background rounded-2xl w-16 h-16 flex items-center justify-center border shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
