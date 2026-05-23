"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const errorMessages: Record<string, Record<string, string>> = {
    en: {
      VALIDATION_ERROR: "Please check your input and try again.",
      RESEND_ERROR: "Could not send the message. Please try again.",
      SERVER_ERROR: "Server error. Please try again later.",
      NETWORK_ERROR: "Could not connect to the server. Please check your connection.",
      UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
    },
    es: {
      VALIDATION_ERROR: "Por favor revisa tu información e intenta nuevamente.",
      RESEND_ERROR: "No se pudo enviar el mensaje. Intenta de nuevo.",
      SERVER_ERROR: "Error del servidor. Intenta nuevamente más tarde.",
      NETWORK_ERROR: "No se pudo conectar al servidor. Revisa tu conexión.",
      UNKNOWN_ERROR: "Ocurrió un error inesperado. Intenta de nuevo.",
    },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      locale,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setSubmitStatus("success");
        form.reset();
      } else {
        setSubmitStatus("error");
        const errorCode = result.error || "UNKNOWN_ERROR";
        const localeErrors = errorMessages[locale as keyof typeof errorMessages] || errorMessages.en;
        
        // Mostrar el error específico de Zod si existe (details)
        if (errorCode === "VALIDATION_ERROR" && result.details) {
          setErrorMessage(result.details);
        } else {
          setErrorMessage(localeErrors[errorCode as keyof typeof localeErrors] || localeErrors.UNKNOWN_ERROR);
        }
      }
    } catch (error: any) {
      console.error("Fetch/JSON parse error:", error);
      setSubmitStatus("error");
      const localeErrors = errorMessages[locale as keyof typeof errorMessages] || errorMessages.en;
      // Si el error es de parseo JSON, significa que el servidor retornó HTML (como un 500 genérico de Vercel)
      if (error?.message?.includes("JSON")) {
        setErrorMessage(localeErrors.SERVER_ERROR);
      } else {
        setErrorMessage(localeErrors.NETWORK_ERROR);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    const successTexts: Record<string, { title: string; message: string; button: string }> = {
      en: {
        title: "Message Sent!",
        message: "Thank you for reaching out. We'll respond to your message as soon as possible at the email you provided.",
        button: "Send Another Message",
      },
      es: {
        title: "¡Mensaje Enviado!",
        message: "Gracias por escribirnos. Nos pondremos en contacto con el email que indicaste muy pronto.",
        button: "Enviar otro mensaje",
      },
    };
    const texts = successTexts[locale as keyof typeof successTexts] || successTexts.en;

    return (
      <div className="max-w-lg mx-auto text-center py-8 px-6 rounded-2xl bg-primary/5 border border-primary/20 backdrop-blur-sm animate-fade-in space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-2">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">{texts.title}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {texts.message}
        </p>
        <button
          onClick={() => setSubmitStatus(null)}
          className={buttonVariants({ variant: "outline", className: "mt-4 cursor-pointer rounded-xl font-medium" })}
        >
          {texts.button}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto text-left">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 space-y-1">
          <label htmlFor="name" className="text-sm font-medium ml-1">
            {t("contact.nameLabel")}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={t("contact.namePlaceholder")}
            className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 shadow-sm"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="flex-1 space-y-1">
          <label htmlFor="email" className="text-sm font-medium ml-1">
            {t("contact.emailLabel")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={t("contact.emailPlaceholder")}
            className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 shadow-sm"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>
      
      <div className="space-y-1">
        <label htmlFor="message" className="text-sm font-medium ml-1">
          {t("contact.messageLabel")}
        </label>
        <textarea
          id="message"
          name="message"
          placeholder={t("contact.messagePlaceholder")}
          className="flex min-h-[120px] w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 shadow-sm resize-y"
          required
          disabled={isSubmitting}
        ></textarea>
      </div>

      {submitStatus === "error" && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm leading-relaxed animate-shake">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={buttonVariants({
          size: "lg",
          className: "h-12 w-full font-bold text-base rounded-xl cursor-pointer mt-2 flex items-center justify-center gap-2",
        })}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {locale === "es" ? "Enviando..." : "Sending..."}
          </>
        ) : (
          t("contact.submit")
        )}
      </button>
    </form>
  );
}
