import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios"; 

function ProfileCard({ data }) {
  const [rating, setRating] = useState(0);
  const [noOfPersonRated, setNoOfPersonRated] = useState(0);
  const [cookies] = useCookies();

  async function fetchRating() {
    try {
      const res = await axios.post(`${import.meta.env.VITE_URL}/rate/getRating`, {
        _id: data?._id,
      }, {
        headers: {
          Authorization: `Bearer ${cookies.refreshToken?.user?.refreshtoken}`,
        },
      });

      if (res.data.length > 0) {
        setRating(res.data[0].averageRating);
        setNoOfPersonRated(res.data[0].totalRating);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleRating() {
    console.log(noOfPersonRated)
    console.log(rating)
    let avg = Math.round(rating);
    if (avg === 1) return "⭐";
    if (avg === 2) return "⭐⭐";
    if (avg === 3) return "⭐⭐⭐";
    if (avg === 4) return "⭐⭐⭐⭐";
    if (avg === 5) return "⭐⭐⭐⭐⭐";
    return "No Rating";
  }

  useEffect(() => {
    fetchRating();
  }, [data]); 

  return (
    <div className="w-full max-w-xs bg-white shadow-md rounded-xl border border-gray-200 p-4 flex flex-col justify-between h-[250px] overflow-hidden">
      <div className="flex items-center gap-4">
        <img
          src={
            data?.avatar ||
            "https://tse4.mm.bing.net/th?id=OIP.vmsGg4h02m-MfxWyw0PMBwHaEK&pid=Api&P=0&h=180"
          }
          alt="Avatar"
          className="w-14 h-14 rounded-full border-2 border-blue-300 object-cover"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {data?.username || "Unknown User"}
          </h2>
          <p className="text-sm text-gray-500 truncate">
            Role: {data?.service || "N/A"}
          </p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 space-y-1">
      
        <p>
          <span className="font-medium">Address:</span>{" "}
          {data?.state ? `${data?.state} ${data?.district}` : "not provided"}
        </p>
        <p>
          <span className="font-medium">Rating:</span>
          {rating === 0 ? "not rated Yet" : handleRating()}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <Link
          to={`/report/${data._id}`}
          state={data}
          className="px-3 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600 transition"
        >
          Report
        </Link>
        <a
          href={`tel:${data?.contact || ""}`}
          className="px-3 py-1 text-xs bg-green-500 text-white rounded-full hover:bg-green-600 transition"
        >
          Contact
        </a>
        <Link
          to={`/rate/${data._id}`}
          state={data}
          className="px-3 py-1 text-xs bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
        >
          Rate
        </Link>
        <Link
          to={`/comment/${data._id}`}
          state={data}
          className="px-3 py-1 text-xs bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          Appreciate
        </Link>
      </div>
    </div>
  );
}


import { useLocation } from "react-router-dom";
export default function JobSeekerProfile() {
  const location = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (Array.isArray(location.state)) {
      setData(location.state);
    } else {
      setData([]);
    }
  }, [location.state]);
  return (
    <div className="min-h-screen px-2 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
      {data.map((obj) => (
        <ProfileCard key={obj._id} data={obj} />
      ))}
    </div>
  );
}
