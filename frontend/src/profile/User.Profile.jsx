import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

export default function JobSeekerProfile() {
  const location = useLocation();
  const data = location.state;

  // useEffect(() => {
  //   if (!data) {
  //     console.warn("No user data received in JobSeekerProfile");
  //   }
  // }, [data]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <img
          src={data?.avatar || "https://tse4.mm.bing.net/th?id=OIP.vmsGg4h02m-MfxWyw0PMBwHaEK&pid=Api&P=0&h=180"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-300 shadow-sm object-cover"
        />
        <div className="flex-1 space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">
            {data?.username || "Unknown User"}
          </h2>
          <p className="text-gray-600">
            <span className="font-semibold">Role:</span> {data?.role || "N/A"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Contact:</span> {data?.contact || "+91 -----------"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Address:</span> {data?.address || "Not Provided"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Rating:</span> ⭐ {data?.rating || "N/A"}
          </p>
        </div>
      </div>

      <hr className="my-6 border-t-2 border-blue-200" />

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/mainpage/report"
          state={data}
          className="px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow"
        >
          Report
        </Link>
        <a
          href={`tel:${data?.contact || ""}`}
          className="px-5 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all shadow"
        >
          Contact
        </a>
        <Link
          to="/mainpage/rate"
          state={data}
          className="px-5 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-all shadow"
        >
          Rate
        </Link>
        <Link
          to="/mainpage/comment"
          state={data}
          className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all shadow"
        >
          Job Appreciation
        </Link>
      </div>

      <div className="mt-10 p-6 bg-gray-50 border border-gray-300 rounded-lg text-center font-medium text-gray-700">
        All videos uploaded by the job seeker will be shown here.
        <div className="text-sm text-gray-400 mt-2">NO_VIDEO</div>
      </div>
    </div>
  );
}
