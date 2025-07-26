import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between h-screen">
        <div className="mt-5 pt-12 lg:pt-8 w-full mx-auto">
          <Outlet />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
