"use client";

import { useState } from "react";
import { 
  Mic, Volume2, WifiOff, Radio, 
  MessageSquare, History, Eye, 
  Languages, AudioLines, Cloud, Coins, 
  Cpu, ShieldCheck, Lock, Activity, Sparkles, Layers, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function DemoTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const t = useTranslations("Demo.tabs");

  const categories = [
    {
      id: 0,
      title: t("t1.title"),
      subtitle: t("t1.subtitle"),
      icon: <Activity className="h-6 w-6" />,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      activeBg: "bg-primary",
      features: [
        {
          icon: <Mic className="h-6 w-6 text-primary" />,
          title: t("t1.f1title"),
          desc: t("t1.f1desc")
        },
        {
          icon: <Volume2 className="h-6 w-6 text-primary" />,
          title: t("t1.f2title"),
          desc: t("t1.f2desc")
        },
        {
          icon: <Radio className="h-6 w-6 text-primary" />,
          title: t("t1.f3title"),
          desc: t("t1.f3desc")
        },
        {
          icon: <WifiOff className="h-6 w-6 text-primary" />,
          title: t("t1.f4title"),
          desc: t("t1.f4desc")
        }
      ]
    },
    {
      id: 1,
      title: t("t2.title"),
      subtitle: t("t2.subtitle"),
      icon: <MessageSquare className="h-6 w-6" />,
      color: "text-[#10B981]",
      bgColor: "bg-[#10B981]/10",
      borderColor: "border-[#10B981]/20",
      activeBg: "bg-[#10B981]",
      features: [
        {
          icon: <MessageSquare className="h-6 w-6 text-[#10B981]" />,
          title: t("t2.f1title"),
          desc: t("t2.f1desc")
        },
        {
          icon: <History className="h-6 w-6 text-[#10B981]" />,
          title: t("t2.f2title"),
          desc: t("t2.f2desc")
        },
        {
          icon: <Eye className="h-6 w-6 text-[#10B981]" />,
          title: t("t2.f3title"),
          desc: t("t2.f3desc")
        }
      ]
    },
    {
      id: 2,
      title: t("t3.title"),
      subtitle: t("t3.subtitle"),
      icon: <Sparkles className="h-6 w-6" />,
      color: "text-[#F59E0B]",
      bgColor: "bg-[#F59E0B]/10",
      borderColor: "border-[#F59E0B]/20",
      activeBg: "bg-[#F59E0B]",
      features: [
        {
          icon: <Languages className="h-6 w-6 text-[#F59E0B]" />,
          title: t("t3.f1title"),
          desc: t("t3.f1desc")
        },
        {
          icon: <AudioLines className="h-6 w-6 text-[#F59E0B]" />,
          title: t("t3.f2title"),
          desc: t("t3.f2desc")
        },
        {
          icon: <Cloud className="h-6 w-6 text-[#F59E0B]" />,
          title: t("t3.f3title"),
          desc: t("t3.f3desc")
        },
        {
          icon: <Coins className="h-6 w-6 text-[#F59E0B]" />,
          title: t("t3.f4title"),
          desc: t("t3.f4desc")
        }
      ]
    },
    {
      id: 3,
      title: t("t4.title"),
      subtitle: t("t4.subtitle"),
      icon: <Shield className="h-6 w-6" />,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/20",
      activeBg: "bg-destructive",
      features: [
        {
          icon: <Cpu className="h-6 w-6 text-destructive" />,
          title: t("t4.f1title"),
          desc: t("t4.f1desc")
        },
        {
          icon: <ShieldCheck className="h-6 w-6 text-destructive" />,
          title: t("t4.f2title"),
          desc: t("t4.f2desc")
        },
        {
          icon: <Lock className="h-6 w-6 text-destructive" />,
          title: t("t4.f3title"),
          desc: t("t4.f3desc")
        }
      ]
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-12 mb-24">
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Left Navigation */}
        <div className="lg:w-1/3 flex flex-col gap-3 w-full shrink-0">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={cn(
                "flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-300 border",
                activeTab === idx 
                  ? `${cat.activeBg} text-white border-transparent shadow-lg scale-105 z-10` 
                  : "bg-card text-foreground hover:bg-secondary/80 border-border/50 hover:border-foreground/20"
              )}
            >
              <div className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                activeTab === idx ? "bg-white/20 text-white" : `${cat.bgColor} ${cat.color}`
              )}>
                {cat.icon}
              </div>
              <div>
                <p className={cn("text-xs font-bold uppercase tracking-wider mb-1", activeTab === idx ? "text-white/80" : "text-muted-foreground")}>
                  {t("step")} {idx + 1}
                </p>
                <h4 className="font-bold text-lg">{cat.title}</h4>
              </div>
            </button>
          ))}
        </div>

        {/* Right Content Panel */}
        <div className={cn(
          "lg:w-2/3 w-full rounded-3xl border shadow-xl p-8 relative overflow-hidden flex flex-col justify-center transition-colors duration-500",
          categories[activeTab].id === 3 ? "bg-slate-900 border-slate-700 text-white" : "bg-card"
        )}>
          {/* Subtle Background Glow */}
          <div className={cn("absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-30 pointer-events-none transition-colors duration-500", categories[activeTab].activeBg)}></div>
          
          <div className="relative z-10 transition-all duration-500 animate-in fade-in zoom-in-95" key={activeTab}>
            <div className="mb-10">
              <h3 className="text-3xl font-bold mb-2">{categories[activeTab].title}</h3>
              <p className={cn(
                "text-xl font-medium", 
                categories[activeTab].id === 3 ? "text-slate-400" : categories[activeTab].color
              )}>
                {categories[activeTab].subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories[activeTab].features.map((feat, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex flex-col p-6 rounded-2xl border transition-colors duration-300",
                    categories[activeTab].id === 3 
                      ? "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800" 
                      : "bg-background/50 border-border/40 hover:bg-background shadow-sm"
                  )}
                >
                  <div className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center mb-4",
                    categories[activeTab].bgColor
                  )}>
                    {feat.icon}
                  </div>
                  <h4 className="text-lg font-bold mb-2">{feat.title}</h4>
                  <p className={cn(
                    "text-sm leading-relaxed",
                    categories[activeTab].id === 3 ? "text-slate-400" : "text-muted-foreground"
                  )}>
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
