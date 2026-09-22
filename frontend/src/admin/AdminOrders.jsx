import React, { useEffect, useState } from "react";
import { api, formatPrice } from "../lib/api";

const STATUSES = ["PENDING", "PAID", "FAILED", "SHIPPED", "CANCELLED"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  function load() {
    setLoading(true);
    api
      .adminListOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id, status) {
    await api.adminUpdateOrderStatus(id, status);
    load();
  }

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="bg-white border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">
                    #{o.id.slice(0, 8)} — {o.fullName} ({o.email})
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(o.createdAt).toLocaleString()} · {formatPrice(o.total)}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    {expanded === o.id ? "Hide" : "Details"}
                  </button>
                </div>
              </div>

              {expanded === o.id && (
                <div className="mt-4 border-t pt-3 text-sm space-y-2">
                  <div>
                    <strong>Ship to:</strong> {o.address}, {o.city} {o.postalCode}, {o.country}
                  </div>
                  <div>
                    <strong>Items:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {o.items.map((item) => (
                        <li key={item.id}>
                          {item.nameSnap} × {item.quantity} — {formatPrice(item.priceSnap * item.quantity)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
