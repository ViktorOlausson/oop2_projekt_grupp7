import React from 'react';

const PostPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="w-full p-4 bg-blue-500 text-white flex justify-between items-center">
        <h1 className="text-xl">Logo</h1>
        <nav>
          <ul className="flex gap-4">
            <li>Home</li>
            <li>Create Post</li>
            <li>LogOut</li>
          </ul>
        </nav>
      </header>
      <main className="bg-white p-8 rounded-lg shadow-md w-3/4">
        <h2 className="text-2xl mb-6">Post Title</h2>
        <p className="text-gray-600">Post Content</p>
        <button className="mt-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
          Back
        </button>
      </main>
    </div>
  );
};

export default PostPage;