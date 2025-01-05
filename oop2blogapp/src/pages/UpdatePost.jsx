import React from 'react';
import ContentContainer from '../components/ContentContainer';
import PostForm from '../components/PostForm';
import Button from '../components/Button';

const UpdatePost = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-300">
      <ContentContainer>
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Update Post</h1>
        <PostForm
          titlePlaceholder="Post Title"
          contentPlaceholder="Post Content"
          buttons={
            <>
              <Button
                bgColor="bg-green-600"
                textColor="text-black"
                rounded="rounded-lg"
                padding="px-10 py-5"
                className="hover:bg-blue-600 text-lg font-bold"
              >
                Update
              </Button>
              <Button
                bgColor="bg-red-600"
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
      </ContentContainer>
    </div>
  );
};

export default UpdatePost;