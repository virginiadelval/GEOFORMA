/**
 * js/mailer.js
 * ----------------------------------------------------------------------
 * Módulo independiente encargado de enviar los datos de los formularios
 * del sitio (Inscripción a Cursos, Asesoría Técnica y Cotización In-Company)
 * por correo electrónico a: sig.salta.2019@gmail.com
 *
 * Utiliza Google Apps Script Web App (sin intermediarios comerciales, sin
 * pasarelas externas y sin necesidad de confirmaciones periódicas de dominio).
 * ----------------------------------------------------------------------
 */

// Endpoint de la Web App de Google Apps Script vinculado a sig.salta.2019@gmail.com
const GOOGLE_SCRIPT_ENDPOINT = "https://script.google.com/macros/s/AKfycbwCcVUWN4hvjYc5SJcWx2sZJ1MvcUg8egs7UWrTvjgouyffQAUbbjigjxR5F7f4bL-MJQ/exec";

/**
 * Toma un <form> del DOM y devuelve un objeto plano { nombreCampo: valor }
 * con todos los campos que tengan atributo "name".
 * @param {HTMLFormElement} formEl
 * @returns {Object}
 */
function extractFormData(formEl) {
  const data = {};
  new FormData(formEl).forEach((value, key) => {
    data[key] = value;
  });
  return data;
}

/**
 * Envía un objeto de datos por correo electrónico a través de Google Apps Script.
 *
 * @param {Object} payload - Datos a enviar (nombre, email, teléfono, cursos, etc.).
 * @returns {Promise<boolean>} true si el envío fue exitoso, false si falló.
 */
async function sendFormDataByEmail(payload) {
  try {
    // Usamos text/plain;charset=utf-8 con mode: 'no-cors' para garantizar que
    // el navegador envíe la petición sin bloqueos por políticas de preflight CORS.
    await fetch(GOOGLE_SCRIPT_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    return true;
  } catch (error) {
    console.error("[GEO|FORMA] Error al enviar el formulario por correo:", error);
    return false;
  }
}
