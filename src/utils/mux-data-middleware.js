import 'videojs-mux';
var assign = require('lodash/assign');

export default function setupMuxDataTracking (player) {
  let options = player.options().muxData;
  
  // hls.js access based on https://github.com/Peer5/videojs-contrib-hls.js/#custom-hlsjs-configuration
  // do this _very_ carefully incase something breaks - we can still monitor without these things
  if (player.tech_ !== undefined && player.tech_.sourceHandler_ !== undefined && player.tech_.sourceHandler_.hls !== undefined && player.tech_.sourceHandler_.Hls !== undefined) {
    const hlsjsRef = {
      hlsjs: player.tech_.sourceHandler_.hls,
      Hls: player.tech_.sourceHandler_.Hls
    };
    // combine it with what the user passed to us
    options = assign(player.options().muxData, hlsjsRef);
  }

  // finally, override some metadata so we can identify this player easily
  options.data['player_software'] = "VideoJS Mux Kit";
  options.data['player_software_version'] = "0.0.1"; // we should get this dynamically

  // start monitoring with videojs-mux
  return player.mux(options);
}
