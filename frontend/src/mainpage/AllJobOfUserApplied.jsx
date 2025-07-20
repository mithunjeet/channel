import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import JobCard from "./jobCard";

function AllJobOfUserApplied() {
  const [job, setJob] = useState([]);
  const [cookies] = useCookies();

  async function allJob() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/apply/userapplication`,
        {
          headers: {
            Authorization: `Bearer ${cookies.refreshToken?.user?.refreshtoken}`,
          },
        }
      );
      setJob(data);
      console.log(data.length)
      console.log(data)
    } catch (error) {
      console.error("Failed to fetch applications", error);
    }
  }

  useEffect(() => {
    allJob();
  }, []);

  return (
    <>
      {job && job.length === 0 ? (
  <div className="flex items-center justify-center min-h-screen">
  <div className="text-center">
    <h1 className="text-xl text-blue-600 font-medium">
      You have not applied for any jobs...
    </h1>
  </div>
</div>


      ) : (
       <div className="px-4 py-6">
  <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center underline underline-offset-auto">All Jobs You Applied</h2>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-sm">
    {job.map((data, index) => (
      <JobCard key={index} doc={data} />
    ))}
  </div>
</div>

      )}
    </>
  );
}

export default AllJobOfUserApplied;
