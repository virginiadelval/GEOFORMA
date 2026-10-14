// ==========================================
// MÓDULO DE INTERACCIÓN, MODALES Y FORMULARIOS (GEO|FORMA)
// ==========================================

// Estado global de moneda (por defecto USD)
let currentSelectedCurrency = 'USD';

// ------------------------------------------
// 1. INICIALIZACIÓN DEL DOM
// ------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar íconos Lucide si están cargados
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Menú Hamburguesa para Móviles
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Inicializar cálculo de precios en el carrito / calculadora
  calculateSelectedCourses();
});

// ------------------------------------------
// 2. MODAL DE DETALLES DEL CURSO (SYLLABUS)
// ------------------------------------------
function openCourseModal(id) {
  const data = window.coursesData || {};
  const course = data[id];
  if (!course) return;

  const modalContent = document.getElementById('modal-content');
  if (!modalContent) return;

  const toolsList = course.tools ? course.tools.map(t => 
    `<span class="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded border border-slate-200 font-medium">${t}</span>`
  ).join('') : '';

  const syllabusList = course.syllabus ? course.syllabus.map(item => `
    <li class="flex items-start gap-2.5 text-xs text-slate-700">
      <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
      <span>${item}</span>
    </li>
  `).join('') : '';

  modalContent.innerHTML = `
    <div class="mb-6">
      <span class="${course.badgeClass || 'bg-slate-100 text-slate-800 text-[11px] font-bold px-3 py-1 rounded-md border border-slate-300 tracking-wider'}">
        ${course.badge}
      </span>
      <h2 class="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-3">${course.title}</h2>
      <p class="text-xs text-slate-500 font-mono mt-1">${course.hours}</p>
    </div>

    <p class="text-slate-600 text-sm mb-6 leading-relaxed border-b border-slate-100 pb-4">
      ${course.summary || course.shortDesc}
    </p>

    <div class="mb-6">
      <h4 class="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">Syllabus & Temario del Programa</h4>
      <ul class="space-y-2.5">
        ${syllabusList}
      </ul>
    </div>

    <div class="mb-8">
      <h4 class="text-xs font-bold text-slate-900 uppercase tracking-widest mb-2">Herramientas & Tecnologías</h4>
      <div class="flex flex-wrap gap-2">
        ${toolsList}
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
      <button onclick="closeCourseModal(); selectSingleCourseAndScroll(${id})" class="w-full sm:w-1/2 bg-terracotta hover:bg-terracotta-hover text-white font-bold py-3 rounded-lg transition-colors text-sm shadow-sm flex items-center justify-center gap-2">
        <span>Cotizar Solo este Curso</span>
        <i data-lucide="arrow-right" class="w-4 h-4"></i>
      </button>
      <button onclick="closeCourseModal(); openAdvisoryModal()" class="w-full sm:w-1/2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
        <span>Agendar Asesoría Técnica</span>
      </button>
    </div>
  `;

  if (typeof lucide !== 'undefined') lucide.createIcons();

  const courseModal = document.getElementById('course-modal');
  if (courseModal) courseModal.classList.remove('hidden');
}

function closeCourseModal() {
  const courseModal = document.getElementById('course-modal');
  if (courseModal) courseModal.classList.add('hidden');
}

// ------------------------------------------
// 3. PANEL DE COTIZACIÓN Y SELECCIÓN DE CURSOS
// ------------------------------------------

// Nombres canónicos de los 7 cursos
const courseCatalogNames = {
  1: "QGIS Inicial",
  2: "QGIS Avanzado",
  3: "Plataformas Web: ArcGIS Online / Maplibre/ Geolibre/ Rustgis",
  4: "Google Earth Engine (GEE)",
  5: "GIS + IA (Machine Learning)",
  6: "Web Mapping & GeoServicios",
  7: "Fotogrametría con Drones – Inicial"
};

// Carga horaria oficial por curso
const courseHoursData = {
  1: 60,
  2: 100,
  3: 60,
  4: 60,
  5: 80,
  6: 100,
  7: 60
};

function calculateSelectedCourses() {
  const inputs = document.querySelectorAll('.course-check-input');
  const selectedIds = [];
  inputs.forEach(input => {
    if (input.checked) selectedIds.push(parseInt(input.value));
  });

  const count = selectedIds.length;
  let totalHours = 0;
  selectedIds.forEach(id => {
    totalHours += (courseHoursData[id] || 0);
  });

  const counterElem = document.getElementById('selected-counter');
  const titleElem = document.getElementById('selected-summary-title');
  const totalHoursElem = document.getElementById('calc-total-hours');
  const btnCheckoutText = document.getElementById('btn-checkout-text');
  const btnSubmit = document.getElementById('btn-submit-checkout');
  const btnToggleAll = document.getElementById('btn-toggle-all');

  if (btnToggleAll) {
    btnToggleAll.innerText = count === 7 ? "Desmarcar Todos" : "Seleccionar Todos (Pack 7)";
  }

  if (count === 0) {
    if (counterElem) counterElem.innerText = "0 Cursos";
    if (titleElem) titleElem.innerText = "Ningún Curso Seleccionado";
    if (totalHoursElem) totalHoursElem.innerText = "0 Horas";
    if (btnCheckoutText) btnCheckoutText.innerText = "Selecciona al menos 1 Curso";
    if (btnSubmit) btnSubmit.disabled = true;

    updateCheckoutModalSummary(selectedIds, 0);
    return;
  }

  if (btnSubmit) btnSubmit.disabled = false;

  if (count === 7) {
    if (titleElem) titleElem.innerText = "Programa Completo (7 Cursos)";
  } else if (count === 1) {
    if (titleElem) titleElem.innerText = "Cotización 1 Curso Individual";
  } else {
    if (titleElem) titleElem.innerText = `Propuesta Personalizada (${count} Cursos)`;
  }

  if (counterElem) counterElem.innerText = `${count} de 7 Cursos`;
  if (totalHoursElem) totalHoursElem.innerText = `${totalHours} Horas`;
  if (btnCheckoutText) btnCheckoutText.innerText = `Solicitar Cotización (${count} ${count === 1 ? 'Curso' : 'Cursos'})`;

  updateCheckoutModalSummary(selectedIds, totalHours);
}

// Sincronizar el resumen visible y los campos ocultos del modal de cotización
function updateCheckoutModalSummary(selectedIds, totalHours) {
  const summaryElem = document.getElementById('checkout-courses-summary');
  const hiddenCourses = document.getElementById('checkout-hidden-courses');
  const hiddenPrice = document.getElementById('checkout-hidden-price');

  if (selectedIds.length === 0) {
    if (summaryElem) {
      summaryElem.innerHTML = `<span class="text-amber-700 font-semibold">⚠️ No has seleccionado ningún curso todavía en el panel de cotización.</span>`;
    }
    if (hiddenCourses) hiddenCourses.value = "Ninguno";
    if (hiddenPrice) hiddenPrice.value = "Sin cursos seleccionados";
    return;
  }

  const courseList = selectedIds.map(id => courseCatalogNames[id] || `Curso ${id}`);
  const formattedCourses = courseList.join(', ');

  if (summaryElem) {
    summaryElem.innerHTML = `
      <div class="space-y-1.5">
        <div class="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
          Cursos a Cotizar (${selectedIds.length}):
        </div>
        <div class="space-y-1">
          ${courseList.map(name => `
            <div class="flex items-center gap-1.5 text-xs text-slate-800 font-semibold">
              <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-600 shrink-0"></i>
              <span>${name}</span>
            </div>
          `).join('')}
        </div>
        <div class="pt-2 mt-2 border-t border-slate-200 flex justify-between items-center text-xs">
          <span class="text-slate-500 font-medium">Carga Horaria Acumulada:</span>
          <span class="font-bold text-terracotta text-sm">${totalHours} Horas</span>
        </div>
      </div>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  if (hiddenCourses) hiddenCourses.value = formattedCourses;
  if (hiddenPrice) hiddenPrice.value = `Cotización formal por correo (${totalHours} hs)`;
}

function toggleSelectAllCourses() {
  const inputs = document.querySelectorAll('.course-check-input');
  const allChecked = Array.from(inputs).every(inp => inp.checked);
  inputs.forEach(inp => inp.checked = !allChecked);
  calculateSelectedCourses();
}

function updatePricesCurrency(currKey) {
  currentSelectedCurrency = currKey;
  calculateSelectedCourses();
}

function selectSingleCourseAndScroll(courseId) {
  const inputs = document.querySelectorAll('.course-check-input');
  inputs.forEach(inp => {
    inp.checked = (parseInt(inp.value) === courseId);
  });
  calculateSelectedCourses();
  const invSec = document.getElementById('inversion');
  if (invSec) invSec.scrollIntoView({ behavior: 'smooth' });
}

// ------------------------------------------
// 4. MODAL DE CHECKOUT / SOLICITUD DE INSCRIPCIÓN (POR CORREO)
// ------------------------------------------
function openCheckoutModal() {
  calculateSelectedCourses();
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.add('hidden');
}

/**
 * Enviar solicitud de cotización directa por correo (sin pasarelas ni montos públicos)
 * Notifica a sig.salta.2019@gmail.com con el detalle de los cursos que el interesado habilitó.
 */
async function handleCheckoutSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = document.getElementById('btn-submit-enrollment') || form.querySelector('button[type="submit"]');
  const originalText = submitBtn ? submitBtn.innerHTML : "Enviar Solicitud";

  // Identificar los cursos marcados en el DOM
  const inputs = document.querySelectorAll('.course-check-input');
  const selectedIds = [];
  let totalHours = 0;
  inputs.forEach(input => {
    if (input.checked) {
      const id = parseInt(input.value);
      selectedIds.push(id);
      totalHours += (courseHoursData[id] || 0);
    }
  });

  const cursosNombres = selectedIds.map(id => courseCatalogNames[id] || `Curso ${id}`).join(' | ');

  // Armar el payload completo
  const payload = typeof extractFormData === 'function' ? extractFormData(form) : {};
  if (!payload.nombre_completo && form.nombre_completo) payload.nombre_completo = form.nombre_completo.value;
  if (!payload.email && form.email) payload.email = form.email.value;
  if (!payload.telefono && form.telefono) payload.telefono = form.telefono.value;
  if (form.mensaje_adicional && form.mensaje_adicional.value) payload.mensaje_adicional = form.mensaje_adicional.value;

  payload.tipo_solicitud = "Cotización de Cursos";
  payload.cursos_seleccionados = cursosNombres || "Todos los cursos";
  payload.cantidad_cursos = selectedIds.length;
  payload.carga_horaria_total = `${totalHours} horas`;
  payload._subject = `[GEO|FORMA] Nueva Solicitud de Cotización (${selectedIds.length} Cursos): ${payload.nombre_completo || 'Interesado'}`;

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Enviando solicitud...
    `;
  }

  let enviado = false;
  if (typeof sendFormDataByEmail === 'function') {
    enviado = await sendFormDataByEmail(payload);
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }

  if (enviado) {
    closeCheckoutModal();
    form.reset();
    showToast("¡Solicitud de cotización recibida! Te enviaremos la propuesta formal y el programa por correo.");
  } else {
    showToast("No pudimos procesar el envío. Por favor contáctanos directamente a sig.salta.2019@gmail.com.");
  }
}

// ------------------------------------------
// 5. MODAL DE ASESORÍA TÉCNICA
// ------------------------------------------
function openAdvisoryModal() {
  const modal = document.getElementById('advisory-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeAdvisoryModal() {
  const modal = document.getElementById('advisory-modal');
  if (modal) modal.classList.add('hidden');
}

async function handleAdvisorySubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn ? submitBtn.innerHTML : "Confirmar";

  const payload = typeof extractFormData === 'function' ? extractFormData(form) : {};
  if (!payload.nombre_completo && form.nombre_completo) payload.nombre_completo = form.nombre_completo.value;
  if (!payload.email && form.email) payload.email = form.email.value;
  if (!payload.programa_interes && form.programa_interes) payload.programa_interes = form.programa_interes.value;
  payload._subject = "[GEO|FORMA] Nueva Solicitud de Asesoría Técnica";

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Enviando...";
  }

  let enviado = false;
  if (typeof sendFormDataByEmail === 'function') {
    enviado = await sendFormDataByEmail(payload);
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }

  closeAdvisoryModal();
  form.reset();

  if (enviado) {
    showToast("Solicitud enviada directamente a Virginia del Val.");
  } else {
    showToast("No pudimos enviar la solicitud. Por favor intenta por correo directo.");
  }
}

// ------------------------------------------
// 6. MODAL B2B / IN-COMPANY (EMPRESAS)
// ------------------------------------------
function openB2BModal() {
  const modal = document.getElementById('b2bModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeB2BModal() {
  const modal = document.getElementById('b2bModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

async function handleInCompanySubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn ? submitBtn.innerHTML : "Solicitar Propuesta";

  const payload = typeof extractFormData === 'function' ? extractFormData(form) : {};
  
  // Recopilar cursos marcados en el panel de cotización in-company
  const checkedCursos = Array.from(form.querySelectorAll('input[name="b2b_cursos"]:checked')).map(cb => cb.value);
  if (checkedCursos.length > 0) {
    payload.cursos_a_cotizar = checkedCursos.join(' | ');
  }

  payload._subject = `[GEO|FORMA] Nueva Solicitud de Cotización In-Company: ${payload.empresa || 'Empresa'}`;

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Enviando cotización...";
  }

  let enviado = false;
  if (typeof sendFormDataByEmail === 'function') {
    enviado = await sendFormDataByEmail(payload);
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }

  closeB2BModal();
  form.reset();

  if (enviado) {
    showToast("Solicitud In-Company enviada. Nos comunicaremos en menos de 24 hs hábiles con la cotización.");
  } else {
    showToast("No pudimos enviar la cotización. Por favor escríbenos directamente.");
  }
}

// ------------------------------------------
// 7. BOLETÍN INFORMATIVO (NEWSLETTER) & PREGUNTAS FRECUENTES (FAQ)
// ------------------------------------------
function handleNewsletter(event) {
  event.preventDefault();
  event.target.reset();
  showToast("Te has suscrito exitosamente al Boletín Técnico GEO|FORMA.");
}

function toggleFaq(id) {
  const ans = document.getElementById(`faq-ans-${id}`);
  const icon = document.getElementById(`faq-icon-${id}`);
  if (ans && icon) {
    if (ans.classList.contains('hidden')) {
      ans.classList.remove('hidden');
      icon.classList.add('rotate-180');
    } else {
      ans.classList.add('hidden');
      icon.classList.remove('rotate-180');
    }
  }
}

// ------------------------------------------
// 8. NOTIFICACIÓN FLOTANTE (TOAST)
// ------------------------------------------
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (toast && toastMsg) {
    toastMsg.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 4500);
  }
}