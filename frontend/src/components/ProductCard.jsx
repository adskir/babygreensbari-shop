import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../lib/api";
import ProductVisual from "./ProductVisual.jsx";

export default function ProductCard({ product }) {
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group bg-white rounded-2xl border border-forest-200 hover:border-clay-400 hover:shadow-card transition-all overflow-hidden flex flex-col"
    >
      <div className="aspect-square overflow-hidden relative">
        <div className="w-full h-full transition-transform duration-300 group-hover:scale-105">
          <ProductVisual product={product} />
        </div>
        {lowStock && (
          <span className="absolute top-3 left-3 bg-white/90 text-clay-600 text-[11px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full">
            Ultimi pezzi
          </span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        {product.category && (
          <span className="text-[11px] uppercase tracking-wide text-forest-500 font-medium mb-1">
            {product.category.name}
          </span>
        )}
        <h3 className="font-display font-semibold text-forest-900 leading-snug">{product.name}</h3>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="font-semibold text-forest-800">{formatPrice(product.price)}</span>
          <span className="text-xs text-forest-500 group-hover:text-clay-600 transition-colors">
            Vedi →
          </span>
        </div>
      </div>
    </Link>
  );
}
