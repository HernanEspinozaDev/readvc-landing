"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Phone, PhoneOff, User, Send, UserCircle2, Volume2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Message = {
  id: number;
  sender: "readvc" | "caller";
  text: string;
  isTranscribing?: boolean;
};

export function InteractiveCallDemo() {
  const t = useTranslations("Demo.interactive");

  const CALL_SCRIPT = [
    {
      trigger: "init",
      delay: 1000,
      text: t("script1")
    },
    {
      trigger: 1, // after first message
      delay: 2000,
      text: t("script2")
    },
    {
      trigger: 3, // after user's first response
      delay: 2000,
      text: t("script3")
    },
    {
      trigger: 5, // after user's second response
      delay: 2000,
      text: t("script4")
    }
  ];

  const QUICK_REPLIES = [
    [t("replies.r1_1"), t("replies.r1_2")],
    [t("replies.r2_1"), t("replies.r2_2")],
    [t("replies.r3_1"), t("replies.r3_2")]
  ];

  const [callStatus, setCallStatus] = useState<"idle" | "ringing" | "active" | "ended" | "rejected">("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [step, setStep] = useState(0); // 0 = start, 1 = wait for user, 2 = wait for user, etc.
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isModalOpen]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    setCallStatus("idle");
    setMessages([]);
    setStep(0);
    setIsSpeaking(false);
    setIsTyping(false);
    setInputText("");
  };

  const startCall = () => {
    setCallStatus("ringing");
    setMessages([]);
    setStep(0);
  };

  const acceptCall = () => {
    setCallStatus("active");
    
    // Auto message from ReadVC
    setTimeout(() => {
      setIsSpeaking(true); // show waves on caller side
      setMessages([{ id: 1, sender: "readvc", text: CALL_SCRIPT[0].text }]);
      
      setTimeout(() => {
        setIsSpeaking(false);
        // Caller responds
        simulateCaller(CALL_SCRIPT[1].text);
      }, 3000);
    }, CALL_SCRIPT[0].delay as number);
  };

  const rejectCall = () => {
    setCallStatus("rejected");
  };

  const simulateCaller = (text: string) => {
    setIsTyping(true); // show transcribing on ReadVC side
    let currentText = "";
    const words = text.split(" ");
    let wordIndex = 0;
    
    const tempId = Date.now();
    setMessages(prev => [...prev, { id: tempId, sender: "caller", text: "", isTranscribing: true }]);

    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        currentText += (wordIndex > 0 ? " " : "") + words[wordIndex];
        setMessages(prev => 
          prev.map(m => m.id === tempId ? { ...m, text: currentText } : m)
        );
        wordIndex++;
      } else {
        clearInterval(interval);
        setMessages(prev => 
          prev.map(m => m.id === tempId ? { ...m, isTranscribing: false } : m)
        );
        setIsTyping(false);
        setStep(prev => prev + 1);
      }
    }, 200); // 200ms per word simulation
  };

  const endCall = () => {
    setCallStatus("ended");
    setIsSpeaking(false);
    setIsTyping(false);
  };

  const handleSend = (text: string = inputText) => {
    if (!text.trim() || callStatus !== "active") return;
    
    // Capture step value from closure
    const currentStep = step;

    const newId = Date.now();
    setMessages(prev => [...prev, { id: newId, sender: "readvc", text }]);
    setInputText("");
    
    // Simulate TTS speaking on Caller side
    setIsSpeaking(true);
    setTimeout(() => {
      setIsSpeaking(false);
      
      // Map the current step to the next caller script
      if (currentStep === 1) {
        setTimeout(() => {
          simulateCaller(CALL_SCRIPT[2].text);
        }, 1000);
      } else if (currentStep === 2) {
        setTimeout(() => {
          simulateCaller(CALL_SCRIPT[3].text);
        }, 1000);
      } else if (currentStep >= 3) {
         setTimeout(endCall, 2000);
      }
    }, 2500); // simulate 2.5s of speaking
  };

  return (
    <>
      {!isModalOpen ? (
        <div className="w-full max-w-5xl mx-auto py-16 px-4 text-center">
          <div className="h-24 w-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Phone className="h-10 w-10 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            {t("subtitle")}
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-14 px-8 text-lg"
          >
            {t("startBtn")}
            <Mic className="ml-2 h-5 w-5" />
          </button>
        </div>
      ) : (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 overflow-hidden">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes wave {
              0%, 100% { height: 20%; }
              50% { height: 100%; }
            }
            .animate-wave {
              animation: wave 1s ease-in-out infinite;
            }
          `}} />
          
          <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center h-full max-h-[900px] justify-center pt-8 md:pt-0">
            <button 
              onClick={closeModal}
              className={cn(
                "fixed top-4 right-4 md:absolute md:-top-10 md:right-0 bg-white/20 hover:bg-white/30 text-white rounded-full px-4 py-2 flex items-center gap-2 transition-all duration-500 z-[150] backdrop-blur-md border border-white/10 shadow-lg",
                (callStatus === "ended" || callStatus === "rejected") && "animate-pulse scale-110 bg-primary hover:bg-primary/90 font-bold shadow-primary/40 border-primary"
              )}
            >
              {t("close")} <span className="text-2xl leading-none">&times;</span>
            </button>

            <div className="text-center mb-6 md:mb-12 hidden md:block">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">{t("modalTitle")}</h2>
              <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
                {t("modalSubtitle")}
              </p>
            </div>

            <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 w-full max-w-[800px] h-[80vh] md:h-auto">
              
              {/* PHONE 1: ReadVC User */}
              <div className="relative w-full max-w-[360px] md:w-[280px] sm:w-[300px] h-full max-h-[750px] md:h-[550px] sm:h-[600px] bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] border-[6px] md:border-[8px] border-slate-800 shadow-2xl flex flex-col overflow-hidden shrink-0 z-10">
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                  <div className="w-24 h-4 bg-slate-800 rounded-b-xl"></div>
                </div>
                
                {callStatus === "idle" || callStatus === "rejected" ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-950 relative">
                    <div className="absolute inset-0 bg-primary/5"></div>
                    <Image src="/readvc_logo.webp" alt="ReadVC Logo" width={100} height={100} className="rounded-2xl shadow-xl z-10 mb-6" />
                    <h3 className="text-2xl font-bold text-white z-10">ReadVC</h3>
                    <p className="text-slate-400 text-sm mt-2 z-10">{t("phone1Waiting")}</p>
                    {callStatus === "rejected" && (
                      <p className="text-red-400 text-sm mt-4 z-10 font-medium">{t("phone1Rejected")}</p>
                    )}
                  </div>
                ) : callStatus === "ringing" ? (
                  <div className="flex-1 flex flex-col items-center justify-between p-6 bg-slate-900 pt-24 pb-12">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center mb-4 border-4 border-primary/20 animate-pulse">
                        <UserCircle2 className="w-12 h-12 text-slate-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{t("phone1Caller")}</h3>
                      <p className="text-primary mt-2">{t("phone1Ringing")}</p>
                    </div>
                    
                    <div className="flex w-full justify-around px-4">
                      <button 
                        onClick={rejectCall}
                        className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform"
                      >
                        <PhoneOff className="w-7 h-7" />
                      </button>
                      <button 
                        onClick={acceptCall}
                        className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform animate-bounce"
                      >
                        <Phone className="w-7 h-7" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="bg-slate-950 text-white p-4 pt-8 flex items-center gap-3 border-b border-slate-800 shadow-sm z-10">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <UserCircle2 className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{t("phone1Caller")}</h4>
                        <p className="text-xs text-primary flex items-center gap-1">
                          {callStatus === "active" ? (
                            <><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> {t("phone1Active")}</>
                          ) : (
                            <><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> {t("phone1Ended")}</>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 bg-slate-900 p-4 overflow-y-auto flex flex-col gap-3 custom-scrollbar">
                      {messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={cn(
                            "max-w-[85%] rounded-2xl px-4 py-2 text-sm relative animate-in fade-in slide-in-from-bottom-2",
                            msg.sender === "readvc" 
                              ? "bg-primary text-primary-foreground self-end rounded-tr-sm" 
                              : "bg-slate-800 text-slate-100 self-start rounded-tl-sm"
                          )}
                        >
                          {msg.sender === "caller" && <p className="text-[10px] text-primary mb-1 font-bold tracking-wider uppercase">{t("phone1Transcribing")}</p>}
                          {msg.text}
                          {msg.isTranscribing && <span className="inline-block ml-1 animate-pulse">...</span>}
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="bg-slate-950 p-3 flex flex-col gap-2 border-t border-slate-800 z-10">
                      {callStatus === "active" && step > 0 && step <= QUICK_REPLIES.length && (
                        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                          {QUICK_REPLIES[step - 1].map((reply, idx) => (
                            <button 
                              key={idx}
                              onClick={() => handleSend(reply)}
                              disabled={isSpeaking || isTyping}
                              className="whitespace-nowrap px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-full transition-colors disabled:opacity-50"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2 items-center">
                        <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0 hover:bg-slate-700 transition-colors">
                          <Mic className="w-5 h-5" />
                        </button>
                        <input 
                          type="text"
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                          placeholder={t("phone1Placeholder")}
                          disabled={callStatus !== "active" || isSpeaking || isTyping}
                          className="flex-1 min-w-0 bg-slate-800 border-none rounded-full px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 h-10"
                        />
                        <button 
                          onClick={() => handleSend()}
                          disabled={!inputText.trim() || callStatus !== "active" || isSpeaking || isTyping}
                          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0 disabled:opacity-50 transition-transform active:scale-95"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={endCall}
                          className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white shrink-0 hover:bg-red-600 transition-colors"
                        >
                          <PhoneOff className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* CONNECTION LINE (Visible on Desktop) */}
              <div className="hidden lg:flex flex-col items-center justify-center gap-2 text-slate-400">
                <div className="flex gap-1 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                  <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                  <div className="w-2 h-2 rounded-full bg-primary/80"></div>
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div className="w-2 h-2 rounded-full bg-primary/80"></div>
                  <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                  <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                </div>
                <span className="text-xs font-mono bg-white/10 px-2 py-1 rounded-md">{t("networkText")}</span>
              </div>

              {/* PHONE 2: The Caller */}
              <div className="absolute md:relative bottom-0 right-0 md:bottom-auto md:right-auto w-[280px] sm:w-[300px] h-[550px] sm:h-[600px] bg-slate-100 dark:bg-slate-900 rounded-[3rem] border-[8px] border-slate-300 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden shrink-0 z-50 scale-[0.4] sm:scale-[0.45] md:scale-100 origin-bottom-right transition-all">
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                  <div className="w-24 h-4 bg-slate-300 dark:bg-slate-800 rounded-b-xl"></div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                  {/* Caller ID Info */}
                  <div className="flex flex-col items-center mb-12">
                    <div className="w-24 h-24 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center mb-4 shadow-inner">
                      <User className="w-12 h-12 text-slate-500" />
                    </div>
                    <h3 className="text-2xl font-normal text-slate-800 dark:text-slate-200">{t("phone2Title")}</h3>
                    <p className="text-slate-500 mt-1">
                      {callStatus === "idle" ? t("phone2Idle") : 
                      callStatus === "ringing" ? t("phone2Ringing") : 
                      callStatus === "active" ? "00:14" : 
                      callStatus === "rejected" ? t("phone2Rejected") : t("phone2Ended")}
                    </p>
                  </div>

                  {/* Visualizer / Sound Waves */}
                  <div className="h-24 w-full flex items-center justify-center mb-8">
                    {isSpeaking ? (
                      <div className="flex items-center gap-1.5 h-full">
                        {[1,2,3,4,5,6,7].map((i) => (
                          <div 
                            key={i} 
                            className="w-2 bg-primary rounded-full animate-wave"
                            style={{ 
                              height: `${Math.max(20, Math.random() * 100)}%`,
                              animationDelay: `${i * 0.1}s` 
                            }}
                          ></div>
                        ))}
                      </div>
                    ) : callStatus === "active" ? (
                      <div className="flex items-center gap-1 h-[2px]">
                        <div className="w-32 bg-slate-300 dark:bg-slate-700"></div>
                      </div>
                    ) : null}
                  </div>

                  {/* Context Helper Text */}
                  <div className="absolute bottom-32 text-center w-full px-6">
                    {isSpeaking ? (
                      <p className="text-sm text-primary font-medium animate-pulse">{t("phone2Speaking")}</p>
                    ) : isTyping ? (
                      <p className="text-sm text-slate-500 font-medium">{t("phone2Typing")}</p>
                    ) : callStatus === "active" ? (
                      <p className="text-sm text-slate-400">{t("phone2Silent")}</p>
                    ) : null}
                  </div>

                  {/* Call Controls */}
                  <div className="absolute bottom-10 w-full px-8 flex justify-center gap-6">
                    {callStatus === "idle" || callStatus === "ended" || callStatus === "rejected" ? (
                      <button 
                        onClick={startCall}
                        className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform"
                      >
                        <Phone className="w-7 h-7" />
                      </button>
                    ) : (
                      <>
                        <button className="w-16 h-16 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:scale-105 transition-transform">
                          <Volume2 className="w-7 h-7" />
                        </button>
                        <button 
                          onClick={endCall}
                          className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform"
                        >
                          <PhoneOff className="w-7 h-7" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
