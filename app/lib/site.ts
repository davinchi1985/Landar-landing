// Configuración central del sitio. Fuente única de verdad.
// Cuando esté el dominio definitivo, cambiar SOLO `SITE_URL` acá.

export const SITE_URL = "https://www.inteligenci.ar";
export const SITE_NAME = "Inteligenci·AR";
export const SITE_EMAIL = "hola@inteligenci.ar";

// HubSpot — Forms Submission API pública (client-side, sin backend ni token).
// portalId y formGuid NO son secretos (son públicos por diseño).
export const HUBSPOT_PORTAL_ID = "51563664";
export const HUBSPOT_FORM_GUID = "31ba67cf-2982-4da7-85ff-f71eb4725596";
export const HUBSPOT_ENDPOINT = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;
