import videojs from 'video.js';
import 'videojs-contrib-quality-levels';
import 'videojs-http-source-selector';
import './style/index.scss';

import './tech/hlsjs';
import {setupMuxDataTracking, setupMuxDataMetadataOverride} from './utils/mux-data-middleware';
import {setupSubtitlesForPlayer} from './utils/mux-subtitles';
import {setupTimelineHoverPreviewsHelper} from './utils/mux-timelineHoverPreviews';

videojs.hook('beforesetup', function(videoEl, options) {
  // We might have Mux Data enabled, and we need to handle overriding some metadata
  options = setupMuxDataMetadataOverride(videoEl, options);

  return options;
});

videojs.hook('setup', function(player) {

  setupTimelineHoverPreviewsHelper(player);

  if (player.options().timelineHoverPreviewsUrl) {
    // we should setup timelineHoverPreviews with the URL passed in the player config options
    player.timelineHoverPreviews({enabled: true, src: player.options().timelineHoverPreviewsUrl});
  }
});

videojs.use('video/mux', (player) => {

  return {
    setSource({ src }, next) {
      const { customDomain: domain = 'mux.com', timelineHoverPreviews } = player.options();

      if (timelineHoverPreviews) {
        // strip off any playback related query string parameters, so the
        // storyboard url is not malformed
        let playbackId = src.split(`?`, 1);
        let storyboardUrl = `https://image.${domain}/${playbackId[0]}/storyboard.vtt`;
        
        player.timelineHoverPreviews({enabled: true, src: storyboardUrl});
      }

      next(null, {
        src: `https://stream.${domain}/${src}`,
        type: 'application/x-mpegurl',
      });

      if (player.mux && player.mux.addHLSJS) {
        setupMuxDataTracking(player);
      }

      if (typeof setupSubtitlesForPlayer !== 'undefined') {
        setupSubtitlesForPlayer(player);
      }
    },
  };
});

export default videojs;
