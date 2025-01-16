import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostItem = ({ post, onDelete }) => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Fetch comments when the component mounts
  useEffect(() => {
    fetchComments();
  }, []);

  // Fetch comments from the server
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/${post.id}/comments`);
      // Sort comments from newest to oldest
      setComments(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  // Handle comment submission
  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert('Please enter a comment.');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/posts/${post.id}/comments`, {
        text: newComment,
        author: 'Anonymous', // Default author for now
      });
      setNewComment('');
      fetchComments(); 
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  // Handle delete comment
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`);
      fetchComments(); // Reload comments after deletion
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

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
        if (onDelete) {
          onDelete(post.id);
        } else {
          window.location.reload(); 
        }
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Failed to delete the post. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString.replace(' ', 'T'));
  
    // Format options
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // 12-hour format with AM/PM
      timeZone: 'Europe/Stockholm', // Set timezone
    };
  
    // Use Intl.DateTimeFormat for formatting with the correct timezone and DST
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(date);
  };

  return (
    <div className="bg-gray-300 p-4 rounded-md shadow-md flex relative">
      {/* Content Section */}
      <div className="flex-grow flex flex-col gap-2">
        {/* Author and Date */}
        <div className="mb-2">
          <p className="font-semibold text-gray-700">Author: {post.author || 'Unknown Author'}</p>
          <p className="text-sm text-gray-500">
            Posted on: {post.created_at ? formatDate(post.created_at) : 'Date not available'}
          </p>
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
            <button
              className="bg-blue-500 text-white w-8 h-8 rounded-full flex justify-center items-center"
              onClick={() => setShowComments(!showComments)}
            >
              💬
            </button>
            <span className="text-gray-700">{comments.length}</span>
          </div>
        </div>

        {/* Comment Section */}
        {showComments && (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-inner">
            {/* Add Comment Form */}
            <div className="flex flex-col gap-2 mb-4">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Write your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={handleAddComment}
              >
                Publish Comment
              </button>
            </div>

            {/* Comments List */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Comments</h3>
              <ul className="space-y-3">
                {comments.map((comment, index) => (
                  <li key={comment.id} className="p-3 bg-white rounded-md shadow-md relative">
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex justify-center items-center hover:bg-red-600"
                    onClick={() => handleDeleteComment(comment.id)}
                    title="Delete Comment"
                  >
                    🗑️
                  </button>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      <span className="font-semibold">{comment.author || 'Anonymous'}</span>{' '}
                      <span className="text-gray-400">
                        {new Date(comment.created_at).toLocaleString('en-US', {
                          timeZone: 'Europe/Stockholm',
                        })}
                      </span>
                    </div>
                    <p>{comment.text}</p>
                  </div>
                </li>
                ))}
              </ul>
            </div>
          </div>
        )}
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