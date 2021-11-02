import videojs from 'video.js/core';
import Hls from "hls.js";

/** Follow up to ask for error type exports on VJS */
/**
 * Errors indexed by the W3C standard. The order **CANNOT CHANGE**! See the
 * specification listed under {@link MediaError} for more information.
 *
 * @enum {array}
 * @readonly
 * @property {string} 0 - MEDIA_ERR_CUSTOM
 * @property {string} 1 - MEDIA_ERR_ABORTED
 * @property {string} 2 - MEDIA_ERR_NETWORK
 * @property {string} 3 - MEDIA_ERR_DECODE
 * @property {string} 4 - MEDIA_ERR_SRC_NOT_SUPPORTED
 * @property {string} 5 - MEDIA_ERR_ENCRYPTED
 */
const VJSErrorTypes = {
  MEDIA_ERR_CUSTOM: 0, 
  MEDIA_ERR_ABORTED: 1, 
  MEDIA_ERR_NETWORK: 2, 
  MEDIA_ERR_DECODE: 3, 
  MEDIA_ERR_SRC_NOT_SUPPORTED: 4, 
  MEDIA_ERR_ENCRYPTED: 5
};

const ErrorTypeMap = {
  [Hls.ErrorTypes.NETWORK_ERROR]: VJSErrorTypes.MEDIA_ERR_NETWORK,
  [Hls.ErrorTypes.MEDIA_ERROR]: VJSErrorTypes.MEDIA_ERR_DECODE,
  [Hls.ErrorTypes.MUX_ERROR]: VJSErrorTypes.MEDIA_ERR_DECODE,
  [Hls.ErrorTypes.KEY_SYSTEM_ERROR]: VJSErrorTypes.MEDIA_ERR_ENCRYPTED,
  DEFAULT: VJSErrorTypes.MEDIA_ERR_CUSTOM,
};

// NOTE: Since we actually want our tech to be something in between the Html5 tech and the vhs tech, we need to grab this to support the
// built in error management/pass-through from "`Tech`" (instead of assuming it will always/only be an HTMLMediaElement error, which is what the Html5 tech assumes).
const baseTechError = videojs.getTech('Tech').prototype.error;

class HlsJs {
  static hlsTypeRE = /^application\/(x-mpegURL|vnd\.apple\.mpegURL)$/i;
  static hlsExtRE = /\.m3u8/i;

  constructor(source, tech, options = {}) {
    this.source = source;
    this.tech = tech;
    // Use the base `Tech` error implementation instead of the Html5 one.
    this._html5TechError = this.tech.error;
    this.tech.error = baseTechError;
    this.el = tech.el();
    this.hls = new Hls({ ...options.hls, liveDurationInfinity: true });

    this.setupEventHandlers();
    this.setupHls();

    // Make sure we still pass along any HTMLMediaElement errors, just in case.
    this.mediaElErrorHandler_ = () => this.tech.error(this.el.error);
  }

  dispose() {
    // Remove our DIY HTML5MediaElement listener on disposal.
    this.el.removeEventListener('error', this.mediaElErrorHandler_)
    // Replace the original error method, just in case the `tech` instance is reused.
    this.tech.error = this._html5TechError;
    this.hls.destroy();
  };

  setupEventHandlers() {
    Object.values(Hls.Events).forEach((eventName) => {
      // Translate our Hls Events appropriately. Currently, we only
      // do this for hlsError events.
      if (eventName === Hls.Events.ERROR) {
        this.hls.on(eventName, (_event, hlsError) => {
          const { type } = hlsError;
          const code = ErrorTypeMap[type] ?? ErrorTypeMap.DEFAULT;
          this.tech.error({ code, hlsError });
        });
        return;
      }
      this.hls.on(eventName, (_event, data) => {
        this.tech.trigger(eventName, data);
      });
    });
    
    // Also add our DIY HTML5MediaElement listener on setup.
    this.el.addEventListener('error', this.mediaElErrorHandler_);
  }

  setupHls() {
    if (Hls.isSupported()) {
      this.hls.attachMedia(this.el);
      this.hls.loadSource(this.source.src);
    } else if (this.el.canPlayType('application/vnd.apple.mpegurl')) {
      this.el.src = this.source.src;
    } else {
      console.log('[videojs-mux-kit] Error: browser does not support MSE nor Hls natively');
    }
  }
}

const sourceHandler = {
  canHandleSource(source) {
    if (source.skipHlsJs) {
      return "";
    } else if (HlsJs.hlsTypeRE.test(source.type)) {
      return "probably";
    } else if (HlsJs.hlsExtRE.test(source.src)) {
      return "maybe";
    } else {
      return "";
    }
  },

  handleSource(source, tech) {
    return new HlsJs(source, tech);
  },

  canPlayType(type) {
    if (HlsJs.hlsTypeRE.test(type)) {
      return "probably";
    }

    return "";
  },
};

videojs.getTech('Html5').registerSourceHandler(sourceHandler, 0);

export default HlsJs;
