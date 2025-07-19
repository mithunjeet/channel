import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
import { useCookies } from "react-cookie"

const OtpVerify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [password, setPassword] = useState("")
  const [confirmpasword, setconfirmPassword] = useState("")
  const [sendRequest, setSendRequest] = useState(false)

  const [cookies, setcookie] = useCookies()

 //   const doc = useLocation()
//   const navigate = useNavigate()
  
  const handleChangeOtp = (value, index) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
  };

  const handleResetPassowrd = async (e) => {
    e.preventDefault()
    setSendRequest(true)

    try {
      const email = localStorage.getItem("resetEmail")    
      if (!email.trim()) {
        alert("Email not found. It is  a frontend issue from forgot password page...");
        return;
      }

      if (!password.trim() || !confirmpasword.trim()) {
        alert("Please fill all fields properly")
        return
      }

      for (let i = 0; i < otp.length; i++) {
        if (!otp[i].trim()) {
          alert("Fill OTP properly")
          return
        }
      }

      if (confirmpasword !== password) {
        alert("Password mismatch")
        return
      }

    
      let otpinnumberformat = 0;
      for (let i = 0; i < otp.length; i++) {
        otpinnumberformat = otpinnumberformat * 10 + Number(otp[i])
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/user/otpverify`,
        { email , otpinnumberformat, password }
      );
       console.log(data)
      if (data?.message === "login successfully") {
        setcookie("refreshToken", data?.data, {
          path: "/",
          maxAge: 7 * 24 * 60 * 60,
        })
        navigate("/")
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong")
    } finally {
      localStorage.removeItem("resetEmail")  
      setSendRequest(false)
      setOtp(new Array(6).fill("")) 
      setconfirmPassword("")
      setPassword("")
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>

      <form onSubmit={handleResetPassowrd}>
        <div className="flex justify-center gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChangeOtp(e.target.value, index)}
              className="w-10 h-10 border text-center text-lg rounded"
            />
          ))}
        </div>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-2 mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmpasword}
          onChange={(e) => setconfirmPassword(e.target.value)}
          className="w-full border px-4 py-2 mb-4 rounded"
        />

        <button
          disabled={sendRequest}
          type="submit"
          className={`w-full ${
            sendRequest
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          } py-2 rounded-md transition`}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default OtpVerify
