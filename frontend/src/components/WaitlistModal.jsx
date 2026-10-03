import React, { useEffect, useRef, useState } from "react";
import { api, formatPrice } from "../lib/api";

// Mostrata al momento del pagamento: lo shop è in vetrina, gli ordini online non sono ancora attivi.
export default function WaitlistModal({ open, onClose, items = [], total = 0, customer = {} }) {
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setState("idle");
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setState("sending");
    try {
      await api.joinWaitlist({
        whatsapp: phone,
        nome: customer.fullName || "",
        email: customer.email || "",
        carrello: items.map((i) => `${i.name} × ${i.quantity}`).join(", "),
        totale: formatPrice(total),
      });
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-forest-900/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-title"
        className="relative w-full max-w-sm bg-cream-100 rounded-2xl shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Chiudi"
          className="absolute top-3 right-4 text-2xl leading-none text-forest-500 hover:text-forest-800"
        >
          ×
        </button>

        {state === "done" ? (
          <div className="text-center py-2">
            <p className="text-3xl mb-2" aria-hidden="true">🌱</p>
            <h2 id="waitlist-title" className="font-display text-xl font-semibold text-forest-900">
              Sei in lista!
            </h2>
            <p className="mt-2 text-sm text-forest-600">Ti scriviamo su WhatsApp appena apriamo gli ordini.</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full bg-forest-800 hover:bg-forest-900 text-white font-medium px-6 py-3 rounded-full transition-colors"
            >
              Ok
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-xs font-semibold uppercase tracking-wide text-clay-600">Shop in arrivo</p>
            <h2 id="waitlist-title" className="mt-1 font-display text-xl font-semibold text-forest-900">
              Gli ordini online aprono a breve
            </h2>
            <p className="mt-2 text-sm text-forest-600">
              Lasciaci il tuo WhatsApp: sarai tra i primi a saperlo.
            </p>
            <label htmlFor="waitlist-phone" className="sr-only">
              Numero WhatsApp
            </label>
            <input
              ref={inputRef}
              id="waitlist-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              pattern="[+0-9 ]{8,16}"
              placeholder="+39 333 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-4 w-full border border-forest-200 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:border-clay-400"
            />
            {state === "error" && (
              <p className="mt-2 text-sm text-clay-600">Invio non riuscito. Riprova tra poco.</p>
            )}
            <button
              type="submit"
              disabled={state === "sending"}
              className="mt-3 w-full bg-forest-800 hover:bg-forest-900 text-white font-medium px-6 py-3 rounded-full transition-colors disabled:opacity-50"
            >
              {state === "sending" ? "Invio…" : "Avvisami"}
            </button>
            <p className="mt-3 text-[11px] text-forest-500 text-center">
              Usiamo il numero solo per avvisarti dell'apertura.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
