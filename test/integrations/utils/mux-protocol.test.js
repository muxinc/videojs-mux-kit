/* global it, describe */
const { expect } = require('chai');

const { muxProtocolToUrl } = require('./../../../src/utils/mux-protocol');

describe('mux-protocol util', function () {
  it('muxType of stream without query parameters', function () {
    const playbackId = 'someCoolPlaybackId';
    const result = muxProtocolToUrl(`mux://stream/${playbackId}/file.ext`);

    expect(result).to.equal(`https://stream.mux.com/${playbackId}.m3u8`);
  });

  it('muxType of stream with query parameters', function () {
    const playbackId = 'someCoolPlaybackId';
    const queryString = '?query=ex';
    const result = muxProtocolToUrl(`mux://stream/${playbackId}/file.ext${queryString}`);

    expect(result).to.equal(`https://stream.mux.com/${playbackId}.m3u8${queryString}`);
  });

  it('muxType of image without query parameters', function () {
    const playbackId = 'someCoolPlaybackId';
    const filename = 'file.ext';
    const result = muxProtocolToUrl(`mux://image/${playbackId}/${filename}`);

    expect(result).to.equal(`https://image.mux.com/${playbackId}/${filename}`);
  });

  it('muxType of image with query parameters', function () {
    const playbackId = 'someCoolPlaybackId';
    const filename = 'file.ext';
    const queryString = '?query=ex';
    const result = muxProtocolToUrl(`mux://image/${playbackId}/${filename}${queryString}`);

    expect(result).to.equal(`https://image.mux.com/${playbackId}/${filename}${queryString}`);
  });
});
