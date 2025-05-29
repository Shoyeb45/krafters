import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const NotesUploadSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Upload className="w-5 h-5 mr-2 text-purple-600" />
          Notes Upload
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600 text-xl"
        >
          x
        </button>
      </div>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${isDragging
          ? 'border-purple-400 bg-purple-50'
          : 'border-gray-300 bg-gray-50 hover:border-purple-300 hover:bg-purple-25'
          }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={() => setIsDragging(false)}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">Drop your notes here or</p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
          Browse Files
        </button>
      </div>
    </div>
  );
};

export default NotesUploadSection;