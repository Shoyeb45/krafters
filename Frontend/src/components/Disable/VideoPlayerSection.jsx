import React from 'react';

const VideoPlayerSection = ({ videoId }) => {
    if (!videoId) {
        return (
            <div className="w-2/3 bg-gray-100 rounded-lg flex items-center justify-center h-96">
                <p className="text-gray-500">Loading video...</p>
            </div>
        );
    }

    return (
        <div className="w-2/3">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default VideoPlayerSection;