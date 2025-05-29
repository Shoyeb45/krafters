import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const CourseListing = () => {
  const [activeTab, setActiveTab] = useState('UX/UI Design');

  const tabs = [
    'Project Manager',
    'UX/UI Design',
    'Digital Market',
    'Data Scientist',
    'Data Analyst',
    'Front-End Developer'
  ];

  const courses = [
    {
      id: 1,
      image: '/api/placeholder/300/200',
      title: 'Google UX/UI Analytics',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      instructor: 'Theresa Webb',
      role: 'UX/UI designer',
      rating: 4.8,
      reviews: '44k reviews',
      type: 'design-workspace'
    },
    {
      id: 2,
      image: '/api/placeholder/300/200',
      title: 'Google UX/UI Analytics',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      instructor: 'Theresa Webb',
      role: 'UX/UI designer',
      rating: 4.8,
      reviews: '44k reviews',
      type: 'design-creative'
    },
    {
      id: 3,
      image: '/api/placeholder/300/200',
      title: 'Google UX/UI Analytics',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      instructor: 'Theresa Webb',
      role: 'UX/UI designer',
      rating: 4.8,
      reviews: '44k reviews',
      type: 'laptop-work'
    },
    {
      id: 4,
      image: '/api/placeholder/300/200',
      title: 'Google UX/UI Analytics',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      instructor: 'Theresa Webb',
      role: 'UX/UI designer',
      rating: 4.8,
      reviews: '44k reviews',
      type: 'design-logo'
    },
    {
      id: 5,
      image: '/api/placeholder/300/200',
      title: 'Google UX/UI Analytics',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      instructor: 'Theresa Webb',
      role: 'UX/UI designer',
      rating: 4.8,
      reviews: '44k reviews',
      type: 'web-design'
    },
    {
      id: 6,
      image: '/api/placeholder/300/200',
      title: 'Google UX/UI Analytics',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      instructor: 'Theresa Webb',
      role: 'UX/UI designer',
      rating: 4.8,
      reviews: '44k reviews',
      type: 'mobile-app'
    },
    {
      id: 7,
      image: '/api/placeholder/300/200',
      title: 'Google UX/UI Analytics',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      instructor: 'Theresa Webb',
      role: 'UX/UI designer',
      rating: 4.8,
      reviews: '44k reviews',
      type: 'abstract-design'
    },
    {
      id: 8,
      image: '/api/placeholder/300/200',
      title: 'Google UX/UI Analytics',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      instructor: 'Theresa Webb',
      role: 'UX/UI designer',
      rating: 4.8,
      reviews: '44k reviews',
      type: 'computer-setup'
    }
  ];

  // Simulate different background colors for course images
  const getImageBg = (type) => {
    const backgrounds = {
      'design-workspace': 'bg-blue-100',
      'design-creative': 'bg-yellow-100',
      'laptop-work': 'bg-gray-800',
      'design-logo': 'bg-gray-100',
      'web-design': 'bg-gray-200',
      'mobile-app': 'bg-purple-100',
      'abstract-design': 'bg-teal-100',
      'computer-setup': 'bg-gray-200'
    };
    return backgrounds[type] || 'bg-gray-100';
  };

  const getImageContent = (type) => {
    switch(type) {
      case 'design-workspace':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-500 rounded"></div>
              </div>
              <div className="text-xs text-gray-600">Sticky Notes & Charts</div>
            </div>
          </div>
        );
      case 'design-creative':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="relative">
              <div className="w-24 h-16 bg-teal-200 rounded-lg relative">
                <div className="absolute inset-2 text-center text-sm font-bold text-gray-700">DESIGN</div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-400 rounded-full"></div>
              </div>
            </div>
          </div>
        );
      case 'laptop-work':
        return (
          <div className="flex items-center justify-center h-full bg-gray-800">
            <div className="bg-white rounded p-2 shadow-lg">
              <div className="w-16 h-10 bg-gray-100 rounded mb-1"></div>
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>
        );
      case 'design-logo':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-gray-600 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-gray-700">DESIGN</span>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="w-16 h-12 bg-gray-300 rounded"></div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 my-auto mt-68">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            {/* Course Image */}
            <div className={`h-48 ${getImageBg(course.type)} relative`}>
              {getImageContent(course.type)}
            </div>

            {/* Course Content */}
            <div className="p-4">
              {/* Instructor Info */}
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{course.instructor}</div>
                  <div className="text-xs text-gray-500">{course.role}</div>
                </div>
              </div>

              {/* Course Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>

              {/* Course Description */}
              <p className="text-sm text-gray-600 mb-4">{course.description}</p>

              {/* Rating */}
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 mr-1">{course.rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-2" />
                <span className="text-sm text-gray-500">({course.reviews})</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center space-x-4">
        <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-3 rounded-full bg-teal-500 hover:bg-teal-600 text-white transition-colors duration-200">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CourseListing;