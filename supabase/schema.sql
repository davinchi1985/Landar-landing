-- ============================================================
-- Radar de oportunidades — schema + RLS (Supabase / Postgres)
-- Correr una vez en Supabase → SQL Editor → New query → Run.
-- Idempotente: se puede re-correr sin romper.
-- ============================================================

create extension if not exists "pgcrypto";

-- Tandas = cada ingesta/fuente (entrevista, anuncio, etc.)
create table if not exists public.tandas (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,
  tipo              text not null,
  titulo            text not null,
  canal             text,
  url               text,
  fecha_publicacion date not null,
  ingesta_fecha     date,
  created_at        timestamptz not null default now()
);

-- Medidas = cada desregulación/oportunidad (una tarjeta del radar)
create table if not exists public.medidas (
  id                  text primary key,                 -- slug kebab-case
  tanda_id            uuid references public.tandas(id) on delete set null,
  titulo              text not null,
  sector              text not null,
  organismo_afectado  text,
  instrumento         text,
  estado              text not null,                    -- proyecto | proyecto_a_congreso | anunciado | vigente | en_proceso
  fecha               text,
  resumen             text not null,
  que_cambia          jsonb,                            -- string[]
  oportunidades       jsonb,                            -- Oportunidad[]
  tags                text[],
  fuentes             jsonb,                            -- FuenteMedida[]
  published           boolean not null default false,
  orden               int,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Suscriptores al feed semanal
create table if not exists public.suscriptores (
  id           uuid primary key default gen_random_uuid(),
  email        text unique not null,
  lang         text,
  source       text,
  confirmed    boolean not null default false,
  unsub_token  uuid not null default gen_random_uuid(),
  created_at   timestamptz not null default now()
);

-- updated_at automático en medidas
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists medidas_touch on public.medidas;
create trigger medidas_touch
  before update on public.medidas
  for each row execute function public.touch_updated_at();

-- ============================================================
-- RLS — Row Level Security
-- service_role (seed / admin / suscripción) BYPASSA RLS.
-- anon (lectura pública del feed) sólo ve medidas published.
-- ============================================================
alter table public.tandas enable row level security;
alter table public.medidas enable row level security;
alter table public.suscriptores enable row level security;

drop policy if exists "tandas_public_read" on public.tandas;
create policy "tandas_public_read" on public.tandas
  for select using (true);

drop policy if exists "medidas_public_read" on public.medidas;
create policy "medidas_public_read" on public.medidas
  for select using (published = true);

-- suscriptores: sin políticas públicas → anon no lee ni escribe.
-- El insert de suscripción va por service-role desde una Server Action.
