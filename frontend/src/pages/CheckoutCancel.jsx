import React from "react";
import { Link } from "react-router-dom";

export default function CheckoutCancel() {
  return (
    <div className="container-page max-w-xl py-24 text-center">
      <h1 className="font-display text-3xl font-semibold text-clay-600 mb-3">Pagamento annullato</h1>
      <p className="text-forest-600 mb-8">Il tuo ordine non è stato completato. Il carrello è stato salvato.</p>
      <Link to="/cart" className="text-clay-600 underline">
        Torna al carrello
      </Link>
    </div>
  );
}
