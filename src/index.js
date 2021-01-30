import videojs from 'video.js/core';
import 'videojs-mux';

import './utils/mux-middleware';
import './tech/hlsjs';

videojs.use('video/mux', player => {
  return {
    setSource({ src }, next) {
      next(null, {
        src: `https://stream.mux.com/${src}`,
        type: 'application/x-mpegurl',
      });
    }
  }
});


export default videojs;
