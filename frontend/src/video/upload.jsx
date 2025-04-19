import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useCookies } from "react-cookie";

function UploadVideo() {
    const navigate = useNavigate();
    const [cookies] = useCookies(['refreshToken']);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [response, setResponse] = useState({});
    const [video, setVideo] = useState({
        videofile: null,
        thumbnail: null,
        title: "",
        description: "",
    });

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const formdata = new FormData();
            formdata.append("videofile", video.videofile);
            formdata.append("thumbnail", video.thumbnail);
            formdata.append("title", video.title);
            formdata.append("description", video.description);

            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/video/uploadvideo/${id}`, 
                formdata, 
                {
                    headers: {
                        Authorization: `Bearer ${cookies["refreshToken"]}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setVideo({
                videofile: null,
                thumbnail: null,
                title: "",
                description: "",
            });
            setResponse(data);
        } catch (error) {
            setError(error);
        }

        
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="max-w-4xl mx-auto p-4">
                    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
                        <h1 className="text-lg font-semibold">Upload Video</h1>
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none"
                        >
                            Submit
                        </button>
                    </div>

                    <div className="mt-6">
                        <label className="block text-md font-medium mb-2">Upload Video*</label>
                        <div className="flex flex-col items-center justify-center h-40 bg-gray-50 border border-dashed rounded-lg">
                            <span className="text-lg font-semibold mb-2">Choose your video</span>
                            <input 
                                type="file" 
                                accept="video/mp4,video/webm,video/ogg" 
                                className="text-sm" 
                                onChange={(e) => setVideo({ ...video, videofile: e.target?.files?.[0] })}
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-md font-medium mb-2">Upload Thumbnail*</label>
                        <div className="flex flex-col items-center justify-center h-40 bg-gray-50 border border-dashed rounded-lg">
                            <span className="text-lg font-semibold mb-2">Choose your thumbnail</span>
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="text-sm" 
                                onChange={(e) => setVideo({ ...video, thumbnail: e.target?.files?.[0] })}
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-md font-medium mb-2">Title*</label>
                        <input 
                            type="text" 
                            placeholder="Title here..." 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
                            value={video.title}  
                            onChange={(e) => setVideo({ ...video, title: e.target.value })}
                        />
                    </div>

                    <div className="mt-6">
                        <label className="block text-md font-medium mb-2">Description*</label>
                        <textarea 
                            placeholder="Description here..." 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
                            rows="4"
                            value={video.description}  
                            onChange={(e) => setVideo({ ...video, description: e.target.value })}
                        />
                    </div>
                </div>
            </form>
        </>
    );
}

export default UploadVideo;