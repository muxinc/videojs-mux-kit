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

videojs.hook('setup', function(player) {
  
  player.timelineHoverPreviews = function(enabled=false, source=null) {

    if (!enabled && vttThumbnailsInitialized) {
      // if timelineHoverPreviews were enabled, remove them
      player.vttThumbnails.detach();
      player.options().timelineHoverPreviewsUrl = null;
      return;

    } else if (!vttThumbnailsInitialized && source !== null) {
      // if this is the first time the player instance has a timelineHoverPreviews source,
      // init the plugin with the source
      player.vttThumbnails({src: source});
      vttThumbnailsInitialized = true;
      player.options().timelineHoverPreviewsUrl = source;
      return;

    } else if (vttThumbnailsInitialized && source !== null) {
      // the plugin is already running, so just update to the new source
      player.vttThumbnails.src(source);
      player.options().timelineHoverPreviewsUrl = source;
      return;

    }
  }

  if (player.options().timelineHoverPreviewsUrl) {
    // we should setup timelineHoverPreviews with the URL passed in the player config options
    player.timelineHoverPreviews(true, player.options().timelineHoverPreviewsUrl);
  }
});

videojs.use('video/mux', (player) => {
  return {
    setSource({ src }, next) {

      if (player.options().timelineHoverPreviews) {
        // strip off any playback related query string parameters, so the
        // storyboard url is not malformed
        let playbackId = src.split(`?`, 1);
        let storyboardUrl = `https://image.mux.com/${playbackId[0]}/storyboard.vtt`;
        
        player.timelineHoverPreviews(true, storyboardUrl);
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
