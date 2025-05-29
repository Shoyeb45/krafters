import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: 'What is this learning platform and who is it for?',
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
  {
    id: 6,
    question: 'Are there any live classes or only recorded videos?',
    answer: 'Our platform primarily offers high-quality recorded lessons. Some special courses may include live classes, which will be announced in advance.'
  },
  {
    id: 7,
    question: 'How do I get help if I’m stuck on a topic?',
    answer: 'Each lesson has a comment section where you can ask doubts. Our educators respond within 24 hours. You can also reach out via the Help section.'
  }
];

const FAQs = () => {
  const [activeId, setActiveId] = useState(2); // Default open

  const handleToggle = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  const activeFaq = faqs.find((faq) => faq.id === activeId);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center lg:text-left mb-6">
        Frequently Asked Questions
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel: Questions */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              onClick={() => handleToggle(faq.id)}
              className={`flex items-center justify-between gap-4 border border-gray-200 rounded-full p-3 sm:p-4 cursor-pointer hover:shadow transition-all duration-300 ${
                activeId === faq.id ? 'bg-indigo-50' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold">{faq.id < 10 ? `0${faq.id}` : faq.id}</div>
                <p className="text-sm sm:text-base">{faq.question}</p>
              </div>
              <Plus
                size={18}
                className={`text-indigo-500 transition-transform ${
                  activeId === faq.id ? 'rotate-45' : ''
                }`}
              />
            </div>
          ))}
        </div>

        {/* Right Panel: Answer */}
        <div className="w-full lg:w-1/2">
          {activeFaq && (
            <div className="bg-sky-100 rounded-lg p-6 shadow-md transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-700">
                  {activeFaq.id < 10 ? `0${activeFaq.id}` : activeFaq.id}
                </div>
                <h3 className="text-base sm:text-lg font-semibold">{activeFaq.question}</h3>
              </div>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {activeFaq.answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
