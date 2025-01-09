import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostItem = ({ post, onDelete }) => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);

  // Handle Like Button Click
  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:5000/api/posts/${post.id}/like`);
      setLikes(likes + 1);
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  // Handle Dislike Button Click
  const handleDislike = async () => {
    try {
      await axios.post(`http://localhost:5000/api/posts/${post.id}/dislike`);
      setDislikes(dislikes + 1);
    } catch (err) {
      console.error('Error disliking post:', err);
    }
  };

  // Handle Delete Button Click
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${post.id}`);
        window.location.reload()
        if (onDelete) {
          onDelete(post.id);
        }
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Failed to delete the post. Please try again.');
      }
    }
  };

  return (
    <div className="bg-gray-300 p-4 rounded-md shadow-md flex relative">
      {/* Content Section */}
      <div className="flex-grow flex flex-col gap-2">
        {/* Author */}
        <div className="mb-2">
          <p className="font-semibold text-gray-700">Author: {post.author || 'Unknown Author'}</p>
        </div>

        {/* Title */}
        <textarea
          className="bg-white p-2 rounded-md shadow-inner text-gray-700 resize-none h-8"
          value={post.title || 'Untitled'}
          style={{ width: 'calc(100% - 120px)' }}
          readOnly
        ></textarea>

        {/* Short Description */}
        <textarea
          className="bg-white p-2 rounded-md shadow-inner text-gray-700 resize-none h-24"
          value={post.shortDescription || 'No description available.'}
          style={{ width: 'calc(100% - 120px)' }}
          readOnly
        ></textarea>

        {/* Reactions Section */}
        <div className="flex justify-between items-center mt-4">
          {/* Likes and Dislikes */}
          <div className="flex items-center gap-2">
            <button
              className="bg-blue-500 text-white w-8 h-8 rounded-full flex justify-center items-center"
              onClick={handleLike}
            >
              👍
            </button>
            <span className="text-gray-700">{likes}</span>
            <button
              className="bg-blue-500 text-white w-8 h-8 rounded-full flex justify-center items-center"
              onClick={handleDislike}
            >
              👎
            </button>
            <span className="text-gray-700">{dislikes}</span>
          </div>

          {/* Comments */}
          <div className="flex items-center gap-2">
            <button className="bg-blue-500 text-white w-8 h-8 rounded-full flex justify-center items-center">
              💬
            </button>
            <span className="text-gray-700">{post.comments || 0}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 ml-4">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
          onClick={() => navigate(`/readmore/posts/${post.id}`)}
        >
          Read More
        </button>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
          onClick={() => navigate(`/updatepost/posts/${post.id}`)}
        >
          Update
        </button>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostItem;