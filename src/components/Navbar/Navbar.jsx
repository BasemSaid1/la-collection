import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";
import { ProductsContext } from "../../context/ProductsContext";

export default function Navbar() {
  const { cart, isDarkMode, toggleTheme } = useContext(ProductsContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-gray-800 fixed top-0 left-0 right-0 z-50 shadow-lg ">
      <div className="container mx-auto w-[97%] md:w-[80%] flex justify-between items-center py-4">
        <Link
          to="/"
          className="flex items-center text-white font-bold text-2xl space-x-2"
          onClick={closeMenu}
        >
          LA COLLECTION
        </Link>

        <div className="flex items-center space-x-4">
          <button
            className="lg:hidden text-white focus:outline-none cursor-pointer"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex lg:items-center">
          <ul className="flex text-white space-x-4 items-center">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-gray-300 transition ${
                    isActive ? "text-gray-300" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `hover:text-gray-300 transition ${
                    isActive ? "text-gray-300" : ""
                  }`
                }
              >
                Products
              </NavLink>
            </li>
            <li className="relative">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `flex items-center hover:text-gray-300 transition ${
                    isActive ? "text-gray-300" : ""
                  }`
                }
              >
                Cart
                <FaShoppingCart className="ml-1" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
          <button
            onClick={toggleTheme}
            className="ml-5 text-white focus:outline-none hover:text-gray-300 dark:hover:text-gray-400"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-emerald-600 text-white transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden z-50 dark:bg-gray-800`}
      >
        <button
          className="absolute top-4 left-4 text-white focus:outline-none cursor-pointer"
          onClick={closeMenu}
          aria-label="Close Menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <ul className="flex flex-col space-y-6 p-4 pt-16 text-right">
          <li>
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block hover:text-gray-300 transition ${
                  isActive ? "text-gray-300" : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block hover:text-gray-300 transition ${
                  isActive ? "text-gray-300" : ""
                }`
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={({ isActive }) =>
                `hover:text-gray-300 transition ${
                  isActive ? "text-gray-300" : ""
                }`
              }
            >
              <div className="relative flex items-center justify-end">
                <span className="mr-1">Cart</span>
                <FaShoppingCart />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </NavLink>
          </li>
        </ul>
        <button
          onClick={toggleTheme}
          className="ml-5 text-white focus:outline-none hover:text-gray-300 dark:hover:text-gray-400"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 lg:hidden z-40" onClick={closeMenu} />
      )}
    </nav>
  );
}
