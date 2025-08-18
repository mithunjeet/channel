
import { useLocation } from "react-router-dom"

const WatchVideo = () => {
  const { state: video } = useLocation()

  if (!video) return <p>No video found</p>

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
      <div className="max-w-3xl w-full">
        <video
          src={video.videofile}
          controls
          className="w-full rounded-xl shadow mb-4"
        />
        <h1 className="text-2xl font-bold">{video.title}</h1>
        <p className="text-gray-600 mt-2">{video.description}</p>
      </div>
    </div>
  );
};

export default WatchVideo
