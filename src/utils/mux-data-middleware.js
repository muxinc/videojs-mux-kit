import 'videojs-mux';
import Hls from "hls.js";

export default function setupMuxDataTracking (player) {
  // hls.js access based on https://github.com/Peer5/videojs-contrib-hls.js/#custom-hlsjs-configuration
  // do this _very_ carefully incase something breaks - we can still monitor without these things
  if (player.tech_?.sourceHandler_?.hls) {
    const hlsjs = player.tech_.sourceHandler_.hls;
    player.mux.addHLSJS({hlsjs, Hls});
  }
}