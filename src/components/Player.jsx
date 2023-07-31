import React, { useEffect, useRef } from "react";
import VideoJS from "./VideoJS";
import "video.js/dist/video-js.css";

const Player = (props) => {
  const playerRef = useRef(null);
  const { videoJsOptions } = props;

  const handlePlayerReady = (player) => {
    // Check if playerRef.current already exists and dispose of the previous player if necessary
    if (playerRef.current) {
      playerRef.current.dispose();
    }

    // Store the new player instance in playerRef.current
    playerRef.current = player;

    // Register event listeners and handle player events here
    player.on("waiting", () => {
      console.log("Player is waiting");
    });

    player.on("dispose", () => {
      console.log("Player will dispose");
    });
  };

  // Use useEffect to dispose of the player when the component unmounts
  useEffect(() => {
    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
      }
    };
  }, []);

  return (
    <div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </div>
  );
};

export default Player;
