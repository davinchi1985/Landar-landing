import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getAdminUser } from "../../lib/auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  // Si ya hay sesión admin, saltar directo al panel.
  const user = await getAdminUser();
  if (user) redirect("/admin");

  return (
    <main className="admin-shell">
      <LoginForm />
    </main>
  );
}
