import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"
export default function ResendOtp() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [message, setmessage] = useState("")
    const [error , setError] = useState(null)
    async function handlesubmit(e) { 
        e.preventDefault()
        try {
        
            const  data = await axios.post(`http://localhost:9000/user/resendOtp`, { email: email })
        //    console.log(data?.data?.message)
            setmessage(data?.data?.message);
            console.log(message)
           if (message  === "OTP IS SENT TO YOUR ACCOUNT. CHECK IT OUT") {
            navigate("/verifyOtp")
           }
            
          console.log(data);
      } catch (error) {
          setError(error)
          console.log(error)
        }
        
    }
    return (

        <>
          
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Resend OTP</h2>
                <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 mb-4"
                />
                <button
                    type="submit"
                    onClick={handlesubmit}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Verify Now
                </button>
            </div>
        </div>       
                
        
        </>
    )
}
