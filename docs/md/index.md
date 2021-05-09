### DOM and Runtime implementation status

#### global methods

* `console.log(...)`
* `console.warn(...)`
* `console.error(...)`

* `setTimeout(func,milliseconds)`

* `clearTimeout(tid)`

* `setInterval(func,milliseconds)`

* `clearInterval(iid)`

* `requestAnimationFrame(func): aid`

* `cancelAnimationFrame(aid)`

* `globalThis` global namespace, aliased as `window` for compatibility with browsers.

* `fetch` - [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

* `getComputedStyle(element[, pseudoEl]): Style`

* `printf(format:string, ...):string` 
  
  The function does formatting of arguments using C-style [printf conventions](https://en.cppreference.com/w/cpp/io/c/fprintf).
  
  Returns formatted string.

  In Sciter list of standard formatting types is extended by these two: 

  * `%v` - takes argument and prints it as `JSON.stringify(arg)`;
  * `%V` - takes argument and prints it as `JSON.stringify(arg, null, "  ")`;

* `scanf(format:string, input: string) : [...]`

  Takes *input* string and parses it according the *format* specification using C-style [scanf conventions](https://en.cppreference.com/w/c/io/fscanf). Returns list (array) of successfully parsed values. 


#### Standard DOM objects

* [Document](Document.md)
* [Element](Element.md)
* [Node](Node.md): [Text](Node.md#Text) and [Comment](Node.md#Comment)
* [Event](Event.md)
* [Graphics](Graphics.md) 2D graphics and associated classes.

#### Sciter specific objects

* [Window](Window.md) - desktop window defined by HTML loaded in it. 
* [Audio](Audio.md) - audio playback. 

#### Sciter specific modules

* [@sciter](module-sciter.md) - Sciter's general methods.
* [@sys](module-sys.md) - System, File system and communication primitives (close to Node.JS runtime).
* [@env](module-env.md) - Running environment primitives.
* [@storage](storage/README.md) - Persistent storage - NoSQL DB built into JS runtime.
* [@bjson](module-bjson.md) - "binary JSON".

