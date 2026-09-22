import React, { createContext, useContext, useState } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token"));
  const [email, setEmail] = useState(() => localStorage.getItem("admin_email"));

  async function login(emailInput, password) {
    const data = await api.login(emailInput, password);
    localStorage.setItem("admin_token", data.token);
    localStorage.setItem("admin_email", data.email);
    setToken(data.token);
    setEmail(data.email);
  }

  function logout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_email");
    setToken(null);
    setEmail(null);
  }

  const value = { token, email, isAuthenticated: !!token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
