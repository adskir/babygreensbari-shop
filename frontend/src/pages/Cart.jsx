import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../lib/api";
import { accentFor } from "../lib/theme";

export default function Cart() {
  const { items, updateQuantity, removeItem, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-forest-500 mb-4">Il tuo carrello è vuoto.</p>
        <Link to="/catalog" className="text-clay-600 underline">
          Sfoglia il catalogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page max-w-3xl py-12">
      <h1 className="font-display text-3xl font-semibold text-forest-900 mb-8">Il tuo carrello</h1>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 bg-white border border-forest-200 rounded-2xl p-3"
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${accentFor(item.slug).bg}`} />
              )}
            </div>
            <div className="flex-1">
              <div className="font-display font-medium text-forest-900">{item.name}</div>
              <div className="text-sm text-forest-500">{formatPrice(item.price)}</div>
            </div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value, 10) || 1)}
              className="w-16 border border-forest-200 rounded-lg px-2 py-1.5 text-center"
            />
            <div className="w-20 text-right font-medium text-forest-800">
              {formatPrice(item.price * item.quantity)}
            </div>
            <button
              onClick={() => removeItem(item.productId)}
              className="text-clay-600 text-sm hover:underline"
            >
              Rimuovi
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8 border-t border-forest-200 pt-6">
        <span className="font-display text-lg font-semibold text-forest-900">
          Totale: {formatPrice(total)}
        </span>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-forest-800 hover:bg-forest-900 text-white font-medium px-6 py-3 rounded-full transition-colors"
        >
          Vai al checkout
        </button>
      </div>
    </div>
  );
}
