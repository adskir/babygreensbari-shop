import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function StoreLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-20">
        <div className="bg-forest-900 text-cream-100/80">
          <p className="container-page h-7 flex items-center justify-center gap-2 text-[11px] tracking-[0.16em] uppercase">
            <span className="h-1 w-1 rounded-full bg-clay-400" aria-hidden="true"></span>
            Sito in fase di sviluppo ·{" "}
            <a href="https://clickbari.it" target="_blank" rel="noopener" className="text-cream-100 hover:text-clay-300 transition-colors">
              clickbari.it
            </a>
          </p>
        </div>
        <Header />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
