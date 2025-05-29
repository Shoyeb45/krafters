import React, { useContext, useState, useEffect } from 'react';
import VidIcon from '../assets/video.png'
import NoteIcon from '../assets/sticky-notes.png';
import { useNavigate, useParams } from 'react-router-dom';
import { DocumentContext } from '../context/Provider';
import axios from 'axios';

const Lectures = () => {
    const {backendUrl} = useContext(DocumentContext);

    const {id} = useParams();
    const[lectures,setLectures] = useState([])

    const getLectures = async () =>{
        try {
            const res = await axios.get(`${backendUrl}/api/course/lectures/${id}`)
            console.log(res.data);
            setLectures(res.data.lectures)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getLectures()
    }, [])

    return (
        <div>
            <VideoCards lectures={lectures}/>
        </div>
    );
};


function VideoCards({ lectures }) {
    return (
        <div className='mt-20 flex flex-col gap-3'>
            {lectures.map((lecture, idx) => {
                return <VideoCard lecture={lecture} key={idx}/>
            })}
        </div>
    )
}

const extractYouTubeId = (url) => {
  console.log(url);

  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

function getYouTubeThumbnail(videoId) {
//   const videoId = embedCode.match(/watch\\?v=(.*?)(&amp;|$)/);
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function VideoCard({ lecture }) {
    const navigate = useNavigate()
    const {setVideoUrl} = useContext(DocumentContext)

    function navigateToVideo() {
        setVideoUrl(lecture.lecture.secure_url);
        navigate("/batch/video")
    }

    return (
        <div className='flex cursor-pointer gap-5 border-2  items-center'onClick={navigateToVideo} >
            <div className='w-60 h-40 overflow-hidden'>
                <img className='scale-130' src={getYouTubeThumbnail(extractYouTubeId(lecture.lecture.secure_url))} />
            </div>

            <div className='flex gap-3 flex-col'>
                <h3 className='font-bold'>{lecture.title}</h3>
                <h3>{lecture.description}</h3>
            </div>
        </div>
    )
}

export default Lectures;
