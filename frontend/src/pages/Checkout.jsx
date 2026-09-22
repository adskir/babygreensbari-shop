import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { api, formatPrice } from "../lib/api";

const FIELD_LABELS = {
  email: "Email",
  fullName: "Nome e cognome",
  address: "Indirizzo",
  city: "Città",
  postalCode: "CAP",
  country: "Paese",
};

export default function Checkout() {
  const { items, total } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "Bari",
    postalCode: "",
    country: "Italia",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        ...form,
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      };
      const data = await api.checkout(payload);
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="container-page max-w-3xl py-12">
      <h1 className="font-display text-3xl font-semibold text-forest-900 mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(FIELD_LABELS).map((field) => (
            <div key={field}>
              <label className="block text-xs font-semibold uppercase tracking-wide text-forest-600 mb-1.5">
                {FIELD_LABELS[field]}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                required
                value={form[field]}
                onChange={handleChange}
                className="w-full border border-forest-200 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:border-clay-400"
              />
            </div>
          ))}

          {error && <p className="text-clay-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest-800 hover:bg-forest-900 text-white font-medium px-6 py-3.5 rounded-full transition-colors disabled:opacity-50"
          >
            {loading ? "Reindirizzamento al pagamento..." : "Paga ora"}
          </button>
          <p className="text-xs text-forest-500 text-center">
            Pagamento sicuro gestito da Stripe.
          </p>
        </form>

        <div className="bg-white border border-forest-200 rounded-2xl p-5 h-fit">
          <h2 className="font-display font-semibold text-forest-900 mb-4">Riepilogo ordine</h2>
          <div className="space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-forest-700">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-forest-200 mt-4 pt-4 flex justify-between font-semibold text-forest-900">
            <span>Totale</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
