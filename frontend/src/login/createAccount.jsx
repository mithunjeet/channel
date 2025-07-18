import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { location } from "../location_data";
import { showEmojiAlert } from "alert_popup_emoji"
export default function CreateAccount() {
  const navigate = useNavigate()
  const [username , setUsename] =  useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [service, setService] = useState("")
  const [district, setDistrict] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [state, setState] = useState("")
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };
  
  useEffect(() => {
    setDistrict("")   
  }, [state])
  
  console.log(message)
  console.log(service)
  const handleSubmit = async (e) => {
    if (!email.trim() || !password.trim() || !username.trim() || !service.trim() || !state || !district || !service)
    {  
      showEmojiAlert({ message: "All field are required", type: false, sound: false });
      return
    }
    setIsLoading(true)
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_URL}/user/register`, {
        username, email, password, service , state , district
      })

      setMessage(data?.message)
      console.log(message)
      if (data?.message === "OTP sent to email. Verify to complete registration.") {
        navigate("/verifyOtp")
      }
       
        
    }catch (err){
      showEmojiAlert({ message: err?.response?.data.error, type: false });
    } finally { 
         setEmail("")
         setPassword("")
         setService("")    
         setUsename("")
         setDistrict("")
         setState("");
         setIsLoading(false)
    }
  }
  function handleGoBack() {
    setIsLoading(false);
    navigate("/register") 
  }

  const d = (state === "") ? [] : (location.states.find(ele => ele.state === state)?.districts || []);

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
                 <select required={true} name="" id="" value={service} onChange={(e)=>{setService(e.target.value)}} className="w-full p-2 border border-gray-300 rounded-lg">
                   <option value="">--select your choice--</option>
                   <option value="worker">worker</option>
                   <option value="work provider">work provider</option>
                </select>
                   <select required={true} name="" id="" value={state} onChange={(e)=>{setState(e.target.value)}} className="w-full p-2 border border-gray-300 rounded-lg">
                   <option value="">--select your state--</option>
                   {location.states.map((ele, index, array) => {
                                         
                     return <option value={ele?.state}  key={index}>{ ele?.state}</option>
                     })}
                   
                  
             </select>   
              <select required={true} name="" id="" value={district} onChange={(e)=>{setDistrict(e.target.value)}} className="w-full p-2 border border-gray-300 rounded-lg">
                   <option value="disitrict">{state === "" ? "--select first state please--" : "select district"  }</option>

                   {d.map((ele, index) => { return <option value={ele}  key={index}>{ele}</option>})}
                  
             </select>             
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

  