import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
      
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_URL}/user/login`, { email, password })
        console.log(data);
        
        setEmail("")
        setPassword("")
        if (data?.message === "OTP sent to email. Verify to compplete.") { 
          navigate("/verifyOtp")
        }
        
      } catch (error) {
         console.log(error)
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
        </div>
        <div className="flex justify-between mb-4">
          <Link to="/register" className="text-blue-500 hover:underline">Create Account</Link>
          <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
        </div>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

