import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrashAlt } from "react-icons/fa";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedUserId = parseInt(localStorage.getItem("userId"), 10);
        if (!storedUserId) {
          setCartItems([]);
          setLoading(false);
          return;
        }
        const { data: allCarts } = await axios.get(
          "https://fakestoreapi.com/carts"
        );
        const userCart = allCarts.find((c) => c.userId === storedUserId);
        if (!userCart || !Array.isArray(userCart.products)) {
          setCartItems([]);
          setLoading(false);
          return;
        }
        const detailed = await Promise.all(
          userCart.products.map(async (item) => {
            const { data: prod } = await axios.get(
              `https://fakestoreapi.com/products/${item.productId}`
            );
            return {
              id: prod.id,
              title: prod.title,
              price: prod.price,
              image: prod.image,
              quantity: item.quantity,
            };
          })
        );
        setCartItems(detailed);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your cart.");
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const itemSubtotal = (price, qty) => price * qty;

  const calculateTotal = () =>
    cartItems.reduce(
      (sum, item) => sum + itemSubtotal(item.price, item.quantity),
      0
    );

  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    const updated = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQty } : item
    );
    setCartItems(updated);

    try {
      const storedUserId = parseInt(localStorage.getItem("userId"), 10);
      const { data: allCarts } = await axios.get(
        "https://fakestoreapi.com/carts"
      );
      const userCart = allCarts.find((c) => c.userId === storedUserId);
      if (!userCart) return;

      const patchProducts = updated.map((p) => ({
        productId: p.id,
        quantity: p.quantity,
      }));

      await axios.patch(`https://fakestoreapi.com/carts/${userCart.id}`, {
        products: patchProducts,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity on server.");
    }
  };

  const removeItem = async (productId) => {
    const filtered = cartItems.filter((item) => item.id !== productId);
    setCartItems(filtered);

    try {
      const storedUserId = parseInt(localStorage.getItem("userId"), 10);
      const { data: allCarts } = await axios.get(
        "https://fakestoreapi.com/carts"
      );
      const userCart = allCarts.find((c) => c.userId === storedUserId);
      if (!userCart) return;

      const patchProducts = filtered.map((p) => ({
        productId: p.id,
        quantity: p.quantity,
      }));

      await axios.patch(`https://fakestoreapi.com/carts/${userCart.id}`, {
        products: patchProducts,
      });

      toast.info("Item removed from cart.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item on server.");
    }
  };

  const handleCheckout = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      toast.error("Please log in to proceed to checkout.");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-[#FF9900] text-xl">Loading cart…</p>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Your Cart is Empty
        </h1>
        <Link
          to="/"
          className="py-2 px-4 bg-[#FF9900] text-white rounded-md hover:bg-orange-600 transition"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-8 lg:px-16">
      <ToastContainer position="top-center" />
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md flex flex-col md:flex-row"
            >
              <div className="w-full md:w-1/4 bg-gray-50 flex items-center justify-center p-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-32 object-contain"
                />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-700">${item.price.toFixed(2)} each</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor={`qty-${item.id}`}
                      className="text-sm text-gray-700"
                    >
                      Qty:
                    </label>
                    <input
                      id={`qty-${item.id}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value, 10))
                      }
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold text-gray-900">
                      ${itemSubtotal(item.price, item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">Subtotal</span>
            <span className="text-gray-900 font-semibold">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
          <div className="border-t border-gray-200 my-4" />
          <button
            onClick={handleCheckout}
            className="w-full py-3 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-orange-600 transition mb-2"
          >
            Proceed to Checkout
          </button>
          <Link
            to="/"
            className="mt-auto text-[#FF9900] text-sm hover:underline text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
