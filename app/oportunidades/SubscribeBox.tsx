"use client";

import { useActionState, useEffect } from "react";
import { track } from "@vercel/analytics";
import { subscribe, type SubscribeState } from "../lib/actions/subscribe";

const initial: SubscribeState = { status: "idle" };

export default function SubscribeBox() {
  const [state, formAction, pending] = useActionState(subscribe, initial);

  useEffect(() => {
    if (state.status === "ok") track("feed_subscribe");
  }, [state.status]);

  if (state.status === "ok") {
    return (
      <section className="radar-sub radar-sub--done">
        <h2>¡Listo!</h2>
        <p className="lede">
          Vas a enterarte primero cada vez que algo cambie en la Nueva Argentina.
        </p>
      </section>
    );
  }

  return (
    <section className="radar-sub">
      <div className="radar-sub__copy">
        <span className="eyebrow">El feed semanal</span>
        <h2>Recibí el radar cada semana</h2>
        <p className="lede">
          Qué se derogó, qué se aprobó y qué oportunidad abre — directo a tu
          casilla. Sin spam, cancelás cuando quieras.
        </p>
      </div>
      <form className="radar-sub__form" action={formAction}>
        <input
          type="email"
          name="email"
          required
          placeholder="tu@email.com"
          aria-label="Tu email"
          disabled={pending}
        />
        <button className="btn btn--primary" type="submit" disabled={pending}>
          {pending ? "Enviando…" : "Suscribirme"}
        </button>
        {state.status === "invalid" && (
          <p className="radar-sub__msg err">Revisá el email e intentá de nuevo.</p>
        )}
        {state.status === "error" && (
          <p className="radar-sub__msg err">Algo falló. Probá de nuevo en un rato.</p>
        )}
        {state.status === "unconfigured" && (
          <p className="radar-sub__msg err">La suscripción se habilita en breve.</p>
        )}
      </form>
    </section>
  );
}
