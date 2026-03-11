import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden'>
      <div className='p-8 text-center'>
        <div className='flex justify-center mb-4'>
          <svg
            className='animate-spin h-12 w-12 text-blue-500'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
            ></path>
          </svg>
        </div>
        <p className='text-gray-600'>Loading enquiries...</p>
      </div>
    </div>
  );
};

export default LoadingState;
