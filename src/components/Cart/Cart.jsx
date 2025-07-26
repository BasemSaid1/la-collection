import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";

export default function Cart() {
  const { cart, removeFromCart, isDarkMode } = useContext(ProductsContext);

  return (
    <div
      className={`min-h-screen p-4 sm:p-8 pt-24 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <h1
        className={`text-2xl sm:text-3xl font-bold text-center mb-8 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p
          className={`text-center ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Your cart is empty.
        </p>
      ) : (
        <div className="grid gap-4 max-w-4xl mx-auto">
          {cart.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col sm:flex-row gap-4 p-4 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } shadow rounded-lg items-center sm:items-start`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-32 object-contain"
              />
              <div
                className={`flex-1 text-center sm:text-left ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="mb-1">
                  Price: <span className="font-medium">${item.price}</span>
                </p>
                <p>
                  Quantity: <span className="font-medium">{item.quantity}</span>
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
