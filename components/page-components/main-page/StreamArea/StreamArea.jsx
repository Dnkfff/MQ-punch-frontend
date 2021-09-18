import React from 'react';

const StreamArea = () => {
  return (
    <div className='twitch-stream'>
      <span className='slogan'>live stream</span>
      <iframe
        src='https://player.twitch.tv/?channel=zed_run&parent=localhost'
        allowFullScreen={true}
        frameBorder={0}
      ></iframe>
    </div>
  );
};

export default StreamArea;
