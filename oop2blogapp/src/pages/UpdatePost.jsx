import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ContentContainer from '../components/ContentContainer';
import PostForm from '../components/PostForm';
import Button from '../components/Button';

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch the post details when the component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post details.');
      }
    };

    fetchPost();
  }, [id]);

  // Handle Update Submission
  const handleUpdate = async () => {
    if (!title || !content) {
      setError('Both title and content are required.');
      window.confirm('Please make sure both title and content filled');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, { title, content });
      setSuccess('Post updated successfully!');
      window.confirm('Post updated successfully!');
      setError('');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Failed to update the post.');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-300">
      <ContentContainer>
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Update Post</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <PostForm
          titlePlaceholder="Post Title"
          contentPlaceholder="Post Content"
          titleValue={title} // Pass the current title
          contentValue={content} // Pass the current content
          onTitleChange={(e) => setTitle(e.target.value)} // Update title state
          onContentChange={(e) => setContent(e.target.value)} // Update content state
          buttons={
            <>
              <Button
                bgColor="bg-green-600"
                textColor="text-black"
                rounded="rounded-lg"
                padding="px-10 py-5"
                className="hover:bg-blue-600 text-lg font-bold"
                onClick={handleUpdate}
              >
                Update
              </Button>
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
            </>
          }
        />
      </ContentContainer>
    </div>
  );
};

export default UpdatePost;