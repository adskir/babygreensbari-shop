import React, { useEffect, useState } from "react";
import { api } from "../lib/api";
import ProductCard from "../components/ProductCard.jsx";

export default function KitDegustazione() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .listProducts({ category: "kit-degustazione", pageSize: 12 })
      .then((data) => setProducts(data.items))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="bg-forest-800 text-cream-100">
        <div className="container-page py-16 text-center">
          <span className="inline-block bg-clay-500/90 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-5">
            In offerta per un periodo limitato
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
            Kit degustazione
          </h1>
          <p className="text-forest-200 max-w-xl mx-auto leading-relaxed">
            Sei trii pensati per scoprire tutta la gamma Baby Greens Bari:
            piccante, delicato, aromatico o pensato apposta per chi ama i
            sapori e i colori della tradizione italiana.
          </p>
        </div>
      </section>

      <div className="container-page py-14">
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
