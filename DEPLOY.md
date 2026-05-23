# Guía de Despliegue en Vercel (readvc.app)

Esta guía contiene los pasos necesarios para subir la aplicación a GitHub y conectarla con Vercel utilizando tu dominio personalizado de Namecheap `readvc.app`.

---

## 1. Subir tu proyecto a GitHub (El método fácil sin consola)

Dado que no es estrictamente necesario usar la consola de comandos de Git, puedes usar **GitHub Desktop** para subir todo de manera visual y segura.

1. **Crea un repositorio vacío en GitHub:**
   * Ve a [GitHub](https://github.com/) e inicia sesión.
   * Haz clic en el botón **New** (Nuevo repositorio) en tu panel.
   * Escribe el nombre para tu repositorio (por ejemplo, `readvc-landing`).
   * Configúralo como **Private** (Privado) o **Public** (Público), según prefieras.
   * **IMPORTANTE:** Déjalo completamente vacío. **No** marques las opciones de agregar un archivo README, `.gitignore` o licencia, ya que tu proyecto local ya los incluye.
   * Haz clic en **Create repository**.

2. **Sube el proyecto usando GitHub Desktop:**
   * Descarga e instala **[GitHub Desktop](https://desktop.github.com/)** si aún no lo tienes.
   * Abre la aplicación e inicia sesión con tu cuenta de GitHub.
   * En el menú superior, ve a **File** -> **Add Local Repository...** (o pulsa `Ctrl + O`).
   * Selecciona la carpeta local de tu proyecto: `C:\Users\herna\Documents\ReadVC\readvc-landing`.
   * La aplicación te indicará que no parece ser un repositorio Git y te sugerirá crearlo. Haz clic en el enlace azul **"create a repository here"**.
   * Confirma la ruta y los datos, y presiona **Create Repository**.
   * En la columna izquierda verás la lista de archivos que se van a subir. En la parte inferior izquierda escribe un título para el commit (ej. *Despliegue inicial*) y haz clic en el botón azul **Commit to main**.
   * Finalmente, en la barra superior haz clic en **Publish repository** para subir todo a GitHub.

---

## 2. Importar el proyecto en Vercel

1. Ve a [Vercel](https://vercel.com/) y regístrate o inicia sesión con tu cuenta de **GitHub**.
2. En tu panel principal de Vercel, haz clic en **Add New...** -> **Project**.
3. En la lista de repositorios, busca el repositorio que acabas de publicar (`readvc-landing`) y haz clic en **Import**.
4. En la configuración del proyecto:
   * **Framework Preset:** Vercel detectará de manera automática que es un proyecto **Next.js** y configurará los comandos de construcción correctos.
   * **Root Directory:** Déjalo por defecto.
   * **Environment Variables:** Si en el futuro agregas variables de entorno (claves de API, variables en `.env`), puedes configurarlas aquí. Por ahora puedes omitirlo si no tienes.
5. Haz clic en **Deploy**.
6. En aproximadamente un minuto la aplicación estará compilada y en línea con un enlace gratuito de Vercel (ej. `readvc-landing.vercel.app`).

---

## 3. Configurar tu dominio personalizado `readvc.app` (Namecheap)

Una vez que tu aplicación esté publicada en Vercel, vincula tu propio dominio.

### A. Agregar el dominio en Vercel
1. Dentro del panel de tu proyecto en Vercel, dirígete a **Settings** (Configuración en la barra superior) -> **Domains** (Dominios en la barra lateral izquierda).
2. Escribe tu dominio `readvc.app` en el campo de texto y haz clic en **Add**.
3. Vercel te recomendará agregar también la versión con `www` (`www.readvc.app`) y crear una redirección automática para que ambas funcionen. Elige la opción recomendada y presiona **Add**.
4. Verás que los dominios aparecen con una etiqueta roja que dice **Invalid Configuration**. Esto es normal, ahora configuraremos los DNS.

### B. Configurar los DNS en Namecheap (Elige una sola opción)

#### Opción 1: Cambiar los Nameservers (La más fácil y recomendada)
*Usa esta opción si no utilizas este dominio para correos electrónicos u otros servicios externos vinculados a tu dominio.*

1. Inicia sesión en [Namecheap](https://www.namecheap.com/).
2. Ve a tu **Dashboard** -> **Domain List** y haz clic en el botón **Manage** a la derecha de tu dominio `readvc.app`.
3. En la pestaña *Domain*, busca la sección **Nameservers**.
4. Cambia la opción *Namecheap BasicDNS* por **Custom DNS**.
5. Copia los servidores de nombres que te da Vercel en su panel (ej: `ns1.vercel-dns.com` y `ns2.vercel-dns.com`) y pégalos en las líneas correspondientes de Namecheap.
6. Haz clic en el **check verde** a la derecha para guardar.

#### Opción 2: Usar registros A y CNAME (Si ya usas el dominio para correos)
*Usa esta opción si tienes correos activos (como Google Workspace) u otros registros que no quieras alterar.*

1. En Namecheap, ve a **Domain List** -> **Manage** -> pestaña **Advanced DNS**.
2. Agrega un **A Record**:
   * **Host:** `@`
   * **Value:** `76.76.21.21` (IP oficial de Vercel)
   * **TTL:** Automatic (o 30 min)
3. Agrega un **CNAME Record**:
   * **Host:** `www`
   * **Value:** `cname.vercel-dns.com.`
   * **TTL:** Automatic (o 30 min)
4. **IMPORTANTE:** Si hay otros registros de tipo `A` o `CNAME` apuntando a servidores antiguos, elimínalos para evitar interferencias.

---

## 4. Verificación y Propagación
* La propagación de DNS suele ser casi inmediata, pero puede tardar desde unos minutos hasta 24 horas dependiendo de los servidores mundiales.
* Una vez que Vercel detecte los DNS correctos, la etiqueta cambiará a color verde (**Active**), configurará el certificado SSL gratuito (HTTPS) y tu web `https://readvc.app` estará 100% activa en internet.
