import React from "react";
import { Routes, Route } from "react-router-dom";
import StoreLayout from "./components/StoreLayout.jsx";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import KitDegustazione from "./pages/KitDegustazione.jsx";
import Ricette from "./pages/Ricette.jsx";
import Coltivazione from "./pages/Coltivazione.jsx";
import Contatti from "./pages/Contatti.jsx";

export default function App() {
  return (
    <>
      <Routes>

        <Route element={<StoreLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/kit-degustazione" element={<KitDegustazione />} />
          <Route path="/ricette" element={<Ricette />} />
          <Route path="/coltivazione" element={<Coltivazione />} />
          <Route path="/contatti" element={<Contatti />} />
        </Route>
      </Routes>
    </>
  );
}
