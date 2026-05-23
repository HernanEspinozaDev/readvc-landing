"use client";

import { XCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export function CompetitorsGrid() {
  const t = useTranslations("Problem");

  const competitors = [
    {
      name: t("competitors.c1title"),
      issues: t("competitors.c1desc")
    },
    {
      name: t("competitors.c2title"),
      issues: t("competitors.c2desc")
    },
    {
      name: t("competitors.c3title"),
      issues: t("competitors.c3desc")
    },
    {
      name: t("competitors.c4title"),
      issues: t("competitors.c4desc")
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">{t("competitors.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("competitors.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competitors.map((comp, idx) => (
            <div key={idx} className="flex items-start gap-4 p-6 bg-card rounded-3xl border shadow-sm hover:border-destructive/50 transition-colors">
              <div className="mt-1 shrink-0 bg-destructive/10 text-destructive p-2 rounded-full">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{comp.name}</h3>
                <p className="text-muted-foreground">{comp.issues}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
