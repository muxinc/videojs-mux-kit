# Video.js + Mux Kit

## Testing considerations

`esbuild` does not currently support build targets for "es5" which means that Internet Explorer 11 (and below) will not work.  For this reason and the reason that IE 11 will be EOL August 17, 2021, we've decided not to support IE 11.
