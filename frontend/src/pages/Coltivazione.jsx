import React, { useEffect, useState } from "react";
import { api } from "../lib/api";
import ProductCard from "../components/ProductCard.jsx";

export default function Coltivazione() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .listProducts({ category: "kit-coltivazione", pageSize: 12 })
      .then((data) => setProducts(data.items))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="bg-clay-500/10 border-b border-clay-300">
        <div className="container-page py-4 flex items-center gap-3 text-sm text-clay-700">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
            <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a1 1 0 0 0 .86 1.5h18.64a1 1 0 0 0 .86-1.5L13.71 3.86a1 1 0 0 0-1.72 0Z" />
          </svg>
          <span>
            Questa sezione dedicata ai coltivatori è ancora in fase di sviluppo — presto
            troverai qui semi, substrati, vassoi e guide complete per coltivare i microgreens in casa.
          </span>
        </div>
      </div>

      <div className="container-page py-14">
        <div className="mb-8">
          <span className="text-clay-600 text-xs font-semibold uppercase tracking-wide">Per i coltivatori</span>
          <h1 className="font-display text-3xl font-semibold text-forest-900 mt-1">
            Tutto il necessario per coltivare in casa
          </h1>
          <p className="text-forest-600 mt-3 max-w-xl leading-relaxed">
            Semi certificati, kit pronti all'uso e — presto — tutto l'occorrente per
            iniziare a coltivare i tuoi microgreens sul davanzale di casa.
          </p>
        </div>

        {loading ? (
          <p className="text-forest-500">Caricamento...</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
