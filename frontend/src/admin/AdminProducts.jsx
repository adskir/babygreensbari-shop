import React, { useEffect, useState } from "react";
import { api, formatPrice } from "../lib/api";

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  price: "",
  stock: "",
  images: "",
  categoryId: "",
  isActive: true,
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    Promise.all([api.adminListProducts(), api.listCategories()])
      .then(([p, c]) => {
        setProducts(p);
        setCategories(c);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  function startEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price / 100,
      stock: product.stock,
      images: (product.images || []).join(", "),
      categoryId: product.categoryId || "",
      isActive: product.isActive,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        name: form.name,
        slug: form.slug,
        description: form.description,
        price: Math.round(Number(form.price) * 100),
        stock: Number(form.stock),
        images: form.images
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        categoryId: form.categoryId || null,
        isActive: form.isActive,
      };
      if (editingId) {
        await api.adminUpdateProduct(editingId, payload);
      } else {
        await api.adminCreateProduct(payload);
      }
      resetForm();
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this product?")) return;
    await api.adminDeleteProduct(id);
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Products</h1>

      <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-4 mb-8 space-y-3">
        <h2 className="font-medium">{editingId ? "Edit product" : "New product"}</h2>
        <div className="grid grid-cols-2 gap-3">
          <input
            name="name"
            placeholder="Name"
            required
            value={form.name}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            name="slug"
            placeholder="slug-in-kebab-case"
            required
            value={form.slug}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price (EUR)"
            required
            value={form.price}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            required
            value={form.stock}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="">No category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            Active (visible in store)
          </label>
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
        <input
          name="images"
          placeholder="Image URLs, comma separated"
          value={form.images}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-medium">
            {editingId ? "Save changes" : "Create product"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-4 py-2 rounded border">
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <table className="w-full text-sm bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Active</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{formatPrice(p.price)}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3">{p.isActive ? "Yes" : "No"}</td>
                <td className="p-3 text-right space-x-3">
                  <button onClick={() => startEdit(p)} className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
