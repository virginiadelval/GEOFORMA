# GEO|FORMA — Landing Page de Formación Profesional en Tecnologías Geoespaciales & SIG

Esta carpeta contiene la implementación completa, totalmente responsiva y de alto impacto visual para la Landing Page de **GEO|FORMA (GeoSpatial Academy)** dictada por la consultora **Virginia del Val**.

---

## 🎨 Guía de Diseño & Estética Aplicada

- **Estilo Visual:** Editorial minimalista, ejecutivo, corporativo de alta gama, limpio y estructurado.
- **Fondo General:** Blanco Perla (`#F8FAFC`) con micro-patrones vectoriales cartográficos de fondo (malla de coordenadas y curvas de nivel en opacidad baja < 5%).
- **Títulos & Texto Principal:** Gris Pizarra Oscuro (`#0F172A` / `#1E293B`).
- **Estructura & Texto Secundario:** Azul Acero Suave (`#334155` / `#475569`) y Gris Frío (`#E2E8F0`).
- **Color de Acentuación / CTA Principal:** Terracota Sobrio (`#C2410C` / `#9A3412` en hover) para máxima elegancia ejecutiva.
- **Tipografía:** Sans-serif geométrica (Inter + Plus Jakarta Sans) con jerarquía editorial de mayúsculas espaciadas en kickers y subtítulos (`[ FORMACIÓN TÉCNICA AVANZADA EN TECNOLOGÍAS GEOESPACIALES ]`).
- **Componentes:** Tarjetas flotantes con superficie blanca pura (`#FFFFFF`), bordes sutiles de 1px en gris (`border-slate-200`) y sombras suaves (`shadow-sm` a `shadow-md`).

---

## 🏛️ Secciones de la Landing Page

1. **Header / Navegación:** Logo `GEO|FORMA`, menú de enlaces fluidos y botón CTA *"Ver Catálogo"*.
2. **Hero Section (Alto Impacto):**
   - Kicker: `[ FORMACIÓN TÉCNICA AVANZADA EN TECNOLOGÍAS GEOESPACIALES ]`
   - H1: *"Domina el Territorio a través del Análisis de Datos, la Nube y la Inteligencia Artificial."*
   - Visor UI minimalista en vivo con **Leaflet.js** sobre mapa oscuro, conmutador de capas (*Satélite RGB*, *Vectores Topo*, *Índice NDVI*) y métricas HUD flotantes.
3. **Métricas / Social Proof:** Banner ejecutivo (+1,200 graduados, 98% satisfacción, 5 programas de élite, +45 empresas).
4. **Catálogo de Cursos (Grid Flotante de 5 Tarjetas Especializadas):**
   - QGIS Inicial a Avanzado (`FUNDAMENTAL`)
   - Cloud GIS – GIS en la Nube (`INFRAESTRUCTURA & CLOUD`)
   - Google Earth Engine (`BIG DATA SPATIAL`)
   - GIS + IA (Inteligencia Artificial Geoespacial) (`INNOVACIÓN & MACHINE LEARNING` - *MÁS DEMANDADO*)
   - Web Mapping & GeoServicios (`DESARROLLO WEB`)
5. **Diferenciadores ("Por qué Elegir Nuestra Formación"):** Casos de estudio reales, entorno tecnológico actualizado y atención/comunidad exclusiva.
6. **Ecosistema Tecnológico Matrix:** QGIS, PostGIS, GEE, Leaflet, Mapbox, CARTO, GeoServer, Python, PyTorch/ONNX, Agentes Geo-MCP.
7. **Trayectoria & Respaldo Profesional (Instructora):** Perfil de **Virginia del Val** ([virginiadelval.github.io/sitio](https://virginiadelval.github.io/sitio/)), consultora especializada en SIG, Teledetección, Web Mapping e IDE.
8. **Inversión Académica Multimoneda:** Selector interactivo de divisas (USD, EUR, ARS, MXN, COP, CLP, PEN), opción de **3 cuotas sin interés**, sello de **15 días de garantía incondicional** y checkout modal (Stripe, PayPal, Hotmart, Mercado Pago).
9. **FAQ Accordion & Footer.**

---

## 🚀 Archivos Incluidos

- `index.html`: Versión autónoma principal lista para abrir en cualquier navegador.
- `components/LandingPage.jsx`: Componente React para integración en Next.js / Vite.
- `README.md`: Guía y documentación del proyecto.
