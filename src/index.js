import videojs from 'video.js/core';

import './style/index.scss';

import './plugins/vtt-thumbnails.js';
import './tech/hlsjs';
import setupMuxDataTracking from './utils/mux-data-middleware';

videojs.use('video/mux', (player) => {
  return {
    setSource({ src }, next) {

      if (player.options().thumbnailScrubber) {
        player.vttThumbnails({
          src: `https://image.mux.com/${src}/storyboard.vtt`,
        });
      }

      next(null, {
        src: `https://stream.mux.com/${src}`,
        type: 'application/x-mpegurl',
      });

      if (player.mux && player.mux.addHLSJS) {
        setupMuxDataTracking(player);
      }
    },
  };
});

// add videojs to the window so it can be used for other things
if(window.videojs !== typeof('function')) {
  window.videojs = videojs;
}

export default videojs;
