const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

function getAdminToken() {
  return localStorage.getItem("admin_token");
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getAdminToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.error || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data;
}

export const api = {
  // Public
  listProducts: (params = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
    ).toString();
    return request(`/products${qs ? `?${qs}` : ""}`);
  },
  getProduct: (slug) => request(`/products/${slug}`),
  listCategories: () => request(`/categories`),
  checkout: (payload) => request(`/orders/checkout`, { method: "POST", body: payload }),
  getOrder: (id) => request(`/orders/${id}`),

  // Admin auth
  login: (email, password) =>
    request(`/auth/login`, { method: "POST", body: { email, password } }),

  // Admin products
  adminListProducts: () => request(`/products/admin/all`, { auth: true }),
  adminCreateProduct: (payload) =>
    request(`/products`, { method: "POST", body: payload, auth: true }),
  adminUpdateProduct: (id, payload) =>
    request(`/products/${id}`, { method: "PUT", body: payload, auth: true }),
  adminDeleteProduct: (id) => request(`/products/${id}`, { method: "DELETE", auth: true }),

  // Admin categories
  adminCreateCategory: (payload) =>
    request(`/categories`, { method: "POST", body: payload, auth: true }),
  adminUpdateCategory: (id, payload) =>
    request(`/categories/${id}`, { method: "PUT", body: payload, auth: true }),
  adminDeleteCategory: (id) => request(`/categories/${id}`, { method: "DELETE", auth: true }),

  // Admin orders
  adminListOrders: () => request(`/orders`, { auth: true }),
  adminUpdateOrderStatus: (id, status) =>
    request(`/orders/${id}/status`, { method: "PUT", body: { status }, auth: true }),
};

export function formatPrice(cents, currency = "EUR") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}
