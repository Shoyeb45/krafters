import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { DocumentContext } from '../../context/Provider';
import { useContext } from 'react';
import axios from 'axios';

const ImportDialog = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { isOpenUploadBox, setIsOpenUploadBox, uploadedFiles, setUploadedFiles, documentSummary, setDocumentSummary, text, setText, loading, setLoading } = useContext(DocumentContext);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', uploadedFiles[0]);

      const response = await axios.post('https://amangupta.live/api/summarise_text', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setDocumentSummary(response.data.summary);
      setText(response.data.text);
      console.log('Documents fetched successfully:', response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  if (!isOpenUploadBox) return null;

  const handleFileUpload = (files) => {
    const file = files[0];
    if (file) {
      setUploadedFiles([file]);
      setIsOpenUploadBox(false);
      fetchDocuments();
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files) {
      handleFileUpload(files);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-96 max-w-90vw">
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center ga-2 text-lg font-semibold text-gray-800">
            <Upload className="w-5 h-5 mr-2 text-pwpurple" />
            Notes Upload</h3>
          <button
            onClick={() => setIsOpenUploadBox(false)}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            x
          </button>
        </div>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${isDragging
            ? 'border-purple-400 bg-purple-50'
            : 'border-gray-300 bg-gray-50 hover:border-purple-300 hover:bg-purple-25'
            }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-6">Drop your notes here or</p>
          <input
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="bg-pwpurple hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Browse Files
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImportDialog;

