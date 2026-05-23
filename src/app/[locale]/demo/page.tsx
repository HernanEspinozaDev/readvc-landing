import { DemoTabs } from "@/components/demo/demo-tabs";
import { InteractiveCallDemo } from "@/components/demo/interactive-call-demo";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { getTranslations } from "next-intl/server"
import { useTranslations } from "next-intl"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('demoTitle'),
    description: t('demoDescription'),
  };
}

export default function DemoPage() {
  const t = useTranslations("Demo");

  return (
    <div className="flex flex-col items-center pb-20">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-8 bg-primary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            {t("hero.badge")}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground max-w-4xl mx-auto leading-tight">
            {t("hero.title")}
          </h1>
          <p className="max-w-[800px] mx-auto text-xl text-muted-foreground leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Interactive Call Demo */}
      <section className="w-full bg-primary/5 border-b border-border/40 pb-16">
        <InteractiveCallDemo />
      </section>

      <DemoTabs />

      {/* CTA */}
      <section className="w-full py-16 text-center">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-6">{t("cta.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("cta.subtitle")}
          </p>
          <Link 
            href="/#business" 
            className={buttonVariants({ size: "lg", className: "h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg rounded-xl" })}
          >
            {t("cta.btn")}
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
