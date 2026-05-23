"use client";

import { useState } from "react";
import { Smartphone, Layers, Code2, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function TechStackTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const t = useTranslations("Solution");

  const tabs = [
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: t("tech.t1title"),
      subtitle: t("tech.t1sub"),
      content: t("tech.t1desc"),
      details: ["InCallService API", "Jetpack Compose", "AudioRouting"]
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: t("tech.t2title"),
      subtitle: t("tech.t2sub"),
      content: t("tech.t2desc"),
      details: ["JNI (Java Native Interface)", "Zero-copy Buffers", "Memory Safety"]
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: t("tech.t3title"),
      subtitle: t("tech.t3sub"),
      content: t("tech.t3desc"),
      details: ["Rust Lang", "Concurrencia sin miedo", "C++ Level Speed"]
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: t("tech.t4title"),
      subtitle: t("tech.t4sub"),
      content: t("tech.t4desc"),
      details: ["Whisper C++", "ONNX Runtime", "Int8 Quantization"]
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full max-w-5xl mx-auto">
      {/* Tabs List */}
      <div className="lg:w-1/3 flex flex-col gap-3 w-full">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={cn(
              "flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 border",
              activeTab === idx 
                ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105" 
                : "bg-card text-foreground hover:bg-secondary/80 border-border/50 hover:border-primary/30"
            )}
          >
            <div className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              activeTab === idx ? "bg-white/20" : "bg-primary/10 text-primary"
            )}>
              {tab.icon}
            </div>
            <div>
              <h4 className="font-bold">{tab.title}</h4>
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content Panel */}
      <div className="lg:w-2/3 w-full bg-card rounded-3xl border shadow-xl p-8 relative overflow-hidden min-h-[350px] flex flex-col justify-center">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 transition-all duration-500 animate-in fade-in slide-in-from-right-4" key={activeTab}>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6 border border-primary/20">
            {tabs[activeTab].icon}
          </div>
          
          <h3 className="text-3xl font-bold mb-2">{tabs[activeTab].title}</h3>
          <p className="text-primary font-medium mb-6">{tabs[activeTab].subtitle}</p>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {tabs[activeTab].content}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {tabs[activeTab].details.map((detail, i) => (
              <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full border border-border/50">
                {detail}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
