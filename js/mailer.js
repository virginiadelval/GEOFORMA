/**
 * js/mailer.js
 * ----------------------------------------------------------------------
 * Módulo independiente encargado de enviar los datos de los formularios
 * del sitio (Checkout / Matrícula y Agendar Asesoría) por correo
 * electrónico a: sig.salta.2019@gmail.com
 *
 * Se utiliza el servicio gratuito FormSubmit (https://formsubmit.co),
 * que permite enviar mails desde un sitio 100% estático (sin backend
 * propio ni servidor de correo) mediante una simple petición fetch.
 *
 * ⚠️ ACTIVACIÓN (se hace una sola vez):
 * La PRIMERA vez que alguien complete cualquiera de los formularios,
 * FormSubmit enviará un correo de "confirmación de activación" a
 * sig.salta.2019@gmail.com. Hay que abrir ese correo y hacer clic en el
 * enlace de confirmación. A partir de ese momento, todos los envíos
 * futuros llegarán de forma automática a esa casilla, sin volver a pedir
 * confirmación.
 *
 * Si en el futuro se quiere reemplazar FormSubmit por un backend propio
 * o por otro proveedor (EmailJS, SendGrid, un servidor Node, etc.), solo
 * hay que modificar la constante FORMSUBMIT_ENDPOINT / la función
 * sendFormDataByEmail de este archivo. El resto del sitio no necesita
 * cambios porque siempre llama a la misma función.
 * ----------------------------------------------------------------------
 */

// Casilla de correo de destino de TODOS los formularios del sitio.
const DESTINATION_EMAIL = "sig.salta.2019@gmail.com";

// Endpoint de FormSubmit en modo "AJAX" (responde JSON en vez de redirigir de página).
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${DESTINATION_EMAIL}`;

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
 * Envía un objeto de datos por correo electrónico a DESTINATION_EMAIL
 * usando FormSubmit.
 *
 * @param {Object} payload - Datos a enviar. Se puede incluir la clave
 *        especial "_subject" para definir el asunto del correo.
 * @returns {Promise<boolean>} true si el envío fue exitoso, false si falló.
 */
async function sendFormDataByEmail(payload) {
  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`FormSubmit respondió con estado HTTP ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("[GEO|FORMA] Error al enviar el formulario por correo:", error);
    return false;
  }
}
