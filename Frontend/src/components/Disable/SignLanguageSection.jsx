import React, { useState } from 'react';
import { User } from 'lucide-react';
import { ThreeDModelForASL } from '../ThreeDModelForASL';

const SignLanguageSection = ({ islText }) => {
  const [enabled, setEnabled] = useState(false);
  console.log("[INFO-3JS] ISL Text in Sign Language : " + islText);

  return (
    <div className="w-lg bg-white rounded-xl shadow-lg p-6 ">
      <div className="aspect-video rounded-lg flex items-center justify-center mb-4">
        {enabled ? (
          <div>
            <ThreeDModelForASL islText={islText}/>
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
        className={`w-full py-2 px-4 rounded-lg transition-colors duration-200 
          ${islText === "" ? 'bg-violet-300 cursor-not-allowed' : 'bg-pwpurple hover:bg-violet-600 text-white'}`}
        disabled={islText === ""}
      >
        {enabled ? 'Hide Sign Language' : 'Show Sign Language'}
      </button>
    </div>
  );
};

export default SignLanguageSection;
