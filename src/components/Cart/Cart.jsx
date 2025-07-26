import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";

export default function Cart() {
  const { cart, removeFromCart, isDarkMode } = useContext(ProductsContext);

  return (
    <div
      className={`min-h-screen p-8 pt-24 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <h1
        className={`text-3xl font-bold text-center mb-8 ${
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
              className={`flex gap-4 p-4 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } shadow rounded-lg items-center`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover"
              />
              <div
                className={`flex-1 ${isDarkMode ? "text-white" : "text-black"}`}
              >
                <h3
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {item.title}
                </h3>
                <p className={isDarkMode ? "text-gray-300" : "text-black"}>
                  Price: ${item.price}
                </p>
                <p className={isDarkMode ? "text-gray-300" : "text-black"}>
                  Quantity: {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
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
