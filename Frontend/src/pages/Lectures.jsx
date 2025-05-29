import React, { useContext, useState } from 'react';
import VidIcon from '../assets/video.png'
import NoteIcon from '../assets/sticky-notes.png';
import { useNavigate, useParams } from 'react-router-dom';
import { DocumentContext } from '../context/Provider';
import axios from 'axios';

const Lectures = () => {
    const navigate = useNavigate();

    const {id} = useParams();
    const {backendUrl} = useParams();
    const[lectures,setLectures] = useState([])

    const getLectures = async() =>{
        try {
            const res = await axios.get(`${backendUrl}/api/course/lectures/${id}`)
            console.log(res);
            setLectures(res.data.lectures)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getLectures()
    })

    return (
        <div>
        {
               lectures?.map((lecture)=>(
                    <div>
                        <button
                        onClick={navigate(`/batch/videos/${lecture.secure_url}`)}
                        >{lecture.title}</button>
                        </div>
               ))
        }
        </div>
    );
};

export default Lectures;
