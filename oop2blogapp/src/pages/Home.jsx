import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from '../components/PostItem';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data); // Save the posts in state
      } catch (err) {
        console.error(err);
        setError('Failed to fetch posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-400">
        <p className="text-gray-700 text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-400">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-300">
      <main className="flex flex-col items-center w-full mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Posts</h2>
        <div className="bg-blue-300 w-4/5 p-6 rounded-lg flex flex-col gap-4">
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={{
                id: post.id,
                title: post.title,
                description: post.content,
                shortDescription: post.content.length > 50 
                  ? post.content.substring(0, 50) + '...' 
                  : post.content, // Truncated content for short description
                author: `Author ${post.id}`, // Placeholder author
                likes: post.likes,
                dislikes: post.dislikes,
                comments: post.comments || 'No comments',
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;