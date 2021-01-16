import videojs from "video.js/core";
import { HlsSourceHandler } from "./hlsjs-tech.js";

var html5Tech = videojs.getTech && videojs.getTech("Html5");
html5Tech =
  html5Tech || (videojs.getComponent && videojs.getComponent("Html5"));

if (html5Tech) {
  html5Tech.registerSourceHandler(HlsSourceHandler, 0);
}

export default videojs;
