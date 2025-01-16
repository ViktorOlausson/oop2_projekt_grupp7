import React, { useState } from 'react';
import axios from 'axios';
import ContentContainer from '../components/ContentContainer';
import PostForm from '../components/PostForm';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!title || !content) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      alert('Post created successfully!');
      const response = await axios.post('http://localhost:5000/api/posts', { title, content });
      setSuccess('');
      setError('');
    } catch (err) {
      console.error('Error creating post:', err);
      alert('An error occurred while creating the post.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-300">
      <ContentContainer>
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Create a New Post</h1>
        <PostForm
          titlePlaceholder="Post Title"
          contentPlaceholder="Post Content"
          errorText={error}
          titleValue={title}
          contentValue={content}
          onTitleChange={(e) => setTitle(e.target.value)}
          onContentChange={(e) => setContent(e.target.value)}
          buttons={
            <>
              <Button
                onClick={handlePublish}
                bgColor="bg-green-600"
                textColor="text-black"
                rounded="rounded-lg"
                padding="px-10 py-5"
                className="hover:bg-blue-600 text-lg font-bold"
              >
                Publish
              </Button>
              <Button
                onClick={() => navigate('/')}
                bgColor="bg-red-700"
                textColor="text-black"
                rounded="rounded-lg"
                padding="px-10 py-5"
                className="hover:bg-gray-400 text-lg font-bold"
              >
                Back
              </Button>
            </>
          }
        />
        {/* Debugging */}
        {console.log(success)}
        {/* Display success message */}
        {success && <p className="text-green-700 text-center mt-4 font-bold">{success}</p>}
      </ContentContainer>
    </div>
  );
};

export default CreatePost;