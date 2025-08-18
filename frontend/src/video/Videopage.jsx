
import { useLocation, useNavigate } from "react-router-dom"

const VideoResults = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const videos = location.state || []

  const handleWatch = (video) => {
    navigate(`/watch/${video._id}`, { state: video })
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>

      {videos.length === 0 ? (
        <p className="text-gray-500">No videos found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition cursor-pointer"
              onClick={() => handleWatch(video)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h2 className="text-lg font-semibold line-clamp-2">
                  {video.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                  {video.description}
                </p>
                <div className="mt-2 text-xs text-gray-400">
                  Uploaded on {new Date(video.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoResults;
