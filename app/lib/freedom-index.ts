// Dato ancla de la banda "por qué ahora" del radar.
// FUENTE REAL (no inventar): Heritage Foundation — Index of Economic Freedom 2026.
// Argentina: score 57.4, +3.2 pts vs 2025 = la mayor mejora de todo el índice;
// puesto 106º (subió ~40 lugares desde ~146º). Categoría "Mostly Unfree".
// Verificado (jun 2026) contra Heritage 2026 + cobertura (Daily Signal).
// Para actualizar el año que viene: cambiar estos números + la fecha de la fuente.

export const freedomIndex = {
  year: 2026,
  score: 57.4,
  prevScore: 54.2, // 2025 (57.4 − 3.2)
  delta: 3.2,
  rank: 106,
  prevRank: 146,
  category: "Mostly Unfree",
  // claim verificado: la mayor suba de puntaje de todo el índice 2026
  biggestImproverWorld: true,
  source: {
    name: "Heritage Foundation · Índice de Libertad Económica 2026",
    url: "https://www.heritage.org/index/pages/country-pages/argentina",
  },
} as const;

// Segunda señal macro de la banda "por qué ahora": calificación soberana.
// FUENTE REAL (no inventar): S&P Global Ratings — subió la nota de Argentina a
// 'B-/B' desde 'CCC+/C', outlook estable (jun 2026), por superávit fiscal
// sostenido + acumulación de reservas (>US$10.000 M en los primeros 5 meses de
// 2026) e inflación en baja. Upgrade previo a 'CCC+' fue dic 2025.
// Verificado (jun 2026) contra el Research Update de S&P Global Ratings.
export const sovereignRating = {
  agency: "S&P Global Ratings",
  rating: "B-",
  prevRating: "CCC+",
  outlook: "estable",
  year: 2026,
  source: {
    name: "S&P Global Ratings · Research Update 2026",
    url: "https://www.spglobal.com/ratings/en/regulatory/article/-/view/sourceId/11133014",
  },
} as const;
