import React, { useState } from 'react';
import { useParams ,Link} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function RateUserForm() {
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState('');
  const [cookies, setcookies] = useCookies();
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { id } = useParams()
  const navigate = useNavigate()
  console.log(id)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!feedback.trim() || !value.trim()){
      alert('Please select all filed before submitting.');
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_URL}/rate/rateUser`, {
         user:id , value , feedback
      },{
          headers: {
           Authorization : `Bearer ${cookies.refreshToken?.user?.refreshtoken}`
        }
      })
      console.log(data);
      alert("thanks for rate me")
    } catch (err) {
      setError(err?.response?.data);
      console.log(error)
    } finally {
       setIsLoading(false)    
    }
    
    setValue('');
    setFeedback('');
  };
  function handleGoBack() { 
    setIsLoading(false); 
    navigate(-1); // it will move one history back
  }
  if (error) {
  console.log(error);
  return (
    <div className="flex justify-center items-center h-screen w-full">
     <div>
      <h1 className="font-semibold text-5xl text-red-600">{ error || "Something went wrong"}</h1>
        <button className="text-black text-xl hover:underline  font-extrabold " onClick={handleGoBack} > back</button>   
     </div>
    </div>
  ); 
}
  return (
    <>
      {isLoading ?
       <div className="flex  justify-center  items-center  w-full h-screen">
       <h1 className="text-5xl font-bold text-green-600">
       loading<span className="animate-ping">...</span></h1> </div> :
      <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mt-10 space-y-4"
    >
      <h2 className="text-xl font-bold text-center text-yellow-600">Rate a User</h2>

      <div>
        <label className="block mb-1 text-gray-700">Select Rating</label>
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Select a rating --</option>
          <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
          <option value="4">⭐⭐⭐⭐ - Good</option>
          <option value="3">⭐⭐⭐ - Average</option>
          <option value="2">⭐⭐ - Poor</option>
          <option value="1">⭐ - Very Bad</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-gray-700">Feedback (optional)</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback..."
          rows={4}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
      >
        Submit Rating
      </button>
    </form> }    </>
  );
}