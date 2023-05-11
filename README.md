# Video.js + Mux Kit

The Video.js you know and love but optimized for using with Mux. The base is slimmed down a bit, then there are a few plugins included, namely Mux Data, and uses hls.js as the HLS playback engine. This is due to some issues we've seen with the default Video.js playback engine and Mux streams.

This project is now also set up to allow usage with Video.js's playback engine [VHS (Video.js HTTP Streaming)](https://github.com/videojs/http-streaming). See how to include that in your project below.

## Installation

```
// npm
npm install @mux/videojs-kit

// yarn
yarn add @mux/videojs-kit
```

If you don't use a package manager such as NPM, there are hosted versions provided by [unpkg.com](https://unpkg.com) too.

## Including videojs-mux-kit in your project

### Importing

If you use a package manager such as NPM, import the JavaScript and CSS in your application like this:

#### Default (hls.js)
```js
// include the video.js kit javascript and css
import videojs from '@mux/videojs-kit';
import '@mux/videojs-kit/dist/index.css';  
```

#### VHS
```js
// include the video.js kit javascript and css
import videojs from '@mux/videojs-kit/dist/index.vhs.js';
import '@mux/videojs-kit/dist/index.css';
```

### `<script>` tags

If you'd rather use the hosted versions, include this in your HTML page:

#### Default (hls.js)
```js
// script tags
<script src="https://unpkg.com/@mux/videojs-kit@0.12.0/dist/index.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@mux/videojs-kit@0.12.0/dist/index.css">
```

#### VHS
```js
// script tags
<script src="https://unpkg.com/@mux/videojs-kit@0.12.0/dist/index.vhs.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@mux/videojs-kit@0.12.0/dist/index.css">
```

## Usage

_In the below examples, replace the `src` attribute example to reflect the playback ID of your choosing._


Then, on your page include a `<video>` element where you want to add your player.

```html
<video
  id="mux-default"
  class="video-js vjs-16-9"
  controls
  preload="auto"
  width="100%"
  poster="https://image.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/thumbnail.jpg"
  data-setup='{
    "timelineHoverPreviews": true,
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

Of course, you can also initialize all of this via JS as well:

```html
<video
  id="mux-default"
  class="video-js vjs-16-9"
  controls
  preload="auto"
  width="100%"
  poster="https://image.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/thumbnail.jpg"
/>

<script type="text/javascript">
  const player = videojs('mux-default', {
    "timelineHoverPreviews": true,
    "plugins": {
      "mux": {
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

### Quality Levels

A plugin for [a quality levels menu](https://github.com/jfujita/videojs-http-source-selector) is now included by default, however, it is not enabled by default.
To enable quality levels, you'll want to either specify it in the `plugins` object, like above, or call the method directly on the player:
```html
<video
  id="mux-default"
  class="video-js vjs-16-9"
  controls
  preload="auto"
  width="100%"
  poster="https://image.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/thumbnail.jpg"
  data-setup='{
    "timelineHoverPreviews": true,
    "plugins": {
      "mux": {
        "data": {
          "env_key": "ENV_KEY",
          "video_title": "My Great Video"
        }
      },
      "httpSourceSelector": {}
    }
  }'
>
  <source src="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe" type="video/mux" />
</video>
```

```js
const player = videojs.getPlayer('mux-default');
player.httpSourceSelector();
```

### Custom Domains

By default, all Mux Video assets will be hosted on mux.com. This includes things like posters, storyboards, and media sources.

[Custom Domains](https://www.mux.com/blog/introducing-custom-domains?_gl=1*h19ho7*_ga*MTQ2MTY1MjY5My4xNjc0MjU0OTYy*_ga_D3BFYPQXX7*MTY4MzgzNzcwOC42NC4wLjE2ODM4Mzc3MTQuMC4wLjA.), is a feature which allows you to stream these assets from a domain of your choice.

Once you have your custom domain set up, provide it via the `customDomain` property. If your custom domain is `media.example.com` then internally `videojs-mux-kit` will take that value and expand it to `image.media.example.com` for images and `stream.media.example.com` for video.  The only exception is the `poster` property in which you will need to provide the fully qualified url.

Example with the HTML element:

```html
<video id="mux-custom-domain" class="video-js vjs-16-9" controls preload="auto"
  poster="https://image.media.heymux.com/Kn00wAAUmt3MPOeFlmuAeS4qSIW41v5Ixg5fQ00YuCX400/thumbnail.jpg" data-setup='{
    "customDomain": "media.heymux.com",
    "timelineHoverPreviews": true
  }'
>
  <source src="Kn00wAAUmt3MPOeFlmuAeS4qSIW41v5Ixg5fQ00YuCX400" type="video/mux" />
</video>
```

## I'm importing another plugin but it isn't available when I test in the browser

This is because most Video.js plugins depend directly on Video.js but by default Video.js Mux Kit uses hls.js by default and to maintain a smaller file-size we use Video.js's `core` build which excludes VHS. You shouldn't need to do this if you're using the [VHS build](#vhs)

This means that the Video.js that is used by Video.js Mux Kit references `video.js/core` instead of `video.js`. To get plugins to work, you'll need to make sure that plugins are also loading in `video.js/core` instead of only `video.js`. Most bundlers have some way of configuring these type of aliases.

For webpack, you can use [the `resolve` configuration option](https://webpack.js.org/configuration/resolve/):
```js
config.resolve = {
  alias: {
    'video.js': 'video.js/core',
  }
};
```
> This is how Video.js Mux Kit builds out the hls.js and VHS builds internally, see [our webpack config](./webpack.common.js).

For rollup, you'll want to grab their [alias plugin](https://github.com/rollup/plugins/tree/master/packages/alias), and then configure it into the plugins array like so:
```js
module.exports = {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [
    alias({
      entries: [
        { find: 'video.js', replacement: require.resolve('video.js/core') }
      ]
    })
  ]
};
```

## Demos

Also, the [demos](https://github.com/muxinc/videojs-mux-kit/tree/main/src/demo) are a great place to more references! In general, you can expect this to work almost exactly like Video.js + Mux Data with a few extra niceties. Mux streams can be specified by simply including the playback ID as the `src`, and `video/mux` as the type.

To run the demos, you can run `npm run dev` or `npm run dev:vhs` for running with VHS.
Once the dev server is running, open `http://localhost:8080/{file}` with `{file}` being one the demos like `basic.html` or `data.html`.
