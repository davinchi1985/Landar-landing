import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "../lib/auth";
import { listMedidasAdmin } from "../lib/radar-admin";
import { togglePublished } from "../lib/actions/admin";
import { ESTADO_LABEL, sectorLabel } from "../lib/oportunidades";

export const metadata: Metadata = {
  title: "Panel · Radar",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const user = await requireAdmin();
  const medidas = await listMedidasAdmin();

  return (
    <main className="admin-shell admin-wide">
      <header className="admin-head">
        <div>
          <h1>Radar · medidas</h1>
          <p className="muted">
            {medidas.length} medida(s) · {user.email}
          </p>
        </div>
        <Link className="btn btn--primary" href="/admin/new">
          + Nueva medida
        </Link>
      </header>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Medida</th>
            <th>Sector</th>
            <th>Estado</th>
            <th>Publicada</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {medidas.map((m) => (
            <tr key={m.id}>
              <td>
                <Link href={`/admin/${m.id}`}>{m.titulo}</Link>
                <div className="admin-slug">{m.id}</div>
              </td>
              <td>{sectorLabel(m.sector)}</td>
              <td>{ESTADO_LABEL[m.estado] ?? m.estado}</td>
              <td>
                <form action={togglePublished}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="next" value={(!m.published).toString()} />
                  <button
                    className={"admin-pill " + (m.published ? "on" : "off")}
                    type="submit"
                    title="Cambiar visibilidad"
                  >
                    {m.published ? "Sí" : "No"}
                  </button>
                </form>
              </td>
              <td>
                <Link className="link" href={`/admin/${m.id}`}>
                  Editar
                </Link>
              </td>
            </tr>
          ))}
          {medidas.length === 0 && (
            <tr>
              <td colSpan={5} className="muted">
                Sin medidas todavía. Creá la primera o corré el seed.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
