import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="bg-forest-800 text-cream-100 mt-24">
      <div className="container-page py-14 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 text-cream-100 mb-3">
            <Logo className="h-7 w-7" />
            <span className="font-display text-lg font-semibold">Baby Greens Bari</span>
          </Link>
          <p className="text-sm text-forest-200 leading-relaxed">
            Microgreens coltivati con cura a Bari, raccolti su ordinazione e
            consegnati freschi in 24 ore.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-clay-400 mb-3">
            Shop
          </h3>
          <ul className="space-y-2 text-sm text-forest-200">
            <li><Link to="/catalog" className="hover:text-white">Tutti i prodotti</Link></li>
            <li><Link to="/catalog?category=piccanti" className="hover:text-white">Microgreens piccanti</Link></li>
            <li><Link to="/catalog?category=box-abbonamento" className="hover:text-white">Box in abbonamento</Link></li>
            <li><Link to="/catalog?category=kit-coltivazione" className="hover:text-white">Kit da coltivare</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-clay-400 mb-3">
            Info
          </h3>
          <ul className="space-y-2 text-sm text-forest-200">
            <li>Consegne a Bari e provincia</li>
            <li>Raccolta il giorno stesso</li>
            <li>Packaging compostabile</li>
            <li><a href="mailto:ciao@babygreensbari.it" className="hover:text-white">ciao@babygreensbari.it</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-clay-400 mb-3">
            Newsletter
          </h3>
          <p className="text-sm text-forest-200 mb-3">
            Novità, ricette e nuovi raccolti — niente spam.
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="La tua email"
              className="flex-1 min-w-0 rounded-full px-4 py-2 text-sm bg-forest-700 border border-forest-600 text-white placeholder:text-forest-300 focus:outline-none focus:border-clay-400"
            />
            <button className="bg-clay-500 hover:bg-clay-600 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors">
              Iscriviti
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-forest-700">
        <div className="container-page py-5 text-xs text-forest-300 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Baby Greens Bari. Tutti i diritti riservati.</span>
          <span>Bari, Puglia, Italia</span>
        </div>
      </div>
    </footer>
  );
}
