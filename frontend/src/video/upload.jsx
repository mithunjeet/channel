import { useState } from "react"
import { useCookies } from "react-cookie"
import axios from "axios"

const UploadVideo = () => {
  const [cookies] = useCookies()
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [thumbnail, setThumbnail] = useState(null)
  const [videofile, setVideo] = useState(null)
  const [submit, setsubmit] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault();
    setsubmit(true);

    if (!videofile || !thumbnail || title.trim() === "" || description.trim() === "") {
      alert("Please fill all fields. All fields are required!")
      setsubmit(false)
      return
    }

    try {
      const formdata = new FormData()
      formdata.append("videofile", videofile)
      formdata.append("thumbnail", thumbnail)
      formdata.append("title", title)
      formdata.append("description", description)

      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/video/uploadvideo`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${cookies.refreshToken?.user?.refreshtoken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data) {
        alert("Video uploaded successfully!")
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading video!")
    } finally {
      setVideo(null)
      setThumbnail(null)
      setTitle("")
      setDescription("")
      setsubmit(false)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-start p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl p-8 rounded-xl shadow space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Video</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            required
            className="mt-1 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            required
            className="mt-1 w-full"
          />
        </div>

        <button
          disabled={submit}
          type="submit"
          className={`w-full py-3 rounded-md text-white font-medium transition ${
            submit ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {submit ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default UploadVideo


