import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
export default function CreateAccount() {
  const navigate = useNavigate()
  const [username , setUsename] =  useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [service , setService] = useState("")
  const [isLoading ,setIsLoading] =useState(false)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  console.log(message)
  console.log(service)
  const handleSubmit = async (e) => {
    if (!email.trim() || !password.trim() || !username.trim() || !service.trim())
    {  
      alert("please fill all field")
      return
    }
    setIsLoading(true)
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_URL}/user/register`, {
        username, email, password, service
      })

      setMessage(data?.message)
      console.log(message)
      if (data?.message === "OTP sent to email. Verify to complete registration.") {
        navigate("/verifyOtp")
      }
       
        
    }catch (err){
      console.log(err?.response?.data.error);
      setError(err?.response?.data.error)
    } finally { 
         setEmail("")
         setPassword("")
         setUsename("")
         setIsLoading(false)
    }
  }
  function handleGoBack() {
    setIsLoading(false);
    navigate("/") 
  }
  if (error) {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
     <div>
      <h1 className="font-semibold text-5xl text-red-600">{error}</h1>
        <button className="text-black text-xl hover:underline  font-extrabold " onClick={handleGoBack}> back</button>   
     </div>
    </div>
  ); 
}

   return (
    <>
      { 
     isLoading ?
     <div className="flex  justify-center  items-center  w-screen h-screen">
     <h1 className="text-5xl font-bold text-green-600">
     loading<span className="animate-ping">...</span>
     </h1>
     </div>
      
      :<div className="flex items-center justify-center min-h-screen bg-gray-100">
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
             <select name="" id="" value={service} onChange={(e)=>{setService(e.target.value)}} className="w-full p-2 border border-gray-300 rounded-lg">
                   <option value="">--select--</option>
                   <option value="worker">worker</option>
                   <option value="work provider">work provider</option>
            </select>
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
    }
    </>

  );
}

  