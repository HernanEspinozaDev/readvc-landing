import { buttonVariants } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { Shield, EarOff, Clock, PhoneCall, VolumeX, AlertTriangle, Lock, Users } from "lucide-react"
import { AffectedGroups } from "@/components/problem/affected-groups"
import { DailyBarriers } from "@/components/problem/daily-barriers"
import { CompetitorsGrid } from "@/components/problem/competitors-grid"
import { getTranslations } from "next-intl/server"
import { useTranslations } from "next-intl"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Spotlight } from "@/components/ui/spotlight"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('problemTitle'),
    description: t('problemDescription'),
  };
}

export default function ProblemPage() {
  const t = useTranslations("Problem");

  return (
    <div className="flex flex-col items-center pb-20">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-36 bg-background relative overflow-hidden">
        <Spotlight className="bg-destructive/15 blur-[120px] w-[800px] h-[800px]" />
        
        <ScrollReveal>
          <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive mb-6">
            {t("hero.badge")}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground max-w-4xl mx-auto leading-tight">
            {t("hero.title")}
          </h1>
          <p className="max-w-[800px] mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed">
            {t("hero.subtitle")}
          </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Los 3 Grupos Afectados */}
      <AffectedGroups />

      {/* Las 3 Brechas Críticas */}
      <section className="w-full py-24 md:py-32 bg-gradient-to-b from-background to-secondary/30">
        <ScrollReveal className="container px-4 md:px-6 mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-10 text-center">{t("gaps.title")}</h2>
          
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-start p-6 bg-card/60 backdrop-blur-md rounded-3xl border shadow-sm hover:border-destructive/50 transition-colors">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 text-destructive mt-1">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{t("gaps.gap1title")}</h3>
                <p className="text-muted-foreground">
                  {t("gaps.gap1desc")}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start p-6 bg-card/60 backdrop-blur-md rounded-3xl border shadow-sm hover:border-destructive/50 transition-colors">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 text-destructive mt-1">
                <PhoneCall className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{t("gaps.gap2title")}</h3>
                <p className="text-muted-foreground">
                  {t("gaps.gap2desc")}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start p-6 bg-card/60 backdrop-blur-md rounded-3xl border shadow-sm hover:border-destructive/50 transition-colors">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 text-destructive mt-1">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{t("gaps.gap3title")}</h3>
                <p className="text-muted-foreground">
                  {t("gaps.gap3desc")}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Barreras del día a día */}
      <DailyBarriers />

      {/* Comparativa de Soluciones Actuales */}
      <CompetitorsGrid />

      {/* CTA Final */}
      <section className="w-full py-24 bg-background relative overflow-hidden">
        <Spotlight className="bg-primary/10 blur-[100px] bottom-0" />
        <ScrollReveal className="container px-4 md:px-6 mx-auto text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-6">{t("cta.title")}</h2>
          <Link 
            href="/#solution" 
            className={buttonVariants({ size: "lg", className: "h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg rounded-xl" })}
          >
            {t("cta.btn")}
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </ScrollReveal>
      </section>
    </div>
  )
}
