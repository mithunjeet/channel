import React, { useState, useEffect } from "react";
import { roles, location } from "../location_data";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function JobApplicationForm() {
  const [districtopt, setDistrictOpt] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [cookies] = useCookies();

  const [formData, setFormData] = useState({
    village: "",
    district: "",
    state: "",
    role: "",
    currentWages: "",
    expectedWages: "",
    jobcommitment: "",
    workRangeKm: ""
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); 
  };

  useEffect(() => {
    if (formData.state !== "") {
      const match = location.states.find(obj => obj.state === formData.state);
      setDistrictOpt(match ? match.districts : []);
    } else {
      setDistrictOpt([]);
    }
  }, [formData.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) { alert("all field are require"); return; }
      if( key === "workRangeKm" && Number(value.trim()) >= 50) {
        const confirmed = window.confirm(`You have selected a high value for "${key}" (${value} km). Are you sure?`);
        if (!confirmed) return;
      }
      if( key === "expectedWages" && Number(value.trim()) >=  3001) {
        const confirmed = window.confirm(`You are asking a high value "${key}" (${value} . Are you sure?`);
        if (!confirmed) return;
      }
       if( key === "currentWages" && Number(value.trim()) >=  3001) {
        const confirmed = window.confirm(`You are asking a high value "${key}" (${value} . Are you sure?`);
        if (!confirmed) return;
      }
      
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/apply/job`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.refreshToken?.user?.refreshtoken}`,
          },
        }
      );
    //  setFormData((prev) => {
    //  const update = { ...prev };
    //  for (const key of Object.keys(prev)) {
    //  update[key] = "";
    //  }
    // return update;
    // });
      console.log(data)
      alert(data)

    } catch(err){
      setError(err?.response?.data || "Something went wrong while submitting.");
    } finally {
      setIsLoading(false);
      
    }
  };

  const handleGoBack = () => {
    setIsLoading(false);
    navigate(-1);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <div>
          <h1 className="font-semibold text-5xl text-red-600">{error}</h1>
          <button
            className="text-black text-xl hover:underline font-extrabold"
            onClick={handleGoBack}
          >
            back
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <h1 className="font-semibold text-4xl text-blue-600">Submitting your application...</h1>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-4 border"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Apply</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="village"
          placeholder="Village"
          value={formData.village}
          onChange={handleChange}
          className={classutility}
        />
        <select
          name="state"
          className={classutility}
          value={formData.state}
          onChange={handleChange}
        >
          <option value="">-- select your state --</option>
          {location.states.map((obj, idx) => (
            <option key={idx} value={obj.state} className="text-blue-500 font-semibold">
              {obj.state}
            </option>
          ))}
        </select>

        <select
          name="district"
          className={classutility}
          value={formData.district}
          onChange={handleChange}
        >
          <option value="">--select district--</option>
          {districtopt.map((ele, idx) => (
            <option key={idx} value={ele} className="text-blue-600 font-semibold">
              {ele}
            </option>
          ))}
        </select>

        <select
          className={classutility}
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="">--role--</option>
          {roles.map((ele, idx) => (
            <option key={idx} value={ele} className="text-blue-600 font-semibold">
              {ele}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="currentWages"
          placeholder="Current Wages (₹)"
          value={formData.currentWages}
          onChange={handleChange}
          className={classutility}
        />
        <input
          type="number"
          name="expectedWages"
          placeholder="Expected Wages (₹)"
          value={formData.expectedWages}
          onChange={handleChange}
          className={classutility}
        />
        <input
          type="number"
          name="workRangeKm"
          placeholder="Preferred Work Range (km)"
          value={formData.workRangeKm}
          onChange={handleChange}
          className={classutility}
        />
      </div>

      <textarea
        name="jobcommitment"
        placeholder="Job Description (What work you want to do)"
        value={formData.jobcommitment}
        onChange={handleChange}
        rows={4}
        className="input w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

const classutility = "input border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500";

// const formData = { name: "John", email: "john@example.com" };
// Object.entries(formData); 
// Output: [['name', 'John'], ['email', 'john@example.com']]
