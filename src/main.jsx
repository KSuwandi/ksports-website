import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

import App from "./App";

import Login from "./pages/Login";
import Admin from "./pages/Admin";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";

import ProtectedRoute from "../components/ProtectedRoute";

import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <HelmetProvider>

      <CartProvider>

        <BrowserRouter>

          {/* TOAST */}
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{

              style: {
                background: "#111111",
                color: "#ffffff",
                border: "1px solid #27272a",
                borderRadius: "18px",
                padding: "16px",
                fontWeight: "700",
              },

              success: {
                style: {
                  border: "1px solid #22c55e",
                  boxShadow:
                    "0 0 25px rgba(34,197,94,0.25)",
                },
              },

              error: {
                style: {
                  border: "1px solid #ef4444",
                  boxShadow:
                    "0 0 25px rgba(239,68,68,0.25)",
                },
              },

            }}
          />

          <Routes>

            <Route
              path="/"
              element={<App />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/product/:id"
              element={<ProductDetail />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />

          </Routes>

        </BrowserRouter>

      </CartProvider>

    </HelmetProvider>

  </React.StrictMode>

);