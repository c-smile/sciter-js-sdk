# class Audio 

Audio represents an object that allows to play audio, e.g. mp3 files.

#### static methods:

* `Audio.load(url): Promise(audio)` - load audio file and return promise that will be resolved to Audio object. 


#### properties:

* `audio.progress`, float in range 0.0 ... 1.0 - progress of playing
* `audio.volume`, float in range 0.0 ... 1.0 - sound volume

#### methods:

* `audio.play() : Promise` - plays the sound, returns promise that will be resolved at the end of playback;
* `audio.pause()` - pauses playback;
* `audio.resume()` - resumes paused playback;

#### example: 

This code loads and plays hello phrase:

```JavaScript
async function sayHello() {
  let audio = await Audio.load(__DIR__ + "/sounds/hello.mp3");
  console.log("playing started");
  await audio.play();
  console.log("playing done");
}
```