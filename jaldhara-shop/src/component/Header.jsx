import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import JaldharaLogo from "../assets/Jaldhara.png";
import UserImg from "../assets/user.png";
import { signOut } from "firebase/auth";
import { auth } from "../pages/auth/firebase";  // IMPORTANT: adjust path!!
import { useNavigate } from "react-router-dom";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate();

  return (
    <>
      <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="flex items-center justify-between px-6 py-3">
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-700 focus:outline-none"
          >
            <Menu size={28} />
          </button>

          <div className="flex justify-center items-center">
            <img
              src={JaldharaLogo}
              alt="Jaldhara Logo"
              className="h-10 w-auto cursor-pointer"
            />
          </div>

          <div className="flex items-center">
            <img
              src={UserImg}
              alt="User"
              className="h-10 w-10 rounded-full border-2 border-gray-300 cursor-pointer hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-300 shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            <X size={24} />
          </button>
        </div>

        
        <nav className="flex flex-col space-y-4 px-6 mt-4 text-gray-700 font-medium">
          <a
            href="/"
            className="hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="/bill"
            className="hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Bill Generator
          </a>
          <a
            href="/dashboard"
            className="hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </a>
          <a
            href="/products"
            className="hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Product Details
          </a>
          <a
            href="/customer-details"
            className="hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Customer Details
          </a>
          <a
            href="/stocks"
            className="hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Manage Stocks
          </a>
           <button
    onClick={async () => {
      await signOut(auth);    // logout user
      setIsOpen(false);
      navigate("/login");     // go to login page
    }}
    className="text-left text-red-600 hover:text-red-800 mt-6"
  >
    Logout
  </button>
        </nav>
      </div>
    </>
  );
}
