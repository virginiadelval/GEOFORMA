/**
 * js/currency.js
 * ----------------------------------------------------------------------
 * Módulo independiente de precios multimoneda.
 *
 * FUNCIONAMIENTO:
 * 1) Los precios "reales" de los cursos se cargan UNA sola vez, en pesos
 *    argentinos (ARS), en la constante BASE_PRICES_ARS de este archivo.
 * 2) Este módulo consulta una API pública y gratuita de cotización de
 *    divisas (sin necesidad de API key) y calcula automáticamente el
 *    equivalente de esos precios en USD, EUR, MXN, COP, CLP y PEN.
 * 3) El resultado se guarda en "window.coursePrices", que es exactamente
 *    la misma variable que ya usaba el resto del sitio (index.html) para
 *    pintar los precios en pantalla. Por eso no hizo falta tocar el HTML
 *    ni los estilos: sólo se reemplazó la tabla fija de precios por este
 *    cálculo automático.
 *
 * PARA CAMBIAR UN PRECIO:
 *    Editar únicamente los valores de BASE_PRICES_ARS (en pesos
 *    argentinos). Todas las demás monedas se recalculan solas.
 *
 * SI LA API DE COTIZACIÓN FALLA (sin internet, servicio caído, etc.):
 *    Se usan las tasas de respaldo fijas de FALLBACK_RATES_ARS_PER_UNIT,
 *    para que el sitio nunca se quede sin mostrar precios. Conviene
 *    actualizar esos valores de tanto en tanto.
 * ----------------------------------------------------------------------
 */

// ---- 1) PRECIO BASE, en pesos argentinos (ARS). Editar sólo acá. ----
const BASE_PRICES_ARS = {
  individual: { 1: 28000, 2: 34000, 3: 38000, 4: 38000, 5: 34000 },
  pack5: 95000
};

// ---- 2) Símbolo a mostrar junto a cada precio ----
const CURRENCY_SYMBOLS = {
  ARS: "ARS $",
  USD: "USD $",
  EUR: "€ ",
  MXN: "MXN $",
  COP: "COP $",
  CLP: "CLP $",
  PEN: "S/ "
};

// ---- 3) Tasas de respaldo: cuántos ARS equivale 1 unidad de cada moneda ----
// (sólo se usan si la consulta a la API en vivo falla)
const FALLBACK_RATES_ARS_PER_UNIT = {
  USD: 965,
  EUR: 1050,
  MXN: 56,
  COP: 0.245,
  CLP: 1.07,
  PEN: 255
};

// API pública gratuita de cotización de divisas (no requiere registro ni API key).
// Devuelve, con base ARS, cuántas unidades de cada moneda equivalen a 1 ARS.
const EXCHANGE_RATE_API_URL = "https://open.er-api.com/v6/latest/ARS";

// Cada cuánto se vuelve a consultar la cotización mientras el sitio sigue abierto (6 hs).
const REFRESH_INTERVAL_MS = 6 * 60 * 60 * 1000;

let liveRatesArsPerUnit = null; // se completa cuando responde la API

/**
 * Recalcula window.coursePrices en base a una tabla de tasas
 * (ARS que vale 1 unidad de cada moneda extranjera) y actualiza la UI.
 * @param {Object} ratesArsPerUnit
 */
function buildCoursePricesFromRates(ratesArsPerUnit) {
  const newCoursePrices = {
    ARS: {
      individual: { ...BASE_PRICES_ARS.individual },
      pack5: BASE_PRICES_ARS.pack5,
      symbol: CURRENCY_SYMBOLS.ARS
    }
  };

  Object.keys(ratesArsPerUnit).forEach((currencyCode) => {
    const arsPerUnit = ratesArsPerUnit[currencyCode]; // cuántos ARS vale 1 unidad de currencyCode
    if (!arsPerUnit || arsPerUnit <= 0) return;

    const individual = {};
    Object.keys(BASE_PRICES_ARS.individual).forEach((courseId) => {
      individual[courseId] = Math.round(BASE_PRICES_ARS.individual[courseId] / arsPerUnit);
    });

    newCoursePrices[currencyCode] = {
      individual,
      pack5: Math.round(BASE_PRICES_ARS.pack5 / arsPerUnit),
      symbol: CURRENCY_SYMBOLS[currencyCode] || `${currencyCode} `
    };
  });

  window.coursePrices = newCoursePrices;

  // Vuelve a pintar los precios en pantalla con los valores actualizados
  // (esta función ya existe en index.html).
  if (typeof calculateSelectedCourses === "function") {
    calculateSelectedCourses();
  }
}

/**
 * Consulta la API de cotización en vivo. Si falla por cualquier motivo,
 * cae automáticamente a las tasas de respaldo.
 */
async function fetchLiveExchangeRates() {
  try {
    const response = await fetch(EXCHANGE_RATE_API_URL);
    if (!response.ok) {
      throw new Error(`La API de cotización respondió con estado ${response.status}`);
    }

    const data = await response.json();
    if (data.result !== "success" || !data.rates) {
      throw new Error("Formato de respuesta inesperado en la API de cotización");
    }

    // data.rates[cur] = cuántas unidades de "cur" equivalen a 1 ARS.
    // Para nuestros cálculos necesitamos lo inverso: cuántos ARS vale 1 unidad de "cur".
    const monedasObjetivo = ["USD", "EUR", "MXN", "COP", "CLP", "PEN"];
    const ratesArsPerUnit = {};
    monedasObjetivo.forEach((cur) => {
      if (data.rates[cur]) {
        ratesArsPerUnit[cur] = 1 / data.rates[cur];
      }
    });

    liveRatesArsPerUnit = ratesArsPerUnit;
    buildCoursePricesFromRates(ratesArsPerUnit);
  } catch (error) {
    console.warn(
      "[GEO|FORMA] No se pudo obtener la cotización en vivo, se usan tasas de respaldo:",
      error
    );
    // Si nunca se logró obtener la cotización en vivo, usamos el respaldo fijo.
    if (!liveRatesArsPerUnit) {
      buildCoursePricesFromRates(FALLBACK_RATES_ARS_PER_UNIT);
    }
  }
}

// Al cargar el módulo: primero pintamos precios YA MISMO con las tasas de
// respaldo (para que el usuario nunca vea la página sin precios mientras
// se espera la respuesta de la API), y en paralelo pedimos la cotización real.
buildCoursePricesFromRates(FALLBACK_RATES_ARS_PER_UNIT);
fetchLiveExchangeRates();

// Refresca la cotización periódicamente mientras la pestaña siga abierta.
setInterval(fetchLiveExchangeRates, REFRESH_INTERVAL_MS);
