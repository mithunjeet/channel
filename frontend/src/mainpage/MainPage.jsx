import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
function MainPage() {
  const [searchname, setSearch] = useState("");
  const navigate = useNavigate();
  async function handlesearch(e) {
    e.preventDefault();
    try {
      console.log(`${import.meta.env.VITE_URL}`)
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/user/search/${searchname}`)
      setSearch("")
      if (data?.message === "query for user found successfully" && data?.flag === "user") {
        navigate("/mainpage/channel", {
          state : 
               data?.doc[0]
          }
        )
      }
      
      console.log(data);
      } catch (error) {
        console.log("error during  reaching the user in the  serach box" + error)  
      }
    
   }




  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      <header className="flex justify-between items-center bg-white shadow px-6 py-4">
      <div className="flex items-center shadow border border-gray-300 rounded-lg overflow-hidden">
  <input
    type="text"
    placeholder="search..."
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
        
        <Link to="#" className="text-lg font-semibold text-gray-700 hover:un">
        ⚙️ Setting
        </Link>
        <Link to="#" className="text-lg font-semibold text-gray-700 hover:underline">
        📨 Chat 
        </Link>
        <img src="https://tse1.mm.bing.net/th?id=OIP.3V6e0wFVGP0F8RqB1SR5rQHaNK&pid=Api" alt="profile img"
           className="h-15  w-16   object-cover rounded-full "
        />
      </header>
      <Outlet/>
     
        

      
      <footer className="relative bg-white shadow p-6">
        <div  className="flex  justify-evenly">
          <div>hii</div>
          <div>hii</div>
          <div>hii</div>
       </div>
      </footer>
    </div>
  );
}

export default MainPage;

