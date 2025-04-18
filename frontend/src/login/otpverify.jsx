import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
 
const OtpVerify = () => {
  
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [cookies, setcookie, removecookie] = useCookies(['refreshToken']);
  const handleChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
  };

  async function verify(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_URL}/user/verifyotp`, {
        email,
        otp: otp.join("")  
      });
      console.log(data)
      if (data?.message === "Account verified successfully")    
      {
        setcookie('refreshToken' , data , {
        path: '/',
        maxAge: 7 * 24 * 60 * 60, 
       
        });``
        navigate('/mainpage');
      }
    } catch (error){
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-6">Enter OTP</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="mb-4 px-4 py-2 w-64 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex justify-center gap-2 mb-4">
          {otp.map((digit, i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              className="w-10 h-10 text-center border border-gray-400 rounded text-lg"
            />
          ))}
        </div>

        <button
          className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
          onClick={verify}
        >
          Verify
        </button>
        <Link  to={"/"}  className='text-xl  text-red-400'> resend otp</Link>
      </div>
    </div>
  );
};

export default OtpVerify;




