// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#232F3E] text-white">
      {/* Back to Top */}
      <div className="flex justify-center py-4 border-b border-gray-700">
        <a href="#top" className="text-sm font-medium hover:underline">
          Back to top
        </a>
      </div>

      {/* Footer Links */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Get to Know Us */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold mb-3">Get to Know Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Amazon
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Investor Relations
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Amazon Devices
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Amazon Science
                </a>
              </li>
            </ul>
          </div>

          {/* Make Money with Us */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold mb-3">Make Money with Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Sell products on Amazon
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sell on Amazon Business
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sell apps on Amazon
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Become an Affiliate
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Advertise Your Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Self-Publish with Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Host an Amazon Hub
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  &rsaquo; See More Make Money with Us
                </a>
              </li>
            </ul>
          </div>

          {/* Amazon Payment Products */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold mb-3">
              Amazon Payment Products
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Amazon Business Card
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shop with Points
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Reload Your Balance
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Amazon Currency Converter
                </a>
              </li>
            </ul>
          </div>

          {/* Let Us Help You */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold mb-3">Let Us Help You</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Amazon and COVID-19
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Your Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Your Orders
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shipping Rates & Policies
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Returns & Replacements
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Manage Your Content and Devices
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 py-4 flex items-center justify-center">
        <img src="amazon-w.png" alt=" amazon logo" className="h-10 ml-10" />
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} Amazon — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
