import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/ProductsContext";

export default function NotFound() {
  const { isDarkMode } = useContext(ProductsContext);

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-12 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="text-center">
        <h1
          className={`text-6xl font-bold mb-4 ${
            isDarkMode ? "text-teal-400" : "text-teal-600"
          }`}
        >
          404
        </h1>
        <p
          className={`text-xl mb-6 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Oops! The page you are looking for could not be found.
        </p>
        <Link
          to="/"
          className="inline-block bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition-colors duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
