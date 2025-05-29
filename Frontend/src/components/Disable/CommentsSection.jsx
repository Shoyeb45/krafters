import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';


const CommentsSection = () => {
    const [newComment, setNewComment] = useState('');
    const [comments] = useState([
      { id: 1, user: 'Alice Johnson', time: '2 hours ago', text: 'Great explanation of the concepts!' },
      { id: 2, user: 'Bob Smith', time: '1 day ago', text: 'Could you clarify the second principle?' },
      { id: 3, user: 'Carol Davis', time: '3 days ago', text: 'The examples really helped me understand.' }
    ]);
    
    return (
      <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-pwpurple" />
            Comments ({comments.length})
          </h3>
        </div>
        
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-pwpurple rounded-full flex items-center justify-center text-white text-sm font-medium">
              U
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows="3"
              />
              <div className="flex justify-end mt-2">
                <button className="bg-pwpurple hover:bg-violet-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-h-64 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="p-4 border-b border-gray-100 last:border-b-0">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium">
                  {comment.user[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-800 text-sm">{comment.user}</span>
                    <span className="text-gray-500 text-xs">{comment.time}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{comment.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
export default CommentsSection;