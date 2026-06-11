// Feed "Qué se derogó esta semana" — radar de oportunidades regulatorias.
// Capa pública (SEO + lead magnet). Data curada de fuentes públicas.
// Para sumar una tanda: agregá un objeto Feed con su `fuente` + `medidas`.
//
// REGLA DE COPY (innegociable): muchas medidas son PROYECTO/anuncio, NO vigentes.
// El campo `estado` lo comunica en cada tarjeta. No prometer nada como hecho consumado.

export type EstadoMedida =
  | "proyecto"
  | "proyecto_a_congreso"
  | "anunciado"
  | "vigente"
  | "en_proceso";

export type TipoOportunidad = "negocio" | "inversion" | "contenido";

export interface Oportunidad {
  titulo: string;
  descripcion?: string;
  tipo: TipoOportunidad;
  perfil?: string;
}

export interface FuenteMedida {
  medio: string;
  url: string;
}

export interface Medida {
  id: string;
  titulo: string;
  sector: string;
  organismo_afectado?: string;
  instrumento?: string;
  estado: EstadoMedida;
  fecha?: string;
  resumen: string;
  que_cambia?: string[];
  oportunidades?: Oportunidad[];
  tags?: string[];
  fuentes?: FuenteMedida[];
}

export interface FuenteTanda {
  tipo: string;
  titulo: string;
  canal?: string;
  url?: string;
  fecha_publicacion: string;
  ingesta_fecha?: string;
}

export interface Tanda {
  fuente: FuenteTanda;
  medidas: Medida[];
}

export const ESTADO_LABEL: Record<EstadoMedida, string> = {
  proyecto: "Proyecto",
  proyecto_a_congreso: "A Congreso",
  anunciado: "Anunciado",
  vigente: "Vigente",
  en_proceso: "En proceso",
};

export const TIPO_LABEL: Record<TipoOportunidad, string> = {
  negocio: "Negocio",
  inversion: "Inversión",
  contenido: "Contenido",
};

export const tandas: Tanda[] = [
  {
    fuente: {
      tipo: "curaduria",
      titulo:
        "Reforma laboral en marcha — renegociación masiva de convenios colectivos",
      canal: "Ministerio de Capital Humano / Secretaría de Trabajo",
      fecha_publicacion: "2026-06-11",
      ingesta_fecha: "2026-06-11",
    },
    medidas: [
      {
        id: "reforma-laboral-convenios-colectivos-2026",
        titulo: "Reforma laboral: 446 convenios colectivos vencidos a renegociar",
        sector: "laboral",
        organismo_afectado:
          "Secretaría de Trabajo (Ministerio de Capital Humano) / convenios colectivos sectoriales",
        instrumento:
          "Decreto 407/2026 (reglamenta la Ley 27.802 de Modernización Laboral)",
        estado: "vigente",
        fecha: "2026-06",
        resumen:
          "El Gobierno amplió de 150 a 446 la cantidad de convenios colectivos vencidos que empresarios y sindicatos deberán renegociar, al reglamentar la Ley 27.802 de Modernización Laboral. La reforma termina con la 'ultraactividad': las cláusulas de aportes compulsivos caducan al vencer el convenio, y se abre la renegociación de condiciones de trabajo sector por sector.",
        que_cambia: [
          "446 convenios colectivos vencidos entran en proceso de renegociación obligatoria (antes eran 150)",
          "Fin de la ultraactividad: las cláusulas obligacionales (cuotas solidarias y aportes compulsivos) caducan al vencer el convenio",
          "Las condiciones de trabajo (cláusulas normativas) se renegocian entre empresarios y sindicatos",
          "Alcanza a sectores clave como la construcción, entre muchas otras industrias",
        ],
        oportunidades: [
          {
            titulo: "Convenios modernos = contratar en Argentina con menos riesgo",
            descripcion:
              "La renegociación sectorial apunta a condiciones laborales más previsibles y flexibles — una ventana para empresas extranjeras que evalúan contratar o instalar operaciones con costos laborales más claros.",
            tipo: "negocio",
            perfil: "hiring / EOR / industria",
          },
        ],
        tags: ["laboral", "convenios-colectivos", "modernizacion-laboral", "hiring", "ultraactividad"],
        fuentes: [
          {
            medio: "Infobae",
            url: "https://www.infobae.com/politica/2026/06/11/reforma-laboral-el-gobierno-amplio-a-446-la-cantidad-de-convenios-colectivos-que-deberan-renegociar-empresarios-y-sindicalistas/",
          },
        ],
      },
    ],
  },
  {
    fuente: {
      tipo: "curaduria",
      titulo:
        "Aperturas estructurales para el capital extranjero — aviación, mercado de capitales y satelital",
      canal: "Boletín Oficial / CNV / ENACOM",
      fecha_publicacion: "2026-06-10",
      ingesta_fecha: "2026-06-10",
    },
    medidas: [
      {
        id: "cielos-abiertos-aviacion-2024",
        titulo: "Cielos abiertos: apertura del mercado aerocomercial",
        sector: "aviacion_aerocomercial",
        organismo_afectado:
          "Transporte aéreo / fin de la exclusividad de Aerolíneas Argentinas",
        instrumento:
          "DNU 70/2023 + Decreto reglamentario 599/2024 (deroga la Ley 19.030/1971)",
        estado: "vigente",
        fecha: "2024-07",
        resumen:
          "Política de 'cielos abiertos': deroga la Ley 19.030 de 1971 y abre el mercado aerocomercial a operadores extranjeros. Desde diciembre de 2023 ya hay 27 países con acuerdos de cielos abiertos.",
        que_cambia: [
          "Deroga la Ley 19.030/1971 que reservaba el cabotaje a aerolíneas nacionales",
          "Elimina la exclusividad de rutas y el piso del 50% de operaciones para Aerolíneas Argentinas",
          "Habilita aeronaves y tripulación extranjeras bajo acuerdos de reciprocidad",
          "Elimina las tarifas mínimas reguladas",
          "27 países sumados a acuerdos desde dic 2023 + nuevas rutas internacionales desde las provincias",
        ],
        oportunidades: [
          {
            titulo: "Más conectividad y menor costo logístico aéreo",
            descripcion:
              "Más aerolíneas, rutas y carga aérea mejoran la logística para empresas que importan, exportan y mueven personal.",
            tipo: "negocio",
            perfil: "logistica / turismo / exportacion",
          },
        ],
        tags: ["cielos-abiertos", "aviacion", "cabotaje", "dnu70", "logistica", "exportacion"],
        fuentes: [
          {
            medio: "Chequeado",
            url: "https://chequeado.com/el-explicador/el-dnu-de-javier-milei-que-es-la-politica-de-cielos-abiertos-y-como-impactara-en-los-viajes-en-avion/",
          },
          {
            medio: "El Cronista",
            url: "https://www.cronista.com/negocios/tres-aerolineas-internacionales-ya-estan-habilitadas-para-volar-en-los-cielos-abiertos-argentinos/",
          },
          {
            medio: "Infobae",
            url: "https://www.infobae.com/economia/2026/05/21/suman-nuevas-rutas-aereas-internacionales-desde-las-provincias-sin-pasar-por-buenos-aires-una-por-una-cuales-son/",
          },
        ],
      },
      {
        id: "big-bang-mercado-capitales-cnv-2026",
        titulo: "Big Bang del mercado de capitales: autorización automática de emisiones",
        sector: "mercado_de_capitales",
        organismo_afectado: "Comisión Nacional de Valores (CNV)",
        instrumento:
          "Resoluciones Generales CNV 1145 a 1150/2026 (Boletín Oficial, 11/6/2026)",
        estado: "vigente",
        fecha: "2026-06",
        resumen:
          "El 'Big Bang' de la CNV ya rige: las RG 1145-1150/2026 reemplazan la aprobación previa de emisiones por autorización automática (presentar un filing en vez de pedir permiso). La gran mayoría de las emisiones de deuda de hasta ~US$130-140M sale al mercado sin autorización previa, bajo el nuevo Régimen de Autorización Automática de Mediano Impacto Ampliado.",
        que_cambia: [
          "Reemplaza la aprobación previa de la CNV por autorización automática de oferta pública (modelo de filing + control posterior)",
          "FCI abiertos: desaparece la aprobación previa sin importar el tamaño de la emisión",
          "Acciones, obligaciones negociables, FCI cerrados y fideicomisos financieros hasta 100 millones de UVAs (~US$130-140M): autorización automática",
          "Por encima de 100MM UVAs tampoco requieren aprobación previa si se dirigen a inversores calificados",
          "Baja el umbral de inversor calificado de 350.000 a 200.000 UVAs (~US$300.000 en activos)",
          "RG 1150: tokenización extendida a los regímenes automáticos + sandbox regulatorio prorrogado al 31/12/2027",
        ],
        oportunidades: [
          {
            titulo: "Financiamiento más ágil para empresas (y tokenización)",
            descripcion:
              "Emitir deuda o acciones en días y no meses, decidido por el CFO y no por un trámite; más una ventana regulatoria para estructuras on-chain / tokenización de activos.",
            tipo: "inversion",
            perfil: "finanzas / fintech / cripto",
          },
        ],
        tags: ["mercado-de-capitales", "cnv", "obligaciones-negociables", "tokenizacion", "financiamiento"],
        fuentes: [
          {
            medio: "Argentina.gob.ar (oficial)",
            url: "https://www.argentina.gob.ar/noticias/big-bang-regulatorio-desregulacion-de-aprobaciones-para-emisoras-ffs-y-fcis-regimen-de-0",
          },
          {
            medio: "Ámbito",
            url: "https://www.ambito.com/finanzas/mercado-capitales-la-cnv-oficializo-el-big-bang-regulatorio-y-se-agilizan-las-emisiones-autorizaciones-automaticas-n6287460",
          },
          {
            medio: "El Cronista",
            url: "https://www.cronista.com/finanzas-mercados/transformacion-financiera-cnv-aprobo-las-normas-que-traeran-un-cambio-radical-en-el-mercado-argentino/",
          },
        ],
      },
      {
        id: "satelital-starlink-enacom-2026",
        titulo: "Liberalización del mercado satelital (Starlink y competidores)",
        sector: "telecomunicaciones",
        organismo_afectado: "ENACOM / mercado de servicios satelitales",
        instrumento:
          "DNU 70/2023 (deroga art. 34 de la Ley 27.078) + ENACOM Resolución 372/2026",
        estado: "vigente",
        fecha: "2026",
        resumen:
          "Liberalización del mercado de servicios satelitales. El DNU 70/2023 derogó el artículo 34 de la Ley Argentina Digital y dispuso la libre provisión con solo registro; ENACOM (Res. 372/2026) autorizó a Starlink nuevas bandas. Argentina es el mercado de mayor crecimiento global de Starlink.",
        que_cambia: [
          "Deroga el art. 34 de la Ley Argentina Digital (27.078): libre provisión de servicios satelitales",
          "Solo exige registro de operación para coordinar frecuencias (sin autorización discrecional previa)",
          "ENACOM Res. 372/2026 habilita a Starlink nuevas bandas (Gateways v5)",
          "Mercado abierto a competidores globales, no a un único operador",
        ],
        oportunidades: [
          {
            titulo: "Conectividad satelital para operar en cualquier punto del país",
            descripcion:
              "Internet de alta velocidad en zonas rurales y remotas habilita operaciones de agro, minería, energía y logística fuera de las ciudades.",
            tipo: "negocio",
            perfil: "tech / conectividad / agro",
          },
        ],
        tags: ["telecomunicaciones", "satelital", "starlink", "enacom", "conectividad", "dnu70"],
        fuentes: [
          {
            medio: "ENACOM (oficial)",
            url: "https://www.enacom.gob.ar/institucional/enacom-autoriza-a-starlink-argentina-a-operar-en-nuevas-bandas-de-frecuencia-satelital_n4841",
          },
          {
            medio: "Convergencia",
            url: "https://www.convergencia.com/ultimas-noticias-telematica/starlink-y-la-desregulacion-del-mercado-de-servicios-satelitales-en-argentina/",
          },
          {
            medio: "Infobae",
            url: "https://www.infobae.com/economia/2026/04/08/locos-por-starlink-por-que-argentina-es-el-pais-donde-mas-crecio-la-internet-de-elon-musk-y-cual-es-el-nuevo-servicio-que-lanzaran/",
          },
        ],
      },
    ],
  },
  {
    fuente: {
      tipo: "curaduria",
      titulo:
        "Tanda desregulación junio 2026 — Boletín Oficial y prensa económica",
      canal:
        "Ministerio de Desregulación y Transformación del Estado / Boletín Oficial",
      fecha_publicacion: "2026-06-09",
      ingesta_fecha: "2026-06-10",
    },
    medidas: [
      {
        id: "derogacion-58-normas-comercio-2026",
        titulo: "Derogación de 58 normas de comercio, industria e importación",
        sector: "comercio_interior",
        organismo_afectado:
          "Secretaría de Coordinación de Producción / Ministerio de Economía",
        instrumento: "Resolución 12/2026 (Secretaría de Coordinación de Producción)",
        estado: "vigente",
        fecha: "2026-06-09",
        resumen:
          "Deroga 58 resoluciones y disposiciones de comercio, industria, importaciones y programas de consumo por considerarlas sin vigencia ni sustento jurídico tras las reformas de la gestión.",
        que_cambia: [
          "Deroga 30 normas de Ahora 12 / Cuota Simple y la Resolución 355/2022 (Precios Cuidados) con sus 19 modificatorias",
          "Deroga 22 regulaciones del Fondo Estabilizador del Trigo Argentino (FETA)",
          "Deroga las Resoluciones 254/2019 y 43/2022 sobre autorizaciones de importación",
          "Elimina la obligación de los colegios privados de informar aranceles por anticipado (Res. 368/2025)",
        ],
        oportunidades: [
          {
            titulo: "Menos fricción para importar y comerciar",
            descripcion:
              "Caen autorizaciones previas y esquemas de control de precios que encarecían y trababan la operación cotidiana.",
            tipo: "negocio",
            perfil: "comercio / importacion",
          },
        ],
        tags: ["derogacion", "comercio", "importacion", "precios", "ley-hojarasca"],
        fuentes: [
          {
            medio: "BAE Negocios",
            url: "https://www.baenegocios.com/politica/el-gobierno-derogo-58-normas-comerciales-mientras-avanza-la-ley-hojarasca/",
          },
          {
            medio: "Ámbito",
            url: "https://www.ambito.com/economia/el-gobierno-profundiza-la-desregulacion-consumo-e-industria-y-deroga-16-resoluciones-economicas-cuales-son-y-que-cambia-partir-hoy-n6286638",
          },
          {
            medio: "La Nación",
            url: "https://www.lanacion.com.ar/economia/el-gobierno-derogo-16-resoluciones-del-ministerio-de-economia-de-ahora-12-al-fondo-estabilizador-del-nid09062026/",
          },
        ],
      },
      {
        id: "ley-hojarasca-2026",
        titulo: "Ley Hojarasca: derogación de más de 70 leyes obsoletas",
        sector: "marco_normativo",
        organismo_afectado: "Congreso de la Nación / leyes en desuso",
        instrumento: "Proyecto de ley (con media sanción de Diputados)",
        estado: "en_proceso",
        fecha: "2026-06",
        resumen:
          "Proyecto elaborado por el Ministerio de Desregulación para eliminar más de 70 leyes consideradas obsoletas. Cuenta con media sanción de la Cámara de Diputados y se debate en el Senado.",
        que_cambia: [
          "Propone derogar más de 70 leyes consideradas obsoletas",
          "Ya tiene media sanción de la Cámara de Diputados",
          "En tratamiento en el Senado",
        ],
        oportunidades: [
          {
            titulo: "Marco legal más simple y previsible",
            descripcion:
              "La limpieza de leyes en desuso reduce zonas grises e incertidumbre regulatoria para operar.",
            tipo: "contenido",
            perfil: "regulatorio",
          },
        ],
        tags: ["ley-hojarasca", "derogacion", "congreso", "simplificacion"],
        fuentes: [
          {
            medio: "InfoRegión",
            url: "https://www.inforegion.com.ar/2026/06/09/desregulacion-del-gobierno-eliminan-58-normas-y-avanzan-con-la-ley-hojarasca/",
          },
          {
            medio: "El Cronista",
            url: "https://www.cronista.com/economia-politica/sturzenegger-acelera-su-agenda-de-desregulacion-y-lleva-la-ley-hojarasca-al-recinto/",
          },
        ],
      },
      {
        id: "anmat-productos-medicos-2026",
        titulo: "Desregulación de la importación de productos médicos de bajo riesgo",
        sector: "salud_dispositivos",
        organismo_afectado: "ANMAT",
        instrumento: "Medida administrativa (anuncio) — vigencia 24 jul 2026",
        estado: "anunciado",
        fecha: "2026-06",
        resumen:
          "El Gobierno anunció la desregulación de la importación de productos médicos considerados de bajo riesgo, con entrada en vigencia el 24 de julio de 2026.",
        que_cambia: [
          "Alcanza productos de bajo riesgo: termómetros, jeringas estériles, agujas, tensiómetros, vendas, gasas y desinfectantes de lentes",
          "Agiliza la importación y apunta a reducir el costo de estos insumos",
          "Entra en vigencia el 24 de julio de 2026",
        ],
        oportunidades: [
          {
            titulo: "Importación y distribución de dispositivos médicos de bajo riesgo",
            descripcion:
              "Menos trámites para traer e introducir insumos médicos de uso masivo al mercado argentino.",
            tipo: "negocio",
            perfil: "salud / importacion",
          },
        ],
        tags: ["anmat", "salud", "dispositivos-medicos", "importacion"],
        fuentes: [
          {
            medio: "Página/12",
            url: "https://www.pagina12.com.ar/837073-anmat-desregula-la-importacion-de-productos-medicos-consider",
          },
        ],
      },
      {
        id: "cabotaje-maritimo-2026",
        titulo: "Apertura del cabotaje marítimo a buques de bandera extranjera",
        sector: "transporte_maritimo",
        organismo_afectado: "Reserva de bandera / marina mercante",
        instrumento: "Proyecto en preparación (aún no enviado al Congreso)",
        estado: "proyecto",
        fecha: "2026-06",
        resumen:
          "Proyecto en preparación en el Ministerio de Desregulación para flexibilizar el cabotaje nacional y abrir la navegación de los ríos y mares argentinos.",
        que_cambia: [
          "Habilitaría a buques de bandera extranjera a operar hasta 90 días en rutas de cabotaje",
          "Condición: la tripulación debería ser obligatoriamente del Mercosur",
          "Flexibiliza la reserva de bandera vigente (hoy exige embarcaciones de matrícula nacional)",
        ],
        oportunidades: [
          {
            titulo: "Menor costo logístico fluvial y marítimo",
            descripcion:
              "La apertura del cabotaje a operadores extranjeros puede bajar costos de transporte para cargas y exportación.",
            tipo: "negocio",
            perfil: "logistica / exportacion",
          },
        ],
        tags: ["cabotaje", "marina-mercante", "logistica", "exportacion", "mercosur"],
        fuentes: [
          {
            medio: "El Cronista",
            url: "https://www.cronista.com/economia-politica/marina-mercante-las-advertencias-del-sector-sobre-la-desregulacion-que-prepara-sturzenegger/",
          },
        ],
      },
      {
        id: "importacion-maquinaria-usada-2026",
        titulo: "Importación de maquinaria y equipos usados sin restricciones",
        sector: "bienes_de_capital",
        organismo_afectado: "Aduana / Certificado de Importación de Bienes Usados (CIBU)",
        instrumento: "Decreto 273/2025 (vigente) — con dictamen de comisión que busca derogarlo",
        estado: "vigente",
        fecha: "2025",
        resumen:
          "El Decreto 273/2025 permite importar maquinaria y equipos usados sin restricciones y eliminó el Certificado de Importación de Bienes Usados (CIBU). En Diputados hay un dictamen de comisión que propone derogarlo: hay riesgo de reversión.",
        que_cambia: [
          "Permite importar maquinaria y equipos usados sin restricciones",
          "Elimina el Certificado de Importación de Bienes Usados (CIBU)",
          "Beneficia a PYMES y contratistas que renuevan un parque tecnológico obsoleto",
          "Atención: hay un dictamen de comisión en Diputados que propone derogarlo (no firme)",
        ],
        oportunidades: [
          {
            titulo: "Acceso a maquinaria y tecnología usada importada",
            descripcion:
              "Modernización de equipos a menor costo para PYMES e industria que requieren tecnología no producida localmente.",
            tipo: "inversion",
            perfil: "industria / pymes",
          },
        ],
        tags: ["maquinaria-usada", "cibu", "bienes-de-capital", "pymes", "importacion"],
        fuentes: [
          {
            medio: "HCDN (Cámara de Diputados)",
            url: "https://www.hcdn.gob.ar/prensa/noticia/DICTAMEN-FAVORABLE-A-LA-DEROGACION-DE-IMPORTACIONES-IRRESTRICTAS-DE-MAQUINARIAS-USADAS/",
          },
          {
            medio: "AFoA",
            url: "https://afoa.org.ar/afoa-solicita-al-congreso-mantener-la-desregulacion-de-la-importacion-de-bienes-usados-para-sostener-la-modernizacion-tecnologica-de-las-pymes/",
          },
        ],
      },
    ],
  },
  {
    fuente: {
      tipo: "entrevista",
      titulo:
        "Entrevista al Ministro Sturzenegger en Neura Media (programa ArgenData)",
      canal: "Ministerio de Desregulación y Transformación del Estado",
      url: "https://www.youtube.com/watch?v=YKQ-Tmdatlw",
      fecha_publicacion: "2026-06-05",
      ingesta_fecha: "2026-06-08",
    },
    medidas: [
      {
        id: "inmobiliaria-corretaje-2026",
        titulo: "Desregulación inmobiliaria y del corretaje",
        sector: "inmobiliario",
        organismo_afectado: "Colegios y consejos profesionales inmobiliarios",
        instrumento: "Proyecto de ley",
        estado: "proyecto_a_congreso",
        fecha: "2026-06",
        resumen:
          "Paquete legislativo que entra al Congreso en junio 2026 para liberalizar la intermediación inmobiliaria y quitar privilegios fijados por ley.",
        que_cambia: [
          "Elimina la matrícula obligatoria y el título universitario para ejercer como corredor",
          "Habilita a personas humanas y jurídicas a actuar como corredores",
          "Honorarios y comisiones de libre acuerdo, sin pisos mínimos ni topes máximos",
          "Trabajo interjurisdiccional sin restricciones",
          "Habilita explícitamente el corretaje vía plataformas digitales, apps y entornos virtuales",
          "Permite ejercer en simultáneo con otras profesiones o actividades lícitas",
        ],
        oportunidades: [
          {
            titulo: "Marketplace / proptech de inmuebles sin colegiación",
            descripcion:
              "La habilitación de corretaje por plataformas y la baja de barreras de entrada abren un Mercado-Libre-de-inmuebles sin gatekeeping de colegios.",
            tipo: "negocio",
            perfil: "e-commerce / marketplaces",
          },
        ],
        tags: ["corretaje", "plataformas", "colegios", "vivienda", "uva"],
        fuentes: [
          {
            medio: "La Nación",
            url: "https://www.lanacion.com.ar/propiedades/inversiones/desregulacion-del-mercado-inmobiliario-cuales-son-los-cambios-en-el-proyecto-que-se-presentara-en-nid01062026/",
          },
          {
            medio: "APFDigital",
            url: "https://www.apfdigital.com.ar/noticias/2026/06/01/458194-desregulacion-inmobiliaria-llega-junio-y-sturzenegger-acelera-el-proyecto-y-crece-tension-con-los-colegios",
          },
        ],
      },
      {
        id: "colegios-profesionales-2026",
        titulo: "Desregulación de colegios y consejos profesionales",
        sector: "servicios_profesionales",
        organismo_afectado: "Colegios profesionales",
        instrumento: "Proyecto de ley (mismo paquete)",
        estado: "proyecto_a_congreso",
        fecha: "2026-06",
        resumen:
          "Eliminar privilegios creados por ley en las profesiones colegiadas. Frase eje: que un colegio fije precio mínimo es 'una aberración social'.",
        que_cambia: [
          "Elimina honorarios mínimos fijados por colegios",
          "Elimina la matriculación obligatoria como barrera de entrada",
          "Apunta a competencia por calidad, no por imposición legal",
        ],
        oportunidades: [
          {
            titulo: "Servicios profesionales digitales sin matrícula",
            descripcion:
              "Nuevos entrantes y plataformas pueden ofrecer servicios antes reservados a colegiados.",
            tipo: "negocio",
            perfil: "servicios / saas",
          },
        ],
        tags: ["colegios", "honorarios", "barreras-entrada", "competencia"],
        fuentes: [
          {
            medio: "La Nación",
            url: "https://www.lanacion.com.ar/propiedades/casas-y-departamentos/federico-sturzenegger-confirmo-que-en-junio-enviara-la-desregulacion-inmobiliaria-al-congreso-para-nid28042026/",
          },
        ],
      },
      {
        id: "pilas-baterias-2026",
        titulo: "Liberación de importación de pilas y baterías",
        sector: "importacion_electronica",
        organismo_afectado:
          "Secretaría de Turismo y Ambiente / Secretaría de Coordinación de Producción",
        instrumento: "Resolución Conjunta 1/2026 (publicada en el Boletín Oficial)",
        estado: "vigente",
        fecha: "2026-06-05",
        resumen:
          "Elimina las autorizaciones previas para importar y comercializar pilas y baterías y reconoce certificaciones internacionales en vez de exigir certificación local redundante.",
        que_cambia: [
          "Desaparecen las autorizaciones previas para importar y comercializar",
          "El cumplimiento se acredita por declaración jurada de conformidad + informes de ensayo o certificación internacional",
          "Reconoce la validez de certificaciones de organismos técnicos extranjeros habilitados",
          "Todos los trámites pasan a ser digitales vía Trámites a Distancia (TAD)",
          "Abarata juguetes, relojes y electrónica de consumo cotidiana",
        ],
        oportunidades: [
          {
            titulo: "Importación de electrónica y accesorios a menor costo",
            descripcion:
              "Menos fricción y costo para importar componentes, accesorios y electrónica de consumo.",
            tipo: "negocio",
            perfil: "importacion / tech",
          },
        ],
        tags: [
          "importacion",
          "certificacion",
          "estandares-internacionales",
          "electronica",
        ],
        fuentes: [
          {
            medio: "El Economista",
            url: "https://eleconomista.com.ar/economia/otro-kiosko-va-nueva-desregulacion-anuncio-sturzenegger-n95543",
          },
          {
            medio: "Infobae",
            url: "https://www.infobae.com/economia/2026/06/05/el-gobierno-elimino-tramites-y-flexibilizo-la-importacion-de-pilas-y-baterias-como-funciona-el-nuevo-regimen/",
          },
        ],
      },
      {
        id: "habilitaciones-municipales-arca-2026",
        titulo: "Eliminación de habilitaciones municipales en trámites nacionales",
        sector: "comercio_exterior",
        organismo_afectado: "Municipios / ARCA",
        instrumento: "ARCA Resolución General 5845/2026",
        estado: "vigente",
        fecha: "2026-05",
        resumen:
          "Quita la exigencia de presentar habilitaciones municipales como requisito en trámites nacionales para depósitos fiscales y exportaciones en planta.",
        que_cambia: [
          "No se exige habilitación municipal para depósitos fiscales",
          "No se exige para exportaciones en planta",
          "Reduce duplicaciones administrativas y costos operativos",
        ],
        oportunidades: [
          {
            titulo: "Menor costo logístico de exportación",
            descripcion:
              "Trámites de exportación más ágiles para empresas que operan con planta propia.",
            tipo: "negocio",
            perfil: "exportacion / logistica",
          },
        ],
        tags: ["exportacion", "municipios", "arca", "tramites"],
        fuentes: [
          {
            medio: "Perfil",
            url: "https://www.perfil.com/noticias/economia/sturzenegger-apunto-contra-los-municipios-y-anuncio-otra-desregulacion-para-exportar-a40.phtml",
          },
        ],
      },
      {
        id: "yerba-mate-inym-dnu70",
        titulo: "Desregulación yerbatera (caso testigo)",
        sector: "agro_alimentos",
        organismo_afectado: "Instituto Nacional de la Yerba Mate (INYM)",
        instrumento: "DNU 70/2023 + derogación Resolución 170 INYM",
        estado: "vigente",
        fecha: "2023-12",
        resumen:
          "Caso que usa para vender el modelo: le quitaron al INYM la facultad de fijar precios y derogaron los límites a nuevas plantaciones. Resultado que reivindica: récord de producción y exportación y baja del precio al consumidor.",
        que_cambia: [
          "INYM pierde la facultad de fijar el precio de la yerba",
          "Deroga la Resolución 170 (límites a nuevas hectáreas cultivadas)",
          "Abre el mercado a competencia plena (productores, secaderos, molinos, marcas)",
        ],
        oportunidades: [
          {
            titulo: "Apertura de mercado de exportación",
            descripcion:
              "Narrativa 'mercado liberado → récord de exportación', usable como caso y replicable a otros rubros.",
            tipo: "contenido",
            perfil: "narrativa / agro",
          },
        ],
        tags: ["yerba", "inym", "precios", "exportacion", "dnu70", "caso-modelo"],
        fuentes: [
          {
            medio: "La Nación",
            url: "https://www.lanacion.com.ar/economia/campo/el-precio-cayo-a-la-mitad-sturzenegger-apunto-contra-un-instituto-y-defendio-la-desregulacion-en-la-nid04062026/",
          },
          {
            medio: "Primera Edición",
            url: "https://www.primeraedicion.com.ar/nota/101111625/sturzenegger-volvio-a-defender-la-desregulacion-yerbatera-y-aseguro-que-el-inym-hacia-pagar-el-doble-a-los-consumidores/",
          },
        ],
      },
      {
        id: "patentes-propiedad-intelectual-2026",
        titulo: "Adecuación del régimen de patentes a estándares internacionales",
        sector: "propiedad_intelectual",
        organismo_afectado: "INPI / régimen de patentes",
        instrumento: "Derogación de resoluciones + reformas a tratar en Congreso",
        estado: "en_proceso",
        fecha: "2026-03",
        resumen:
          "Alineación del marco de propiedad intelectual a estándares internacionales, en el marco del acuerdo comercial con EE.UU. de febrero 2026.",
        que_cambia: [
          "Adhesión al Tratado de Cooperación en materia de Patentes (PCT)",
          "Convenios internacionales: Tratado de Budapest, Protocolo de Madrid",
          "Modifica el registro de medicamentos y otras invenciones",
        ],
        oportunidades: [
          {
            titulo: "Mayor previsibilidad para innovación y registro internacional",
            descripcion:
              "Marco de PI alineado facilita patentar y operar para empresas tecnológicas.",
            tipo: "negocio",
            perfil: "tech / innovacion",
          },
        ],
        tags: ["patentes", "pi", "pct", "acuerdo-eeuu"],
        fuentes: [
          {
            medio: "Perfil",
            url: "https://www.perfil.com/noticias/economia/sturzenegger-explico-los-cambios-tras-la-desregulacion-de-las-patentes-en-argentina-a40.phtml",
          },
        ],
      },
      {
        id: "ley-semillas-inase-2026",
        titulo: "Reforma de la Ley de Semillas y transformación del INASE",
        sector: "agro",
        organismo_afectado: "INASE",
        instrumento: "Nueva normativa / proyecto",
        estado: "anunciado",
        fecha: "2026-05",
        resumen:
          "Cambios en la Ley de Semillas para mejorar productividad agropecuaria, con foco en biotecnología y propiedad intelectual de semillas. Objetivo declarado: duplicar producción. En junio 2026 se sumó un nuevo protocolo de control de identidad varietal en grano para acercar al país a la 'frontera tecnológica'.",
        que_cambia: [
          "Transformación del INASE",
          "Mayor protección de PI en semillas",
          "Marco para biotecnología agrícola",
          "Nuevo protocolo de control de identidad varietal en grano (jun 2026)",
        ],
        oportunidades: [
          {
            titulo: "Inversión en biotecnología y semillas",
            descripcion:
              "Mejores reglas de PI pueden atraer inversión al desarrollo de semillas.",
            tipo: "inversion",
            perfil: "agro / biotech",
          },
        ],
        tags: ["semillas", "inase", "agro", "biotecnologia", "pi"],
        fuentes: [
          {
            medio: "El Liberal",
            url: "https://www.elliberal.com.ar/nota/79850/2026/05/sturzenegger-anuncio-cambios-en-la-ley-de-semillas-y-apunto-a-duplicar-la-produccion-agropecuaria",
          },
          {
            medio: "La Nación",
            url: "https://www.lanacion.com.ar/economia/campo/deuda-historica-sturzenegger-defendio-el-nuevo-protocolo-de-control-de-semillas-y-revelo-que-pidio-nid08062026/",
          },
        ],
      },
    ],
  },
];

// Todas las medidas aplanadas, manteniendo referencia a su tanda/fuente.
export const medidas: Medida[] = tandas.flatMap((t) => t.medidas);

export const ultimaActualizacion: string =
  tandas[0]?.fuente.ingesta_fecha ?? tandas[0]?.fuente.fecha_publicacion ?? "";

export function sectorLabel(sector: string): string {
  return sector.replace(/_/g, " ");
}

// ---- FAQs por medida (AEO/GEO) ----
// Derivadas SÓLO de la data ya verificada de la medida (no agrega claims nuevos).
export interface FaqItem {
  q: string;
  a: string;
}

function estadoFrase(estado: EstadoMedida): string {
  switch (estado) {
    case "vigente":
      return "Sí: es una norma vigente.";
    case "anunciado":
      return "Fue anunciada, pero todavía no es una norma vigente; conviene confirmar su publicación oficial.";
    case "proyecto":
      return "No: es un proyecto, todavía no es ley.";
    case "proyecto_a_congreso":
      return "Todavía no: es un proyecto de ley que debe tratarse en el Congreso.";
    case "en_proceso":
      return "Está en proceso de implementación; todavía no está plenamente vigente.";
  }
}

export function medidaFaqs(m: Medida): FaqItem[] {
  const faqs: FaqItem[] = [];

  faqs.push({
    q: `¿Qué cambia con "${m.titulo}"?`,
    a:
      m.que_cambia && m.que_cambia.length > 0
        ? `${m.resumen} En concreto: ${m.que_cambia.join("; ")}.`
        : m.resumen,
  });

  faqs.push({
    q: `¿"${m.titulo}" ya es ley o está vigente?`,
    a: `${estadoFrase(m.estado)}${m.instrumento ? ` Instrumento: ${m.instrumento}.` : ""} Es información, no asesoramiento legal: verificá siempre el estado actual en la fuente oficial.`,
  });

  const op = m.oportunidades?.[0];
  if (op) {
    faqs.push({
      q: `¿Qué oportunidad abre para empresas?`,
      a: op.descripcion ? `${op.titulo}: ${op.descripcion}` : op.titulo,
    });
  }

  faqs.push({
    q: `¿A qué sector y organismo afecta?`,
    a: `Sector: ${sectorLabel(m.sector)}.${m.organismo_afectado ? ` Organismo afectado: ${m.organismo_afectado}.` : ""}`,
  });

  return faqs;
}

export function getAllIds(): string[] {
  return medidas.map((m) => m.id);
}

export function getMedida(id: string): Medida | undefined {
  return medidas.find((m) => m.id === id);
}

// Otras medidas del mismo sector (para interlinking en el detalle).
export function relacionadas(id: string, max = 3): Medida[] {
  const base = getMedida(id);
  if (!base) return [];
  const mismoSector = medidas.filter(
    (m) => m.id !== id && m.sector === base.sector,
  );
  const resto = medidas.filter(
    (m) => m.id !== id && m.sector !== base.sector,
  );
  return [...mismoSector, ...resto].slice(0, max);
}

// Tanda/fuente a la que pertenece una medida.
export function tandaDe(id: string): Tanda | undefined {
  return tandas.find((t) => t.medidas.some((m) => m.id === id));
}
