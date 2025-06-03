// src/components/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((resp) => {
        setProduct(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load product details.");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
      toast.error("Please log in to add items to your cart.");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    // Add to cart notificaion
    toast.success("Added to cart!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-[#FF9900] text-xl">Loading product…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const renderStars = (rate) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate - fullStars >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-full-${i}`} className="text-yellow-500" />);
    }
    if (halfStar) {
      stars.push(
        <FaStar key="star-half" className="text-yellow-500 opacity-50" />
      );
    }
    while (stars.length < 5) {
      stars.push(
        <FaRegStar
          key={`star-empty-${stars.length}`}
          className="text-gray-300"
        />
      );
    }
    return stars;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-8 px-4 md:px-8 lg:px-16">
      <ToastContainer position="top-center" />
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-md overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Left: Product Images */}
          <div className="lg:col-span-1 flex flex-col items-center">
            {/* Main image */}
            <div className="w-full h-96 bg-gray-50 flex items-center justify-center mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full object-contain p-4"
              />
            </div>
            {/* Thumbnail previews */}
            <div className="w-full flex justify-center space-x-2">
              {[product.image].map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="w-16 h-16 bg-gray-50 flex items-center justify-center border rounded transition hover:border-gray-400"
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${idx}`}
                    className="max-h-ful object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Center: Product Info */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Title */}
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
              {product.title}
            </h1>

            {/* Rating and Reviews */}
            <div className="flex items-center mb-4">
              <div className="flex">{renderStars(product.rating.rate)}</div>
              <span className="ml-2 text-sm text-blue-600 hover:underline">
                {product.rating.count} ratings
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-[#FF9900]">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Bullet Points */}
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li className="truncate">Category: {product.category}</li>
              <li className="truncate">In Stock: Yes</li>
              <li className="truncate">
                Fast, free shipping on orders over $25!
              </li>
            </ul>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-medium text-gray-800 mb-2">
                Product Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Add to Cart Box */}
            <div className="w-full lg:w-1/2 bg-gray-50 p-4 rounded-md border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-green-700 font-semibold">
                  In Stock
                </span>
              </div>
              <div className="flex items-center mb-4">
                <span className="mr-2 text-sm">Qty:</span>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                >
                  {[...Array(10).keys()].map((n) => (
                    <option key={n + 1} value={n + 1}>
                      {n + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-orange-600 transition"
              >
                Add to Cart
              </button>
            </div>

            {/* Back to Home */}
            <div className="mt-6">
              <Link to="/" className="text-[#FF9900] text-sm hover:underline">
                &larr; Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
