// ==========================================
// MÓDULO INDEPENDIENTE DE CURSOS (GEO|FORMA)
// ==========================================

// 1. FUENTE ÚNICA DE VERDAD DE LOS CURSOS (7 PROGRAMAS OFICIALES)
const coursesData = {
  1: {
    id: 1,
    title: "QGIS Inicial",
    category: "qgis",
    filterCategory: "fundamental",
    badge: "FUNDAMENTAL",
    badgeClass: "bg-slate-100 text-slate-800 text-[11px] font-bold px-3 py-1 rounded-md border border-slate-300 tracking-wider",
    hours: "4 Semanas — 60 Horas",
    shortDesc: "Fundamentos sólidos de SIG de escritorio. Aprende a gestionar datos vectoriales, sistemas de coordenadas, simbología y composición cartográfica.",
    checklist: [
      "Modelos de datos vectoriales, capas y sistemas de referencia (EPSG/WGS84)",
      "Geoprocesamiento esencial: intersecciones, buffers y uniones espaciales",
      "Composición cartográfica y diseño de mapas de salida ejecutivos"
    ],
    tools: ["QGIS 3.3x", "GeoPackage", "QuickOSM", "PostGIS Base"],
    summary: "Aprende desde cero el software SIG libre más potente del mundo. Domina la carga y manipulación de datos espaciales, proyecciones geográficas, edición vectorial, consultas por atributos y la elaboración de mapas profesionales con estándares cartográficos.",
    syllabus: [
      "Módulo 1: Fundamentos de Geomática, Modelos de Datos & Sistemas de Coordenadas (EPSG/WGS84)",
      "Módulo 2: Adquisición, Carga y Limpieza de Datos Vectoriales & Gestión de Tablas de Atributos",
      "Módulo 3: Simbología Temática Avanzada, Etiquetado Inteligente y Reglas de Representación",
      "Módulo 4: Operaciones Esenciales de Geoprocesamiento y Análisis Espacial Básico",
      "Módulo 5: Creación, Composición y Exportación de Mapas de Salida Ejecutivos en Alta Resolución"
    ]
  },
  2: {
    id: 2,
    title: "QGIS Avanzado",
    category: "qgis",
    filterCategory: "fundamental",
    badge: "ANÁLISIS AVANZADO",
    badgeClass: "bg-slate-800 text-white text-[11px] font-bold px-3 py-1 rounded-md tracking-wider",
    hours: "5 Semanas — 100 Horas",
    shortDesc: "Modelado espacial avanzado, automatización con Graphic Modeler, álgebra ráster multicriterio, análisis DEM y generación masiva de mapas con Atlas.",
    checklist: [
      "Automatización de flujos con el Modelador Gráfico de QGIS",
      "Álgebra ráster multicriterio, análisis morfométrico e hidrológico de DEMs",
      "Composición automatizada de series cartográficas mediante Atlas"
    ],
    tools: ["QGIS 3.3x", "GRASS GIS", "SAGA", "GDAL/OGR", "PostGIS"],
    summary: "Lleva tu dominio de QGIS al nivel experto. Automatiza tareas repetitivas mediante modelos gráficos, procesa modelos digitales de terreno para estudios hidrológicos y topográficos, y conecta QGIS con bases de datos espaciales relacionales.",
    syllabus: [
      "Módulo 1: Automatización de Flujos Complejos con el Modelador Gráfico de QGIS (Graphic Modeler)",
      "Módulo 2: Álgebra Ráster Avanzada y Evaluación Espacial Multicriterio (AHP/Saaty)",
      "Módulo 3: Análisis Morfométrico e Hidrológico con Modelos Digitales de Terreno (MDT/DEM)",
      "Módulo 4: Creación de Bases de Datos Espaciales con PostGIS y Consultas SQL Espaciales",
      "Módulo 5: Generación Automatizada de Series Cartográficas Masivas con Atlas y Reportes"
    ]
  },
  3: {
    id: 3,
    title: "Plataformas WEB - CARTO",
    category: "cloud",
    filterCategory: "cloud",
    badge: "INFRAESTRUCTURA & CLOUD",
    badgeClass: "bg-slate-700 text-white text-[11px] font-bold px-3 py-1 rounded-md tracking-wider",
    hours: "4 Semanas — 60 Horas",
    shortDesc: "Despliegue de dashboards espaciales interactivos, visualización de grandes volúmenes de datos en la nube y analítica espacial ejecutiva.",
    checklist: [
      "Creación de Dashboards interactivos para toma de decisiones ejecutivas",
      "Visualización de datos masivos y mapas temáticos avanzados en CARTO",
      "Publicación e integración de vistas dinámicas para usuarios corporativos"
    ],
    tools: ["CARTO", "Mapbox Studio", "ArcGIS Online", "Cloud DW"],
    summary: "Arquitectura moderna de visualización espacial en la nube. Aprende a crear tableros de control interactivos con CARTO, publicar mapas temáticos con filtros en tiempo real y presentar resultados analíticos a equipos de toma de decisiones.",
    syllabus: [
      "Módulo 1: Fundamentos de Cloud GIS y Arquitectura de Datos Espaciales en la Nube",
      "Módulo 2: Carga, Optimización y Enriquecimiento de Datasets en la Plataforma CARTO",
      "Módulo 3: Creación de Dashboards Interactivos, Widgets Dinámicos y Filtros Espaciales",
      "Módulo 4: Estilizado Cartográfico Web Personalizado e Integración con Mapbox Studio",
      "Módulo 5: Publicación Segura, Gobernanza de Datos y Presentación Corporativa"
    ]
  },
  4: {
    id: 4,
    title: "Google Earth Engine (GEE)",
    category: "gee",
    filterCategory: "advanced",
    badge: "BIG DATA SPATIAL",
    badgeClass: "bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-md tracking-wider",
    hours: "4 Semanas — 60 Horas",
    shortDesc: "Procesamiento y análisis masivo de imágenes satelitales a escala planetaria mediante JavaScript y Python sin saturar tu equipo local.",
    checklist: [
      "Colecciones multitemporales de imágenes satelitales (Sentinel-2, Landsat)",
      "Cálculo masivo de índices espectrales (NDVI, NDWI, EVI, NBR)",
      "Clasificación supervisada de uso del suelo y monitoreo ambiental"
    ],
    tools: ["Earth Engine", "JavaScript", "Python API", "Geemap"],
    summary: "Procesamiento masivo de imágenes de observación terrestre a escala planetaria. Utiliza la potencia del clúster de Google para analizar décadas de imágenes de satélite en segundos mediante código JavaScript y Python.",
    syllabus: [
      "Módulo 1: Introducción a la Plataforma Google Earth Engine & Code Editor JavaScript",
      "Módulo 2: Manejo y Filtrado Masivo de ImageCollections (Sentinel-2, Landsat 8/9, MODIS)",
      "Módulo 3: Series Temporales & Cálculo Automatizado de Índices Espectrales (NDVI, NDWI)",
      "Módulo 4: Clasificación Supervisada de Uso y Cobertura del Suelo (Random Forest / SVM)",
      "Módulo 5: Exportación de Productos Ráster y Automatización Avanzada con Python & Geemap"
    ]
  },
  5: {
    id: 5,
    title: "GIS + IA (Inteligencia Artificial Geoespacial)",
    category: "ia",
    filterCategory: "advanced",
    badge: "INNOVACIÓN & MACHINE LEARNING",
    badgeClass: "bg-terracotta text-white text-[11px] font-bold px-3 py-1 rounded-md tracking-wider",
    hours: "4 Semanas — 80 Horas",
    isFeatured: true,
    shortDesc: "Machine Learning y Deep Learning aplicado al territorio: detección de objetos en imágenes satelitales/drones, predicción de coberturas y agentes de IA.",
    checklist: [
      "Detección de objetos en imágenes de alta resolución (Drones/Satélite)",
      "Clasificación de coberturas mediante Random Forest y Redes Neuronales",
      "Uso de Agentes de IA con protocolo MCP en workflows SIG"
    ],
    tools: ["PyTorch", "ONNX", "Deepness QGIS", "Geo-MCP", "Scikit-Learn"],
    summary: "Integra la vanguardia de la inteligencia artificial en tus análisis espaciales. Aprende a entrenar modelos de visión por computadora para detectar infraestructuras o vegetación en ortofotos y automatiza procesos cartográficos completos con agentes de IA.",
    syllabus: [
      "Módulo 1: Fundamentos de Machine Learning Geoespacial con Scikit-Learn",
      "Módulo 2: Segmentación y Detección de Objetos en Ortofotos con Deepness / ONNX",
      "Módulo 3: Modelos de Clasificación de Cobertura con Redes Neuronales (PyTorch)",
      "Módulo 4: Integración de Modelos IA dentro del entorno QGIS & Scripts Python",
      "Módulo 5: Creación y Despliegue de Agentes de IA con protocolo MCP para tareas Geoespaciales"
    ]
  },
  6: {
    id: 6,
    title: "Web Mapping & GeoServicios",
    category: "webmapping",
    filterCategory: "cloud",
    badge: "DESARROLLO WEB",
    badgeClass: "bg-slate-700 text-white text-[11px] font-bold px-3 py-1 rounded-md tracking-wider",
    hours: "5 Semanas — 100 Horas",
    shortDesc: "Publicación e integración de servicios OGC (WMS/WFS), bases de datos PostGIS, GeoServer y desarrollo de visores web personalizados con Leaflet y Mapbox GL.",
    checklist: [
      "Servicios OGC estándar (WMS, WFS, WMTS) con GeoServer",
      "Bases de datos espaciales PostGIS & consultas SQL avanzadas",
      "Desarrollo de visores web a medida con Leaflet & Mapbox GL JS"
    ],
    tools: ["PostGIS", "GeoServer", "Leaflet", "Mapbox GL JS", "OpenLayers"],
    summary: "Aprende a publicar tus datos cartográficos en la web construyendo visores de mapas personalizados de alta velocidad con Leaflet, Mapbox GL JS, GeoServer y bases de datos espaciales PostGIS.",
    syllabus: [
      "Módulo 1: Configuración de Servidores de Mapas GeoServer & PostGIS Spatial",
      "Módulo 2: Publicación de Servicios Estándar OGC (WMS, WFS, WMTS)",
      "Módulo 3: Desarrollo Frontend de Visores Interactivos con Leaflet JS & HTML5",
      "Módulo 4: Estilizado Avanzado y Representación Vectorial con Mapbox GL JS",
      "Módulo 5: Despliegue Final en Servidores Web (Vercel / Cloudflare)"
    ]
  },
  7: {
    id: 7,
    title: "Fotogrametría con Drones – Inicial",
    category: "drones",
    filterCategory: "fundamental",
    badge: "FOTOGRAMETRÍA & DRONES",
    badgeClass: "bg-slate-800 text-white text-[11px] font-bold px-3 py-1 rounded-md tracking-wider",
    hours: "4 Semanas — 60 Horas",
    shortDesc: "Planificación de vuelos autónomos, procesamiento fotogramétrico digital, obtención de nubes de puntos 3D, ortomosaicos y modelos de elevación para SIG.",
    checklist: [
      "Planificación y cálculo de parámetros de vuelo (GSD, altura, solapes)",
      "Procesamiento de imágenes: ortomosaicos y nubes de puntos 3D densas",
      "Generación de MDS, MDT, curvas de nivel y cálculo de volúmenes en QGIS"
    ],
    tools: ["Agisoft Metashape", "WebODM", "Mission Planner", "QGIS 3.3x"],
    summary: "Capacitación práctica integral en fotogrametría aérea con drones. Aprende desde la planificación de la misión y colocación de puntos de control (GCP) con GNSS, hasta el procesamiento fotogramétrico para obtener ortofotos de máxima resolución, modelos de superficie y cálculos volumétricos.",
    syllabus: [
      "Módulo 1: Principios de Fotogrametría Aérea, Sensores RGB y Planificación de Misiones de Vuelo (GSD y Solapes)",
      "Módulo 2: Georreferenciación de Precisión, Puntos de Control Terrestre (GCPs) y Puntos de Chequeo",
      "Módulo 3: Flujo de Procesamiento Fotogramétrico: Alineación, Nube de Puntos Densa y Malla Poligonal 3D",
      "Módulo 4: Generación de Ortomosaicos de Alta Definición, Modelo Digital de Superficie (MDS) y Terreno (MDT)",
      "Módulo 5: Integración en QGIS: Curvas de Nivel, Perfiles Topográficos y Cálculo de Volúmenes de Movimiento de Suelo"
    ]
  }
};

// Exportar globalmente para que otros módulos puedan consumirlo
window.coursesData = coursesData;

// ==========================================
// 2. RENDERIZADO DINÁMICO DE TARJETAS (ESTILO ORIGINAL index_old.html)
// ==========================================
function renderCourseCards() {
  const container = document.getElementById('courses-container');
  if (!container) return;

  container.innerHTML = Object.values(coursesData).map(course => {
    const isFeatured = !!course.isFeatured;

    // Marcado de herramientas según sea tarjeta destacada o estándar
    const toolsMarkup = course.tools ? course.tools.map(tool => {
      if (isFeatured) {
        return `<span class="bg-orange-50 text-terracotta text-[10px] font-semibold px-2.5 py-1 rounded border border-terracotta/20">${tool}</span>`;
      }
      return `<span class="bg-slate-50 text-slate-600 text-[10px] font-medium px-2.5 py-1 rounded border border-slate-200">${tool}</span>`;
    }).join('') : '';

    // Marcado del checklist (3 viñetas con íconos check en verde esmeralda)
    const checklistMarkup = course.checklist ? course.checklist.map(item => `
      <div class="flex items-start gap-2.5 text-xs text-slate-700">
        <i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
        <span>${item}</span>
      </div>
    `).join('') : '';

    // Estilos de tarjeta: Curso 5 destacado (border terracota y sombra mayor) vs estándar
    const cardBorderShadow = isFeatured
      ? "border border-terracotta/40 shadow-md hover:shadow-lg"
      : "border border-slate-200 shadow-sm hover:shadow-md";

    // Cinta superior destacada
    const featuredRibbon = isFeatured ? `
      <div class="absolute -top-3 right-6 bg-terracotta text-white text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-sm">
        ★ MÁS DEMANDADO
      </div>
    ` : '';

    // Estilo del botón principal: Terracota para el destacado, slate-900 para los demás
    const buttonClass = isFeatured
      ? "w-full bg-terracotta hover:bg-terracotta-hover text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
      : "w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm";

    return `
      <article 
        class="course-card w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] bg-white rounded-xl ${cardBorderShadow} p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative" 
        data-category="${course.filterCategory}">
        ${featuredRibbon}
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="${course.badgeClass}">
              ${course.badge}
            </span>
            <span class="text-xs text-slate-500 font-mono">${course.hours}</span>
          </div>
          <h3 class="font-display text-xl font-bold text-slate-900 mb-2">
            ${course.title}
          </h3>
          <p class="text-slate-600 text-sm mb-6 leading-relaxed">
            ${course.shortDesc}
          </p>

          <div class="border-t border-b border-slate-100 py-4 mb-6 space-y-2.5">
            ${checklistMarkup}
          </div>
        </div>

        <div>
          <div class="flex flex-wrap gap-1.5 mb-6">
            ${toolsMarkup}
          </div>
          <button onclick="openCourseModal(${course.id})" class="${buttonClass}">
            <span>Ver Programa Completo</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      </article>
    `;
  }).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ==========================================
// 3. FILTRADO INTERACTIVO DE CURSOS
// ==========================================
function filterCourses(category) {
  const cards = document.querySelectorAll('.course-card');
  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'flex';
      card.classList.remove('hidden');
    } else {
      card.style.display = 'none';
      card.classList.add('hidden');
    }
  });

  // Actualizar estilos activos de los botones de filtro
  document.querySelectorAll('.course-filter-btn').forEach(btn => {
    btn.classList.remove('bg-slate-900', 'text-white', 'shadow-sm');
    btn.classList.add('text-slate-600', 'hover:text-slate-900', 'hover:bg-slate-200/60');
  });

  const activeBtn = document.getElementById(`filter-${category}`);
  if (activeBtn) {
    activeBtn.classList.remove('text-slate-600', 'hover:text-slate-900', 'hover:bg-slate-200/60');
    activeBtn.classList.add('bg-slate-900', 'text-white', 'shadow-sm');
  }
}

// ==========================================
// 4. INICIALIZACIÓN
// ==========================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderCourseCards);
} else {
  renderCourseCards();
}