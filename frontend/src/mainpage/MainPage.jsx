import axios from "axios";
import React, { useState ,useEffect} from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { roles } from "../location_data";
import { location } from "../location_data";
function MainPage() {
  const [searchMode, setSearchMode] = useState("user");
  const [searchname, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [district, setDistrict] = useState([]);
  const [village, setVillage] = useState("");
  const [logout , setLogout] = useState(true)
  const navigate = useNavigate();

  async function handlelogout (e){
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
    if (!selectedRole || !selectedState || !selectedDistrict || !village) {
      alert("Please fill all job search fields");
      return;
    }

    const query = `${selectedRole}-${village}-${selectedDistrict}-${selectedState}`;
    console.log("Job search query:", query);
   
    
  }
  useEffect(() => {
  if (selectedState !== "") {
    const match = location.states.find(obj => obj.state === selectedState);
    setDistrict(match ? match.districts : []);
  } else {
    setDistrict([])
  }
  }, [selectedState]);
  
  // setDistrict(dis);
  // setSelectedDistrict(district);
  console.log(district)
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center bg-white text-gray-800 shadow-md px-6 py-4">
        {/* Search Section */}
        <div className="space-y-2">
          <div className="flex space-x-2 items-center">
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
            <div className="flex items-center shadow border border-gray-300 rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search by user name..."
                value={searchname}
                onChange={(e) => setSearch(e.target.value)}
                className="w-80 p-2 focus:outline-none"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition"
                type="submit"
                onClick={handlesearch}
              >
                Search
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleJobSearch}
              className="grid grid-cols-2 md:grid-cols-4 gap-2"
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
                  {location.states.map((obj, idx) =>
                  (<option key={idx} value={obj.state}>{obj.state}</option>))}
              </select>

              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedState}
                className="border p-2 rounded"
              >
                <option value="">Select District</option>
                  { 
                    district.map((dis, idx) => {
                     return <option key={idx} value={dis}> {dis}</option>
                    })
                } 
               
                
              
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
                className="col-span-2 md:col-span-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Search
              </button>
            </form>
          )}
        </div>

     
        <Link
          to="/mainpage"
          className="text-lg font-semibold text-gray-700 hover:underline"
        >
          home
        </Link>
        <div className="text-lg font-semibold text-gray-700 hover:underline"  onClick={handlelogout}>
          { logout == true ? "logout" : "login" }
        </div>

        <Link to="/mainpage/dashboard" className="text-lg font-semibold text-gray-700 hover:underline" >
          dashboard
        </Link>

        <img
          src="https://tse1.mm.bing.net/th?id=OIP.3V6e0wFVGP0F8RqB1SR5rQHaNK&pid=Api"
          alt="profile img"
          className="h-15 w-16 object-cover rounded-full"
        />
      </header>

    
      <main className="grow max-w-5xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>

    

  <footer className="bg-gray-100 text-gray-700 border-t border-gray-300 py-6 px-4 mt-10 shadow-inner">
  <div className="max-w-7xl mx-auto text-center text-sm">
    © {new Date().getFullYear()} All rights reserved by <span className="font-semibold text-blue-600">@Mithun Shah</span>
  </div>
</footer>

    </div>
  );
}

export default MainPage;

