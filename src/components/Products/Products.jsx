import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductsContext } from "./../../context/ProductsContext";

export default function Products() {
  const {
    filteredProducts,
    isLoading,
    search,
    setSearch,
    sortType,
    setSortType,
    isDarkMode,
  } = useContext(ProductsContext);

  function LoadingUI() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-5xl text-teal-600 dark:text-teal-400" />
        <p
          className={`mt-4 text-lg ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Loading products...
        </p>
      </div>
    );
  }

  function ShowProductsUI() {
    return (
      <div>
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <input
            type="text"
            placeholder="Search for a product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full sm:w-1/3 p-3 border rounded-lg ${
              isDarkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-black border-gray-300"
            }`}
          />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className={`w-full sm:w-1/4 p-3 border rounded-lg ${
              isDarkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-black border-gray-300"
            }`}
          >
            <option value="">Sort By</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-a-z">Name: A-Z</option>
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <p
            className={`text-center text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            There are no products matching your search.
          </p>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center mt-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white shadow-md rounded-lg text-center overflow-hidden hover:shadow-xl transition-shadow ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain p-2"
                />
                <div
                  className={`p-4 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  <h5
                    className={`text-lg font-semibold truncate ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {product.title.length > 20
                      ? product.title.substring(0, 20) + "..."
                      : product.title}
                  </h5>
                  <p
                    className={`text-teal-600 font-bold text-xl mb-4 ${
                      isDarkMode ? "text-teal-400" : "text-teal-600"
                    }`}
                  >
                    {product.price}$
                  </p>
                  <Link
                    to={`/products/${product.id}`}
                    className="inline-block w-[100%] bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition"
                  >
                    Show Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="w-[90%] sm:w-[80%] mx-auto py-5">
        <h1
          className={`font-bold text-3xl text-center my-7 pt-16 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Latest Products
        </h1>
        <hr
          className={`border-gray-300 mb-8 ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          }`}
        />
        {isLoading ? <LoadingUI /> : <ShowProductsUI />}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}
