import Hls from 'hls.js';

function setupSubtitlesForPlayer(player) {
  player.tech_?.sourceHandler_?.hls.on(Hls.Events.MANIFEST_LOADED, function (_event, data) {
    // setup any subtitles which are present from the manifest
    if (data.subtitles) {
      let i;
      for (i = 0; i < data.subtitles.length; i++) {
        // TO DO: update hls.js version when https://github.com/video-dev/hls.js/issues/2472
        // is closed, to correctly address cc vs subs kinds
        player.addRemoteTextTrack({
          kind: data.subtitles[i].type,
          label: data.subtitles[i].name,
          srclang: data.subtitles[i].lang,
          default: data.subtitles[i].default
        }, false);
      }
    }
  });

  player.remoteTextTracks().addEventListener('change', (_event) => {
    let tracks = player.remoteTextTracks();
    let i;
    let trackChanged = false;
    
    for (i = 0; i < tracks.length; i++) {
      if (tracks[i].mode === 'showing') {
        // this is the currently selected subtitle we should show
        player.tech_.sourceHandler_.hls.subtitleTrack = i;
        trackChanged = true;
      }
    }
    if (trackChanged !== true) {
      // No subtitles are showing, so switch everything off
      player.tech_.sourceHandler_.hls.subtitleTrack = -1;
    }
  });
}

export { setupSubtitlesForPlayer }
