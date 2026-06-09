import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requireAdmin } from "../../lib/auth";
import { getMedidaRowAdmin } from "../../lib/radar-admin";
import MedidaForm from "../MedidaForm";

export const metadata: Metadata = {
  title: "Editar medida",
  robots: { index: false, follow: false },
};

export default async function EditMedidaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const medida = await getMedidaRowAdmin(id);
  if (!medida) notFound();

  return (
    <main className="admin-shell admin-wide">
      <p className="admin-back">
        <Link href="/admin">← Panel</Link>
      </p>
      <h1>Editar medida</h1>
      <MedidaForm medida={medida} />
    </main>
  );
}
