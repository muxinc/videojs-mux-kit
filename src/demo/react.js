import "@mux/videojs-kit";
import "@mux/videojs-kit/dist/index.css";

function App() {
  return (
    <div className="videojs-mux-div">
      <video
        id="mux-default"
        className="video-js vjs-16-9"
        controls
        preload="auto"
        width="100%"
        poster="https://image.mux.com/{PLAYBACK_ID}/thumbnail.jpg"
        data-setup='{
          "timelineHoverPreviews": true,
          "plugins": {
            "mux": {
              "data": {
                "env_key": "{ENV_KEY}",
                "video_title": "videojs-mux"
              }
            }
          }
        }'
      >
        <source
          src="{PLAYBACK_ID}"
          type="video/mux"
        />
      </video>
    </div>
  );
}

export default App;
