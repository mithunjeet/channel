import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { useCookies } from "react-cookie";
import axios from "axios";
export default function JobSeekerDashboard() {
  const [cookies, setCookies] = useCookies();
  const [rating, setRating] = useState(0)
  const [noOfPersonRated , setNoOfPersonRated ] = useState(0)
    async function fetchRating() { 
      try {
      const { data } = await axios.post(`${import.meta.env.VITE_URL}/rate/getRating`, {
        _id : cookies.refreshToken?.user?._id 
      },{
          headers: {
           Authorization : `Bearer ${cookies.refreshToken?.user?.refreshtoken}`
        }
      })
        console.log(data)
        if (data.length > 0) { 
          setRating(data[0].averageRating);
          setNoOfPersonRated(data[0].totalRating)
        }
     } catch (error) {
        console.log(error)
    }
  }
  
function handleRating() {
  if (noOfPersonRated === 0) return "No Rating";
  let avg = rating   
  if (avg === 1) return "Rating ⭐";
  if (avg === 2) return "Rating ⭐⭐";
  if (avg === 3) return "Rating ⭐⭐⭐";
  if (avg === 4) return "Rating ⭐⭐⭐⭐";
  if (avg === 5) return "Rating ⭐⭐⭐⭐⭐";
  return "No Rating";
}


  useEffect(() => {
    fetchRating();
  }, [])
  
  return (
  
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6 border">
        <h1 className="text-3xl font-bold text-blue-700 text-center">Your Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-6 items-center border-b pb-4">
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.QCNBVOKyMqHKD6hp3fYGZgHaHa&pid=Api&P=0&h=180"
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-300"
          />
          <div className="flex-1 space-y-1">
            <h2 className="text-xl font-semibold">{cookies.refreshToken?.user?.username }</h2>
            <p className="text-gray-600">📞 .........</p>
            <p className="text-gray-600">🏠 {cookies.refreshToken?.user?.state } {"  "} {cookies.refreshToken?.user?.district}</p>
<p className="text-gray-600">
  {rating === 0 ? (
    <span>⭐ No one has rated yet!</span>
  ) : (
    <>
      {handleRating(rating, noOfPersonRated)}{" "}
      <span className="text-sm text-gray-500">({noOfPersonRated} count)</span>
    </>
  )}
</p>

          </div>
        </div>

        <div className="flex justify-between text-blue-600 font-medium">
          <Link to="/setting">⚙️ Setting</Link>
          <Link to="/applyjob">Apply Job</Link>
          <Link to="/playlist">Playlist</Link>
        </div>
      </div>
    </div>
  );
}

