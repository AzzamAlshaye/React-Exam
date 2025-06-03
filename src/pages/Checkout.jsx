import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Saudi Arabia");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [showModal, setShowModal] = useState(false);

  const countryOptions = [
    "Saudi Arabia",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "India",
    "Germany",
    "France",
    "United Arab Emirates",
    "Egypt",
  ];

  const cityByCountry = {
    "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Dammam", "Medina"],
    "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Miami"],
    "United Kingdom": [
      "London",
      "Manchester",
      "Birmingham",
      "Liverpool",
      "Leeds",
    ],
    Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    India: ["Mumbai", "Delhi", "Bengaluru", "Chennai", "Kolkata"],
    Germany: ["Berlin", "Munich", "Frankfurt", "Hamburg", "Cologne"],
    France: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"],
    "United Arab Emirates": [
      "Dubai",
      "Abu Dhabi",
      "Sharjah",
      "Ajman",
      "Al Ain",
    ],
    Egypt: ["Cairo", "Alexandria", "Giza", "Luxor", "Aswan"],
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const storedUserId = parseInt(localStorage.getItem("userId"), 10);
      if (!storedUserId) {
        setCartItems([]);
        setLoading(false);
        return;
      }
      try {
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
              quantity: item.quantity,
            };
          })
        );
        setCartItems(detailed);
      } catch {
        setCartItems([]);
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

  const handlePlaceOrder = () => {
    if (
      !address.trim() ||
      !city ||
      !country ||
      !cardNumber.trim() ||
      !expiry.trim() ||
      !cvv.trim()
    ) {
      return;
    }
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      navigate("/");
    }, 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-[#FF9900] text-xl">Loading checkout…</p>
      </div>
    );
  }

  const cityOptions = cityByCountry[country] || [];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-8 lg:px-16">
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Order Confirmed
            </h2>
            <p className="text-gray-700 mb-2">
              You paid{" "}
              <span className="font-bold text-[#FF9900]">
                ${calculateTotal().toFixed(2)}
              </span>
              .
            </p>
            <p className="text-gray-700 mb-2">
              Shipment will arrive in <span className="font-bold">5 days</span>.
            </p>
            <p className="text-gray-700">
              Delivery to: {address}, {city}, {country}.
            </p>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Shipping & Payment
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
            />

            <select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setCity(""); // Reset city on country change
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
            >
              {countryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
            >
              <option value="" disabled>
                Select City
              </option>
              {cityOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
            />
            <div className="flex flex-wrap gap-2 lg:gap-0 space-x-4">
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
              />
              <input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-24 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
              />
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-[#FF9900] text-white font-semibold rounded-lg hover:bg-orange-600 transition mt-4 disabled:opacity-50"
              disabled={
                !address || !city || !country || !cardNumber || !expiry || !cvv
              }
            >
              Place Order
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Review Items
          </h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <p className="text-gray-700">{item.title}</p>
                <div className="text-gray-900 font-semibold">
                  {item.quantity} × ${item.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-semibold">Total</span>
            <span className="text-gray-900 font-bold">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
