"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("Home");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
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

      if (res.ok) {
        setSubmitStatus("success");
        e.currentTarget.reset();
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Ocurrió un error inesperado.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("No se pudo establecer conexión con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="max-w-lg mx-auto text-center py-8 px-6 rounded-2xl bg-primary/5 border border-primary/20 backdrop-blur-sm animate-fade-in space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-2">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">¡Mensaje Recibido!</h3>
        <p className="text-muted-foreground leading-relaxed">
          Gracias por escribirnos. Tu consulta ha sido procesada correctamente a través de Resend.
          Nos pondremos en contacto contigo en la dirección indicada muy pronto.
        </p>
        <button
          onClick={() => setSubmitStatus(null)}
          className={buttonVariants({ variant: "outline", className: "mt-4 cursor-pointer rounded-xl font-medium" })}
        >
          Enviar otro mensaje
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
            Enviando...
          </>
        ) : (
          t("contact.submit")
        )}
      </button>
    </form>
  );
}
