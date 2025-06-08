import React, { useState } from 'react';

export default function Comment() {
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputComment.trim()) {
      alert('Comment cannot be empty');
      return;
    }

    setInputComment('');
    setUsername('');
  };



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
      <div className='flex justify-center items-center h-full'>
              <h1 className=''>no comment yet..</h1>
      </div>
      
    </div>
  );
}