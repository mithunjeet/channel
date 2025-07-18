import { useState } from "react";
import { useLocation } from "react-router";

function JobApplicationPage() {
  const [data, setdata] = useState([]);
  const location = useLocation();
   if (!location?.state?.length) {
  return (
    <div className = "w-full h-screen flex items-center justify-center bg-gray-50">
      <div className = "text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-red-600">
          No one has applied for this role.
        </h2>
        <p className="mt-2 text-gray-700 text-base">
          thanks for your intrest  or try again later.
        </p>
      </div>
    </div>
  );
}

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Job Applicants</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {location.state?.map((obj, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6 space-y-4">
                
                <div className="flex items-center gap-4">
                  <img
                    src={"https://tse1.mm.bing.net/th?id=OIP.pHKwbwSwKlX0zCMXPnir5wHaLH&pid=Api&P=0&h=180"}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {obj?.AlldataofAPplicant[0]?.username}
                    </h2>
                    <p className="text-sm text-gray-500">{obj?.role}</p>
                  </div>
                  <div className="flex space-x-2 text-xl">
                    <button title="Call" className="hover:text-blue-600 transition">
                      📞
                    </button>
                    <button title="Message" className="hover:text-green-600 transition">
                      ✉️
                    </button>
                  </div>
                </div>

            
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                  <div><strong>Village:</strong> {obj?.village}</div>
                  <div><strong>District:</strong> {obj?.district}</div>
                  <div><strong>State:</strong> {obj?.state}</div>
                  <div><strong>Work Range:</strong> {obj?.workRangeKm} km</div>
                  <div><strong>Current Wages:</strong> ₹{obj?.currentWages}</div>
                  <div><strong>Expected Wages:</strong> ₹{obj?.expectedWages}</div>
                </div>

          
                <div className="text-sm text-gray-800 pt-2">
                  <strong>Job Commitment:</strong> {obj?.jobcommitment}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobApplicationPage
