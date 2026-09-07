import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  Calendar,
  Check,
  Globe,
  FolderGit2,
  Cpu,
  Users2,
  ChevronDown,
  X,
  ExternalLink,
  Mail,
  Compass,
  TrendingUp,
  Lock,
  ShieldCheck
} from 'lucide-react';

export default function LandingPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isAdvisoryOpen, setIsAdvisoryOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedCourseIds, setSelectedCourseIds] = useState([1, 2, 3, 4, 5]);

  const coursePrices = {
    USD: { individual: { 1: 29, 2: 35, 3: 39, 4: 39, 5: 35 }, pack5: 97, symbol: "USD $" },
    EUR: { individual: { 1: 27, 2: 32, 3: 36, 4: 36, 5: 32 }, pack5: 89, symbol: "€ " },
    ARS: { individual: { 1: 28000, 2: 34000, 3: 38000, 4: 38000, 5: 34000 }, pack5: 95000, symbol: "ARS $" },
    MXN: { individual: { 1: 500, 2: 600, 3: 670, 4: 670, 5: 600 }, pack5: 1650, symbol: "MXN $" },
    COP: { individual: { 1: 115000, 2: 138000, 3: 154000, 4: 154000, 5: 138000 }, pack5: 380000, symbol: "COP $" },
    CLP: { individual: { 1: 26000, 2: 32000, 3: 35000, 4: 35000, 5: 32000 }, pack5: 88000, symbol: "CLP $" },
    PEN: { individual: { 1: 110, 2: 130, 3: 145, 4: 145, 5: 130 }, pack5: 360, symbol: "S/ " }
  };

  const curr = coursePrices[selectedCurrency] || coursePrices.USD;

  const toggleCourse = (id) => {
    if (selectedCourseIds.includes(id)) {
      setSelectedCourseIds(selectedCourseIds.filter(i => i !== id));
    } else {
      setSelectedCourseIds([...selectedCourseIds, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedCourseIds.length === 5) {
      setSelectedCourseIds([]);
    } else {
      setSelectedCourseIds([1, 2, 3, 4, 5]);
    }
  };

  const calculateTotal = () => {
    const count = selectedCourseIds.length;
    if (count === 0) return { subtotal: 0, total: 0, discount: 0, installment: 0, count: 0 };
    
    let subtotal = 0;
    selectedCourseIds.forEach(id => {
      subtotal += curr.individual[id];
    });

    let discountPercent = 0;
    let finalTotal = subtotal;

    if (count === 1) {
      discountPercent = 0;
      finalTotal = subtotal;
    } else if (count === 2) {
      discountPercent = 10;
      finalTotal = Math.round(subtotal * 0.90);
    } else if (count === 3) {
      discountPercent = 15;
      finalTotal = Math.round(subtotal * 0.85);
    } else if (count === 4) {
      discountPercent = 25;
      finalTotal = Math.round(subtotal * 0.75);
    } else if (count === 5) {
      discountPercent = Math.round((1 - curr.pack5 / subtotal) * 100);
      finalTotal = curr.pack5;
    }

    const installment = Math.round(finalTotal / 3);
    return { subtotal, total: finalTotal, discount: discountPercent, installment, count };
  };

  const summary = calculateTotal();

  const courses = [
    {
      id: 1,
      title: "QGIS Inicial a Avanzado",
      category: "fundamental",
      badge: "FUNDAMENTAL",
      badgeStyle: "bg-slate-100 text-slate-800 border-slate-300",
      hours: "40 Horas",
      summary: "Desde las bases cartográficas y geoprocesamiento hasta el modelado vectorial/ráster avanzado y composición cartográfica profesional.",
      highlights: [
        "Geoprocesamiento espacial y modelador gráfico de flujos",
        "Análisis de elevación DEM y álgebra de mapas ráster",
        "Composición de mapas impresos con Atlas automatizado"
      ],
      tools: ["QGIS 3.3x", "GRASS", "SAGA", "PostGIS"]
    },
    {
      id: 2,
      title: "Cloud GIS – GIS en la Nube",
      category: "cloud",
      badge: "INFRAESTRUCTURA & CLOUD",
      badgeStyle: "bg-slate-700 text-white",
      hours: "50 Horas",
      summary: "Despliegue de visores interactivos, tableros de control (dashboards), análisis sobre data warehouses y mapas vector tiles de gran velocidad.",
      highlights: [
        "Creación de Dashboards interactivos ejecutivos",
        "Publicación de Vector Tiles dinámicos de baja latencia",
        "Consultas espaciales SQL en la nube (Snowflake / BigQuery)"
      ],
      tools: ["CARTO", "Mapbox", "ArcGIS Online / Pro"]
    },
    {
      id: 3,
      title: "Google Earth Engine (GEE)",
      category: "advanced",
      badge: "BIG DATA SPATIAL",
      badgeStyle: "bg-slate-900 text-white",
      hours: "60 Horas",
      summary: "Procesamiento masivo de imágenes satelitales a escala planetaria mediante JavaScript y Python sin saturar tu equipo local.",
      highlights: [
        "Series de tiempo satelitales (Sentinel-2, Landsat 8/9)",
        "Cálculo de índices espectrales (NDVI, NDWI, EVI)",
        "Monitoreo de deforestación y cambio de uso de suelo"
      ],
      tools: ["Earth Engine", "JavaScript", "Python API"]
    },
    {
      id: 4,
      title: "GIS + IA (Inteligencia Artificial Geoespacial)",
      category: "advanced",
      badge: "INNOVACIÓN & MACHINE LEARNING",
      badgeStyle: "bg-orange-700 text-white",
      featured: true,
      hours: "55 Horas",
      summary: "Aplicación de algoritmos de Machine Learning (KNN, Random Forest), Deep Learning (Deepness/ONNX) y agentes de IA con MCP para la automatización de flujos geoespaciales.",
      highlights: [
        "Detección de objetos en imágenes de alta resolución",
        "Clasificación de coberturas mediante Random Forest y CNNs",
        "Uso de Agentes de IA con protocolo MCP en workflows SIG"
      ],
      tools: ["PyTorch", "ONNX", "Deepness", "Geo-MCP"]
    },
    {
      id: 5,
      title: "Web Mapping & GeoServicios",
      category: "cloud",
      badge: "DESARROLLO WEB",
      badgeStyle: "bg-slate-700 text-white",
      hours: "45 Horas",
      summary: "Publicación e integración de servicios OGC (WMS/WFS), bases de datos PostGIS, GeoServer y desarrollo de visores web personalizados con Leaflet / Mapbox GL.",
      highlights: [
        "Servicios OGC estándar (WMS, WFS, WMTS)",
        "Bases de datos espaciales PostGIS & consultas SQL",
        "Visores web interactivos a medida con Leaflet & Mapbox GL"
      ],
      tools: ["PostGIS", "GeoServer", "Leaflet", "Mapbox GL"]
    }
  ];

  const filteredCourses = activeCategory === 'all' 
    ? courses 
    : courses.filter(c => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-[#C2410C] selection:text-white">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-pearl/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
          <a href="#" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white border border-slate-700">
              <Layers className="w-5 h-5 text-[#C2410C]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-slate-900">
                GEO<span className="text-[#C2410C] font-normal">|</span>FORMA
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-500">GeoSpatial Academy</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-600 absolute left-1/2 -translate-x-1/2">
            <a href="#cursos" className="hover:text-slate-900">Cursos</a>
            <a href="#metodologia" className="hover:text-slate-900">Metodología</a>
            <a href="#inversion" className="hover:text-slate-900">Inversión</a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button onClick={() => setIsAdvisoryOpen(true)} className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2">
              Contacto
            </button>
            <a href="#inversion" className="text-sm font-semibold text-slate-700 border border-slate-300 bg-white hover:bg-slate-50 px-4 py-2.5 rounded-lg shadow-sm flex items-center gap-2">
              <span>Ver Catálogo</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center justify-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-slate-200/70 border border-slate-300 px-3 py-1.5 rounded-md">
                <Compass className="w-4 h-4 text-[#C2410C]" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-700">
                  [ FORMACIÓN TÉCNICA AVANZADA EN TECNOLOGÍAS GEOESPACIALES ]
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                Domina el Territorio a través del <span className="text-slate-700 underline decoration-[#C2410C]/60 underline-offset-8">Análisis de Datos</span>, la Nube y la Inteligencia Artificial.
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                Programas de capacitación especializada diseñados para profesionales que buscan liderar la transformación digital del sector ambiental, minero, urbano e industrial.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <a href="#cursos" className="inline-flex items-center justify-center gap-3 bg-[#C2410C] hover:bg-[#9A3412] text-white font-semibold px-7 py-3.5 rounded-lg shadow-md text-base">
                  <span>Explorar Cursos</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <button onClick={() => setIsAdvisoryOpen(true)} className="inline-flex items-center justify-center gap-2 border border-slate-700 text-slate-800 bg-white hover:bg-slate-100 font-semibold px-6 py-3.5 rounded-lg shadow-sm text-base">
                  <Calendar className="w-4 h-4 text-slate-600" />
                  <span>Agendar Asesoría</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 w-full flex justify-center">
              <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden relative w-full max-w-lg lg:max-w-none">
                <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="ml-2 text-xs font-mono text-slate-400">geo_viewer_v4.2.spatial</span>
                  </div>
                </div>

                <div className="h-80 bg-slate-950 relative flex items-center justify-center p-6 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#C2410C]/20 border border-[#C2410C] flex items-center justify-center mx-auto text-[#C2410C]">
                      <Globe className="w-8 h-8" />
                    </div>
                    <div className="text-slate-300 font-mono text-sm font-semibold">
                      CAPA ACTIVA: Salta Capital (-24.7859, -65.4117)
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 border border-slate-800 p-3 rounded-lg flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400">NDVI: +0.78</span>
                    <span className="text-sky-400">Latencia: 14ms</span>
                    <span className="text-slate-400">EPSG:4326</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CURSOS SECTION */}
      <section id="cursos" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">[ CATÁLOGO EXECUTIVE ]</span>
          <h2 className="text-3xl font-bold text-slate-900">Especialización Geoespacial de Alto Rendimiento</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-slate-200 pb-4">
          <button onClick={() => setActiveCategory('all')} className={`px-5 py-2 rounded-lg text-sm font-semibold ${activeCategory === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200/60'}`}>Todos los Cursos</button>
          <button onClick={() => setActiveCategory('fundamental')} className={`px-5 py-2 rounded-lg text-sm font-semibold ${activeCategory === 'fundamental' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200/60'}`}>Fundamentos</button>
          <button onClick={() => setActiveCategory('cloud')} className={`px-5 py-2 rounded-lg text-sm font-semibold ${activeCategory === 'cloud' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200/60'}`}>Nube & Web</button>
          <button onClick={() => setActiveCategory('advanced')} className={`px-5 py-2 rounded-lg text-sm font-semibold ${activeCategory === 'advanced' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200/60'}`}>IA & Big Data</button>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {filteredCourses.map(course => (
            <article key={course.id} className={`w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] bg-white rounded-xl border p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all relative ${course.featured ? 'border-[#C2410C]/40 shadow-md' : 'border-slate-200'}`}>
              {course.featured && (
                <div className="absolute -top-3 right-6 bg-[#C2410C] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full">★ MÁS DEMANDADO</div>
              )}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-md tracking-wider ${course.badgeStyle}`}>
                    {course.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500">{course.hours}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">{course.summary}</p>
                
                <div className="border-y border-slate-100 py-4 mb-6 space-y-2">
                  {course.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {course.tools.map((t, idx) => (
                    <span key={idx} className="bg-slate-50 text-slate-600 text-[10px] font-medium px-2.5 py-1 rounded border border-slate-200">{t}</span>
                  ))}
                </div>
                <button onClick={() => setSelectedCourse(course)} className={`w-full font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm ${course.featured ? 'bg-[#C2410C] hover:bg-[#9A3412] text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}>
                  <span>Ver Programa Completo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECCIÓN INVERSIÓN ACADÉMICA Y CHECKLIST INTERACTIVO */}
      <section id="inversion" className="py-20 bg-slate-100 border-t border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C2410C] mb-2 block">
              [ INVERSIÓN ACADÉMICA MULTIMONEDA A TU MEDIDA ]
            </span>
            <h2 className="text-3xl font-bold text-slate-900">
              Arma tu Plan de Formación o Elige el Pack Completo
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Selecciona individualmente los cursos que deseas realizar o aprovecha el descuento especial del <strong>Programa Completo (5 Cursos)</strong>.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 text-xs font-semibold shadow-sm">
              <span className="text-slate-500 pl-2">Moneda de Pago:</span>
              <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-900 font-bold focus:outline-none focus:border-[#C2410C] cursor-pointer">
                <option value="USD">USD ($ Dólares)</option>
                <option value="EUR">EUR (€ Euros)</option>
                <option value="ARS">ARS ($ Pesos Argentinos)</option>
                <option value="MXN">MXN ($ Pesos Mexicanos)</option>
                <option value="COP">COP ($ Pesos Colombianos)</option>
                <option value="CLP">CLP ($ Pesos Chilenos)</option>
                <option value="PEN">PEN (S/ Soles Peruanos)</option>
              </select>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* IZQUIERDA: CHECKLIST */}
            <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-200 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Selección de Cursos</h3>
                  <p className="text-xs text-slate-500">Marca las casillas de los programas que deseas incluir</p>
                </div>
                <button onClick={toggleSelectAll} className="text-xs font-bold text-[#C2410C] hover:underline bg-[#C2410C]/10 px-3 py-1.5 rounded-lg border border-[#C2410C]/20">
                  {selectedCourseIds.length === 5 ? "Desmarcar Todos" : "Seleccionar Todos (Pack 5)"}
                </button>
              </div>

              <div className="space-y-3">
                {courses.map(c => (
                  <label key={c.id} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-[#C2410C]/60 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-all">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={selectedCourseIds.includes(c.id)} 
                        onChange={() => toggleCourse(c.id)} 
                        className="w-4 h-4 text-[#C2410C] rounded border-slate-300 focus:ring-[#C2410C] cursor-pointer" 
                      />
                      <div>
                        <span className="font-bold text-slate-900 text-sm block">{c.id}. {c.title}</span>
                        <span className="text-[11px] text-slate-500 font-mono">{c.hours}</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-xs text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded-md">
                      {curr.symbol}{curr.individual[c.id]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* DERECHA: RESUMEN Y CALCULADORA */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-900 text-white flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Resumen de Inscripción</span>
                    <span className="bg-[#C2410C]/20 text-[#C2410C] border border-[#C2410C]/30 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                      {selectedCourseIds.length} de 5 Cursos
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-white mt-2">
                    {selectedCourseIds.length === 5 ? "Programa Completo (5 Cursos)" : selectedCourseIds.length > 0 ? `Selección (${selectedCourseIds.length} Cursos)` : "Sin Selección"}
                  </h4>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-3 text-xs">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Subtotal acumulado:</span>
                    <span className="font-mono line-through text-slate-400 text-sm">{curr.symbol}{summary.subtotal}</span>
                  </div>

                  <div className="flex justify-between items-center text-emerald-400 font-medium">
                    <span>Descuento aplicado:</span>
                    <span className="font-mono font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                      {summary.discount > 0 ? `-${summary.discount}% Ahorro` : 'Sin Descuento'}
                    </span>
                  </div>

                  <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
                    <span className="font-bold text-white text-sm">TOTAL FINAL:</span>
                    <span className="text-3xl font-extrabold text-white font-display">{curr.symbol}{summary.total}</span>
                  </div>
                </div>

                {summary.total > 0 && (
                  <div className="bg-emerald-950/40 border border-emerald-800/60 p-3.5 rounded-xl text-center">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-400 block mb-0.5">Financiación</span>
                    <p className="text-xs text-slate-200">
                      o <strong>3 cuotas sin interés</strong> de <span className="font-mono text-emerald-300 font-bold">{curr.symbol}{summary.installment}/mes</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 space-y-2">
                <button 
                  disabled={summary.total === 0} 
                  onClick={() => setIsCheckoutOpen(true)} 
                  className="w-full bg-[#C2410C] hover:bg-[#9A3412] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>{summary.total > 0 ? `Inscribirme Ahora (${curr.symbol}${summary.total})` : 'Selecciona al menos 1 Curso'}</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 text-center text-xs border-t border-slate-900">
        <p>&copy; 2026 GEO|FORMA Academy & Virginia del Val. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
