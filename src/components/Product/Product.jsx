import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaSpinner, FaStar } from "react-icons/fa";
import { ProductsContext } from "./../../context/ProductsContext";
import { toast } from "react-toastify";

export default function Product() {
  const { id } = useParams();
  const { allProducts, isLoading, addProduct, isDarkMode } =
    useContext(ProductsContext);
  const [product, setProduct] = useState(null);
  const [productLoading, setProductLoading] = useState(false);

  useEffect(() => {
    setProductLoading(true);
    const foundProduct = allProducts.find((item) => item.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else if (!isLoading && allProducts.length > 0) {
      toast.error("Product not found!");
    }
    setProductLoading(false);
  }, [id, allProducts, isLoading]);

  const Loading = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-teal-600 dark:text-teal-400" />
      </div>
    );
  };

  const ShowProduct = () => {
    if (!product) {
      return (
        <p
          className={`text-center text-lg ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Product not found.
        </p>
      );
    }

    return (
      <div
        className={`flex flex-col md:flex-row items-center gap-8 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="flex justify-center w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-96 h-96 object-cover"
          />
        </div>
        <div
          className={`w-full md:w-1/2 text-center md:text-left p-6 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          <h4
            className={`uppercase text-lg mb-2 ${
              isDarkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            {product.category}
          </h4>
          <h1
            className={`text-4xl mb-2 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {product.title}
          </h1>
          <div className="flex items-center md:justify-start justify-center">
            <p
              className={`text-lg mb-4 mr-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Rating: {product.rating?.rate || "N/A"}
            </p>
            <div>
              <FaStar className="text-yellow-500 mb-4" />
            </div>
          </div>
          <h3
            className={`text-4xl font-bold my-3 ${
              isDarkMode ? "text-teal-400" : "text-teal-600"
            }`}
          >
            $ {product.price}
          </h3>
          <p
            className={`text-lg ${isDarkMode ? "text-gray-300" : "text-black"}`}
          >
            {product.description}
          </p>
          <div className="pt-4">
            <button
              className="p-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition"
              onClick={() => addProduct(product)}
            >
              Add to Cart
            </button>
            <Link
              to="/cart"
              className="p-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 ms-2"
            >
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center my-7 pt-24 pb-24">
      {isLoading || productLoading ? <Loading /> : <ShowProduct />}
    </div>
  );
}
