import videojs from 'video.js/core';

import './style/index.scss';

import './plugins/vtt-thumbnails.js';
import './tech/hlsjs';
import {setupMuxDataTracking, setupMuxDataMetadataOverride} from './utils/mux-data-middleware';

videojs.hook('beforesetup', function(videoEl, options) {
  // We might have Mux Data enabled, and we need to handle overriding some metadata
  options = setupMuxDataMetadataOverride(videoEl, options);

  return options;
});

videojs.use('video/mux', (player) => {
  return {
    setSource({ src }, next) {

      if (player.options().timelineHoverPreviews) {
        let storyboardUrl = `https://image.mux.com/${src}/storyboard.vtt`;
        
        // check if we have a storyboard token to use with signed playback URLs
        if (player.options().timelineHoverPreviews.token) {
          storyboardUrl = storyboardUrl + `?token=` + player.options().timelineHoverPreviews.token;
        }

        player.vttThumbnails({
          src: storyboardUrl,
        });
      }

      let playbackUrl = `https://stream.mux.com/${src}`;
      
      // check if we have a video token to use with signed playback URLs
      if (player.options().playbackToken) {
        playbackUrl = playbackUrl + `?token=` + player.options().playbackToken;
      }
      
      next(null, {
        src: playbackUrl,
        type: 'application/x-mpegurl',
      });

      if (player.mux && player.mux.addHLSJS) {
        setupMuxDataTracking(player);
      }
    },
  };
});

export default videojs;
