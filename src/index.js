import videojs from 'video.js/core';

import './style/index.scss';

import './plugins/vtt-thumbnails.js';
import './tech/hlsjs';
import {setupMuxDataTracking, setupMuxDataMetadataOverride} from './utils/mux-data-middleware';
import {setupSubtitlesForPlayer} from './utils/mux-subtitles';

let vttThumbnailsInitialized = false;

videojs.hook('beforesetup', function(videoEl, options) {
  // We might have Mux Data enabled, and we need to handle overriding some metadata
  options = setupMuxDataMetadataOverride(videoEl, options);

  return options;
});

videojs.use('video/mux', (player) => {
  return {
    setSource({ src }, next) {

      if (player.options().timelineHoverPreviews) {
        // strip off any playback related query string parameters, so the
        // storyboard url is not malformed
        let playbackId = src.split(`?`, 1);
        let storyboardUrl = `https://image.mux.com/${playbackId[0]}/storyboard.vtt`;

        if (player.options().timelineHoverPreviews.token) {
          // append the token to the storyboard request, if a token is provided
          storyboardUrl = storyboardUrl + `?token=` + player.options().timelineHoverPreviews.token;
        }
        
        if (!vttThumbnailsInitialized) {
          // this is the first time the video is loaded, so setup the plugin
          player.vttThumbnails({src: storyboardUrl});
          vttThumbnailsInitialized = true;
        } else {
          // we already have a vttThumbnails plugin running, so just update the src
          player.vttThumbnails.src(storyboardUrl);
        }
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
