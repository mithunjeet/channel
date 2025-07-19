import { useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
  const [submit , setsubmit]= useState(false)
  const [email, setEmail] = useState("")
  const navigate = useNavigate();
  async function handleResetPassowrd(e) {
    
    e.preventDefault()
    try {
      setsubmit(true)
      if (!email.trim()) {
        alert("fill email properly")
        return;
      } 
      const { data } = await axios.post(`${import.meta.env.VITE_URL}/user/forgotPassword`, { email })
      if (data?.message === "opt is send to your email account complete next step") {
         navigate("/otpVerify" , {state : data?.email})
      }         
    } catch (error) {
      console.log(error)
       alert(error?.response?.data)
    } finally {
   
      setEmail("")
      setsubmit(false)   
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-4" onSubmit={handleResetPassowrd}>
        <h2 className="text-xl font-bold text-center text-gray-800">  Retrive  your Account </h2>

        <div>
          <label id="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required= {true}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

<button
  disabled={submit}
  type="submit"
  className={`w-full py-2 rounded-md transition font-medium ${
    submit ? "opacity-50 cursor-not-allowed bg-blue-400 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
  }`}
>
  Retrieve Account
</button>

      </form>
    </div>
  );
}

export default ForgotPassword

  