import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "../../lib/auth";
import MedidaForm from "../MedidaForm";

export const metadata: Metadata = {
  title: "Nueva medida",
  robots: { index: false, follow: false },
};

export default async function NewMedidaPage() {
  await requireAdmin();
  return (
    <main className="admin-shell admin-wide">
      <p className="admin-back">
        <Link href="/admin">← Panel</Link>
      </p>
      <h1>Nueva medida</h1>
      <MedidaForm />
    </main>
  );
}
