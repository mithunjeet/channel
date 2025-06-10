import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
export default function ReportUserForm() {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [cookies , setcookies ] = useCookies([ 'refreshToken']);
  const { id } = useParams()
  // console.log(id)
  const  handleSubmit = async (e) => {
    if(!reason.trim() || !details.trim()) alert("all field are required")
    e.preventDefault();
    console.log(cookies)
     try {
       const { data } = await axios.post(`${import.meta.env.VITE_URL}/report/reportUser`, { reason, details, user: id },
        {headers: { Authorization: `Bearer ${cookies.refreshToken}` } })
       console.log(data);
     } catch (error) {
        console.log(error)
     }finally {
              
     } 
    setReason('');
    setDetails('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mt-10 space-y-4"
    >
      <h2 className="text-xl font-bold text-center text-red-600">Report a User</h2>

      <div>
        <label className="block mb-1 text-gray-700">Reason for Reporting</label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Select a reason --</option>
          <option value="Abusive Language">Abusive Language During Chat</option>
          <option value="Fake Profile">Fake Profile</option>
          <option value="Scam/Fraud">Scam or Fraud</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-gray-700">Additional Details (optional)</label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Write your incidence that happend with you in details if necessary..."
          rows={4}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded"
      >
        Submit Report
      </button>
    </form>
  );
}