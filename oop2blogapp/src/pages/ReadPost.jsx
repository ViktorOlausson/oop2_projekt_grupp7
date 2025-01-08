import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ContentContainer from '../components/ContentContainer';
import Button from '../components/Button';

const PostPage = () => {
  const { id } = useParams(); // Get post ID from URL
  const navigate = useNavigate();
  const [title, setTitle] = useState(''); // State for post title
  const [content, setContent] = useState(''); // State for post content
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`); // Corrected port to 5000
        setTitle(response.data.title); // Set the title
        setContent(response.data.content); // Set the content
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post details.');
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-300">
        <ContentContainer>
          <p className="text-red-500 text-center text-lg">{error}</p>
          <div className="flex justify-center mt-6">
            <Button
              bgColor="bg-red-600"
              textColor="text-black"
              rounded="rounded-lg"
              padding="px-10 py-5"
              className="hover:bg-gray-400 text-lg font-bold"
              onClick={() => navigate('/')} // Navigate back to home
            >
              Back
            </Button>
          </div>
        </ContentContainer>
      </div>
    );
  }

  if (!title && !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-300">
        <ContentContainer>
          <p className="text-blue-700 text-center text-lg">Loading post details...</p>
        </ContentContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-300">
      <ContentContainer>
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Post Details</h1>
        <div className="flex flex-col gap-6">
          {/* Read-Only Title Textarea */}
          <textarea
            className="p-4 border border-gray-300 rounded-lg w-full bg-gray-200 cursor-not-allowed"
            value={title}
            readOnly // Make the textarea read-only
          ></textarea>
          {/* Read-Only Content Textarea */}
          <textarea
            className="p-4 border border-gray-300 rounded-lg h-60 w-full bg-gray-200 cursor-not-allowed"
            value={content}
            readOnly // Make the textarea read-only
          ></textarea>
        </div>
        <div className="flex justify-center mt-6">
          <Button
            bgColor="bg-red-600"
            textColor="text-black"
            rounded="rounded-lg"
            padding="px-10 py-5"
            className="hover:bg-gray-400 text-lg font-bold"
            onClick={() => navigate('/')}
          >
            Back
          </Button>
        </div>
      </ContentContainer>
    </div>
  );
};

export default PostPage;