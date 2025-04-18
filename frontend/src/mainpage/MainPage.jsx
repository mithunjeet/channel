import React, { useState } from "react";
import { Link } from "react-router";
import { Outlet } from "react-router";
function MainPage() {
  const [search, setSearch] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "Bot", text: "Kaise madad karu?" },
    { sender: "Tu", text: "Ek sawal hai" },
  ]);

  const bhejDe = () => {
    if (chatInput.trim() !== "") {
      setMessages([...messages, { sender: "Tu", text: chatInput }]);
      setChatInput("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      <header className="flex justify-between items-center bg-white shadow px-6 py-4">
      <div className="flex items-center shadow border border-gray-300 rounded-lg overflow-hidden">
  <input
    type="text"
    placeholder="search..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-80 p-2 focus:outline-none"
  />
  <button
   
    className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition"
  >
    Search
  </button>
</div>
        
        <Link to="#" className="text-lg font-semibold text-gray-700 hover:underline">
        ⚙️ Setting
        </Link>
        <Link to="#" className="text-lg font-semibold text-gray-700 hover:underline">
        📨 Chat 
        </Link>
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

