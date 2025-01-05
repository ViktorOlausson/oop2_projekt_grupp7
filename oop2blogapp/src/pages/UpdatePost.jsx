import React from 'react';

const UpdatePost = () => {
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
        <h2 className="text-2xl mb-6">Update</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Post Title"
            className="p-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Post Content"
            className="p-2 border border-gray-300 rounded h-32"
          ></textarea>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Update
          </button>
          <button className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
            Back
          </button>
        </form>
      </main>
    </div>
  );
};

export default UpdatePost;