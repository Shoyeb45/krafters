import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    image: 'https://via.placeholder.com/280x160',
    student: {
      name: 'Aarav Sharma',
      grade: 'Grade 10, Delhi Public School',
      avatar: 'https://i.pravatar.cc/40?img=1'
    },
    title: 'Math Booster Course',
    description:
      'Before joining, I struggled with Algebra. This course made it so easy! The explanations are super clear and fun.',
    rating: 4.9,
    reviews: '12.3k reviews'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/280x160',
    student: {
      name: 'Sara Khan',
      grade: 'Grade 8, Ryan International',
      avatar: 'https://i.pravatar.cc/40?img=2'
    },
    title: 'Science Made Simple',
    description:
      'I love the animations and quizzes! Learning Science feels like a game now. Thank you!',
    rating: 4.8,
    reviews: '9.8k reviews'
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/280x160',
    student: {
      name: 'Rohan Mehta',
      grade: 'Grade 9, Kendriya Vidyalaya',
      avatar: 'https://i.pravatar.cc/40?img=3'
    },
    title: 'Physics Foundation',
    description:
      'The mentor sessions really helped me improve my understanding. My marks have improved a lot.',
    rating: 4.7,
    reviews: '7.4k reviews'
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/280x160',
    student: {
      name: 'Ananya Iyer',
      grade: 'Grade 11, National Public School',
      avatar: 'https://i.pravatar.cc/40?img=4'
    },
    title: 'JEE Prep Starter',
    description:
      'It’s amazing how well this course covers concepts. Weekly tests are super helpful.',
    rating: 5.0,
    reviews: '15.1k reviews'
  }
];

const Testimonial = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 3;

  const handlePrev = () => {
    setStartIndex((prev) => (prev - visibleCards + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + visibleCards) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const endIndex = (startIndex + visibleCards) % testimonials.length;
    return startIndex < endIndex
      ? testimonials.slice(startIndex, endIndex)
      : [...testimonials.slice(startIndex), ...testimonials.slice(0, endIndex)];
  };

  return (
    <div className="py-16 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-12">
        <div>
          <h2 className="text-4xl md:text-7xl font-bold text-gray-900 mb-2">
            This is what our students <br /> tell about us 🌠
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Real feedback from school students across India.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 transition-all duration-500">
          {getVisibleTestimonials().map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-40 bg-gray-200">
                <img
                  src={testimonial.image}
                  alt={testimonial.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <div className="flex items-center mb-3">
                  <img
                    src={testimonial.student.avatar}
                    alt={testimonial.student.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {testimonial.student.name}
                    </p>
                    <p className="text-xs text-gray-500">{testimonial.student.grade}</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{testimonial.title}</h3>

                <p className="text-sm text-gray-600 mb-4">{testimonial.description}</p>

                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 mr-1">
                    {testimonial.rating}
                  </span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-2" />
                  <span className="text-sm text-gray-500">({testimonial.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
