# behavior: video

This behavior provides video playback.

## Elements

that have this behavior applied by default to:

* `<video>` - the video element;

## Attributes

this behavior knows about:

* `src` - string, url of the movie. If provided the behavior will start playing the movie immediately after loading.
* `sizing` - string, either:  "*cover*" or "*contain*" (default). 
  
  Frame box sizing modes:

  * *contain* - video frame always seen in full, 
  * *cover* - frame always covers content box in full, some parts of the frame can be clipped out.

## Properties

* #### `video.isPlaying` 
  
  read-only, boolean, reports playback status. If *true* then video is playing at the moment.

* #### `video.isEnded` 
  
  read-only, boolean, *true* if video playback has reached the end of the movie.

* #### `video.duration` 
   
  read-only, float, reports duration in seconds of the movie. If duration is not available it returns 0.

* #### `video.position`
  
  read/write, float, reports current playback position, in seconds. Sets current playback position, in seconds.

* #### `video.height`,`video.width`
 
  read-only, integer, screen pixels. Reports natural width and height of video frame of the movie.

* #### `video.renderingBox` 

  read-only, `[x,y,width,height]`, reports video box rectangle in pixels relative to the content box of the element. Note if *sizing* attribute is "cover" then either *x* or *y* can be negative.

* #### `video.audioVolume` 
 
  read/write, float (0.0...1.0). Current volume level of audio track. 1.0 correspond to 0db, 0.0 (mute) -100db.

* #### `video.audioBalance` 
 
  read/write, float ( -1.0 ... +1.0  ). Current stereo balance.

## Methods

* #### `video.load(movieUrl : string) : true | false`

  Loads video file into the player. It does not start playback automatically.

* #### `video.unload()`

  Stops video playback and unloads the movie.

* #### `video.play()`
  
  Starts playback at current *position* 

* #### `video.stop()`

  stops playback.


## Events

Besides of the standard set of events (mouse, keyboard, focus) *behavior:video* generates following behavior events:

* `"ready"` - the video has been loaded successfully and video.width/height and video.duration are available.
* `"start"` - the video just started, first frame rendered.
* `"stop"`  - the video has stopped.

## Value

N/A, the behavior does not implement value concept