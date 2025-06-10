import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
export default function RateUserForm() {
  const [rating, setRating] = useState('');
  const [feedback, setFeedback] = useState('');
  const { id } = useParams()
  console.log(id)
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!rating){
      alert('Please select a rating before submitting.');
      return;
    }
    console.log(rating)
    const ratingData = {   
      rating: Number(rating),
      feedback
    };

    console.log('Rating Submitted:' , ratingData);
    alert('Thank you for rating!');

    
    setRating('');
    setFeedback('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mt-10 space-y-4"
    >
      <h2 className="text-xl font-bold text-center text-yellow-600">Rate a User</h2>

      <div>
        <label className="block mb-1 text-gray-700">Select Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Select a rating --</option>
          <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
          <option value="4">⭐⭐⭐⭐ - Good</option>
          <option value="3">⭐⭐⭐ - Average</option>
          <option value="2">⭐⭐ - Poor</option>
          <option value="1">⭐ - Very Bad</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-gray-700">Feedback (optional)</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback..."
          rows={4}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
      >
        Submit Rating
      </button>
    </form>
  );
}