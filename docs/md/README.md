# DOM and Runtime implementation status

## global methods

* `console.log(...)`
* `console.warn(...)`
* `console.error(...)`

* #### `setTimeout(func,milliseconds)`

* #### `clearTimeout(tid)`

* #### `setInterval(func,milliseconds)`

* #### `clearInterval(iid)`

* #### `requestAnimationFrame(func): aid`

* #### `cancelAnimationFrame(aid)`

* #### `fetch(url:string [, options:object]): Response` - [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

  Sciter's extras:

  * `options.sync: boolean` - when set to _true_ fetch performs synchronous data retrieval. Synchronous fetch is useful to 
    get local data - local file or resource content.
  * `options.downloadProgress: function(fetched:integer, total:integer)` - callback function to be called on download progress. Note: _total_ argument can be zero if server does not provide "Content-Length" info.  
  * fetch API uses either HTTP client to get remote files or OS API for local files. In the first case return values are HTTP response codes, while in the second case error codes are coming from OS.

* #### `getComputedStyle(element[, pseudoEl]): Style`

* #### `printf(format:string, ...):string` 
  
  The function does formatting of arguments using C-style [printf conventions](https://en.cppreference.com/w/cpp/io/c/fprintf).
  
  Returns formatted string.

  In Sciter list of standard formatting types is extended by these two: 

  * `%v` - takes argument and prints it as `JSON.stringify(arg)`;
  * `%V` - takes argument and prints it as `JSON.stringify(arg, null, "  ")`;

* #### `scanf(format:string, input: string) : [...]`

  Takes *input* string and parses it according the *format* specification using C-style [scanf conventions](https://en.cppreference.com/w/c/io/fscanf). Returns list (array) of successfully parsed values. 

## JSON

* #### `JSON.parse(text, [reviver:function]): JSON` Parses a JSON string, constructing the value or object described by the string. An optional reviver function can be provided to perform a transformation on the resulting object before it is returned.

* #### `JSON.stringify(object, [replacer:function], [indent:string])` Converts a JavaScript object or value to a JSON string, optionally replacing values if a replacer function is specified or optionally including only the specified properties if a replacer array is specified.

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

