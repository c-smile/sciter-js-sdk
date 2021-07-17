### DOM and Runtime implementation status

#### global methods

* `console.log(...)`
* `console.warn(...)`
* `console.error(...)`

* #### `setTimeout(func,milliseconds)`

* #### `clearTimeout(tid)`

* #### `setInterval(func,milliseconds)`

* #### `clearInterval(iid)`

* #### `requestAnimationFrame(func): aid`

* #### `cancelAnimationFrame(aid)`

* #### `fetch()` - [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

  Fetch can also be used synchronously as follow
  `fetch(..., {sync: true})`

* #### `getComputedStyle(element[, pseudoEl]): Style`

* #### `printf(format:string, ...):string` 
  
  The function does formatting of arguments using C-style [printf conventions](https://en.cppreference.com/w/cpp/io/c/fprintf).
  
  Returns formatted string.

  In Sciter list of standard formatting types is extended by these two: 

  * `%v` - takes argument and prints it as `JSON.stringify(arg)`;
  * `%V` - takes argument and prints it as `JSON.stringify(arg, null, "  ")`;

* #### `scanf(format:string, input: string) : [...]`

  Takes *input* string and parses it according the *format* specification using C-style [scanf conventions](https://en.cppreference.com/w/c/io/fscanf). Returns list (array) of successfully parsed values. 

* #### `encode(text: string, encoding: string="utf-8") : ArrayBuffer` 

  Encodes text to sequence of bytes (ArrayBuffer). 

  _ encoding_ is [IANA encoding](https://www.iana.org/assignments/character-sets/character-sets.xhtml) identifier 

* #### `decode(buffer: ArrayBuffer, encoding: string) : string`

  Decodes sequence of bytes of buffer to string.

* #### `btoa(buffer: ArrayBuffer) : string`

  Produces Base64 string from binary data. 

* #### `atob(base64: string) : ArrayBuffer`

  Restores binary data from Base64 encoded string.  

## global properties

* #### `globalThis` - object, global namespace, aliased as `window` for compatibility with browsers.

* #### `devicePixelRatio` - float, number of physical screen pixels in logical CSS px (dip).

## Standard DOM objects

* [Document](Document.md)
* [Element](Element.md)
* [Node](Node.md): [Text](Node.md#Text) and [Comment](Node.md#Comment)
* [Event](Event.md)
* [Graphics](graphics/README.md) 2D graphics and associated classes.

## Sciter specific objects

* [Window](Window.md) - desktop window defined by HTML loaded in it. 
* [Audio](Audio.md) - audio playback. 

## Sciter specific modules

* [@sciter](module-sciter.md) - Sciter's general methods.
* [@sys](module-sys.md) - System, File system and communication primitives (close to Node.JS runtime).
* [@env](module-env.md) - Running environment primitives.
* [@storage](storage/README.md) - Persistent storage - NoSQL DB built into JS runtime.
* [@bjson](module-bjson.md) - "binary JSON".
* [@debug](module-debug.md)

