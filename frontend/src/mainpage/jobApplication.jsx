import React, { useState } from "react";
import { roles, location } from "../location_data";
import { useEffect } from "react";
export default function JobApplicationForm() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [role, setRole] = useState("");
  const [districtopt, setDistrictOpt] = useState([]);
  const [formData, setFormData] = useState({
    
    village: "",
    district: "",
    state: "",
    role : "",
    currentWages: 0,
    expectedWages:0,
    jobcommitment: "",
    workRangeKm: 0,
  });
  
  const handleChange = (e) => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if(selectedState !== ""){ 
       location.states.map((obj , idx) =>{
        if(obj.state === selectedState) {
          setDistrictOpt(obj.districts)
        
        }})}
    else {
      setDistrictOpt([]);
        }
  },[selectedState, setSelectedState])

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
          name="village"
          placeholder="Village"
          value={formData.village}
          onChange={handleChange}
           className ="input border border-gray-300 
            rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className={classutility} value={selectedState} onChange={(e) => { setSelectedState(e.target.value);  setSelectedDistrict("")}}>
          <option value="" >-- select your state --</option>
          {location.states.map((obj , idx)=>{
            return (<option key={idx} value={obj.state} className="text-blue-500 font-semibold" >{obj.state}</option>)
          })}
        </select>

        <select name="" id="" className={classutility} value={selectedDistrict} onChange={(e) => { setSelectedDistrict(e.target.value); }}>
        <option value="">--select district--</option>
         {
            districtopt.map((ele , idx ) => {
              return (<option key={idx} value={ele}  className="text-blue-600 font-semibold">{ ele}</option>)
             })
         }
        </select>
        <select className={classutility} name="" id="" value={role} onChange={(e)=>setRole(e.target.value)}>
          <option value="">--role--</option>
          {roles.map((ele , idx) => {
           return (<option key={idx} value={ele} className="text-blue-600 font-semibold"> {ele}</option>) 
          })}
        </select>
      
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
        value={formData.jobcommitment}
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


const classutility  =  "input border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500";