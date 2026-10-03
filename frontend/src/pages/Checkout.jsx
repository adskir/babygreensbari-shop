import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../lib/api";
import WaitlistModal from "../components/WaitlistModal.jsx";

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
  const [modalOpen, setModalOpen] = useState(false);

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setModalOpen(true);
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
                value={form[field]}
                onChange={handleChange}
                className="w-full border border-forest-200 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:border-clay-400"
              />
            </div>
          ))}

          <button
            type="submit"
                        className="w-full bg-forest-800 hover:bg-forest-900 text-white font-medium px-6 py-3.5 rounded-full transition-colors disabled:opacity-50"
          >
            Paga ora
          </button>
          <p className="text-xs text-forest-500 text-center">
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
      <WaitlistModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        items={items}
        total={total}
        customer={form}
      />
    </div>
  );
}
