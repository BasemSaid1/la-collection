import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import Products from "./components/Products/Products";
import { ProductsProvider } from "./context/ProductsContext";
import Cart from "./components/Cart/Cart";
import NotFound from "./components/NotFound/NotFound";

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "cart", element: <Cart /> },
      { path: "/Products/:id", element: <Product /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <ProductsProvider>
        <RouterProvider router={x}></RouterProvider>
      </ProductsProvider>
    </>
  );
}

export default App;
