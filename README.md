# Video.js + Mux Kit

The Video.js you know and love but optimized for using with Mux. The base is slimmed down a bit, then there are a few plugins included, namely Mux Data, and uses hls.js as the HLS playback engine. This is due to some issues we've seen with the default Video.js playback engine and Mux streams.

## Installation

```
// npm
npm install @mux/videojs-kit

// yarn
yarn add @mux/videojs-kit  
```

## Usage

_In the below examples, replace the `src` attribute example to reflect the playback ID of your chosing._

Import the javascript and css in your application like this:

```js
// include the video.js kit javascript and css
import videojs from '@mux/videojs-kit';
import '@mux/videojs-kit/dist/index.css';  
```

Then, on your page include a <video> element where you want to add your player.

```html
<video
  id="mux-default"
  class="video-js vjs-16-9"
  controls
  preload="auto"
  width="100%"
  poster="https://image.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/thumbnail.jpg"
  data-setup='{
    "plugins": {
      "mux": {
        "timelineHoverPreviews": true,
        "data": {
          "env_key": "ENV_KEY",
          "video_title": "My Great Video"
        }
      }
    }
  }'
>
  <source src="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe" type="video/mux" />
</video>
```

Of course, you can also initialize all of this via JS as well:

```html
<video
  id="mux-default"
  class="video-js vjs-16-9"
  controls
  preload="auto"
  width="100%"
  poster="https://image.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/thumbnail.jpg"
  data-setup='{}'
/>

<script type="text/javascript">
  const player = videojs.default('mux-default', {
    "plugins": {
      "mux": {
        "timelineHoverPreviews": true,
        "data": {
          "env_key": "ENV_KEY",
          "video_title": "My Great Video"
        }
      }
    }
  });

  player.src({ type: 'video/mux', src: 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe' });
</script>
```

Also, the [demos](./src/demo) are a great place to more references! In general, you can expect this to work almost exactly like Video.js + Mux Data with a few extra niceties. Mux streams can be specified by simply including the playback ID as the `src`, and `video/mux` as the type.
