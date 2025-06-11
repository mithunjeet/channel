import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function ReportUserForm() {
  const [reason, setReason] = useState('');
  const [content, setContent] = useState('');
  const [cookies, setcookies] = useCookies(['refreshToken']);
  const [isLoading, setIsLoading] = useState(false)
  const [error , setError] = useState("")
  const { id } = useParams()
  const navigate = useNavigate()
  // console.log(id)
  const  handleSubmit = async (e) => {
    // if(!reason.trim() || !content.trim()) alert("all field are required")
    e.preventDefault();
    // console.log(cookies.refreshToken?.user?.refreshtoken)
    // console.log(cookies)
    setIsLoading(true)
     try {
       const { data } = await axios.post(`${import.meta.env.VITE_URL}/report/reportUser`, { reason, content, user: id },
        {headers: { Authorization: `Bearer ${cookies.refreshToken?.user?.refreshtoken}` } })
       console.log(data);
       setIsLoading(false);
       alert(data)
     }catch (err) {
        setError(err?.response?.data);
      console.log(error)
     }finally {
        setIsLoading(false)   
     } 
    setReason('');
    setContent('');
  };
  function handleGoBack() { 
    setIsLoading(false); 
    navigate(-1); // it will move one history back
  }
   if (error) {
  console.log(error);
  return (
    <div className="flex justify-center items-center h-screen w-full">
     <div>
      <h1 className="font-semibold text-5xl text-red-600">{ error || "Something went wrong"}</h1>
        <button className="text-black text-xl hover:underline  font-extrabold " onClick={handleGoBack}> back</button>   
     </div>
    </div>
  ); 
}
  return (
    <>{ 
      isLoading ?
       <div className="flex  justify-center  items-center  w-full h-screen">
       <h1 className="text-5xl font-bold text-green-600">
       loading<span className="animate-ping">...</span></h1> </div>
      :
     <form onSubmit={handleSubmit}
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
    }</>
  );
}