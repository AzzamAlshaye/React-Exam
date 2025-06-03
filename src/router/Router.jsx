// src/routes/Router.jsx
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Nav from "../components/Navbar";
import Footer from "../components/Footer";
import Register from "../Auth/Register";
import LoginPage from "../Auth/Login";
import HomePage from "../pages/HomePage";

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
    children: [{ index: true, element: <HomePage /> }],
  },

  // standalone auth pages (no RootLayout)
  { path: "login", element: <LoginPage /> },
  { path: "register", element: <Register /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
