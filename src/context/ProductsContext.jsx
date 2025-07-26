import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setFilteredProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("There is a problem loading the products:", err);
        setIsLoading(false);
        toast.error("Failed to load products!");
      });
  }, []);

  useEffect(() => {
    let tempProducts = [...allProducts];
    if (search !== "") {
      tempProducts = tempProducts.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sortType === "price-low-high") {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === "price-high-low") {
      tempProducts.sort((a, b) => b.price - a.price);
    } else if (sortType === "name-a-z") {
      tempProducts.sort((a, b) => a.title.localeCompare(b.title));
    }
    setFilteredProducts(tempProducts);
    if (search !== "" && tempProducts.length === 0) {
      toast.warn("No products match your search!");
    }
  }, [search, sortType, allProducts]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("theme", JSON.stringify(isDarkMode));
  }, [cart, isDarkMode]);

  const filterByCategory = (category) => {
    const filtered = allProducts.filter((item) => item.category === category);
    setFilteredProducts(filtered);
    setSearch("");
    setSortType("");
    toast.success(`Filtered by ${category}`);
  };

  const addProduct = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast.success(`${product.title} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      toast.info("Product removed from cart!");
      return updatedCart;
    });
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ProductsContext.Provider
      value={{
        allProducts,
        filteredProducts,
        isLoading,
        search,
        setSearch,
        sortType,
        setSortType,
        filterByCategory,
        cart,
        addProduct,
        removeFromCart,
        isDarkMode,
        toggleTheme,
      }}
    >
      <div className={isDarkMode ? "dark" : ""}>{children}</div>
    </ProductsContext.Provider>
  );
};
