import React, { useState } from 'react';
import { User } from 'lucide-react';
import { ThreeDModelForASL } from '../ThreeDModelForASL';
import { div } from 'three/tsl';

const SignLanguageSection = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="w-lg bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <User className="w-5 h-5 mr-2 text-pwpurple" />
        Sign Language
      </h3>

      <div className="aspect-video bg-gradient-to-br from-purple-100 to-gray-100 rounded-lg flex items-center justify-center mb-4">
        {enabled ? (
          <div>
          <ThreeDModelForASL />
          </div>
        ) : (
          <div className="text-center">
            <User className="w-16 h-16 text-purple-400 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Sign Language Interpreter</p>
          </div>
        )}
      </div>

      <button
        onClick={() => setEnabled(!enabled)}
        className="w-full bg-pwpurple hover:bg-violet-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
      >
        {enabled ? 'Disable Sign Language' : 'Enable Sign Language'}
      </button>
    </div>
  );
};

export default SignLanguageSection;
