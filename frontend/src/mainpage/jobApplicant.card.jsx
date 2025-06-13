import React from "react";

export default function JobApplicationCard() {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4 border border-gray-200">
    
      <div className="flex items-center space-x-4">
        <img
          src={applicant.avatar || "https://via.placeholder.com/80"}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800">
            {applicant.name || "Unnamed"}
          </h2>
          <p className="text-sm text-gray-500">{applicant.role || "Role not set"}</p>
        </div>
        <div className="flex space-x-3 text-xl">
          <button title="Call" className="hover:scale-110 transition">
            📞
          </button>
          <button title="Message" className="hover:scale-110 transition">
            ✉️
          </button>
        </div>
      </div>

      {/* Job Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div><strong>Village:</strong> {applicant.village}</div>
        <div><strong>District:</strong> {applicant.district}</div>
        <div><strong>State:</strong> {applicant.state}</div>
        <div><strong>Work Range (km):</strong> {applicant.workRangeKm}</div>
        <div><strong>Current Wages (₹):</strong> {applicant.currentWages}</div>
        <div><strong>Expected Wages (₹):</strong> {applicant.expectedWages}</div>
      </div>

     
      <div className="text-gray-700 text-sm">
        <strong>Job Commitment:</strong>
        <p className="mt-1 text-gray-600 whitespace-pre-wrap">
          {applicant.jobcommitment || "N/A"}
        </p>
      </div>
    </div>
  );
}
