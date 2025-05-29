import React from 'react';
import { FileText } from 'lucide-react';
export default function () {
    return (
        <div className="w-64 p-6 h-screen border border-neutral-200">
            <h3 className="border-b border-neutral-300 py-4 text-lg font-semibold text-gray-800 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-pwpurple" />
                Documents
            </h3>
            <div>
                {/* // This is where you can add your document components
                //map all the documents and all */}
            </div>
        </div>
    );
}