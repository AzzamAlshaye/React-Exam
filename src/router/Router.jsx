// src/routes/Router.jsx
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Nav from "../components/Navbar";
import Footer from "../components/Footer";
import Register from "../Auth/Register";

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
    children: [{ index: true, element: <Register /> }],
  },

  // standalone auth pages (no RootLayout)
  // {path: , element:  },
  // {path: , element:  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
