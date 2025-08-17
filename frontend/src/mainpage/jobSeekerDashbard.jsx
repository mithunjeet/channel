import React, { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import JobCard from "./jobCard"; 
import JobCardForManageJob from "./jobCardForManageJob";
export default function JobSeekerDashboard() {
  const [cookies] = useCookies();
  const [rating, setRating] = useState(0);
  const [noOfPersonRated, setNoOfPersonRated] = useState(0)
  const [jobs, setJobs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchRating();
    fetchUserJobs();
  }, []);

  async function fetchRating() {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/rate/getRating`,
        {
          _id: cookies.refreshToken?.user?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.refreshToken?.user?.refreshtoken}`,
          },
        }
      );
      if (data.length > 0) {
        setRating(data[0].averageRating)
        setNoOfPersonRated(data[0].totalRating)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchUserJobs() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/apply/userapplication`,
        {
          headers: {
            Authorization: `Bearer ${cookies.refreshToken?.user?.refreshtoken}`,
          },
        }
      );
      setJobs(data || [])
    } catch (error) {
      console.error("Failed to fetch applications", error)
    }
  }

  function handleRating() {
    if (noOfPersonRated === 0) return "No Rating"
    let avg = rating;
    if (avg === 1) return "Rating ⭐"
    if (avg === 2) return "Rating ⭐⭐"
    if (avg === 3) return "Rating ⭐⭐⭐"
    if (avg === 4) return "Rating ⭐⭐⭐⭐"
    if (avg === 5) return "Rating ⭐⭐⭐⭐⭐"
    return "No Rating";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-10 border border-blue-100">

        


        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-blue-700">{ `Welcome,  ${cookies?.refreshToken?.user?.username}`}</h1>
          <p className="text-gray-500 text-sm">Manage your profile, jobs, and ratings in one place.</p>
        </div>

        


        <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
          {cookies?.refreshToken?.user?.avatar ? (
            <img
              src={cookies?.refreshToken?.user?.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-300"
            />
          ) : (
            <div
              onClick={() => navigate("/setting")}
              title="Upload avatar"
              className="w-24 h-24 rounded-full bg-gray-500 text-white flex items-center justify-center text-3xl font-semibold cursor-pointer"
            >
              {cookies?.refreshToken?.user?.username?.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex-1 space-y-1">
            <h2 className="text-xl font-semibold">{cookies.refreshToken?.user?.username}</h2>
            <p className="text-gray-600">{cookies?.refreshToken?.user?.phone ? `📞${cookies?.refreshToken?.user?.phone }`:"📞 phone no has not provided"  } </p>
            <p className="text-gray-600">
              🏠 {cookies.refreshToken?.user?.state} {cookies.refreshToken?.user?.district}
            </p>
            <p className="text-gray-600">
              {rating === 0 ? (
                <span>⭐ No one has rated yet!</span>
              ) : (
                <>
                  {handleRating()}{" "}
                  <span className="text-sm text-gray-500">({noOfPersonRated} count)</span>
                </>
              )}
            </p>
          </div>
        </div>

      
        


        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div
            onClick={() => navigate("/applyjob")}
            className="cursor-pointer bg-blue-50 hover:bg-blue-100 p-6 rounded-xl shadow transition"
          >
            <h3 className="text-lg font-semibold text-blue-700">Apply for Jobs</h3>
            <p className="text-sm text-gray-500 mt-1">Browse and apply</p>
          </div>

          <div
            onClick={() => navigate("/playlist")}
            className="cursor-pointer bg-blue-50 hover:bg-blue-100 p-6 rounded-xl shadow transition"
          >
            <h3 className="text-lg font-semibold text-blue-700">Your Playlist</h3>
            <p className="text-sm text-gray-500 mt-1">Saved tutorials</p>
          </div>

          <div
            onClick={() => navigate("/setting")}
            className="cursor-pointer bg-blue-50 hover:bg-blue-100 p-6 rounded-xl shadow transition"
          >
            <h3 className="text-lg font-semibold text-blue-700">Settings</h3>
            <p className="text-sm text-gray-500 mt-1">Manage profile</p>
          </div>
        </div>

      
        

        <div>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center underline underline-offset-4 pb-2">
            Manage Your Jobs That You Have  Applied....
          </h2>
          {jobs.length === 0 ? (
            <div className="flex justify-center items-center py-10 text-blue-600 text-lg">
              You have not applied for any jobs...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {jobs.map((job, idx) => (
                <div key={idx} className="w-full">
                  <JobCardForManageJob doc={job} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}




