import videojs from 'video.js/core';
import 'videojs-mux';
import './plugins/vtt-thumbnails.js';

import { HlsSourceHandler } from './mux-tech.js';

videojs.getTech('Html5').registerSourceHandler(HlsSourceHandler, 0);

videojs.use('video/mux', player => {
  return {
    setSource(srcObj, next) {
      const playbackId = srcObj.src;

      player.vttThumbnails({
        src: `https://image.mux.com/${playbackId}/storyboard.vtt`,
      });

      next(null, {
        src: `https://stream.mux.com/${playbackId}`,
        type: 'application/x-mpegurl',
      });
    }
  }
});

export default videojs;
