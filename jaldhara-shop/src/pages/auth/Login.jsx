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
    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full">

      {/* Branding Section (Mobile + Desktop) */}
      <div className="flex w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white flex-col items-center justify-center p-8 md:p-12">
        <img
          src={shopLogo}
          alt="Shop Logo"
          className="mb-4 w-28 md:w-48"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-center px-4">
          JALDHARA MACHINERY AND PLUMBING MATERIAL
        </h1>
      </div>

      {/* Login Form */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gray-50">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-sm md:text-base"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-sm md:text-base"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all text-sm md:text-base"
          >
            Login
          </button>
        </form>
      </div>

    </div>
  </div>
);

}