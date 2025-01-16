import React from 'react';

const PostForm = ({
  titlePlaceholder = 'Post Title',
  contentPlaceholder = 'Post Content',
  errorText = '',
  titleValue,
  contentValue,
  onTitleChange,
  onContentChange,
  buttons,
}) => {
  return (
    <form className="flex flex-col gap-6">
      <input
        type="text"
        placeholder={titlePlaceholder}
        value={titleValue} // Controlled value
        onChange={onTitleChange} // Pass changes to parent
        className="p-4 border border-gray-300 rounded-lg"
      />
      <textarea
        placeholder={contentPlaceholder}
        value={contentValue} // Controlled value
        onChange={onContentChange} // Pass changes to parent
        className="p-4 border border-gray-300 rounded-lg h-60"
      ></textarea>
      {errorText && <p className="text-red-500 text-center">{errorText}</p>}
      <div className="flex justify-around gap-4">{buttons}</div>
    </form>
  );
};

export default PostForm;