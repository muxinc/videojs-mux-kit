import videojs from 'video.js/core';
import 'videojs-mux';
import Hls from "hls.js";
import assign from 'lodash/assign';

export default function setupMuxDataTracking (player) {
  let options = player.options().muxData;
  
  // hls.js access based on https://github.com/Peer5/videojs-contrib-hls.js/#custom-hlsjs-configuration
  // do this _very_ carefully incase something breaks - we can still monitor without these things
  if (player.tech_ !== undefined && player.tech_.sourceHandler_ !== undefined && player.tech_.sourceHandler_.hls !== undefined) {
    const hlsjsRef = {
      hlsjs: player.tech_.sourceHandler_.hls,
      Hls: Hls
    };
    // combine it with what the user passed to us
    options = assign(player.options().muxData, hlsjsRef);
  }

  // finally, override some metadata so we can identify this player easily
  const videojsMajorVersion = videojs.VERSION.split('.')[0];

  options.data['player_software_name'] = 'vjs-mux-kit-' + videojsMajorVersion;
  options.data['player_software_version'] = package_version;

  // start monitoring with videojs-mux
  return player.mux(options);
}
