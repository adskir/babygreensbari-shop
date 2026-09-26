import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import Logo from "./Logo.jsx";

const navLinks = [
  { to: "/catalog", label: "Shop" },
  { to: "/kit-degustazione", label: "Kit degustazione" },
  { to: "/ricette", label: "Ricette" },
  { to: "/coltivazione", label: "Per i coltivatori" },
  { to: "/contatti", label: "Contatti" },
];

export default function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-cream-100/95 backdrop-blur border-b border-forest-200 sticky top-0 z-20">
      <div className="container-page flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 text-forest-800 shrink-0">
          <Logo className="h-7 w-7" />
          <span className="font-display text-lg font-semibold tracking-tight leading-none">
            Baby Greens <span className="text-clay-500">Bari</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-forest-700">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className="hover:text-clay-600 transition-colors"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative flex items-center gap-2 text-sm font-medium text-forest-800 hover:text-clay-600 transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="hidden sm:inline">Carrello</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-clay-500 text-white text-[11px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          <button
            className="md:hidden text-forest-800"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-forest-200 bg-cream-100 px-4 py-3 flex flex-col gap-3 text-sm font-medium text-forest-700">
          {navLinks.map((link) => (
            <NavLink key={link.label} to={link.to} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
