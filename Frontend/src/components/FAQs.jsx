import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: 'What is tagain his learning platform and who is it for?',
    answer: 'This platform is designed to help school students learn subjects in an interactive and personalized way through video lectures, quizzes, and progress tracking.'
  },
  {
    id: 2,
    question: 'How do I sign up as a student?',
    answer: 'Click on the "Sign Up" button at the top right, fill in your basic details, choose your grade, and start learning right away!'
  },
  {
    id: 3,
    question: 'Can I access courses for multiple subjects?',
    answer: 'Yes, once you’re signed in, you can access courses in subjects like Math, Science, English, and more based on your grade level.'
  },
  {
    id: 4,
    question: 'Is there a way to track my progress?',
    answer: 'Absolutely! Your dashboard shows your completed lessons, quiz scores, and overall progress in each subject.'
  },
  {
    id: 5,
    question: 'Can I download videos for offline learning?',
    answer: 'At the moment, our platform supports online streaming only. However, offline access is a feature we’re actively working on.'
  },
];

const FAQs = () => {
  const [activeId, setActiveId] = useState(2); // Nothing open by default

  const toggleFaq = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-4 max-w-6xl ">
        <h1 className="text-2xl sm:text-3xl font-bold text-center lg:text-left mb-6">
          Frequently Asked Questions
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Questions List */}
          <div className="w-full lg:w-1/2 space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                onClick={() => toggleFaq(faq.id)}
                className={`flex items-center justify-between border border-gray-200 rounded-full p-4 cursor-pointer transition-all hover:shadow ${
                  activeId === faq.id ? 'bg-indigo-100 ring-2 ring-indigo-200' : 'bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold">
                    {faq.id < 10 ? `0${faq.id}` : faq.id}
                  </span>
                  <span className="text-sm sm:text-base font-medium">{faq.question}</span>
                </div>
                <Plus
                  size={18}
                  className={`text-indigo-600 transition-transform duration-300 ${
                    activeId === faq.id ? 'rotate-45' : ''
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Right Side - Answer Display */}
          <div className="w-full lg:w-1/2">
            {activeId ? (
              <div className="bg-sky-100 p-6 rounded-lg shadow-sm transition-all duration-300 min-h-[150px] max-w-200 ">
                <div className="flex items-center gap-4 mb-4">
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-700">
                    {activeId < 10 ? `0${activeId}` : activeId}
                  </span>
                  <h2 className="text-base sm:text-lg font-semibold">
                    {faqs.find((faq) => faq.id === activeId)?.question}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {faqs.find((faq) => faq.id === activeId)?.answer}
                </p>
              </div>
            ) : (
              <div className="bg-sky-50 w-[550px] p-6 rounded-lg shadow-sm min-h-[150px] flex items-center justify-center text-gray-500 italic">
                Click a question to see the answer
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
