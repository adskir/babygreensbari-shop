import React, { useState } from "react";
import { api } from "../lib/api";

const WHATSAPP_NUMBER = "393805826738";

export default function Contatti() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.sendContactMessage(form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <div className="container-page py-14 max-w-3xl">
      <div className="mb-10">
        <span className="text-clay-600 text-xs font-semibold uppercase tracking-wide">Contatti</span>
        <h1 className="font-display text-3xl font-semibold text-forest-900 mt-1">
          Scrivici, siamo qui per aiutarti
        </h1>
        <p className="text-forest-600 mt-3 leading-relaxed">
          Per ordini, box aziendali o qualsiasi domanda su consegne e prodotti, scrivici
          su WhatsApp o compila il modulo qui sotto.
        </p>
      </div>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-3 bg-forest-800 hover:bg-forest-900 text-white font-medium px-6 py-3 rounded-full transition-colors mb-12"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.44 1.32 4.94L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.84 14.06c-.25.7-1.44 1.34-1.98 1.42-.5.08-1.15.12-1.85-.12-.43-.14-.98-.33-1.68-.64-2.96-1.28-4.9-4.26-5.05-4.46-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.18.01.43-.07.68.52.25.6.86 2.07.94 2.22.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.18-.32.4-.45.53-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.28.1 1.78.84 2.08 1 .3.15.5.22.58.35.08.13.08.75-.17 1.45Z" />
        </svg>
        Scrivici su WhatsApp
      </a>

      <div className="bg-white border border-forest-200 rounded-2xl p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold text-forest-900 mb-5">
          Oppure lascia un messaggio
        </h2>

        {status === "sent" ? (
          <p className="text-forest-700">
            Grazie! Il tuo messaggio è stato inviato, ti risponderemo il prima possibile.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-forest-600 mb-2">
                Nome
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-forest-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-clay-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-forest-600 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-forest-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-clay-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-forest-600 mb-2">
                Messaggio
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-forest-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-clay-400"
              />
            </div>
            {status === "error" && (
              <p className="text-sm text-red-600">
                Si è verificato un errore, riprova tra poco.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-clay-500 hover:bg-clay-600 disabled:opacity-60 text-white font-medium px-6 py-3 rounded-full transition-colors"
            >
              {status === "sending" ? "Invio in corso..." : "Invia messaggio"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
