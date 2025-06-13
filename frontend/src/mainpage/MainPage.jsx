import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { roles } from "../location_data";
import { location } from "../location_data";
import { useCookies } from "react-cookie";

function MainPage() {
  const [searchMode, setSearchMode] = useState("user");
  const [searchname, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [district, setDistrict] = useState([]);
  const [village, setVillage] = useState("");
  const [logout, setLogout] = useState(true);
  const [cookies, setcookies] = useCookies()
  const navigate = useNavigate();

  async function handlelogout(e) {
    e.preventDefault();
    setLogout(!logout);
  }


  async function handlesearch(e) {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/user/search/${searchname}`
      );
      setSearch("");
      if (
        data?.message === "query for user found successfully" &&
        data?.flag === "user"
      ) {
        navigate("/mainpage/userprofile", {
          state: data?.doc
        });
      }
    } catch (error) {
      console.log("Error during user search: " + error);
    }
  }

  async function handleJobSearch(e) {
    e.preventDefault();
    console.log("hii from handleJobSearch ")
    console.log(selectedDistrict)
    if ( !selectedState || !selectedDistrict || !village ) {
      alert("Please fill all job search fields");
      return;
    }

try {
 const  {data}  = await axios.get(`${import.meta.env.VITE_URL}/apply/jobApplicant/search`, {
  params: {
    state: selectedState,
    district: selectedDistrict,
    role: selectedRole || "",
    village: village
  },
  headers: {
    Authorization: `Bearer ${cookies.refreshToken?.user?.refreshtoken}`
  }
});

      
    console.log(data);
    navigate('/mainpage/jobApplicant', { state: data });  
    }catch (error){
     alert("someting went wrong during search")  
    } finally {
      
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
            </select>
          </div>

          {searchMode === "user" ? (
            <form
              onSubmit={handlesearch}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full"
            >
              <input
                type="text"
                placeholder="Search by user name..."
                value={searchname}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-80 p-2 border border-gray-300 rounded focus:outline-none"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
                type="submit"
              >
                Search
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleJobSearch}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2"
            >
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
                <option value="">--select state --</option>
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
                {district.map((dis, idx) => {
                  return (
                    <option key={idx} value={dis}>
                      {dis}
                    </option>
                  );
                })}
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
          <Link
            to="/mainpage"
            className="text-lg font-semibold text-gray-700 hover:underline"
          >
            home
          </Link>

          <div
            className="text-lg font-semibold text-gray-700 hover:underline cursor-pointer"
            onClick={handlelogout}
          >
            {logout === true ? "logout" : "login"}
          </div>

          <Link
            to="/mainpage/dashboard"
            className="text-lg font-semibold text-gray-700 hover:underline"
          >
            dashboard
          </Link>

          <img
            src="https://tse1.mm.bing.net/th?id=OIP.3V6e0wFVGP0F8RqB1SR5rQHaNK&pid=Api"
            alt="profile img"
            className="h-15 w-16 object-cover rounded-full"
          />
        </div>
      </header>

      <main className="grow max-w-5xl mx-auto w-full px-4 py-6">
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


