import Hls from "hls.js";

import {muxRE, muxProtocolToUrl} from './mux-protocol';

function Html5HlsJS(source, tech) {
  const options = tech.options_;
  const el = tech.el();
  let duration = null;
  const hls = (this.hls = new Hls(options.hlsjsConfig));

  function errorHandlerFactory() {
    const _recoverDecodingErrorDate = null;
    const _recoverAudioCodecErrorDate = null;

    return function () {
      const now = Date.now();

      if (
        !_recoverDecodingErrorDate ||
        now - _recoverDecodingErrorDate > 2000
      ) {
        _recoverDecodingErrorDate = now;
        hls.recoverMediaError();
      } else if (
        !_recoverAudioCodecErrorDate ||
        now - _recoverAudioCodecErrorDate > 2000
      ) {
        _recoverAudioCodecErrorDate = now;
        hls.swapAudioCodec();
        hls.recoverMediaError();
      } else {
        console.error("Error loading media: File could not be played");
      }
    };
  }

  // create separate error handlers for hlsjs and the video tag
  const hlsjsErrorHandler = errorHandlerFactory();
  const videoTagErrorHandler = errorHandlerFactory();

  // listen to error events coming from the video tag
  el.addEventListener("error", function (e) {
    const mediaError = e.currentTarget.error;

    if (mediaError.code === mediaError.MEDIA_ERR_DECODE) {
      videoTagErrorHandler();
    } else {
      console.error("Error loading media: File could not be played");
    }
  });

  /**
   * Destroys the Hls instance
   */
  this.dispose = function () {
    hls.destroy();
  };

  /**
   * returns the duration of the stream, or Infinity if live video
   * @returns {Infinity|number}
   */
  this.duration = function () {
    return duration || el.duration || 0;
  };

  // update live status on level load
  hls.on(Hls.Events.LEVEL_LOADED, function (event, data) {
    duration = data.details.live ? Infinity : data.details.totalduration;
  });

  // try to recover on fatal errors
  hls.on(Hls.Events.ERROR, function (event, data) {
    if (data.fatal) {
      switch (data.type) {
        case Hls.ErrorTypes.NETWORK_ERROR:
          hls.startLoad();
          break;
        case Hls.ErrorTypes.MEDIA_ERROR:
          hlsjsErrorHandler();
          break;
        default:
          console.error("Error loading media: File could not be played");
          break;
      }
    }
  });

  Object.keys(Hls.Events).forEach(function (key) {
    const eventName = Hls.Events[key];
    hls.on(eventName, function (event, data) {
      tech.trigger(eventName, data);
    });
  });

  // Intercept native TextTrack calls and route to video.js directly only
  // if native text tracks are not supported on this browser.
  if (!tech.featuresNativeTextTracks) {
    Object.defineProperty(el, "textTracks", {
      value: tech.textTracks,
      writable: false,
    });
    el.addTextTrack = function () {
      return tech.addTextTrack.apply(tech, arguments);
    };
  }

  // attach hlsjs to videotag
  hls.attachMedia(el);
  hls.loadSource(source.src);
}

const hlsTypeRE = /^application\/(x-mpegURL|vnd\.apple\.mpegURL)$/i;
const hlsExtRE = /\.m3u8/i;

const HlsSourceHandler = {
  canHandleSource: function (source) {
    if (source.skipContribHlsJs) {
      return "";
    } else if (muxRE.test(source.src)) {
      return "probably";
    } else if (hlsTypeRE.test(source.type)) {
      return "probably";
    } else if (hlsExtRE.test(source.src)) {
      return "maybe";
    } else {
      return "";
    }
  },
  handleSource: function (source, tech) {
    const src = muxProtocolToUrl(source.src);

    source.src = src;

    return new Html5HlsJS(source, tech);
  },
  canPlayType: function (type) {
    if (hlsTypeRE.test(type)) {
      return "probably";
    }

    return "";
  },
};

export default Html5HlsJS;
export { HlsSourceHandler };
