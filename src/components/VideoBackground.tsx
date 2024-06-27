// VideoBackground.tsx

import React from 'react';
import './VideoBackground.css';

const VideoBackground: React.FC = () => {
  return (
    <div className="video-background">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/921VbEMAwwY?autoplay=1&mute=1&loop=1&playlist=921VbEMAwwY&controls=0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default VideoBackground;
