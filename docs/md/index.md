### DOM and Runtime implementation status

#### global methods

* `console.log()`
* `setTimeout(func,milliseconds)`
* `clearTimeout(tid)`
* `setInterval(func,milliseconds)`
* `clearInterval(iid)`
* `requestAnimationFrame(func): aid`
* `cancelAnimationFrame(aid)`
* `globalThis` global namespace, aliased as `window` for compatibility with browsers.
* `fetch` - [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

#### Standard DOM objects

* [Document](Document.md)
* [Element](Element.md)
* [Node](Node.md): [Text](Node.md#Text) and [Comment](Node.md#Comment)
* [Event](Event.md)
* [Graphics](Graphics.md) 2D graphics and associated classes.

#### Sciter specific objects

* [Window](Window.md) - desktop window defined by HTML loaded in it. 

#### Sciter specific modules

* [@sciter](module-sciter.md) - Sciter's general methods.
* [@sys](module-sys.md) - System, File system and communication primitives.
* [@env](module-env.md) - Running environment primitives.
* [@bjson](mpdule-bjson.md) - "binary JSON".

