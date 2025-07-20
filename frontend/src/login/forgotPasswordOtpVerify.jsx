import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { useCookies } from "react-cookie"

function ForgotPasswordOtpVerify() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [password, setPassword] = useState("")
  const [confirmpasword, setconfirmPassword] = useState("")
  const [sendRequest, setSendRequest] = useState(false)
  const [cookies, setcookie] = useCookies()
  const location = useLocation()
  const navigate = useNavigate()

  console.log("hii from forgotPasswordOtpVerify")
  console.log("email in forgot ForgotPasswordOtpVerify", location?.state?.email)

  const handleChangeOtp = (value, index) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
  }

  const handleResetPassowrd = async (e) => {
    e.preventDefault()
    setSendRequest(true)

    try {
    

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
      if (!location?.state?.email.trim()) {
        alert("Email not found. It is a frontend issue from forgot password page...")
        return
      }
      let otpinnumberformat = 0
      for (let i = 0; i < otp.length; i++) {
        otpinnumberformat = otpinnumberformat * 10 + Number(otp[i])
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/user/otpverifyAfterForgetPassword`,
        { email: location?.state?.email, otp: otpinnumberformat, password }
      )

      console.log(data)
      if (data?.message === "login successfully") {
        setcookie("refreshToken", data?.data, {
          path: "/",
          maxAge: 7 * 24 * 60 * 60,
        })
        navigate("/")
      }
    } catch (error) {
      console.log("error in forgot password reset")
      console.log(error)
      alert(error?.response?.data?.message || "Something went wrong")
    } finally {
      setSendRequest(false)
      setOtp(new Array(6).fill(""))
      setconfirmPassword("")
      setPassword("")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Reset Password</h2>

        <form onSubmit={handleResetPassowrd} className="space-y-5">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChangeOtp(e.target.value, index)}
                className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmpasword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            disabled={sendRequest}
            type="submit"
            className={`w-full text-white py-2 rounded-lg transition duration-200 ${
              sendRequest
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {sendRequest ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordOtpVerify

