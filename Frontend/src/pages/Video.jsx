import React, { useContext, useEffect, useState } from 'react';
import CommentsSection from '../components/Disable/CommentsSection';
import VideoPlayerSection from '../components/Disable/VideoPlayerSection';
import SignLanguageSection from '../components/Disable/SignLanguageSection';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { DocumentContext } from '../context/Provider';

export default function Video() {
    const navigate = useNavigate();
    const { backendUrl, videoUrl, mlBackendUrl } = useContext(DocumentContext);
    const [lecture, setLecture] = useState(null);
    const [videoId, setVideoId] = useState("");
    const [islText, setIslText] = useState(undefined);
    
    // Function to extract YouTube video ID from URL
    const extractYouTubeId = (url) => {
        console.log(url);
        
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };


    useEffect(() => {
        console.log(videoUrl);
        (async () => {
            try {
                console.log(mlBackendUrl);
                const response = await fetch(`https://amangupta.live/api/video_to_text/?url=${videoUrl}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    console.error("Failed to get the ISL text from the youtube video\n----server error----");
                    return;
                }
                const data = await response.json();
                console.table({ data });
                setIslText(data.isl_format_text);

            } catch (error) {
                console.error("Error while getting the ISL text from youtube video\n", error);
            }
        })();
        setVideoId(extractYouTubeId(videoUrl));
    }, []);

    // Extract YouTube video ID
    return (
        <div className="w-full flex mt-10 flex-col justify-center items-center gap-2 px-20">
            <div className='w-full flex items-center justify-between py-4'>
                <button 
                    className='flex items-center gap-1 text-lg font-semibold cursor-pointer text-gray-600 hover:text-gray-800 transition-colors duration-200'
                >
                    <ChevronLeft strokeWidth={3} size={20}/>
                    Back
                </button>
            </div>
            <div className='w-full flex gap-2'>
                {islText ? <VideoPlayerSection videoId={videoId} />:<LoaderForVideo />}
                <SignLanguageSection islText={islText}/>
            </div>
            <CommentsSection />
        </div>
    );
}

function LoaderForVideo() {
  return (
    <div className="flex justify-center items-center w-full h-90 bg-white rounded-xl">
      <div className="w-10 h-10 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}