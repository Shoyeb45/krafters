import React from 'react';
import { Users, Monitor, FileText, MessageCircle } from 'lucide-react';

const VideoSection = () => {
  return (
    <div className=" p-4 md:p-8 max-w-6xl mx-auto my-10">
      <div className="">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Why Choose<br />
            <span className="text-gray-800">Learning from us ?</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Unlock your true potential and discover a world of opportunities
            <br className="hidden md:block" />
            that align with your career, interests, and aspirations
          </p>
        </div>

        <div className='flex justify-center items-start'>
            <img className='w-[80%]' src="/assets/VideoSectionImg.png" alt="" />
        </div>


      </div>
    </div>
  );
};

export default VideoSection;