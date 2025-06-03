// src/components/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-50 flex items-center justify-center p-6">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[300px] object-contain"
            />
          </div>

          <div className="p-8 flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <span className="text-2xl font-bold text-[#FF9900] mb-6">
              ${product.price.toFixed(2)}
            </span>
            <button
              className="w-full py-2 bg-[#FF9900] text-white font-semibold rounded-lg hover:bg-orange-600 transition mb-4"
              onClick={() => alert("Added to cart!")}
            >
              Add to Cart
            </button>
            <Link
              to="/"
              className="text-[#FF9900] font-medium hover:underline text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
