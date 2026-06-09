"use client";

import { useActionState } from "react";
import { upsertMedida, type AdminFormState } from "../lib/actions/admin";
import type { MedidaRow } from "../lib/supabase/types";

const ESTADOS = [
  "proyecto",
  "proyecto_a_congreso",
  "anunciado",
  "vigente",
  "en_proceso",
];

const initial: AdminFormState = { status: "idle" };

export default function MedidaForm({ medida }: { medida?: MedidaRow | null }) {
  const [state, formAction, pending] = useActionState(upsertMedida, initial);
  const isNew = !medida;

  return (
    <form className="admin-form" action={formAction}>
      <label>
        id (slug kebab-case)
        <input
          name="id"
          defaultValue={medida?.id ?? ""}
          readOnly={!isNew}
          required
          placeholder="mi-medida-2026"
        />
      </label>
      <label>
        Título
        <input name="titulo" defaultValue={medida?.titulo ?? ""} required />
      </label>
      <label>
        Sector
        <input
          name="sector"
          defaultValue={medida?.sector ?? ""}
          required
          placeholder="agro / inmobiliario / importacion_electronica…"
        />
      </label>
      <div className="admin-row">
        <label>
          Estado
          <select name="estado" defaultValue={medida?.estado ?? "anunciado"}>
            {ESTADOS.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </label>
        <label>
          Fecha
          <input name="fecha" defaultValue={medida?.fecha ?? ""} placeholder="2026-06" />
        </label>
      </div>
      <label>
        Organismo afectado
        <input name="organismo_afectado" defaultValue={medida?.organismo_afectado ?? ""} />
      </label>
      <label>
        Instrumento
        <input name="instrumento" defaultValue={medida?.instrumento ?? ""} />
      </label>
      <label>
        Resumen
        <textarea name="resumen" defaultValue={medida?.resumen ?? ""} required rows={3} />
      </label>
      <label>
        Qué cambia (uno por línea)
        <textarea
          name="que_cambia"
          defaultValue={(medida?.que_cambia ?? []).join("\n")}
          rows={5}
        />
      </label>
      <label>
        Tags (coma-separados)
        <input name="tags" defaultValue={(medida?.tags ?? []).join(", ")} />
      </label>
      <label>
        Oportunidades (JSON array)
        <textarea
          name="oportunidades"
          className="admin-mono"
          defaultValue={
            medida?.oportunidades ? JSON.stringify(medida.oportunidades, null, 2) : ""
          }
          rows={7}
          placeholder='[{"titulo":"…","descripcion":"…","tipo":"negocio","perfil":"…"}]'
        />
      </label>
      <label>
        Fuentes (JSON array)
        <textarea
          name="fuentes"
          className="admin-mono"
          defaultValue={medida?.fuentes ? JSON.stringify(medida.fuentes, null, 2) : ""}
          rows={4}
          placeholder='[{"medio":"La Nación","url":"https://…"}]'
        />
      </label>
      <label className="admin-check">
        <input type="checkbox" name="published" defaultChecked={medida?.published ?? false} />
        Publicada (visible en el sitio)
      </label>

      {state.status === "error" && <p className="admin-err">{state.message}</p>}

      <div className="admin-actions">
        <button className="btn btn--primary" type="submit" disabled={pending}>
          {pending ? "Guardando…" : "Guardar"}
        </button>
        <a className="link" href="/admin">
          Cancelar
        </a>
      </div>
    </form>
  );
}
