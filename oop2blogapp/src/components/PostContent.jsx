import React from 'react';

const PostContent = ({ title, content }) => {
  return (
    <main className="flex-grow flex flex-col items-center justify-start gap-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-center">{title}</h2>
      <p className="text-black text-center">{content}</p>
    </main>
  );
};

export default PostContent;