import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { roles } from "../location_data";
import { location } from "../location_data";
import { useCookies } from "react-cookie";
import JobCard from "./jobCard";

function MainPage() {
  const [searchMode, setSearchMode] = useState("user")
  const [searchname, setSearch] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [district, setDistrict] = useState([])
  const [village, setVillage] = useState("")
  const [cookies, setCookies] = useCookies(["refreshToken"])
  const [locationJobs, setLocationJobs] = useState([])
  const navigate = useNavigate()
  const tracklocation = useLocation()

  const loadJobToCurrentUserLocationAlReady = async () => {
    try {
      const state = cookies.refreshToken?.user?.state;
      const district = cookies.refreshToken?.user?.district;

      if (!state || !district) return

      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/apply/getJobOfUserLocation`,
        {
          params: { state, district },
          headers: {
            Authorization: `Bearer ${cookies.refreshToken?.user?.refreshtoken}`,
          },
        }
      );

      setLocationJobs(data);
    } catch (error) {
      console.error("Error fetching jobs ", error);
    }
  };

  useEffect(() => {
    loadJobToCurrentUserLocationAlReady();
  }, []);

  async function handlelogout(e) {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (!confirm) return;
    e.preventDefault();
    setCookies("refreshToken", "", { path: "/" });
    navigate("/login");
  }

  async function handlesearch(e) {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/user/search/${searchname}`
      );
      setSearch("");
      if (typeof data === "string") {
        return alert("no user found with this name. Try another name.");
      }
      if (data?.message === "query for user found successfully" && data?.flag === "user") {
        navigate("/userprofile", { state: data?.doc })
      }
    } catch (error) {
      console.log("error during user search ")
    }
  }


  async function handlevideosearch(e) {
    e.preventDefault()
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/video/search/${searchname}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.refreshToken?.user?.refreshtoken}`,
          },
        }
      );
      setSearch("")
      if (!data || data.length === 0) {
        return alert("no video found with this title and description")
      }
      navigate("/videoresult", { state: data })
    } catch (error) {
      console.log("error during video search ")
    }
  }

  async function handleJobSearch(e) {
    e.preventDefault();
    if (!selectedState || !selectedDistrict || !village) {
      alert("Please fill all job search fields");
      return;
    }

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/apply/jobApplicant/search`,
        {
          params: {
            state: selectedState,
            district: selectedDistrict,
            role: selectedRole || "",
            village: village,
          },
          headers: {
            Authorization: `Bearer ${cookies.refreshToken?.user?.refreshtoken}`,
          },
        }
      );

      navigate("/jobApplicant", { state: data });
    } catch (error) {
      alert("Something went wrong during search");
    }
  }

  useEffect(() => {
    if (selectedState !== "") {
      const match = location.states.find((obj) => obj.state === selectedState);
      setDistrict(match ? match.districts : []);
    } else {
      setDistrict([]);
    }
  }, [selectedState]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="flex flex-col md:flex-row justify-between items-center bg-white text-gray-800 shadow-md px-6 py-4 gap-4">
        <div className="space-y-2 w-full md:w-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="font-semibold">Search Mode:</label>
            <select
              value={searchMode}
              onChange={(e) => setSearchMode(e.target.value)}
              className="border p-1 rounded"
            >
              <option value="user">User</option>
              <option value="job">Job Role</option>
              <option value="video">Video</option> 
            </select>
          </div>

          {searchMode === "user" && (
            <form onSubmit={handlesearch} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Search by user name..."
                value={searchname}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-80 p-2 border border-gray-300 rounded focus:outline-none"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Search
              </button>
            </form>
          )}

          {searchMode === "video" && (
            <form onSubmit={handlevideosearch} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Search video title or video description..."
                value={searchname}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-80 p-2 border border-gray-300 rounded focus:outline-none"
              />
              <button  type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Search Video
              </button>
            </form>
          )}

          {searchMode === "job" && (
            <form onSubmit={handleJobSearch} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Select Role</option>
                {roles.map((role, idx) => (
                  <option key={idx} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedDistrict("");
                }}
                className="border p-2 rounded"
              >
                <option value="">-- Select State --</option>
                {location.states.map((obj, idx) => (
                  <option key={idx} value={obj.state}>
                    {obj.state}
                  </option>
                ))}
              </select>

              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedState}
                className="border p-2 rounded"
              >
                <option value="">Select District</option>
                {district.map((dis, idx) => (
                  <option key={idx} value={dis}>
                    {dis}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="Village"
                className="border p-2 rounded"
              />

              <button
                type="submit"
                className="col-span-1 sm:col-span-2 md:col-span-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Search
              </button>
            </form>
          )}
        </div>

        <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 w-full md:w-auto">
          <Link to="/chat" className="text-lg font-semibold text-gray-700 hover:underline">
            ChatToAnyUser
          </Link>
        
          <Link to="/dashboard" className="text-lg font-semibold text-gray-700 hover:underline">
            Dashboard
          </Link>
            <div
            className="text-lg text-red-500 font-semibold  hover:underline cursor-pointer"
            onClick={handlelogout}
          >
            Logout
          </div>
          <div>
            {cookies?.refreshToken?.user?.avatar ? (
              <img
                src={cookies?.refreshToken?.user?.avatar}
                alt="User Avatar"
                className="w-14 h-14 rounded-full object-cover border border-gray-300 shadow-sm"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center text-lg font-semibold">
                {cookies?.refreshToken?.user?.username?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </header>

   
      <main className="grow max-w-5xl mx-auto w-full px-4 py-6">
        {tracklocation.pathname === "/" && (
          <div className="mb-6">
            {locationJobs.length === 0 ? (
              <div className="flex items-center justify-center w-full h-screen bg-gray-50 px-4">
                <p className="text-gray-700 text-lg md:text-xl font-medium text-center max-w-md">
                  📌  No jobs available for your current location.
                </p>
              </div>
            ) : (
              <div className="w-full px-4 sm:px-6 lg:px-8">
                <h1 className="text-base text-center underline underline-offset-1 sm:text-lg font-semibold mb-4 text-gray-700">
                  Jobs In Your Locality
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-sm">
                  {locationJobs.map((info, index) => (
                    <JobCard key={index} doc={info} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        <Outlet />
      </main>

      <footer className="bg-gray-100 text-gray-700 border-t border-gray-300 py-6 px-4 mt-10 shadow-inner">
        <div className="max-w-7xl mx-auto text-center text-sm">
          © {new Date().getFullYear()} All rights reserved by{" "}
          <span className="font-semibold text-blue-600">@Mithun Shah</span>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;






