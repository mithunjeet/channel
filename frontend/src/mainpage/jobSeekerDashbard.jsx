import React from "react";
import { Link } from "react-router-dom"; 

export default function JobSeekerDashboard() {
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
            <h2 className="text-xl font-semibold">xyz</h2>
            <p className="text-gray-600">📞 .........</p>
            <p className="text-gray-600">🏠 location of</p>
            <p className="text-gray-600">⭐️ rating</p>
          </div>
        </div>

        <div className="flex justify-between text-blue-600 font-medium">
          <Link to="/mainpage/setting">⚙️ Setting</Link>
          <Link to="/mainpage/applyjob">Apply Job</Link>
          <Link to="/mainpage/playlist">Playlist</Link>
        </div>
      </div>
    </div>
  );
}

