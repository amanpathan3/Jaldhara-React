// src/pages/auth/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import shopLogo from "../../assets/shopLogo.png"

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // redirect to HomePage
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full">
        {/* Left Side Image + Branding */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white flex-col items-center justify-center p-12">
          <img
            src={shopLogo}
            alt="Shop Logo"
            className="mb-6 bg-none"
          />
          <h1 className="text-3xl font-bold">JALDHARA MACHINERY AND PLUMBING MATERIAL</h1>
          
        </div>

        {/* Right Side Login Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-gray-50">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Login</h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


/*
import { signOut } from "firebase/auth";
import { auth } from "../pages/auth/firebase";  
import { useNavigate } from "react-router-dom";

 
          <button
            onClick={async () => {
              await signOut(auth);
              setIsOpen(false);
              navigate("/login");
            }}
            className="text-left text-red-600 hover:text-red-800 mt-6"
          >
            Logout
          </button>

*/