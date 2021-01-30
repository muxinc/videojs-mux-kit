import videojs from 'video.js/core';
import 'videojs-mux';

import './tech/hlsjs';
import './plugins/vtt-thumbnails.js';

videojs.use('video/mux', player => {
  return {
    setSource({ src }, next) {
      player.vttThumbnails({
        src: `https://image.mux.com/${src}/storyboard.vtt`,
      });

      next(null, {
        src: `https://stream.mux.com/${src}`,
        type: 'application/x-mpegurl',
      });
    }
  }
});


export default videojs;
