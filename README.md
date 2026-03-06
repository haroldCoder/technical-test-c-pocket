<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Project Pocket AI - WhatsApp Assistant

Este es un asistente inteligente integrado con WhatsApp, diseñado para procesar mensajes de texto utilizando modelos de lenguaje avanzados.

## 🚀 Instrucciones para Levantar el Proyecto

### Requisitos Previos

- **Node.js** (v18 o superior)
- **npm** o **yarn**
- **PostgreSQL** (puedes usar una instancia local o en la nube como Supabase)
- Cuentas de API para:
  - OpenAI (opcional)
  - Google Gemini (opcional)
  - Twilio (para la integración de WhatsApp)

### Pasos de Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-repositorio>
    cd technical-test-c-pocket
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto basado en el siguiente ejemplo:
    ```env
    DATABASE_URL="postgresql://usuario:password@host:puerto/base_de_datos"
    OPENAI_API_KEY="tu_clave_de_openai"
    GEMINI_API_KEY="tu_clave_de_gemini"
    TWILIO_ACCOUNT_SID="tu_sid_de_twilio"
    TWILIO_AUTH_TOKEN="tu_token_de_twilio"
    TWILIO_SANDBOX_NUMBER="numero_de_sandbox_de_twilio"
    WHATSAPP_TOKEN=""
    WHATSAPP_PHONE_NUMBER_ID=""
    ```

4.  **Configurar la base de datos con Prisma:**
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    ```

### Ejecución

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

---

## 🏗️ Arquitectura y Decisiones Técnicas

El proyecto está construido siguiendo los principios de **Arquitectura Hexagonal (Puertos y Adaptadores)** para asegurar que el núcleo del negocio sea independiente de las tecnologías externas.

### Estructura de Capas

- **Domain (Dominio):** Contiene las entidades de negocio, interfaces de repositorios (puertos) y lógica central. Es el corazón del sistema y no tiene dependencias externas.
- **Application (Aplicación):** Orquestación de la lógica a través de Casos de Uso. Define qué puede hacer el sistema.
- **Infrastructure (Infraestructura):** Implementaciones concretas de los puertos (adaptadores). Aquí reside Prisma para la base de datos, los providers de IA (OpenAI/Gemini) y los servicios de mensajería (Twilio).
- **Presentation (Presentación):** Controladores de NestJS y Webhooks que exponen la funcionalidad al mundo exterior (WhatsApp).

### Decisiones Clave

1.  **NestJS:** Elegido por su robustez, sistema de módulos y soporte nativo para TypeScript, facilitando la escalabilidad.
2.  **Prisma ORM:** Permite un manejo de la base de datos seguro y con tipos fuertes, agilizando el desarrollo de modelos como `User`, `Message` y `ToolLog`.
3.  **Abstracción de IA:** Se implementó una interfaz `AIService` que permite intercambiar entre **OpenAI** y **Google Gemini** sin afectar el resto del sistema.
4.  **Integración con WhatsApp:** Se utiliza el webhook de Twilio/Meta para recibir mensajes en tiempo real, procesando tanto texto como transcripción de audio.
5.  **Trazabilidad:** Se incluyeron modelos de logging (`ToolLog`, `AIInteraction`) para monitorear el comportamiento de los modelos de IA y el uso de herramientas.
