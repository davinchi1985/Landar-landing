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
        organismo_afectado: "Secretaría de Comercio / certificación local",
        instrumento: "Medida administrativa",
        estado: "anunciado",
        fecha: "2026-06-05",
        resumen:
          "Elimina requisitos burocráticos para importar y comercializar pilas y baterías; reconoce estándares internacionales en vez de exigir certificación local.",
        que_cambia: [
          "Reconoce estándares de EE.UU., Europa y Japón como válidos",
          "Quita certificaciones locales redundantes",
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
          "Cambios en la Ley de Semillas para mejorar productividad agropecuaria, con foco en biotecnología y propiedad intelectual de semillas. Objetivo declarado: duplicar producción.",
        que_cambia: [
          "Transformación del INASE",
          "Mayor protección de PI en semillas",
          "Marco para biotecnología agrícola",
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
