import videojs from 'video.js/core';
import Hls from "hls.js";

class HlsJs {
  static hlsTypeRE = /^application\/(x-mpegURL|vnd\.apple\.mpegURL)$/i;
  static hlsExtRE = /\.m3u8/i;

  constructor(source, tech, options = {}) {
    this.source = source;
    this.tech = tech;
    this.el = tech.el();
    this.hls = new Hls({ ...options.hls, liveDurationInfinity: true });

    this.setupEventHandlers();
    this.setupHls();
  }

  dispose() {
    this.hls.destroy();
  };

  setupEventHandlers() {
    Object.keys(Hls.Events).forEach((key) => {
      const eventName = Hls.Events[key];
      this.hls.on(eventName, (event, data) => {
        this.tech.trigger(eventName, data);
      });
    });
  }

  setupHls() {
    if (this.el.canPlayType('application/vnd.apple.mpegurl') && videojs.browser.IS_ANY_SAFARI) {
      // We're using Safari (or another apple component like WKWebView), so let's 
      // stick with the native HLS engine
      // Other browsers such as IE edge do have native support, but generally 
      // it's not perfect, so let those fall through to use HLS.js instead
      this.el.src = this.source.src;

      // Check if HLS.js is supported
    } else if (Hls.isSupported()) {
      this.hls.attachMedia(this.el);
      this.hls.loadSource(this.source.src);
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
