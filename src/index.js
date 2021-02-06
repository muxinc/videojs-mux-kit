import videojs from 'video.js/core';
import 'videojs-mux';

import './style/index.scss';

import './plugins/vtt-thumbnails.js';
import './tech/hlsjs';

videojs.use('video/mux', (player) => {
  return {
    setSource({ src }, next) {
      console.log(player.options());

      if (player.options().thumbnailScrubber) {
        player.vttThumbnails({
          src: `https://image.mux.com/${src}/storyboard.vtt`,
        });
      }

      next(null, {
        src: `https://stream.mux.com/${src}`,
        type: 'application/x-mpegurl',
      });
    },
  };
});

export default videojs;
