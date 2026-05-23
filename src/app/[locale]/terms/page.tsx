import { useLocale } from "next-intl"
import { Scale, AlertTriangle, BookOpen } from "lucide-react"

export default function TermsPage() {
  const locale = useLocale()
  
  const isEs = locale === "es"

  return (
    <div className="flex flex-col min-h-screen bg-background relative selection:bg-primary/30">
      {/* Header */}
      <section className="w-full py-20 bg-secondary/30 border-b border-border/40 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            <Scale className="w-4 h-4 mr-2" />
            {isEs ? "Términos Legales" : "Legal Terms"}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            {isEs ? "Términos de Servicio" : "Terms of Service"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isEs 
              ? "ReadVC - Making Every Voice Call Visible. Reglas claras para construir una comunidad segura." 
              : "ReadVC - Making Every Voice Call Visible. Clear rules to build a safe community."}
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
              <li><a href="#acceptable-use" className="hover:text-primary transition-colors">{isEs ? "Uso aceptable" : "Acceptable Use"}</a></li>
              <li><a href="#beta-status" className="hover:text-primary transition-colors">{isEs ? "Estado Beta y Riesgos" : "Beta Status & Risks"}</a></li>
              <li><a href="#liability" className="hover:text-primary transition-colors">{isEs ? "Limitación de responsabilidad" : "Limitation of Liability"}</a></li>
              <li><a href="#ip" className="hover:text-primary transition-colors">{isEs ? "Propiedad intelectual" : "Intellectual Property"}</a></li>
              <li><a href="#jurisdiction" className="hover:text-primary transition-colors">{isEs ? "Jurisdicción" : "Jurisdiction"}</a></li>
            </ul>
          </div>
        </aside>

        {/* Legal Text */}
        <div className="md:w-3/4 space-y-12">
          
          {/* Plain English Summary */}
          <div id="summary" className="p-6 md:p-8 rounded-3xl bg-secondary/50 border border-border shadow-sm relative overflow-hidden">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
              <BookOpen className="text-foreground w-5 h-5" />
              {isEs ? "Versión corta" : "Short version"}
            </h3>
            <p className="text-foreground/80 leading-relaxed font-medium">
              {isEs 
                ? "Estamos en fase de pruebas tempranas (Alpha/Beta). Esto significa que la app podría fallar, los textos podrían no ser 100% precisos y las cosas podrían cambiar sin previo aviso. Te pedimos no depender de ReadVC para emergencias críticas ni usar el servicio para hacer daño, spam o ingeniería inversa. Nosotros somos dueños del código y la marca, y nos regimos por las leyes de Chile."
                : "We are in early testing phases (Alpha/Beta). This means the app might crash, transcriptions might not be 100% accurate, and things might change without prior notice. Please do not rely on ReadVC for critical emergencies or use the service for harm, spam, or reverse engineering. We own the code and the brand, and we operate under the laws of Chile."}
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-loose">
            {isEs ? (
              <>
                <h2 id="acceptable-use" className="text-2xl font-bold text-foreground mt-10 mb-4">1. Uso aceptable de la plataforma</h2>
                <p>Al acceder a nuestro sitio web, registrarte en nuestra lista de espera o usar nuestras futuras aplicaciones, te comprometes a <strong>no</strong> realizar las siguientes acciones:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>Realizar ingeniería inversa (reverse engineering), descompilar o intentar extraer el código fuente de nuestros modelos de Edge AI o aplicación nativa.</li>
                  <li>Utilizar nuestros servicios para realizar llamadas de spam, acoso, fraude (phishing), o cualquier actividad ilegal.</li>
                  <li>Automatizar el uso de nuestra plataforma de manera masiva (bots/scraping) en formas que degraden nuestro servicio web.</li>
                </ul>
                <p>Nos reservamos el derecho de denegar el acceso o suspender futuras cuentas de aquellos usuarios que violen estas reglas básicas de convivencia.</p>

                <h2 id="beta-status" className="text-2xl font-bold text-foreground mt-10 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                  2. Estado del Servicio (Alpha / Beta)
                </h2>
                <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 mb-6">
                  <p className="m-0 font-medium text-foreground">El servicio de ReadVC es actualmente un producto en etapa experimental. Las características de la plataforma pueden cambiar, actualizarse o incluso eliminarse sin previo aviso. Debido a la naturaleza probabilística de la Inteligencia Artificial, las transcripciones pueden contener errores (alucinaciones) o faltas de precisión temporales.</p>
                </div>

                <h2 id="liability" className="text-2xl font-bold text-foreground mt-10 mb-4">3. Limitación de responsabilidad</h2>
                <p>Entiendes y aceptas que utilizas ReadVC <strong>bajo tu propio riesgo</strong>. ReadVC se proporciona "tal cual" (As is). Hasta el grado máximo permitido por la ley:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>ReadVC no se hace responsable por ninguna falla técnica, pérdida de llamadas, incomprensión de transcripciones o pérdida incidental que ocurra durante el uso del servicio.</li>
                  <li><strong>Llamadas de emergencia:</strong> ReadVC NO garantiza la precisión ni la estabilidad de su servicio durante llamadas críticas de vida o muerte (por ejemplo, llamadas a servicios de emergencia médica o policía). Se recomienda encarecidamente utilizar servicios certificados de telecomunicaciones para dichos fines.</li>
                </ul>

                <h2 id="ip" className="text-2xl font-bold text-foreground mt-10 mb-4">4. Propiedad intelectual</h2>
                <p>Todo el código, diseño gráfico, logotipo ("ReadVC"), el slogan ("Making Every Voice Call Visible"), textos de la web y algoritmos asociados son propiedad exclusiva de ReadVC.</p>
                <p>No se te otorga ninguna licencia para usar nuestros logotipos o marcas comerciales más allá del uso normal de nuestra aplicación como usuario final.</p>

                <h2 id="jurisdiction" className="text-2xl font-bold text-foreground mt-10 mb-4">5. Actualizaciones y Jurisdicción</h2>
                <p><strong>Cambios futuros:</strong> Podemos actualizar estos Términos periódicamente a medida que nuestro producto evoluciona. Continuar usando ReadVC después de los cambios implica que aceptas los nuevos términos.</p>
                <p><strong>Ley Aplicable:</strong> Estos términos y cualquier disputa relacionada con ReadVC se regirán exclusivamente por las leyes de la República de Chile, sometiéndose a la jurisdicción de los tribunales competentes de Santiago.</p>
              </>
            ) : (
              <>
                <h2 id="acceptable-use" className="text-2xl font-bold text-foreground mt-10 mb-4">1. Acceptable use of the platform</h2>
                <p>By accessing our website, joining our waitlist, or using our future applications, you agree <strong>not</strong> to do the following:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>Reverse engineer, decompile, or attempt to extract the source code of our Edge AI models or native application.</li>
                  <li>Use our services to make spam calls, harass, commit fraud (phishing), or engage in any illegal activity.</li>
                  <li>Automate the use of our platform massively (bots/scraping) in ways that degrade our web service.</li>
                </ul>
                <p>We reserve the right to deny access or suspend future accounts of users who violate these basic rules of coexistence.</p>

                <h2 id="beta-status" className="text-2xl font-bold text-foreground mt-10 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                  2. Status of the Service (Alpha / Beta)
                </h2>
                <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 mb-6">
                  <p className="m-0 font-medium text-foreground">The ReadVC service is currently an experimental stage product. Platform features may change, update, or even be removed without notice. Due to the probabilistic nature of Artificial Intelligence, transcriptions may contain errors (hallucinations) or temporary inaccuracies.</p>
                </div>

                <h2 id="liability" className="text-2xl font-bold text-foreground mt-10 mb-4">3. Limitation of Liability</h2>
                <p>You understand and agree that you use ReadVC <strong>at your own risk</strong>. ReadVC is provided "As is". To the maximum extent permitted by law:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>ReadVC is not responsible for any technical failure, dropped calls, misunderstood transcriptions, or incidental loss occurring during the use of the service.</li>
                  <li><strong>Emergency Calls:</strong> ReadVC does NOT guarantee the accuracy or stability of its service during critical life-or-death calls (e.g., calls to medical or police emergency services). It is highly recommended to use certified telecommunication services for such purposes.</li>
                </ul>

                <h2 id="ip" className="text-2xl font-bold text-foreground mt-10 mb-4">4. Intellectual property</h2>
                <p>All code, graphic design, logo ("ReadVC"), the slogan ("Making Every Voice Call Visible"), web texts, and associated algorithms are the exclusive property of ReadVC.</p>
                <p>No license is granted to use our logos or trademarks beyond the normal use of our application as an end-user.</p>

                <h2 id="jurisdiction" className="text-2xl font-bold text-foreground mt-10 mb-4">5. Updates and Jurisdiction</h2>
                <p><strong>Future changes:</strong> We may update these Terms periodically as our product evolves. Continuing to use ReadVC after changes implies you accept the new terms.</p>
                <p><strong>Applicable Law:</strong> These terms and any dispute related to ReadVC shall be governed exclusively by the laws of the Republic of Chile, submitting to the jurisdiction of the competent courts of Santiago.</p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
