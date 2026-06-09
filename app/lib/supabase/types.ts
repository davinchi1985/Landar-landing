// Tipos de las filas de Supabase (Postgres). Mapean al schema en `supabase/schema.sql`.
// Los tipos de dominio que usa el front viven en `app/lib/oportunidades.ts`
// (Medida, Tanda, etc.); acá están las filas crudas de la DB y su conversión.

import type {
  EstadoMedida,
  Oportunidad,
  FuenteMedida,
} from "../oportunidades";

export interface TandaRow {
  id: string;
  tipo: string;
  titulo: string;
  canal: string | null;
  url: string | null;
  fecha_publicacion: string; // YYYY-MM-DD
  ingesta_fecha: string | null;
  created_at: string;
}

export interface MedidaRow {
  id: string; // slug
  tanda_id: string | null;
  titulo: string;
  sector: string;
  organismo_afectado: string | null;
  instrumento: string | null;
  estado: EstadoMedida;
  fecha: string | null;
  resumen: string;
  que_cambia: string[] | null;
  oportunidades: Oportunidad[] | null;
  tags: string[] | null;
  fuentes: FuenteMedida[] | null;
  published: boolean;
  orden: number | null;
  created_at: string;
  updated_at: string;
}

export interface SuscriptorRow {
  id: string;
  email: string;
  lang: string | null;
  source: string | null;
  confirmed: boolean;
  unsub_token: string;
  created_at: string;
}
