'use client';

import React, { useState, useEffect } from 'react';
import YouTube, {YouTubeProps} from 'react-youtube';


export const YoutubeEmbedding = (props: {
  yt_id: string,
  start_time: string,
}) => {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  console.log("props in yt embed", props);

  return (
      <div className="flex w-full flex-col border border-gray-200 rounded-md p-6 bg-white shadow-sm gap-y-6">
        <YouTube videoId={props.yt_id} opts={{ ...opts, playerVars: { ...opts.playerVars, start: props.start_time } }} onReady={onPlayerReady}/>
      </div>
  );
};
