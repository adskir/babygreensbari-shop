import React, { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", slug: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    api
      .listCategories()
      .then(setCategories)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      if (editingId) {
        await api.adminUpdateCategory(editingId, form);
      } else {
        await api.adminCreateCategory(form);
      }
      setForm({ name: "", slug: "" });
      setEditingId(null);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this category? Products in it will become uncategorized.")) return;
    try {
      await api.adminDeleteCategory(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Categories</h1>

      <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-4 mb-8 flex gap-3 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="border rounded px-3 py-2"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-medium">
          {editingId ? "Save" : "Add"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", slug: "" });
            }}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>
        )}
      </form>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <table className="w-full text-sm bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Products</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.slug}</td>
                <td className="p-3">{c._count?.products ?? "-"}</td>
                <td className="p-3 text-right space-x-3">
                  <button
                    onClick={() => {
                      setEditingId(c.id);
                      setForm({ name: c.name, slug: c.slug });
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
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
