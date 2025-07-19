import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Comment() {
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState('');
  const { id } = useParams();
  const [cookies] = useCookies();
  const loggedInUserId = cookies.refreshToken?.user?._id;

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/commet/getAllComment/${id}`);
      setComments(res.data.doc || []);
    } catch (error) {
      console.error("Error fetching comments", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputComment.trim()) {
      alert('Comment cannot be empty');
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_URL}/commet/add`,
        { _id: id, content: inputComment },
        {
          headers: {
            Authorization: `Bearer ${cookies.refreshToken?.user?.refreshtoken}`
          }
        }
      );
      setInputComment('');
      await fetchComments(); 
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  const handleDelete = async (commentId) => {
    const confirmed = window.confirm("Are you sure !!")
    if (!confirmed) return;
    try {
     const {data} = await axios.post(
        `${import.meta.env.VITE_URL}/commet/delete/${commentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.refreshToken?.user?.refreshtoken}`
          }
        }
      );
      console.log(data)
      await fetchComments();
    
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <textarea
          placeholder="Add a public comment..."
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
          rows={3}
          className="w-full border p-2 rounded resize-none"
        ></textarea>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Comment
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center text-gray-500">No comments yet...</div>
        ) : (
          comments.map((comment) => {
            const user = comment.alldetails?.[0];
            return (
              <div key={comment._id} className="border p-3 rounded shadow-sm flex items-start gap-3">
              
            <div>
{ user && user?.avatar ? (
    <img
      src={user?.avatar}
      alt="avatar"
      className="w-12 h-12 rounded-full object-cover"
    />
  ) : (
    <div className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center text-lg font-semibold">
      {user?.username?.charAt(0).toUpperCase()}
    </div>
  )}
</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm">{user?.username || "Unknown"}</p>
                    {user?._id === loggedInUserId && (
                      <button
                        onClick={() => handleDelete(comment._id)}
                        className="text-red-500 text-xs hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="text-gray-800  text-sm mt-1">{comment.content}</p>
                  <p className="text-gray-600 text-xs mt-1">{new Date(comment.createdAt).toLocaleString()}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

