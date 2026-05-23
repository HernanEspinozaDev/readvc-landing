# Guía de Despliegue en Cloudflare Pages (readvc.app)

Esta guía contiene los pasos necesarios para subir la aplicación a GitHub, conectarla con Cloudflare Pages, y configurar el dominio `readvc.app` y el correo de **Zoho Mail** utilizando **Cloudflare** como administrador de DNS y hosting.

---

## 1. Subir tu proyecto a GitHub

Puedes usar estos comandos en la terminal de tu proyecto (`C:\Users\herna\Documents\ReadVC\readvc-landing`):

```bash
# 1. Inicializa el repositorio local de Git
git init

# 2. Agrega todos los archivos al área de preparación
git add .

# 3. Registra tu primer commit
git commit -m "first commit"

# 4. Renombra la rama por defecto a 'main'
git branch -M main

# 5. Enlaza tu carpeta local con tu repositorio de GitHub
git remote add origin https://github.com/HernanEspinozaDev/readvc-landing.git

# 6. Sube todo a GitHub (te pedirá autorizar en el navegador la primera vez)
git push -u origin main
```

---

## 2. Configurar la compilación en Cloudflare Pages

1. Inicia sesión en tu panel de [Cloudflare](https://dash.cloudflare.com/).
2. En el menú lateral izquierdo, haz clic en **Workers & Pages**.
3. Haz clic en el botón azul **Create** (Crear) -> selecciona la pestaña **Pages** -> haz clic en el botón **Connect to Git** (Conectar a Git).
4. Selecciona tu cuenta de GitHub, autoriza la conexión y selecciona tu repositorio **`readvc-landing`**. Luego haz clic en **Begin setup**.
5. Configura estos campos:
   * **Project name:** `readvc-landing` (o el que gustes).
   * **Framework preset:** Selecciona **Next.js** en el menú desplegable.
   * **Build command:** Escribe **`npx @cloudflare/next-on-pages`** *(Este es el compilador moderno oficial de Cloudflare para Next.js)*.
   * **Build output directory:** Escribe **`.vercel/output`** *(Esta es la carpeta de salida estándar que requiere Cloudflare)*.
   * **Root directory:** Déjalo vacío o en `/`.
6. En la misma pantalla, despliega la pestaña de abajo llamada **Environment variables (advanced)** y agrega tu variable de entorno:
   * **Variable name:** `RESEND_API_KEY`
   * **Value:** `re_4G6sNRvG_LWtTMVwiBsqJ5atNCX4Ha1mz`
7. Haz clic en el botón azul **Save and Deploy** (Guardar y Desplegar).

---

## 3. Vincular tu dominio `readvc.app` (¡Automático!)

Como tu dominio ya está en Cloudflare, enlazarlo a tu web en Pages es instantáneo y se autoconfigura solo:

1. En el panel de tu proyecto de Cloudflare Pages, ve a la pestaña superior **Custom Domains** (Dominios personalizados).
2. Haz clic en **Set up a custom domain** (Configurar un dominio personalizado).
3. Escribe tu dominio principal: `readvc.app` y haz clic en continuar.
4. Pulsa el botón **Activate / Add record** (Activar/Añadir registro) para que Cloudflare reescriba los registros DNS y emita el certificado SSL automáticamente.
5. Repite el proceso para **`www.readvc.app`**.

---

## 4. Configurar Zoho Mail en Cloudflare

Para poder tener correos profesionales como `contacto@readvc.app`, agregamos los registros de Zoho Mail en tu panel DNS de Cloudflare.

### Paso A: Verificación de Dominio (TXT)
Cuando te registres en Zoho Mail, te pedirán verificar que el dominio es tuyo. Te darán un registro TXT que debes agregar en Cloudflare:
1. En Cloudflare, haz clic en **Add Record** (DNS -> Records).
2. Configúralo así:
   * **Type:** `TXT` | **Name:** `@` | **Content:** *(Pega el código de verificación que te da Zoho, suele empezar con `zoho-verification=`)*

### Paso B: Servidores de Correo (MX Records)
Añade estos **3 registros MX** para la recepción de correos:
1. **MX Record 1:**
   * **Type:** `MX` | **Name:** `@` | **Mail server:** `mx.zoho.com` | **Priority:** `10`
2. **MX Record 2:**
   * **Type:** `MX` | **Name:** `@` | **Mail server:** `mx2.zoho.com` | **Priority:** `20`
3. **MX Record 3:**
   * **Type:** `MX` | **Name:** `@` | **Mail server:** `mx3.zoho.com` | **Priority:** `50`

### Paso C: Seguridad para evitar SPAM y Suplantación (SPF y DKIM)
Para que tus correos no terminen en la bandeja de SPAM de tus clientes:

#### 1. Registro SPF (TXT):
* **Type:** `TXT` | **Name:** `@` | **Content:** `v=spf1 include:zoho.com ~all`

#### 2. Registro DKIM (TXT):
En tu panel de administración de Zoho Mail, ve a **DKIM** y genera una clave. Te dará un "Selector" (usualmente `txt._domainkey` o `zoho._domainkey`) y un texto largo de clave pública.
* **Type:** `TXT` | **Name:** `txt._domainkey` *(o el selector que te asigne Zoho)* | **Content:** *(Pega la clave pública larga que te genere Zoho)*
