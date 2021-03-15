/* global it, describe */
import { expect } from 'chai';
import videojs from 'video.js';

import './../src/index';

let videoElem = undefined;
let player = undefined;
let playerId = undefined;

describe('videojs-mux-kit', function () {
  beforeEach(function () {
    playerId = Math.random().toString(36).substring(2);

    videoElem = document.createElement('video');
    videoElem.id = playerId;
    videoElem.className = 'video-js vjs-16-9';
    videoElem.setAttribute('preload', 'auto');
    videoElem.setAttribute('poster', 'https://image.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/thumbnail.jpg');
    videoElem.setAttribute('data-setup', '{ "enableSourceset": true }');

    const sourceElem = document.createElement('source');
    sourceElem.src = 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe';
    sourceElem.type = 'video/mux';

    videoElem.appendChild(sourceElem);

    document.body.appendChild(videoElem);

    player = videojs(videoElem);
    player.on('sourceset', (src) => console.log(`sourceset: ${JSON.stringify(src)}`));
    // player.mux({
    //   property_key: '12345',
    //   data: {
    //     player_name: 'Awesome Player'
    //   }
    // });
  });

  it('Setting Mux source is interpreted', function () {
    const test = player.getMedia();

    // console.log(test.sourceset)

    console.log(player.currentSource());
    console.log(player.currentType());
  });
});
