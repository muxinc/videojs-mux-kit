import '../plugins/vtt-thumbnails.js';

function setupTimelineHoverPreviewsHelper(player) {

  player.timelineHoverPreviews = function(options) {

    let enabled = options?.enabled || false;
    let source = options?.src || null;
  
    if (!enabled && typeof(player.vttThumbnails.detach) === 'function') {
      // if timelineHoverPreviews were enabled, remove them
      player.vttThumbnails.detach();
      player.options().timelineHoverPreviewsUrl = null;
      return;
  
    } else if (typeof(player.vttThumbnails) === 'function' && source !== null) {
      // if this is the first time the player instance has a timelineHoverPreviews source,
      // init the plugin with the source
      player.vttThumbnails({src: source});
      player.options().timelineHoverPreviewsUrl = source;
      return;
  
    } else if (typeof(player.vttThumbnails.src) === 'function'&& source !== null) {
      // the plugin is already running, so just update to the new source
      player.vttThumbnails.src(source);
      player.options().timelineHoverPreviewsUrl = source;
      return;
  
    }
  }

}

export { setupTimelineHoverPreviewsHelper }
