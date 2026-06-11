// Interlink radar → blog: medidas que tienen una guía pilar en el Journal.
// Mapa estático a propósito (no toca la DB); al publicar una guía nueva,
// agregar la entrada acá.

export interface GuiaRef {
  slug: string;
  titulo: string;
}

export const GUIA_DE_MEDIDA: Record<string, GuiaRef> = {
  "big-bang-mercado-capitales-cnv-2026": {
    slug: "argentina-capital-markets-big-bang-2026",
    titulo:
      "Argentina's Capital-Markets 'Big Bang': What the 2026 CNV Reform Means for Foreign Companies and Investors",
  },
  "reforma-laboral-convenios-colectivos-2026": {
    slug: "hiring-in-argentina-2026-labor-reform",
    titulo:
      "Hiring in Argentina After the 2026 Labor Reform: 446 Collective Agreements Head to Renegotiation",
  },
  "habilitaciones-municipales-arca-2026": {
    slug: "export-from-argentina-mercosur-base",
    titulo:
      "Using Argentina as an Export Base: Mercosur, Trade Agreements and the 2026 Customs Reforms",
  },
  "derogacion-58-normas-comercio-2026": {
    slug: "argentina-deregulation-2026-foreign-companies",
    titulo:
      "Argentina's 2026 Deregulation Wave: What the World's Biggest Economic-Freedom Gain Means for Foreign Companies",
  },
};
