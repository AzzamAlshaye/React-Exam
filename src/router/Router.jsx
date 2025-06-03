// src/routes/Router.jsx
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Nav from "../components/Navbar";
import Footer from "../components/Footer";
import Register from "../Auth/Register";
import LoginPage from "../Auth/Login";
// import HomePage from "../pages/HomePage";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

function RootLayout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Products /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
    ],
  },

  // standalone auth pages (no RootLayout)
  // { path: "register", element: <Register /> },
  { path: "login", element: <LoginPage /> },
  { path: "register", element: <Register /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
