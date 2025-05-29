import React from 'react'
import { Mail } from 'lucide-react';

const JoinUs = () => {
  return (
    <div className='p-6'>
      <div className='flex flex-col justify-center items-center h-auto py-10 px-4 relative rounded-lg overflow-hidden'>
        
        <div className="text-center mb-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            Join ambitious courses and
          </h1>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            unlock your dream career today
          </h1>
        </div>

        <p className="text-sm sm:text-base text-center max-w-xs sm:max-w-md md:max-w-lg mb-4">
          Unlock your true learning and discover a world of opportunities that align with your skills, interests, and aspirations
        </p>

        <div className="flex flex-col sm:flex-row items-center w-full max-w-md gap-2">
          <div className="relative w-full flex-shrink">
            <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none text-sm sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            />
          </div>

          <button
            className="bg-gradient-to-r from-blue-600 whitespace-nowrap to-indigo-600 text-white py-2 px-6 w-full sm:w-auto rounded-full hover:from-blue-700 hover:to-indigo-700 text-sm sm:text-base font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Join Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
