import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true); 

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_URL}/user/login`, { email, password });

      setEmail("");
      setPassword("");

      if (data?.message === "OTP sent to email. Verify to compplete.") {
        navigate("/verifyOtp");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <div>
      {isLoading == true ?
      <div className="flex  justify-center  items-center  w-screen h-screen">
       <h1 className="text-5xl font-bold text-green-600">
     loading<span className="animate-ping">...</span>
      </h1>
      </div> :
      <div className="relative min-h-screen flex flex-col md:flex-row">
     <h1 className="fixed top-0 left-0 w-full text-center bg-yellow-100 text-amber-600 font-semibold text-sm md:text-base py-2 shadow-md animate-pulse z-50">
     📩 Since i am using  some free services, please check your emai <span className="font-bold">Spam</span> folder for the verification email.
     </h1>

      
      <div className="md:w-1/2 bg-gradient-to-br from-blue-100 to-blue-300 p-8 flex flex-col justify-center items-center space-y-4">
        <h1 className="text-4xl font-extrabold text-blue-900 text-center leading-tight">
          Connecting Skills to <br /> Local Job Opportunities
        </h1>
        <p className="text-center text-blue-950 text-lg font-medium max-w-md">
          A platform to empower rural workers like electricians, chefs, carpenters, masons & more.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4 w-full max-w-md">
          <img src="https://tse4.mm.bing.net/th?id=OIP.M74gFUENDe8Hnc2_fwXhewHaFc&pid=Api&P=0&h=180" alt="Electrician" className="h-28 w-full object-cover rounded-xl shadow-md" />
          <img src="https://tse1.mm.bing.net/th?id=OIP.-AnTEJ7DjTTuaKi_5oEshgHaFc&pid=Api&P=0&h=180" alt="Chef" className="h-28 w-full object-cover rounded-xl shadow-md" />
          <img src="https://tse4.mm.bing.net/th?id=OIP.JMUIU-Jre_ZQ4VALUVFysQHaFc&pid=Api&P=0&h=180" alt="Carpenter" className="h-28 w-full object-cover rounded-xl shadow-md" />
          <img src="https://img.freepik.com/free-photo/bricklaying-construction-worker-building-brick-wall_1150-14756.jpg" alt="Mason" className="h-28 w-full object-cover rounded-xl shadow-md" />
        </div>
      </div>
     
          
      <div className="md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Login</h2>
            <p className="text-gray-500 mt-1">Start finding jobs or skilled workers nearby</p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </div>

          <div className="flex justify-between text-sm mt-4">
            <Link to="/register" className="text-blue-500 hover:underline">Create Account</Link>
            <Link to="/forgotPassword" className="text-blue-500 hover:underline">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </div>}
    </div>
  );
}



