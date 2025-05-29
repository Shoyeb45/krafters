import React, { useState } from 'react';
import { CheckCircle, BookOpen, Eye, Shuffle, AlertTriangle, Trophy, ArrowRight, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TestInstructions = () => {
  const [currentStep] = useState(0);

  const testSteps = [
    {
      title: "Reading Paragraph Test",
      icon: BookOpen,
      description: "Read carefully and answer comprehension questions",
      color: "bg-purple-500"
    },
    {
      title: "Attention Test",
      icon: Eye,
      description: "Focus and respond to visual/audio cues",
      color: "bg-purple-600"
    },
    {
      title: "Jumbling Word Test",
      icon: Shuffle,
      description: "Identify and arrange scrambled words",
      color: "bg-purple-500"
    },
    {
      title: "Wrong Word Detection Test",
      icon: AlertTriangle,
      description: "Spot incorrect words in sentences",
      color: "bg-purple-600"
    },
    {
      title: "Final Report & Score",
      icon: Trophy,
      description: "View your results and personalized feedback",
      color: "bg-purple-700"
    }
  ];
  const navigate = useNavigate();

  const handleStartTest = () => {
    console.log("Starting ADHD & Dyslexia Assessment Test...");
    navigate('/TestSequence');
    // This would navigate to the first test
  };

  return (
    <div className=" bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto mt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ADHD & Dyslexia Assessment Test
          </h1>
          <p className="text-gray-600 text-lg">
            A comprehensive evaluation designed to help identify learning patterns
          </p>
        </div>

        {/* Important Guidelines */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
            Important Guidelines Before Starting
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Find a <strong>quiet, non-disturbing environment</strong> where you can focus completely</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Ensure you have <strong>stable internet connection</strong> throughout the test</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Sit comfortably with <strong>good lighting</strong> and minimal distractions</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Take your time - there's <strong>no rush</strong>, answer thoughtfully</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Keep water nearby and take <strong>short breaks</strong> if needed</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-gray-700">Be honest and natural - <strong>there are no wrong answers</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* Test Flow */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Test Flow & Structure</h2>
          
          <div className="space-y-4">
            {testSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              
              return (
                <div key={index} className="relative">
                  <div className={`flex items-center p-4 rounded-lg border-2 transition-all duration-300 ${
                    isActive ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full text-white mr-4 ${step.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">Step {index + 1}: {step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                    {index < testSteps.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  
                  {index < testSteps.length - 1 && (
                    <div className="flex justify-center my-2">
                      <div className="w-px h-4 bg-gray-300"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivation Section */}
        <div className="bg-white border-2 border-purple-200 rounded-xl shadow-lg p-6 mb-8">
          <div className="text-center">
            <Heart className="w-12 h-12 mx-auto mb-4 text-purple-500" />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">You've Got This! 💪</h2>
            <div className="space-y-2 text-lg text-gray-700">
              <p>Remember: Every great mind learns differently, and that's your superpower! ✨</p>
              <p>This test is here to help you understand your unique learning style better.</p>
              <p className="font-semibold text-purple-700">Take your time, stay calm, and trust yourself. You're amazing just as you are! 🌟</p>
            </div>
          </div>
        </div>

        {/* Test Duration & Additional Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Estimated Time</h3>
              <p className="text-gray-600">20-30 minutes</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Auto-Save</h3>
              <p className="text-gray-600">Progress saved automatically</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Instant Results</h3>
              <p className="text-gray-600">Get your report immediately</p>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={handleStartTest}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center mx-auto"
          >
            <Star className="w-6 h-6 mr-2" />
            Start Your Assessment Journey
            <ArrowRight className="w-6 h-6 ml-2" />
          </button>
          <p className="text-gray-500 mt-4 text-sm">
            Ready when you are! Take a deep breath and begin. 🌈
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestInstructions;