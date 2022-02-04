import videojs from 'video.js';
import pkg from '../../package.json';
import 'videojs-mux';
import Hls from "hls.js";

function setupMuxDataTracking (player) {
  // hls.js access based on https://github.com/Peer5/videojs-contrib-hls.js/#custom-hlsjs-configuration
  // do this _very_ carefully incase something breaks - we can still monitor without these things
  if (player.tech_?.sourceHandler_?.hls) {
    const hlsjs = player.tech_.sourceHandler_.hls;
    player.mux.addHLSJS({hlsjs, Hls});
  }
}

function setupMuxDataMetadataOverride (videoEl, options) {
  // depending which way Mux Data is init'd, we have to inject metadata in different ways
  // we'll start with if we get init'd on the data-setup element
  if (videoEl?.dataset?.setup) {
    let setup = videoEl.dataset.setup;
    setup = JSON.parse(setup);
    if (setup && setup?.plugins?.mux?.data) {
      // Mux data was configured on the video element
      setup = injectMuxDataMetadata(setup);
      setup = JSON.stringify(setup);
      videoEl.dataset.setup = setup;
    }
  }
  
  // the other way is if we init via JS, which comes through here instead
  if (options?.plugins?.mux?.data) {
    // Mux data was configured through JS
    options = injectMuxDataMetadata(options);
  }

  return options;
}

function injectMuxDataMetadata (options) {
  // The default build includes Hls and it's a function, in the VHS build Hls.js is excluded and it's an empty object
  options.plugins.mux.data["player_software_name"] = "vjs-mux-kit-" + videojs?.VERSION.split('.')[0] + (typeof Hls === 'function' ? '-hlsjs' : '-vhs');
  options.plugins.mux.data["player_software_version"] = pkg.version;
  
  return options;
}

export {setupMuxDataTracking, setupMuxDataMetadataOverride}
