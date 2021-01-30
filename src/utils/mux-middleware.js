import videojs from 'video.js/core';

videojs.use('video/mux', player => {
  return {
    setSource({ src }, next) {
      // player.vttThumbnails({
      //   src: `https://image.mux.com/${playbackId}/storyboard.vtt`,
      // });

      next(null, {
        src: `https://stream.mux.com/${src}`,
        type: 'application/x-mpegurl',
      });
    }
  }
});
