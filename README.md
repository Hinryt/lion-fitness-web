# Lion Fitness

MVP responsive para el ecosistema Lion Fitness: sitio comercial, catálogo de equipamiento, portal de socios y administración demostrativa.

> Los precios, testimonios, perfiles, métricas, cupos y movimientos privados incluidos son datos de demostración. No representan actividad comercial real.

## Tecnologías

- Next.js 16 con App Router, React 19 y TypeScript estricto.
- Tailwind CSS 4 y design tokens propios.
- React Hook Form + Zod para validación cliente/servidor.
- Lucide React y Recharts.
- PWA con manifest, iconos y service worker básico offline.

## Instalación y ejecución

Requisitos: Node.js 20 o superior y npm.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000). Para validar producción:

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

Por ahora no se incluye una suite de tests. Lint, TypeScript y compilación siguen disponibles como comprobaciones del proyecto.

## Variables de entorno

Copiar `.env.example` a `.env.local`. Solo `NEXT_PUBLIC_SITE_URL` se utiliza en el MVP. Las demás variables documentan los adaptadores previstos y deben mantenerse vacías hasta conectar proveedores reales.

| Variable | Uso futuro |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical, sitemap y metadata |
| `DATABASE_URL` | PostgreSQL o proveedor compatible |
| `AUTH_SECRET` | Proveedor de autenticación |
| `MERCADO_PAGO_ACCESS_TOKEN` | Checkout de membresías |
| `WHATSAPP_ACCESS_TOKEN` | WhatsApp Business API |
| `MAPS_API_KEY` | Google Maps o Mapbox |
| `EMAIL_API_KEY` | Notificaciones transaccionales |

## Acceso demostrativo

Ingresar en `/ingresar` y elegir Socio o Administrador. Los campos muestran como referencia:

- Socio: `socio@demo.lion` / `liondemo`
- Admin: `admin@demo.lion` / `liondemo`

El MVP crea una cookie de sesión HTTP-only con el rol elegido y `src/proxy.ts` protege `/mi-cuenta` y `/admin`. No valida identidades reales; antes de producción se debe sustituir por un proveedor de autenticación y autorización persistente.

## Estructura

```text
src/
  app/                 Rutas, metadata, API y estados globales
  components/
    dashboard/         Portal de socio y administración
    explorers/         Filtros de sedes, horarios y catálogo
    forms/             Formularios y flujo de conversión
    layout/            Header, footer, navegación y PWA
    ui/                Primitivas visuales
  data/demo.ts         Fuente única de datos demostrativos
  lib/                 Esquemas, utilidades y adaptadores
  types/domain.ts      Entidades tipadas del dominio
public/
  images/              Recursos visuales reemplazables
  sw.js                Service worker offline básico
```

## Editar contenido

- Sedes, horarios, actividades, planes, profesores, productos, teléfono y enlaces: `src/data/demo.ts`.
- Colores y sistema visual: `src/app/globals.css`.
- Imágenes: los recursos seleccionados de los perfiles oficiales están en `public/images/instagram`; las asignaciones de sedes y productos viven en `src/data/demo.ts`.
- Logo: la interfaz usa la versión vectorizada `public/brand/lion-mark.svg`, derivada del isotipo de referencia en `public/brand/lion-mark.jpg`. Se renderiza desde `src/components/ui/logo.tsx` y en la marca de agua de la portada. Los iconos PWA viven en `public/icon*.svg`.

Las imágenes se sirven de forma local: la app no depende de Instagram en tiempo de ejecución. La procedencia pública y el mapeo de archivos están documentados en `IMAGE_SOURCES.md`.

## Integraciones reales

- **Base de datos:** reemplazar los arrays de `src/data/demo.ts` por repositorios que implementen las entidades de `src/types/domain.ts`. PostgreSQL + un ORM tipado es la ruta recomendada. Crear migraciones y un seed que replique los datos demo.
- **Autenticación:** proteger `/mi-cuenta` y `/admin` con sesiones server-side y control de roles.
- **Mercado Pago:** implementar `PaymentGateway` en `src/lib/services.ts`; nunca exponer el access token al cliente.
- **WhatsApp:** los enlaces `wa.me` ya funcionan con mensajes contextuales. Para mensajería automática, implementar `MessagingGateway` con Business API.
- **Consultas:** los formularios preparan mensajes para enviar desde WhatsApp. No confirman recepción ni guardan datos. `/api/leads` conserva su validador demostrativo para una futura integración de CRM/email.
- **Mapas:** las sedes usan enlaces configurables y no coordenadas inventadas. Agregar latitud/longitud verificadas antes de conectar el mapa.
- **Rutinas y reservas:** sustituir estados locales por servicios autenticados.
- **Control de acceso:** implementar `AccessControlGateway`; el QR actual es visual y está rotulado como demo.

## PWA y offline

El service worker se registra únicamente en producción. Solo cachea documentos públicos permitidos y recursos visuales seleccionados. Excluye rutas privadas, APIs, respuestas RSC y recursos externos. Ante una navegación pública sin conexión, muestra una página offline independiente si no existe una copia segura. Versionar `CACHE` en `public/sw.js` ante cambios.

## Pendiente antes de producción

- Autenticación real, permisos por rol y recuperación de cuenta.
- Persistencia, rate limiting distribuido, captcha y auditoría.
- Precios, horarios, textos institucionales y datos biográficos oficiales.
- Coordenadas verificadas, fichas técnicas, garantías y fotos reales por producto/sede.
- Checkout Mercado Pago, webhooks, comprobantes e impuestos.
- WhatsApp Business, email transaccional y consentimiento de marketing.
- QR firmado y conexión con molinetes/control de acceso.
- Analytics, monitoreo, política de privacidad, términos y pruebas E2E.

## Calidad

La aplicación incluye focus visible, labels, contraste alto, jerarquía semántica, estados vacíos/loading/error/éxito, soporte para `prefers-reduced-motion`, metadata, Open Graph, Twitter Cards, sitemap, robots y JSON-LD.
