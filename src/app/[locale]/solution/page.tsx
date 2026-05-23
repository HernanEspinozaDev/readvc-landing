import { buttonVariants } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { Cpu, ShieldCheck, Zap, Smartphone, Layers, Lock, Code2, Globe } from "lucide-react"
import { TechStackTabs } from "@/components/solution/tech-stack-tabs"
import { RustBento } from "@/components/solution/rust-bento"
import { getTranslations } from "next-intl/server"
import { useTranslations } from "next-intl"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Spotlight } from "@/components/ui/spotlight"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('solutionTitle'),
    description: t('solutionDescription'),
  };
}

export default function SolutionPage() {
  const t = useTranslations("Solution");

  return (
    <div className="flex flex-col items-center pb-20">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-36 bg-background relative overflow-hidden">
        <Spotlight className="bg-[#10B981]/15 blur-[120px] w-[800px] h-[800px]" />
        
        <ScrollReveal>
          <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
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

      {/* Los 3 Pilares Tecnológicos */}
      <section className="w-full py-24 md:py-32 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
        <ScrollReveal className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">{t("pillars.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("pillars.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col p-8 bg-card/60 backdrop-blur-md rounded-3xl shadow-sm border hover:border-primary/50 transition-colors hover:shadow-md">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t("pillars.p1title")}</h3>
              <p className="text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: t.raw("pillars.p1desc") }}></p>
            </div>

            <div className="flex flex-col p-8 bg-card/60 backdrop-blur-md rounded-3xl shadow-sm border hover:border-[#10B981]/50 transition-colors hover:shadow-md">
              <div className="h-14 w-14 rounded-2xl bg-[#10B981]/10 flex items-center justify-center mb-6 text-[#10B981]">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t("pillars.p2title")}</h3>
              <p className="text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: t.raw("pillars.p2desc") }}></p>
            </div>

            <div className="flex flex-col p-8 bg-card/60 backdrop-blur-md rounded-3xl shadow-sm border hover:border-[#F59E0B]/50 transition-colors hover:shadow-md">
              <div className="h-14 w-14 rounded-2xl bg-[#F59E0B]/10 flex items-center justify-center mb-6 text-[#F59E0B]">
                <Globe className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t("pillars.p3title")}</h3>
              <p className="text-muted-foreground mb-4">
                {t("pillars.p3desc")}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Stack Tecnológico Profundo */}
      <section className="w-full py-24 md:py-32 bg-gradient-to-b from-secondary/30 to-background">
        <ScrollReveal className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">{t("tech.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("tech.subtitle")}
            </p>
          </div>
          
          <TechStackTabs />
        </ScrollReveal>
      </section>

      <RustBento />

      {/* CTA Final */}
      <section className="w-full py-24 bg-background relative overflow-hidden">
        <Spotlight className="bg-[#10B981]/10 blur-[100px] bottom-0" />
        <ScrollReveal className="container px-4 md:px-6 mx-auto text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-6">{t("cta.title")}</h2>
          <Link 
            href="/#how-it-works" 
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
