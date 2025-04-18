import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
export default function CreateAccount() {
  const navigate = useNavigate()
 const [username , setUsename] =  useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState(null)
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };
  console.log(message)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`http://localhost:9000/user/register`, {
        username, email, password
      })
      setMessage(data?.message)
      console.log(message)
      if (data?.message === "OTP sent to email. Verify to complete registration.") { 
      navigate("/verifyOtp")
      }
       
        
    } catch (error) {
      if (error.status === 409) { 
      navigate("/verifyOtp")
      }
      console.log(error)
      console.log(error?.message)
      console.log(error?.status)
      setError(error.message)      
      }
    
    setEmail("")
    setPassword("")
    setUsename("")
    
  }

  return (
    <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4"> Create Account </h2>
        <form  className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={ username }
            onChange={ (e)=>{setUsename(e.target.value)}}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <div>
            <label className="block mb-1 text-sm">Avatar:</label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Cover Image:</label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={handleSubmit}

          >
            Create Account
          </button>
        </form>
      </div>
    </div>
    </>

  );
}

