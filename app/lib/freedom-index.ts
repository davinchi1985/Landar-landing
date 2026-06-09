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
