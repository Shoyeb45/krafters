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
    const { backendUrl } = useContext(DocumentContext);
    const { id } = useParams(); // This should be the secure_url from your navigation
    const [lecture, setLecture] = useState(null);

    // Function to extract YouTube video ID from URL
    const extractYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const fetchCourse = async() => {
        try {
            // If id is the secure_url, you might need to find the lecture by URL
            // Or adjust your routing to pass the lecture ID instead
            const response = await axios.get(`${backendUrl}/api/course/lectures/${id}`);
            console.log(response);
            // Assuming the response contains the lecture data
            setLecture(response.data.lecture);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, [id]);

    // Extract YouTube video ID
    const videoId = lecture ? extractYouTubeId(lecture.secure_url) : null;

    return (
        <div className="w-full flex flex-col justify-center items-center gap-2 px-20">
            <div className='w-full flex items-center justify-between py-4'>
                <button 
                    className='flex items-center gap-1 text-lg font-semibold cursor-pointer text-gray-600 hover:text-gray-800 transition-colors duration-200'
                >
                    <ChevronLeft strokeWidth={3} size={20}/>
                    Back
                </button>
            </div>
            <div className='w-full flex gap-2'>
                <VideoPlayerSection videoId={videoId} />
                <SignLanguageSection />
            </div>
            <CommentsSection />
        </div>
    );
}