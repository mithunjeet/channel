import React from "react";

const VideoCard = ({
  thumbnail,
  title,
  description,
  onLike,
  onDislike,
  onComment,
  onShare,
}) => {
  return (
    <div className="max-w-xl w-full bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <img
        src={thumbnail}
        alt="Video thumbnail"
        className="w-full h-52 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>
        <div className="flex justify-between text-gray-700 text-sm">
          <button
            onClick={onLike}
            className="flex items-center gap-1 hover:text-blue-600"
          >
            👍 <span>Like</span>
          </button>
          <button
            onClick={onDislike}
            className="flex items-center gap-1 hover:text-red-600"
          >
            👎 <span>Dislike</span>
          </button>
          <button
            onClick={onComment}
            className="flex items-center gap-1 hover:text-green-600"
          >
            💬 <span>Comment</span>
          </button>
          <button
            onClick={onShare}
            className="flex items-center gap-1 hover:text-purple-600"
          >
            🔗 <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
