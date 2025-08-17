import { useEffect, useState } from "react"
import { Link, Outlet, useLocation } from "react-router"
import { useCookies } from "react-cookie"
import axios from "axios"

function DefaultPlaylist() {
  const [cookies] = useCookies()
  const [videos, setVideos] = useState([])
  const location = useLocation()

  async function getallvideoofUser() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/video/allvideoofuser`,
        { headers: { Authorization: `Bearer ${cookies.refreshToken?.user?.refreshtoken}` } }
      );
      setVideos(data?.data || [])
    } catch (error) {
      // alert("error occurred during loading of videos uploaded by the user")
      console.log(error)
    }
  }

  async function handledelete(videoid) {
    const flag = window.confirm("are you sure you want to delete")
     if(!flag) return
      try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/video/delete`,
        {
          _id : videoid
        },
        { headers: { Authorization: `Bearer ${cookies.refreshToken?.user?.refreshtoken}` } }
        )
        getallvideoofUser()
        if (data) alert("video delete successfully")
        
        
    } catch (error) {
      alert("error during deleting  the video")
      console.log(error)
    }

  }

  async function handleToggleVideo(videoid) { 
      const flag = window.confirm("are you sure you want to toggle")
     if(!flag) return
      try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/video/toggle`,
        {
          _id : videoid
        },
        { headers: { Authorization: `Bearer ${cookies.refreshToken?.user?.refreshtoken}` } }
        )
        getallvideoofUser()
       if(data)alert("video toggle successfully")
        
    } catch (error) {
      alert("error occured during the  toggle the video")
      console.log(error)
    }

  }

  useEffect(() => {
    getallvideoofUser()
  }, []);

  const isUploadPage = location.pathname.endsWith("/upload")

  return (
    <>
      {!isUploadPage && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Playlist: Default</h1>
            <Link
              to="upload"
              className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Upload Video
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.length > 0 ? (
              videos.map((video) => (
                <div
                  key={video._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
                >
                  <video
                    src={video.videofile}
                    controls
                    className="w-full h-40 object-cover rounded"
                  ></video>

                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{video.title}</h2>
                    <p className="text-sm text-gray-600 flex-1">{video.description}</p>

                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => handledelete(video._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() =>
                          handleToggleVideo(video._id)
                        }
                        className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800 transition"
                      >
                        {video.private ? "Make Public" : "Make Private"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No videos uploaded yet.</p>
            )}
          </div>
        </>
      )}

      <Outlet />
    </>
  );
}

export default DefaultPlaylist




