import React from 'react';

const ContentContainer = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-gray-200 p-8 rounded-[30px] shadow-lg w-3/6 max-w-2xl min-h-[600px] max-h-[800px] ${className}`}
    >
      {children}
    </div>
  );
};

export default ContentContainer;