import { useLocale } from "next-intl"
import { Link } from "@/i18n/routing"
import { Shield, Lock, Eye, Database, Server } from "lucide-react"

export default function PrivacyPage() {
  const locale = useLocale()
  
  const isEs = locale === "es"

  return (
    <div className="flex flex-col min-h-screen bg-background relative selection:bg-primary/30">
      {/* Header */}
      <section className="w-full py-20 bg-secondary/30 border-b border-border/40 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            <Shield className="w-4 h-4 mr-2" />
            {isEs ? "Transparencia y Seguridad" : "Transparency & Security"}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            {isEs ? "Política de Privacidad" : "Privacy Policy"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isEs 
              ? "ReadVC - Making Every Voice Call Visible. Tu privacidad es nuestra prioridad absoluta desde el día cero." 
              : "ReadVC - Making Every Voice Call Visible. Your privacy is our absolute priority from day zero."}
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            {isEs ? "Última actualización: Mayo 2026" : "Last updated: May 2026"}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container px-4 md:px-6 mx-auto py-16 flex flex-col md:flex-row gap-12 max-w-6xl">
        
        {/* Sidebar Navigation */}
        <aside className="md:w-1/4 hidden md:block">
          <div className="sticky top-24 space-y-2">
            <h3 className="font-bold text-lg mb-4">{isEs ? "Contenido" : "Contents"}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground font-medium">
              <li><a href="#summary" className="hover:text-primary transition-colors">{isEs ? "Resumen rápido" : "Quick Summary"}</a></li>
              <li><a href="#data-collection" className="hover:text-primary transition-colors">{isEs ? "Qué datos recopilamos" : "Data we collect"}</a></li>
              <li><a href="#how-we-use" className="hover:text-primary transition-colors">{isEs ? "Cómo usamos los datos" : "How we use your data"}</a></li>
              <li><a href="#third-parties" className="hover:text-primary transition-colors">{isEs ? "Servicios de terceros" : "Third-party services"}</a></li>
              <li><a href="#audio-privacy" className="hover:text-primary transition-colors">{isEs ? "Privacidad de audio" : "Audio privacy"}</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">{isEs ? "Contacto" : "Contact"}</a></li>
            </ul>
          </div>
        </aside>

        {/* Legal Text */}
        <div className="md:w-3/4 space-y-12">
          
          {/* Plain English Summary */}
          <div id="summary" className="p-6 md:p-8 rounded-3xl bg-primary/5 border border-primary/20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
              <Eye className="text-primary w-5 h-5" />
              {isEs ? "Versión corta" : "Short version"}
            </h3>
            <p className="text-foreground/80 leading-relaxed font-medium">
              {isEs 
                ? "Nosotros construimos ReadVC para protegerte, no para espiarte. Todo el reconocimiento de voz ocurre de forma nativa en tu teléfono (Edge AI) y tus audios NUNCA se suben a nuestros servidores. Solo recopilamos tu correo si te unes a la lista de espera o nos contactas, e información básica de uso anónima para mejorar la plataforma."
                : "We built ReadVC to protect you, not to spy on you. All voice recognition happens natively on your phone (Edge AI) and your audio is NEVER uploaded to our servers. We only collect your email if you join the waitlist or contact us, and basic anonymous usage analytics to improve the platform."}
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-loose">
            {isEs ? (
              <>
                <h2 id="data-collection" className="text-2xl font-bold text-foreground mt-10 mb-4">1. Qué datos recopilamos</h2>
                <p>Actualmente, al estar en fase de pruebas iniciales (Alpha/Beta), recopilamos información muy limitada:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li><strong>Información de contacto:</strong> Nombre y correo electrónico, únicamente si decides suscribirte voluntariamente a nuestra lista de espera o rellenar el formulario de contacto.</li>
                  <li><strong>Datos de uso y navegación:</strong> Información anónima sobre cómo interactúas con nuestro sitio web (ej. páginas visitadas, clics) para entender qué secciones generan más interés.</li>
                  <li><strong>Cuentas de usuario (Futuro):</strong> Más adelante, cuando habilitemos cuentas personales mediante AWS Cognito, recopilaremos credenciales estándar de registro, sujetas a estrictas políticas de cifrado.</li>
                </ul>

                <h2 id="how-we-use" className="text-2xl font-bold text-foreground mt-10 mb-4">2. Cómo usamos tu información</h2>
                <p>Tu información se utiliza con propósitos sumamente específicos y operativos:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>Para comunicarnos contigo respecto a actualizaciones del producto, accesos a la Beta y respuestas de soporte.</li>
                  <li>Para mejorar la experiencia de usuario (UX) en nuestro sitio web analizando patrones de tráfico generales.</li>
                  <li>Para garantizar la seguridad de nuestra infraestructura web.</li>
                </ul>
                <p><strong>Bajo ninguna circunstancia vendemos tu información personal a terceros.</strong></p>

                <h2 id="third-parties" className="text-2xl font-bold text-foreground mt-10 mb-4">3. Servicios de terceros</h2>
                <p>Para operar eficientemente como startup, confiamos en infraestructuras líderes en la industria que cumplen con estándares de seguridad globales:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li><strong>Vercel / Cloudflare:</strong> Utilizamos estas plataformas para alojar nuestra página web de manera segura y rápida. Estas herramientas pueden registrar temporalmente direcciones IP por motivos estrictos de seguridad (mitigación DDoS).</li>
                  <li><strong>AWS (Amazon Web Services):</strong> En el futuro, utilizaremos AWS Cognito y servicios relacionados de Amazon para el manejo seguro de autenticación de usuarios.</li>
                </ul>

                <h2 id="audio-privacy" className="text-2xl font-bold text-foreground mt-10 mb-4 flex items-center gap-2">
                  <Lock className="w-6 h-6 text-primary" />
                  4. Política estricta de Privacidad de Audio (Edge AI)
                </h2>
                <div className="p-4 rounded-xl border border-border bg-card shadow-sm mb-6">
                  <p className="m-0 font-medium text-foreground">La esencia tecnológica de ReadVC es la privacidad descentralizada. <strong>El procesamiento de audio (Speech-to-Text) y la generación de voz se ejecutan localmente en el procesador de tu dispositivo.</strong> ReadVC no graba tus llamadas telefónicas, ni transmite clips de audio a servidores en la nube para su procesamiento.</p>
                </div>

                <h2 id="rights" className="text-2xl font-bold text-foreground mt-10 mb-4">5. Tus derechos</h2>
                <p>Incluso en esta etapa temprana, respetamos tus derechos de control sobre tu información. Puedes solicitarnos en cualquier momento:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>Eliminar tu correo electrónico de nuestra lista de espera.</li>
                  <li>Consultar qué información tenemos sobre ti.</li>
                </ul>

                <h2 id="contact" className="text-2xl font-bold text-foreground mt-10 mb-4">6. Contacto Legal</h2>
                <p>Si tienes cualquier pregunta sobre nuestras prácticas de privacidad, escríbenos directamente a nuestro equipo central en Chile:</p>
                <p className="font-bold text-primary text-lg">hello@readvc.app</p>
              </>
            ) : (
              <>
                <h2 id="data-collection" className="text-2xl font-bold text-foreground mt-10 mb-4">1. Data we collect</h2>
                <p>Currently, as we are in our initial testing phase (Alpha/Beta), we collect very limited information:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li><strong>Contact Information:</strong> Name and email address, only if you voluntarily decide to subscribe to our waitlist or fill out our contact form.</li>
                  <li><strong>Usage and navigation data:</strong> Anonymous information about how you interact with our website (e.g., pages visited, clicks) to understand what generates the most interest.</li>
                  <li><strong>User Accounts (Future):</strong> Later, when we enable personal accounts via AWS Cognito, we will collect standard registration credentials, subject to strict encryption policies.</li>
                </ul>

                <h2 id="how-we-use" className="text-2xl font-bold text-foreground mt-10 mb-4">2. How we use your data</h2>
                <p>Your information is used for highly specific and operational purposes:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>To communicate with you regarding product updates, Beta access, and support responses.</li>
                  <li>To improve the user experience (UX) on our website by analyzing general traffic patterns.</li>
                  <li>To ensure the security of our web infrastructure.</li>
                </ul>
                <p><strong>Under no circumstances do we sell your personal information to third parties.</strong></p>

                <h2 id="third-parties" className="text-2xl font-bold text-foreground mt-10 mb-4">3. Third-party services</h2>
                <p>To operate efficiently as a startup, we rely on industry-leading infrastructure that complies with global security standards:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li><strong>Vercel / Cloudflare:</strong> We use these platforms to host our website securely and quickly. These tools may temporarily log IP addresses for strict security reasons (DDoS mitigation).</li>
                  <li><strong>AWS (Amazon Web Services):</strong> In the future, we will use AWS Cognito and related Amazon services for secure user authentication management.</li>
                </ul>

                <h2 id="audio-privacy" className="text-2xl font-bold text-foreground mt-10 mb-4 flex items-center gap-2">
                  <Lock className="w-6 h-6 text-primary" />
                  4. Strict Audio Privacy Policy (Edge AI)
                </h2>
                <div className="p-4 rounded-xl border border-border bg-card shadow-sm mb-6">
                  <p className="m-0 font-medium text-foreground">The technological core of ReadVC is decentralized privacy. <strong>Audio processing (Speech-to-Text) and voice generation are executed locally on your device's processor.</strong> ReadVC does not record your phone calls, nor does it transmit audio clips to cloud servers for processing.</p>
                </div>

                <h2 id="rights" className="text-2xl font-bold text-foreground mt-10 mb-4">5. Your rights</h2>
                <p>Even at this early stage, we respect your rights of control over your information. You can request at any time to:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>Remove your email from our waitlist.</li>
                  <li>Inquire about what information we hold about you.</li>
                </ul>

                <h2 id="contact" className="text-2xl font-bold text-foreground mt-10 mb-4">6. Legal Contact</h2>
                <p>If you have any questions about our privacy practices, please write directly to our core team in Chile:</p>
                <p className="font-bold text-primary text-lg">hello@readvc.app</p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
