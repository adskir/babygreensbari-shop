import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../lib/api";
import ProductCard from "../components/ProductCard.jsx";

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({ items: [], total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "newest";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    api.listCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    api
      .listProducts({ q, category, sort, minPrice, maxPrice, page, pageSize: 12 })
      .then(setData)
      .finally(() => setLoading(false));
  }, [q, category, sort, minPrice, maxPrice, page]);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set("page", "1");
    setSearchParams(next);
  }

  return (
    <div className="container-page py-10">
      <div className="mb-8">
        <span className="text-clay-600 text-xs font-semibold uppercase tracking-wide">Shop</span>
        <h1 className="font-display text-3xl font-semibold text-forest-900 mt-1">Catalogo microgreens</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-60 flex-shrink-0 space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-forest-600 mb-2">
              Cerca
            </label>
            <input
              type="text"
              defaultValue={q}
              onKeyDown={(e) => {
                if (e.key === "Enter") updateParam("q", e.currentTarget.value);
              }}
              onBlur={(e) => updateParam("q", e.currentTarget.value)}
              placeholder="Es. ravanello..."
              className="w-full border border-forest-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-clay-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-forest-600 mb-2">
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => updateParam("category", e.target.value)}
              className="w-full border border-forest-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-clay-400"
            >
              <option value="">Tutte le categorie</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-forest-600 mb-2">
                Min €
              </label>
              <input
                type="number"
                defaultValue={minPrice ? minPrice / 100 : ""}
                onBlur={(e) =>
                  updateParam("minPrice", e.target.value ? Math.round(e.target.value * 100) : "")
                }
                className="w-full border border-forest-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-clay-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-forest-600 mb-2">
                Max €
              </label>
              <input
                type="number"
                defaultValue={maxPrice ? maxPrice / 100 : ""}
                onBlur={(e) =>
                  updateParam("maxPrice", e.target.value ? Math.round(e.target.value * 100) : "")
                }
                className="w-full border border-forest-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-clay-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-forest-600 mb-2">
              Ordina per
            </label>
            <select
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="w-full border border-forest-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-clay-400"
            >
              <option value="newest">Novità</option>
              <option value="price_asc">Prezzo: crescente</option>
              <option value="price_desc">Prezzo: decrescente</option>
              <option value="name">Nome</option>
            </select>
          </div>
        </aside>

        <div className="flex-1">
          {loading ? (
            <p className="text-forest-500">Caricamento...</p>
          ) : data.items.length === 0 ? (
            <p className="text-forest-500">Nessun prodotto trovato.</p>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {data.items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {data.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => updateParam("page", String(p))}
                      className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                        String(p) === page
                          ? "bg-forest-800 text-white"
                          : "bg-white border border-forest-200 text-forest-700 hover:border-clay-400"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
