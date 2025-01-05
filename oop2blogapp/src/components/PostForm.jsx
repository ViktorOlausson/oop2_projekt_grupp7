import React from 'react';

const PostForm = ({
  titlePlaceholder = 'Post Title',
  contentPlaceholder = 'Post Content',
  errorText = '',
  onSubmit,
  buttons,
}) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder={titlePlaceholder}
        className="p-4 border border-gray-300 rounded-lg"
      />
      <textarea
        placeholder={contentPlaceholder}
        className="p-4 border border-gray-300 rounded-lg h-60"
      ></textarea>
      {errorText && <p className="text-red-500 text-center">{errorText}</p>}
      <div className="flex justify-around gap-4">{buttons}</div>
    </form>
  );
};

export default PostForm;