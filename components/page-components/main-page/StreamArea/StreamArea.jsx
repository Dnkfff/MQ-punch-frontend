import React from "react";

const StreamArea = () => {
  return (
    <div className="twitch-stream">
      <span className="slogan">
        <i className="fad fa-signal-stream" />
        live stream
      </span>
      <iframe
        src="https://player.twitch.tv/?channel=zed_run&parent=localhost"
        allowFullScreen={true}
        frameBorder={0}
      />
    </div>
  );
};

export default StreamArea;
