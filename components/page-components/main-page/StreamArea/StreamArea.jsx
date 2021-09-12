import React from 'react';

const StreamArea = () => {
  return (
    <div className='twitch-stream'>
      <iframe
        src='https://player.twitch.tv/?channel=zed_run&parent=localhost'
        allowFullScreen={true}
        frameborder={0}
      ></iframe>
    </div>
  );
};

export default StreamArea;
