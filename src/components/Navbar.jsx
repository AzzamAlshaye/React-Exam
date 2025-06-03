// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  FiMapPin,
  FiChevronDown,
  FiSearch,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const fullName = localStorage.getItem("fullName") || "";

  const performLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("fullName");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("UserImage");
    toast.success("You have been logged out.");
    navigate("/");
  };

  const confirmLogout = () => {
    const LogoutConfirm = ({ closeToast }) => (
      <div className="p-2">
        <p className="mb-2">Are you sure you want to log out?</p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-3 py-1 bg-[#F3A847] text-black rounded hover:bg-[#ddb347]"
            onClick={() => {
              performLogout();
              closeToast();
            }}
          >
            Yes
          </button>
          <button
            className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={() => closeToast()}
          >
            No
          </button>
        </div>
      </div>
    );

    toast.info(<LogoutConfirm />, {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
    });
  };

  return (
    <>
      <ToastContainer />
      <nav className="bg-[#131A22] text-white">
        <div className="max-w-screen-xl mx-auto flex items-center px-4 py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center mr-6">
            <img src="/amazon-w.png" alt="Amazon" className="h-10 w-auto" />
          </Link>

          {/* Deliver to Saudi Arabia */}
          <div className="hidden sm:flex items-center mr-6 cursor-pointer hover:underline">
            <FiMapPin className="text-xl mr-1" />
            <div className="text-xs">
              <p className="leading-none">Deliver to</p>
              <p className="font-semibold leading-none">Saudi Arabia</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex flex-1 items-center">
            <div className="hidden md:flex items-center bg-gray-100 text-black rounded-l-md px-2 py-1.5">
              <span className="text-sm font-medium">All</span>
              <FiChevronDown className="ml-1 text-sm" />
            </div>
            <input
              type="text"
              placeholder="Search Amazon"
              className="flex-1 bg-white px-2 py-1 focus:outline-none text-black"
            />
            <button className="bg-[#F3A847] hover:bg-[#ddb347] p-2 rounded-r-md">
              <FiSearch className="text-black" />
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-6 ml-6">
            {/* Language Selector */}
            <div className="flex items-center cursor-pointer hover:scale-101">
              <span className="text-sm leading-none">🇺🇸</span>
              <FiChevronDown className="ml-1 text-sm" />
            </div>

            {/* Account & Lists */}
            <div className="flex flex-col text-xs cursor-pointer hover:underline">
              {isAuthenticated ? (
                <>
                  <span className="leading-none">
                    Hello, {fullName.split(" ")[0]}
                  </span>
                  <div
                    onClick={confirmLogout}
                    className="flex items-center font-semibold cursor-pointer"
                  >
                    <span>Sign Out</span>
                  </div>
                </>
              ) : (
                <>
                  <span className="leading-none">Hello, sign in</span>
                  <div className="flex items-center">
                    <span className="font-semibold">Account &amp; Lists</span>
                    <FiChevronDown className="ml-1 text-sm" />
                  </div>
                </>
              )}
            </div>

            {/* Returns & Orders */}
            <div className="flex flex-col text-xs cursor-pointer hover:underline">
              <span className="leading-none">Returns</span>
              <span className="font-semibold leading-none">& Orders</span>
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center cursor-pointer hover:underline"
            >
              <FiShoppingCart className="text-2xl" />
              <span className="absolute top-0 right-0 bg-[#F3A847] text-black rounded-full text-xs font-bold w-5 h-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                0
              </span>
              <span className="ml-2 font-semibold">Cart</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden ml-4">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <FiX className="text-2xl" />
              ) : (
                <FiMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="lg:hidden bg-[#131A22] border-t border-gray-700">
            <div className="px-4 py-3 space-y-4">
              {/* User or Sign In */}
              <div className="text-sm">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between">
                    <span>Hello, {fullName.split(" ")[0]}</span>
                    <button
                      onClick={() => {
                        confirmLogout();
                        setMenuOpen(false);
                      }}
                      className="text-[#F3A847] font-semibold"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="hover:underline"
                  >
                    Sign In / Register
                  </Link>
                )}
              </div>

              {/* Deliver To */}
              <div className="flex items-center cursor-pointer hover:underline">
                <FiMapPin className="text-xl mr-2" />
                <div className="text-sm">
                  <p>Deliver to</p>
                  <p className="font-semibold">Saudi Arabia</p>
                </div>
              </div>

              {/* Account & Lists */}
              <Link
                to={isAuthenticated ? "#" : "/login"}
                onClick={() => setMenuOpen(false)}
                className="block text-sm hover:underline"
              >
                {isAuthenticated ? "Your Account" : "Account & Lists"}
              </Link>

              {/* Orders */}
              <Link
                to="#"
                onClick={() => setMenuOpen(false)}
                className="block text-sm hover:underline"
              >
                Returns & Orders
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center text-sm hover:underline"
              >
                <FiShoppingCart className="text-xl mr-2" />
                <span>Cart</span>
                <span className="ml-auto bg-[#F3A847] text-black rounded-full text-xs font-bold w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
