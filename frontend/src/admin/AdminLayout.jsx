import React from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminLayout() {
  const { isAuthenticated, email, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded text-sm ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex gap-8">
      <aside className="w-48 flex-shrink-0 space-y-1">
        <NavLink to="/admin/products" className={linkClass}>
          Products
        </NavLink>
        <NavLink to="/admin/categories" className={linkClass}>
          Categories
        </NavLink>
        <NavLink to="/admin/orders" className={linkClass}>
          Orders
        </NavLink>
        <div className="pt-4 border-t mt-4 text-xs text-gray-500">{email}</div>
        <button onClick={logout} className="text-sm text-red-600 hover:underline mt-1">
          Log out
        </button>
      </aside>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
