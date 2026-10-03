import catalog from "../data/catalog.json";

// Vetrina statica: i prodotti vivono in src/data/catalog.json (niente server).
// Il modulo contatti e la lista d'attesa passano da Formspree.
const FORMSPREE_URL = "https://formspree.io/f/mlgkbbkv";

const delay = (v) => Promise.resolve(JSON.parse(JSON.stringify(v)));

function sortProducts(list, sort) {
  const arr = [...list];
  if (sort === "price_asc") arr.sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") arr.sort((a, b) => b.price - a.price);
  else if (sort === "name") arr.sort((a, b) => a.name.localeCompare(b.name, "it"));
  else arr.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return arr;
}

async function sendForm(payload) {
  const res = await fetch(FORMSPREE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Invio non riuscito. Riprova tra poco.");
  return null;
}

export const api = {
  listProducts: ({ q, category, sort = "newest", minPrice, maxPrice, page = 1, pageSize = 20 } = {}) => {
    let list = catalog.products.filter((p) => p.isActive);
    if (q) {
      const needle = String(q).toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(needle) || p.description.toLowerCase().includes(needle)
      );
    }
    if (category) list = list.filter((p) => p.category && p.category.slug === category);
    if (minPrice) list = list.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) list = list.filter((p) => p.price <= Number(maxPrice));
    list = sortProducts(list, sort);
    const size = Math.min(100, Math.max(1, Number(pageSize) || 20));
    const pageNum = Math.max(1, Number(page) || 1);
    return delay({
      items: list.slice((pageNum - 1) * size, pageNum * size),
      total: list.length,
      page: pageNum,
      pageSize: size,
      totalPages: Math.ceil(list.length / size),
    });
  },
  getProduct: (slug) => {
    const p = catalog.products.find((x) => x.slug === slug && x.isActive);
    return p ? delay(p) : Promise.reject(new Error("Prodotto non trovato"));
  },
  listCategories: () =>
    delay(
      [...catalog.categories]
        .sort((a, b) => a.name.localeCompare(b.name, "it"))
        .map((c) => ({
          ...c,
          _count: { products: catalog.products.filter((p) => p.categoryId === c.id && p.isActive).length },
        }))
    ),
  sendContactMessage: (payload) =>
    sendForm({ ...payload, _subject: "Nuovo messaggio da babygreensbari.it" }),
  joinWaitlist: (payload) =>
    sendForm({ ...payload, _subject: "Lista d'attesa shop Baby Greens" }),
};

export function formatPrice(cents, currency = "EUR") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}
