import React, { useContext } from "react";
import { Link } from "react-router-dom";
import welcomeImage from "../../assets/home1.jpg";
import { ProductsContext } from "../../context/ProductsContext";

export default function Home() {
  const { allProducts, isLoading, isDarkMode } = useContext(ProductsContext);

  const featuredProducts = allProducts.slice(0, 8);

  return (
    <div
      className={`min-h-screen py-12 px-4 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="max-w-6xl mx-auto mb-12">
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-6 h-96 overflow-hidden rounded-lg shadow-xl ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="w-full md:w-1/2 h-full overflow-hidden order-1 md:order-2">
            <img
              src={welcomeImage}
              alt="Welcome to our store"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className={`w-full md:w-1/2 text-center md:text-left p-6 order-2 md:order-1 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <h1
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Welcome To Our Store
            </h1>
            <p
              className={`text-lg md:text-xl mb-6 ${
                isDarkMode ? "text-gray-300" : "text-black"
              }`}
            >
              Discover The Latest Models At The Best Prices!
            </p>
            <Link
              to="/products"
              className="bg-teal-600 text-white text-2xl font-bold py-2 px-6 rounded-md hover:bg-teal-700 transition-colors duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <h2
            className={`text-3xl font-bold text-center mb-6 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Featured Products
          </h2>
          {isLoading ? (
            <p
              className={`text-center ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Loading products...
            </p>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
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
                      ${product.price}
                    </p>
                    <Link
                      to={`/products/${product.id}`}
                      className="inline-block w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p
              className={`text-center ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No products available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
