# Video.js + Mux Kit

The Video.js you know and love but optimized for using with Mux. The base is slimmed down a bit, then there are a few plugins included, namely Mux Data, and uses hls.js as the HLS playback engine. This is due to some issues we've seen with the default Video.js playback engine and Mux streams.

## Usage

The [demos](./demo/basic.html) are a great place to start! In general, you can expect this to work almost exactly like Video.js + Mux Data with a few extra niceties. Mux streams can be specified by simply including the playback ID as the `src`, and `video/mux` as the type. Your source will then look like:

```html
<source src="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe" type="video/mux" />
```

A full example, including Mux Data configuration:

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

Of course, you can also initialize all of this via JS as well. If you want to include the thumbnail scrubber, include `timelineHoverPreviews: true` in your Video.js configuration
