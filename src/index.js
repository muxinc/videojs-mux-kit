import videojs from 'video.js/core';

import './style/index.scss';

import './plugins/vtt-thumbnails.js';
import './tech/hlsjs';
import {setupMuxDataTracking, setupMuxDataMetadataOverride} from './utils/mux-data-middleware';
import {setupSubtitlesForPlayer} from './utils/mux-subtitles';

videojs.hook('beforesetup', function(videoEl, options) {
  // We might have Mux Data enabled, and we need to handle overriding some metadata
  options = setupMuxDataMetadataOverride(videoEl, options);

  return options;
});

videojs.use('video/mux', (player) => {
  return {
    setSource({ src }, next) {

      if (player.options().timelineHoverPreviews) {
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

      setupSubtitlesForPlayer(player);
      
    },
  };
});

export default videojs;
