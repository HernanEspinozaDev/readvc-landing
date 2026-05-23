# Guía de Despliegue en Vercel (readvc.app)

Esta guía contiene los pasos necesarios para subir la aplicación a GitHub, conectarla con Vercel, y configurar el dominio `readvc.app` y el correo de **Zoho Mail** utilizando **Cloudflare** como administrador de DNS.

---

## 1. Subir tu proyecto a GitHub

Dado que ya cuentas con **Git** instalado y tu identidad configurada en la consola, puedes usar estos comandos en la terminal de tu proyecto (`C:\Users\herna\Documents\ReadVC\readvc-landing`):

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

## 2. Importar el proyecto en Vercel

1. Ve a [Vercel](https://vercel.com/) e inicia sesión con tu cuenta de **GitHub**.
2. En tu panel principal, haz clic en **Add New...** -> **Project**.
3. Busca tu repositorio `readvc-landing` y haz clic en **Import**.
4. En la configuración:
   * **Framework Preset:** Detectará automáticamente **Next.js**.
   * **Root Directory:** Déjalo por defecto.
5. Haz clic en **Deploy**. Al terminar, obtendrás un enlace gratuito de Vercel (ej: `readvc-landing.vercel.app`).

---

## 3. Configurar tu dominio en Vercel y Cloudflare

Dado que has migrado los servidores de nombres de **Namecheap** a **Cloudflare**, ahora todas tus configuraciones DNS se realizan desde el panel de Cloudflare.

### A. Agregar el dominio en Vercel
1. En tu proyecto de Vercel, ve a **Settings** -> **Domains**.
2. Agrega tu dominio `readvc.app`.
3. Vercel te recomendará agregar también la versión con `www` (`www.readvc.app`) y crear una redirección automática. Elige esta opción y haz clic en **Add**.
4. Verás las advertencias de **Invalid Configuration**. Vercel te mostrará los registros que necesitas copiar a Cloudflare.

### B. Configurar los registros DNS en Cloudflare
1. Inicia sesión en [Cloudflare](https://dash.cloudflare.com/) y selecciona tu sitio `readvc.app`.
2. En la barra lateral, haz clic en **DNS** -> **Records** (Registros).
3. Agrega los siguientes dos registros:

#### 1. Registro para el dominio principal (`readvc.app`):
* **Type:** `A`
* **Name:** `@` (o `readvc.app`)
* **IPv4 address:** `76.76.21.21` (La IP oficial de Vercel)
* **Proxy status:** **DNS Only** (Nube gris) ⚠️ *Ver nota abajo*
* **TTL:** Auto

#### 2. Registro para el subdominio (`www.readvc.app`):
* **Type:** `CNAME`
* **Name:** `www`
* **Target:** `cname.vercel-dns.com`
* **Proxy status:** **DNS Only** (Nube gris) ⚠️ *Ver nota abajo*
* **TTL:** Auto

> [!WARNING]
> **¿Quieres usar el Proxy de Cloudflare (Nube Naranja)?**
> Por defecto, se recomienda usar **DNS Only** (Nube gris) porque Vercel ya cuenta con su propio CDN mundial y protección DDoS rápida. 
> Si decides activar el Proxy de Cloudflare (Nube Naranja), **DEBES** ir en Cloudflare a **SSL/TLS** -> **Overview** y cambiar el modo de cifrado a **Full** o **Full (strict)**. Si lo dejas en "Flexible", tu página entrará en un bucle infinito de redirecciones y dará error de carga.

---

## 4. Configurar Zoho Mail en Cloudflare

Para poder tener correos profesionales como `contacto@readvc.app`, necesitamos agregar los registros de Zoho Mail en tu panel DNS de Cloudflare.

### Paso A: Verificación de Dominio (TXT)
Cuando te registres en Zoho Mail, te pedirán verificar que el dominio es tuyo. Te darán un registro TXT que debes agregar en Cloudflare:
1. En Cloudflare, haz clic en **Add Record**.
2. Configúralo así:
   * **Type:** `TXT`
   * **Name:** `@`
   * **Content:** *(Pega el código de verificación que te da Zoho, suele empezar con `zoho-verification=` o similar)*
   * **TTL:** Auto

### Paso B: Servidores de Correo (MX Records)
Para que los correos que te envíen lleguen a Zoho, debes añadir estos **3 registros MX**.
*(Agrega los correspondientes a tu región, comúnmente son los de EE.UU.):*

#### Si tu cuenta de Zoho es de EE.UU. (Standard):
1. **MX Record 1:**
   * **Type:** `MX` | **Name:** `@` | **Mail server:** `mx.zoho.com` | **Priority:** `10`
2. **MX Record 2:**
   * **Type:** `MX` | **Name:** `@` | **Mail server:** `mx2.zoho.com` | **Priority:** `20`
3. **MX Record 3:**
   * **Type:** `MX` | **Name:** `@` | **Mail server:** `mx3.zoho.com` | **Priority:** `50`

#### Si tu cuenta de Zoho es de Europa (EU):
1. **MX Record 1:**
   * **Type:** `MX` | **Name:** `@` | **Mail server:** `mx.zoho.eu` | **Priority:** `10`
2. **MX Record 2:**
   * **Type:** `MX` | **Name:** `@` | **Mail server:** `mx2.zoho.eu` | **Priority:** `20`
3. **MX Record 3:**
   * **Type:** `MX` | **Name:** `@` | **Mail server:** `mx3.zoho.eu` | **Priority:** `50`

### Paso C: Seguridad para evitar SPAM y Suplantación (SPF y DKIM)
Estos registros son sumamente importantes para que tus correos no terminen en la bandeja de SPAM de tus clientes (como Gmail o Outlook).

#### 1. Registro SPF (TXT):
* **Type:** `TXT`
* **Name:** `@`
* **Content:** `v=spf1 include:zoho.com ~all` *(si tu cuenta es de Europa, usa `include:zoho.eu`)*
* **TTL:** Auto

#### 2. Registro DKIM (TXT):
En tu panel de administración de Zoho Mail, ve a **DKIM** y genera una clave. Te dará un "Selector" (usualmente `txt._domainkey` o `zoho._domainkey`) y un texto largo de clave pública.
* **Type:** `TXT`
* **Name:** `txt._domainkey` *(o el selector que te asigne Zoho)*
* **Content:** *(Pega la clave pública extremadamente larga que te genere Zoho)*
* **TTL:** Auto

---

## 5. Verificación Final
Una vez agregados todos los registros en Cloudflare, dale unos minutos.
* **Vercel:** Cambiará a verde (**Active**) y tu landing estará disponible bajo cifrado seguro SSL.
* **Zoho Mail:** Haz clic en **Verify** en su consola de configuración para activar el flujo de correos entrantes y salientes.
