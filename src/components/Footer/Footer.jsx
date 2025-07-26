import React from "react";

export default function Footer() {
  return (
    <footer className="text-white bg-gray-800 py-8 ">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="mt-2 pt-4 text-center text-sm">
          <p>
            All rights reserved © {new Date().getFullYear()}
            <span className="text-red-700 font-bold"> Basem Said</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
