import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
function ProfileCard({ data }) {
  return (
    <div className="w-full max-w-xs bg-white shadow-md rounded-xl border border-gray-200 p-4 flex flex-col justify-between h-[300px] overflow-hidden">
  
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
            Role: {data?.role || "N/A"}
          </p>
        </div>
      </div>

    
      <div className="mt-4 text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-medium">Contact:</span>{" "}
          {data?.contact || "+91 -----------"}
        </p>
        <p>
          <span className="font-medium">Address:</span>{" "}
          {data?.address || "Not Provided"}
        </p>
        <p>
          <span className="font-medium">Rating:</span> ⭐{" "}
          {data?.rating || "N/A"}
        </p>
      </div>

    
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <Link
          to={`/mainpage/report/${data._id}`}
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
          to={`/mainpage/rate/${data?._id}`}
          state={data}
          className="px-3 py-1 text-xs bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
        >
          Rate
        </Link>
        <Link
          to={`/mainpage/comment/${data._id}`}
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
  if (!data?.length) {
  return (
    <div className="flex items-center justify-center min-h-[300px] text-gray-500">
      <div className="text-center space-y-2">
        <svg
          className="w-12 h-12 mx-auto text-blue-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 13h6m2 6H7a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h5a2 2 0 012 2v7"
          />
        </svg>
        <p className="text-lg font-semibold">No users found</p>
        <p className="text-sm text-gray-400">Try adjusting your search or filters.</p>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen px-2 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
      {Array.isArray(data) &&
        data.map((obj) => <ProfileCard key={obj._id} data={obj} />)}
    </div>
  );
}

