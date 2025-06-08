import React, { useState } from "react";

export default function JobApplicationForm() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict , setSelectedDistrict]=useState("")
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    village: "",
    area: "",
    district: "",
    state: "",
    jobSearch: "",
    currentWages: "",
    expectedWages: "",
    jobDescription: "",
    workRangeKm: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-4 border"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-2">job apply </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
         className ="input border border-gray-300 
                  rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
           className ="input border border-gray-300 
                  rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="village"
          placeholder="Village"
          value={formData.village}
          onChange={handleChange}
           className ="input border border-gray-300 
                  rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
                  type="text"
                  name="area"
                  placeholder="Area"
                  value={formData.area}
                  onChange={handleChange}
                  className ="input border border-gray-300 
                  rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="district"
          placeholder="District"
          value={formData.district}
          onChange={handleChange}
           className ="input border border-gray-300 
                  rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className ="input border border-gray-300 
                  rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="jobSearch"
          placeholder="Job Searching For"
          value={formData.jobSearch}
          onChange={handleChange}
          className ="input border border-gray-300 
                  rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="currentWages"
          placeholder="Current Wages (₹)"
          value={formData.currentWages}
          onChange={handleChange}
           className ="input border border-gray-300 
                  rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="expectedWages"
          placeholder="Expected Wages (₹)"
          value={formData.expectedWages}
          onChange={handleChange}
           className ="input border border-gray-300 
                  rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="workRangeKm"
          placeholder="Preferred Work Range (km)"
          value={formData.workRangeKm}
          onChange={handleChange}
          className ="input border border-gray-300 
                  rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <textarea
        name="jobDescription"
        placeholder="Job Description (What work you want to do)"
        value={formData.jobDescription}
        onChange={handleChange}
        rows={4}
        className="input w-full"
      ></textarea>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
      >
        Apply for Job
      </button>
    </form>
  );
}