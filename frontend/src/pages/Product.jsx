import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, formatPrice } from "../lib/api";
import { useCart } from "../context/CartContext.jsx";
import ProductVisual from "../components/ProductVisual.jsx";

export default function Product() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    window.scrollTo(0, 0);
    api
      .getProduct(slug)
      .then(setProduct)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="container-page py-16 text-forest-500">Caricamento...</div>;
  if (notFound)
    return (
      <div className="container-page py-16">
        <p className="text-forest-700 mb-3">Prodotto non trovato.</p>
        <Link to="/catalog" className="text-clay-600 underline">
          Torna al catalogo
        </Link>
      </div>
    );

  return (
    <div className="container-page py-12">
      <nav className="text-sm text-forest-500 mb-8">
        <Link to="/catalog" className="hover:text-clay-600">Catalogo</Link>
        <span className="mx-2">/</span>
        {product.category && <span>{product.category.name}</span>}
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square rounded-2xl overflow-hidden shadow-card">
          <ProductVisual product={product} />
        </div>

        <div>
          {product.category && (
            <span className="text-xs font-semibold uppercase tracking-wide text-clay-600">
              {product.category.name}
            </span>
          )}
          <h1 className="font-display text-3xl font-semibold text-forest-900 mt-2">{product.name}</h1>
          <div className="text-2xl font-semibold text-forest-800 mt-3">{formatPrice(product.price)}</div>
          <p className="text-forest-600 mt-5 leading-relaxed whitespace-pre-line">{product.description}</p>

          <div className="mt-5 text-sm">
            {product.stock > 0 ? (
              <span className="inline-flex items-center gap-1.5 text-forest-700">
                <span className="w-2 h-2 rounded-full bg-forest-500" />
                Disponibile — {product.stock} vaschette pronte per la raccolta
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-clay-600">
                <span className="w-2 h-2 rounded-full bg-clay-500" />
                Esaurito, torna presto
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 mt-7">
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-20 border border-forest-200 rounded-lg px-3 py-2.5 text-center"
              disabled={product.stock === 0}
            />
            <button
              disabled={product.stock === 0}
              onClick={() => {
                addItem(product, quantity);
                setAdded(true);
                setTimeout(() => setAdded(false), 1500);
              }}
              className="flex-1 bg-forest-800 hover:bg-forest-900 text-white font-medium px-6 py-3 rounded-full transition-colors disabled:opacity-50"
            >
              {added ? "Aggiunto al carrello ✓" : "Aggiungi al carrello"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-forest-200 text-sm">
            <div>
              <h3 className="font-display font-semibold text-forest-900 mb-1">Come si usa</h3>
              <p className="text-forest-600 leading-relaxed">
                Ideale a crudo: su piatti finiti, insalate, panini gourmet o come
                guarnizione per aggiungere colore e sapore concentrato.
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-forest-900 mb-1">Conservazione</h3>
              <p className="text-forest-600 leading-relaxed">
                In frigorifero nella sua vaschetta, si mantiene fresco fino a 7
                giorni. Sciacquare solo prima del consumo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
