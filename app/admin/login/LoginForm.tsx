"use client";

import { useActionState } from "react";
import { requestMagicLink, type LoginState } from "./actions";

const initial: LoginState = { status: "idle" };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(requestMagicLink, initial);

  if (state.status === "sent") {
    return (
      <div className="admin-card">
        <h1>Revisá tu email</h1>
        <p className="muted">
          Te mandamos un link de acceso. Abrilo en este mismo dispositivo para
          entrar al panel.
        </p>
      </div>
    );
  }

  return (
    <form className="admin-card" action={formAction}>
      <h1>Panel · Inteligenci·AR</h1>
      <p className="muted">Ingresá con tu email. Te mandamos un link mágico, sin contraseña.</p>
      <input
        type="email"
        name="email"
        required
        placeholder="tu@email.com"
        aria-label="Tu email"
        disabled={pending}
      />
      <button className="btn btn--primary" type="submit" disabled={pending}>
        {pending ? "Enviando…" : "Enviarme el link"}
      </button>
      {state.status === "error" && (
        <p className="admin-err">{state.message ?? "Algo falló."}</p>
      )}
    </form>
  );
}
