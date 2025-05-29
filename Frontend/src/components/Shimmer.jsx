import React from 'react';

const ShimmerPlaceholder = () => {
  return (
    <div className="animate-pulse flex flex-col gap-3">
      <div className="h-4 w-full rounded bg-gray-200" />
      <div className="h-4 w-full rounded bg-gray-200" />
      <div className="h-4 w-full rounded bg-gray-200" />
    </div>
  );
};

export default ShimmerPlaceholder;
