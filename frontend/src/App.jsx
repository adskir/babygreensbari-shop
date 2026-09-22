import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import StoreLayout from "./components/StoreLayout.jsx";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import CheckoutSuccess from "./pages/CheckoutSuccess.jsx";
import CheckoutCancel from "./pages/CheckoutCancel.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminProducts from "./admin/AdminProducts.jsx";
import AdminCategories from "./admin/AdminCategories.jsx";
import AdminOrders from "./admin/AdminOrders.jsx";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

        <Route element={<StoreLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/cancel" element={<CheckoutCancel />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
