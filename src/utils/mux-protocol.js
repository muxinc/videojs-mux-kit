// This file is currently unused. Leaving it for now if we want to revisit the `mux://` protocol in the player.

export const muxRE = /mux:\/\/(\w*)\/(\w*)\/?(\w*\.\w*)?\/?(\?.*)?/i;

export function muxProtocolToUrl(src) {
  const muxSrc = muxRE.exec(src);
  if (muxSrc) {
    const [_, muxType, playbackId, filename, queryParams] = muxSrc;

    if (muxType === 'stream') {
      return `https://stream.mux.com/${playbackId}.m3u8${queryParams || ''}`;
    } else {
      return `https://${muxType}.mux.com/${playbackId}/${filename}${queryParams || ''}`
    }
  }

  return src;
}
