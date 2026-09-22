import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../lib/api";
import { useCart } from "../context/CartContext.jsx";

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order");
  const [order, setOrder] = useState(null);
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    if (orderId) {
      api.getOrder(orderId).then(setOrder).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return (
    <div className="container-page max-w-xl py-24 text-center">
      <div className="w-14 h-14 rounded-full bg-forest-100 text-forest-700 flex items-center justify-center mx-auto mb-6">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <h1 className="font-display text-3xl font-semibold text-forest-900 mb-3">Grazie per il tuo ordine!</h1>
      <p className="text-forest-600 mb-8">
        {order
          ? `Il tuo ordine #${order.id.slice(0, 8)} è stato ricevuto e sarà raccolto a breve.`
          : "Il tuo ordine è stato ricevuto."}
      </p>
      <Link to="/catalog" className="text-clay-600 underline">
        Continua lo shopping
      </Link>
    </div>
  );
}
