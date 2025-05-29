import React from "react";

const HorizontalScrollingImages = () => {

  const images = [
    '/assets/carousel1.png',
    '/assets/carousel2.png',
    '/assets/carousel3.png',
    '/assets/carousel4.png',
    '/assets/carousel5.png',
  ];

  return (
    <div className="w-7xl">
      <div className="overflow-clip max-w-screen">
        {/* Scrolling Images */}
        <div className="overflow-hidden rounded-2xl p-6 ">
          <div
            className={'flex gap-6 animate-scroll '}
          >
            {/* Duplicate images for seamless loop */}
            {[...images, ...images].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Image ${index + 1}`}
                className="w-64 h-84 object-cover rounded-xl flex-shrink-0 hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default HorizontalScrollingImages;