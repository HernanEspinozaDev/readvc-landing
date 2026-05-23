import { buttonVariants } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { Shield, Zap, MessageSquare, Mic, EarOff, PhoneCall, Clock } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Pricing } from "@/components/pricing"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { Spotlight } from "@/components/ui/spotlight"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { BackgroundVideo } from "@/components/background-video"
import { ContactForm } from "@/components/contact-form"

export default function Home() {
  const t = useTranslations("Home")

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full min-h-screen bg-background overflow-hidden relative flex items-center justify-center">
        <BackgroundVideo src="/readvcvideo.mp4" playbackRate={0.6} opacity={0.9} />
        <Spotlight className="bg-primary/20 blur-[150px] w-[600px] h-[600px] md:w-[1000px] md:h-[1000px]" />
        
        <ScrollReveal>
          <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
            
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white max-w-5xl mx-auto leading-tight [text-shadow:0_0_8px_rgba(0,0,0,1),0_0_16px_rgba(0,0,0,1),0_0_32px_rgba(0,0,0,1)]" 
              dangerouslySetInnerHTML={{ __html: t.raw("hero.title") }}
            ></h1>
            
            <p className="max-w-[700px] mx-auto text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-medium [text-shadow:0_0_6px_rgba(0,0,0,1),0_0_12px_rgba(0,0,0,1),0_0_24px_rgba(0,0,0,1)]">
              {t("hero.subtitle")}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#contact"
                className={buttonVariants({ size: "lg", className: "w-full sm:w-auto h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg rounded-xl shadow-lg" })}
              >
                {t("hero.contactBtn")}
              </Link>
              <Link
                href="/#how-it-works"
                className={buttonVariants({ size: "lg", variant: "outline", className: "w-full sm:w-auto h-14 px-8 font-semibold text-lg rounded-xl bg-background/50 backdrop-blur-sm" })}
              >
                {t("hero.demoBtn")}
              </Link>
            </div>

            {/* Hero Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto border-t border-border/40 pt-10">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-extrabold text-primary mb-2">{t("hero.stat1")}</div>
              <div className="text-sm text-muted-foreground font-medium">{t("hero.stat1desc")}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-extrabold text-primary mb-2">{t("hero.stat2")}</div>
              <div className="text-sm text-muted-foreground font-medium">{t("hero.stat2desc")}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-extrabold text-primary mb-2">{t("hero.stat3")}</div>
              <div className="text-sm text-muted-foreground font-medium">{t("hero.stat3desc")}</div>
            </div>
          </div>
          </div>
        </ScrollReveal>
        
        {/* Bouncing Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
          <Link href="#problem" className="flex flex-col items-center group cursor-pointer">
            <div className="h-10 w-6 rounded-full border-2 border-muted-foreground/50 flex justify-center p-1 mb-2">
              <div className="w-1 h-2 bg-primary rounded-full animate-bounce mt-1"></div>
            </div>
            <svg className="w-5 h-5 text-primary animate-bounce group-hover:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Top Validation Banner */}
      <section className="w-full py-12 bg-secondary/30 flex justify-center">
        <ScrollReveal className="container px-4 md:px-6 mx-auto">
          <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
            {t("validation.text")}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <img src="/StartUpChile.webp" alt="Startup Chile" className="h-14 md:h-20 object-contain" />
            <img src="/creainacap.webp" alt="CREA INACAP" className="h-12 md:h-16 object-contain" />
          </div>
        </ScrollReveal>
      </section>

      {/* El Problema (El Dolor) */}
      <section id="problem" className="w-full py-32 bg-background relative overflow-hidden">
        <Spotlight className="bg-destructive/10 blur-[120px] top-[20%]" />
        <ScrollReveal className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive mb-4">
              {t("problem.badge")}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-6">
              {t("problem.title")}
            </h2>
            <p className="max-w-[800px] text-xl text-muted-foreground">
              {t("problem.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <div className="flex flex-col items-center text-center p-8 bg-card/60 backdrop-blur-md rounded-3xl shadow-sm border border-destructive/10 hover:border-destructive/30 transition-colors">
              <Clock className="w-12 h-12 text-destructive mb-4 opacity-80" />
              <h3 className="text-xl font-bold mb-3">{t("problem.card1title")}</h3>
              <p className="text-muted-foreground">{t("problem.card1desc")}</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-card/60 backdrop-blur-md rounded-3xl shadow-sm border border-destructive/10 hover:border-destructive/30 transition-colors">
              <EarOff className="w-12 h-12 text-destructive mb-4 opacity-80" />
              <h3 className="text-xl font-bold mb-3">{t("problem.card2title")}</h3>
              <p className="text-muted-foreground">{t("problem.card2desc")}</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-card/60 backdrop-blur-md rounded-3xl shadow-sm border border-destructive/10 hover:border-destructive/30 transition-colors">
              <PhoneCall className="w-12 h-12 text-destructive mb-4 opacity-80" />
              <h3 className="text-xl font-bold mb-3">{t("problem.card3title")}</h3>
              <p className="text-muted-foreground">{t("problem.card3desc")}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              href="/problem"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-14 px-8 gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg rounded-2xl",
                "shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.7)] transition-all duration-300 hover:-translate-y-1 animate-pulse"
              )}
            >
              {t("problem.button")}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* La Solución */}
      <section id="solution" className="w-full py-32 bg-secondary/30 relative overflow-hidden">
        <Spotlight className="bg-primary/5 blur-[150px] right-0 translate-x-1/2" />
        <ScrollReveal className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              {t("solution.badge")}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-6">
              {t("solution.title")}
            </h2>
            <p className="max-w-[800px] text-xl text-muted-foreground">
              {t("solution.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col p-8 bg-card/60 backdrop-blur-md rounded-3xl shadow-sm border hover:border-primary/50 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Mic className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("solution.card1title")}</h3>
              <p className="text-muted-foreground">{t("solution.card1desc")}</p>
            </div>

            <div className="flex flex-col p-8 bg-card/60 backdrop-blur-md rounded-3xl shadow-sm border hover:border-[#10B981]/50 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-[#10B981]/10 flex items-center justify-center mb-6 text-[#10B981]">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("solution.card2title")}</h3>
              <p className="text-muted-foreground">{t("solution.card2desc")}</p>
            </div>

            <div className="flex flex-col p-8 bg-card/60 backdrop-blur-md rounded-3xl shadow-sm border hover:border-primary/50 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("solution.card3title")}</h3>
              <p className="text-muted-foreground">{t("solution.card3desc")}</p>
            </div>

            <div className="flex flex-col p-8 bg-card/60 backdrop-blur-md rounded-3xl shadow-sm border hover:border-[#EF4444]/50 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-[#EF4444]/10 flex items-center justify-center mb-6 text-[#EF4444]">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("solution.card4title")}</h3>
              <p className="text-muted-foreground">{t("solution.card4desc")}</p>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Link
              href="/solution"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-14 px-8 gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg rounded-2xl",
                "shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.7)] transition-all duration-300 hover:-translate-y-1 animate-pulse"
              )}
            >
              {t("solution.button")}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Mockups / How it works */}
      <section id="how-it-works" className="w-full py-32 bg-background relative overflow-hidden">
        <ScrollReveal className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">{t("howItWorks.title")}</h2>
              <p className="text-xl text-muted-foreground">
                {t("howItWorks.subtitle")}
              </p>

              <div className="space-y-8 pt-4">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold border border-primary/30">1</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{t("howItWorks.step1title")}</h4>
                    <p className="text-muted-foreground">{t("howItWorks.step1desc")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold border border-primary/30">2</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{t("howItWorks.step2title")}</h4>
                    <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw("howItWorks.step2desc") }}></p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold border border-primary/30">3</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{t("howItWorks.step3title")}</h4>
                    <p className="text-muted-foreground">{t("howItWorks.step3desc")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold border border-primary/30">4</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{t("howItWorks.step4title")}</h4>
                    <p className="text-muted-foreground">{t("howItWorks.step4desc")}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Link 
                    href="/demo" 
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "w-full md:w-auto h-14 px-8 gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg rounded-2xl",
                      "shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.7)] transition-all duration-300 hover:-translate-y-1 animate-pulse"
                    )}
                  >
                    {t("howItWorks.button")}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* UI Concept Mockup */}
            <div className="flex-1 w-full max-w-md mx-auto relative">
              <div className="relative aspect-[9/19] bg-slate-900 dark:bg-black rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden">
                <div className="absolute top-0 w-full h-12 flex justify-center pt-2 z-20">
                  <div className="w-1/3 h-6 bg-slate-800 rounded-full"></div>
                </div>
                <div className="absolute inset-0 bg-background flex flex-col pt-16">
                  {/* Header Caller */}
                  <div className="text-center pb-4 border-b border-border/50 bg-background/95 backdrop-blur z-10">
                    <h3 className="text-xl font-bold">{t("howItWorks.mockupTitle")}</h3>
                    <p className="text-sm font-mono text-primary flex items-center justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      {t("howItWorks.mockupTime")}
                    </p>
                  </div>

                  {/* Chat Area */}
                  <div className="flex-1 overflow-hidden flex flex-col p-4 gap-4 bg-secondary/30">
                    <div className="flex flex-col gap-1 w-4/5">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold ml-2">{t("howItWorks.mockupDoctor")}</span>
                      <div className="p-3.5 rounded-2xl rounded-tl-none bg-card border shadow-sm text-[15px]">
                        <p className="text-foreground">{t("howItWorks.mockupDoctorMsg1")}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 w-4/5 ml-auto">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mr-2 text-right">{t("howItWorks.mockupYou")}</span>
                      <div className="p-3.5 rounded-2xl rounded-tr-none bg-primary text-primary-foreground shadow-sm text-[15px]">
                        <p>{t("howItWorks.mockupYouMsg")}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 w-4/5">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold ml-2">{t("howItWorks.mockupDoctor")}</span>
                      <div className="p-3.5 rounded-2xl rounded-tl-none bg-card border shadow-sm text-[15px] border-primary/50 relative">
                        <span className="absolute -left-1.5 top-3 w-3 h-3 bg-primary rounded-full animate-ping opacity-75"></span>
                        <p className="text-foreground">{t("howItWorks.mockupDoctorMsg2")}<span className="text-muted-foreground animate-pulse">|</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="p-4 bg-background border-t">
                    <div className="flex gap-2 mb-3 overflow-x-auto pb-1 hide-scrollbar">
                      <span className="whitespace-nowrap px-3 py-1 bg-secondary rounded-full text-xs font-medium border cursor-pointer hover:bg-secondary/80">{t("howItWorks.mockupReply1")}</span>
                      <span className="whitespace-nowrap px-3 py-1 bg-secondary rounded-full text-xs font-medium border cursor-pointer hover:bg-secondary/80">{t("howItWorks.mockupReply2")}</span>
                      <span className="whitespace-nowrap px-3 py-1 bg-secondary rounded-full text-xs font-medium border cursor-pointer hover:bg-secondary/80">{t("howItWorks.mockupReply3")}</span>
                    </div>
                    <div className="relative">
                      <input type="text" placeholder={t("howItWorks.mockupPlaceholder")} className="w-full bg-secondary border rounded-full py-3 px-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-primary/50" />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                      </button>
                    </div>
                    <div className="mt-4 flex gap-6 justify-center">
                      <div className="h-14 w-14 rounded-full bg-[#EF4444] flex items-center justify-center shadow-md cursor-pointer hover:bg-[#DC2626] transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" /><line x1="22" x2="2" y1="2" y2="22" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Business Model / Pricing */}
      <Pricing />

      {/* Quiénes Somos (Founder Story) */}
      <section id="about" className="w-full py-32 bg-background">
        <ScrollReveal className="container px-4 md:px-6 mx-auto">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3 flex justify-center">
              {/* Fotografía / Avatar */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-primary/20 overflow-hidden bg-secondary flex items-center justify-center shadow-lg">
                <img src="/hernan.webp" alt="Hernán Espinoza" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-2/3 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {t("about.badge")}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">{t("about.title")}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw("about.p1") }}></p>
              <p className="text-lg text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw("about.p2") }}></p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="https://www.linkedin.com/in/hernanespinozadev/" target="_blank" className={buttonVariants({ variant: "outline", className: "gap-2" })}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                  {t("about.linkedin")}
                </Link>
              </div>
            </div>
          </div>
          
          {/* Misión y Visión */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mt-20 pt-16 border-t border-border/40">
            <div className="bg-card p-8 rounded-2xl border border-border border-l-[6px] border-l-primary shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t("about.missionTitle")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("about.missionDesc")}
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-border border-l-[6px] border-l-foreground/40 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t("about.visionTitle")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("about.visionDesc")}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section id="faq" className="w-full py-32 bg-secondary/30 relative overflow-hidden">
        <ScrollReveal className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start max-w-6xl mx-auto">
            {/* Left Column: Title & CTA */}
            <div className="lg:w-1/3 lg:sticky lg:top-32 space-y-6">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                FAQ
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
                {t("faq.title")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("faq.subtitle")}
              </p>
              
              <div className="pt-8 border-t border-border/50">
                <h4 className="font-semibold text-foreground mb-2">{t("faq.stillHaveQuestions")}</h4>
                <p className="text-sm text-muted-foreground mb-4">{t("faq.helpClearDoubts")}</p>
                <Link href="#contact" className={buttonVariants({ variant: "outline", className: "w-full sm:w-auto rounded-xl" })}>
                  {t("faq.contactUs")}
                </Link>
              </div>
            </div>

            {/* Right Column: Accordion Cards */}
            <div className="lg:w-2/3 w-full">
              <Accordion className="w-full space-y-4">
                <AccordionItem value="item-1" className="bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl shadow-sm px-6 py-2 transition-all hover:border-primary/30 data-[state=open]:border-primary/50">
                  <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-primary">
                    {t("faq.q1")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    <div dangerouslySetInnerHTML={{ __html: t.raw("faq.a1") }} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl shadow-sm px-6 py-2 transition-all hover:border-primary/30 data-[state=open]:border-primary/50">
                  <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-primary">
                    {t("faq.q2")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    <div dangerouslySetInnerHTML={{ __html: t.raw("faq.a2") }} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl shadow-sm px-6 py-2 transition-all hover:border-primary/30 data-[state=open]:border-primary/50">
                  <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-primary">
                    {t("faq.q3")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    <div dangerouslySetInnerHTML={{ __html: t.raw("faq.a3") }} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl shadow-sm px-6 py-2 transition-all hover:border-primary/30 data-[state=open]:border-primary/50">
                  <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-primary">
                    {t("faq.q4")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    <div dangerouslySetInnerHTML={{ __html: t.raw("faq.a4") }} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl shadow-sm px-6 py-2 transition-all hover:border-primary/30 data-[state=open]:border-primary/50">
                  <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-primary">
                    {t("faq.q5")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    <div dangerouslySetInnerHTML={{ __html: t.raw("faq.a5") }} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-32 bg-background relative overflow-hidden">
        <Spotlight className="bg-primary/20 blur-[150px] bottom-0 translate-y-1/2" />
        <ScrollReveal className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center border border-primary/20 p-8 md:p-14 rounded-[3rem] bg-card/60 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium mb-6 border">
                <MessageSquare className="w-4 h-4 text-primary" />
                {t("contact.badge")}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">{t("contact.title")}</h2>
              <p className="text-xl text-muted-foreground mb-10">
                {t("contact.subtitle")}
              </p>

              <ContactForm />
              <p className="text-sm text-muted-foreground mt-6 flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                {t("contact.secure")}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
