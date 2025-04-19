import { Link, Outlet } from "react-router";


function DefaultPlaylist () {
  return (
    
      <>
         <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Playlist: Default</h1>
          <Link
            to="upload"
            className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Upload Video
          </Link>
        
          </div>
          <Outlet/>
      </>
      
  )
}

export default DefaultPlaylist;
