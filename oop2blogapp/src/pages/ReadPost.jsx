import React from 'react';
import ContentContainer from '../components/ContentContainer';
import PostContent from '../components/PostContent';
import Button from '../components/Button';

const PostPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-300">
      <ContentContainer>
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Post Details</h1>
        <PostContent
          title="Post Title"
          content="Post Content goes here. If the content is longer than the container, it will scroll automatically..."
        />
        <div className="flex justify-center mt-6">
          <Button
            bgColor="bg-red-600"
            textColor="text-black"
            rounded="rounded-lg"
            padding="px-10 py-5"
            className="hover:bg-gray-400 text-lg font-bold"
          >
            Back
          </Button>
        </div>
      </ContentContainer>
    </div>
  );
};

export default PostPage;