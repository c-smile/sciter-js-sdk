## 4.4.5.9, revision 8396, 2020-12-18

### New

1. `element.children` support
1. `element.removeEventListener` support
1. `CSS.supports()` support
1. `navigator` object support
1. inspector.exe is more or less operational but JS debugger functionality is still in progress.
1. Leaflet.JS demo. See: sdk.js/samples/leaflet . Note: Leaflet runs "as it is" with minor tweaks - Leaflet has outdated feature detection.

### Fixes

1. event.clientX/Y ppx/px fix.
1. Event, various fixes.

## 4.4.5.8, revision 8364, 2020-12-03

### New

1. `element.tag` - lowercase tag name, `element.tagName` uppercase tagname
2. `element.hasAttributes` 
3. `element.hasAttribute()` 
4. `element.attributes` - note in Sciter this returns an array of {name:..., value:...} objects - snapshot of current attributes collection (but not a live map).
5. `element.disabled` - in Sciter it is a synonym of `element.state.disabled`
6. `element.readonly` - in Sciter it is a synonym of `element.state.readonly`
7. `Window.this.data` as semi-persistent object - survives document reload.
8. `Range` class
9. `Tokenizer` class (Sciter specific), see samples.sciter/colorizer/
9. `element.state.value` value (of input and other elements)
9. `scapp.exe -debug` to support connection with inspector.exe, inspector.exe should be running.
9. `usciter.exe` supports connection with inspector.exe, inspector.exe should be running.

Note: I am using *inspector* project as a testing tool for sciter.js

### Fixes

1. fix of loading local resources (including `file://`) by `fetch()`.
2. Promise rejection is reported as an error on console.error() channel.
3. Various rendering fixes.

## 4.4.5.7, revision 8347, 2020-11-24

### New

1. `document.createNodeIterator()`
2. `document.url([relurl])` - Sciter specific
3. `element.click()`
4. `element.childNodes`
5. `event.altKey`, `event.ctrlKey`, `event.metaKey`, `event.shiftKey`, `event.button`, `event.buttons`, `event.clientX/Y`, `event.screenX/Y`, `event.x/y`,  
6. `class Text extends Node`;
7. `class Comment extends Node`;
8. `class Graphics.Image` - sciter specific; 
9. native module "@debug" - sciter specific;
10. `Element.state.box()` - sciter specific;
11. `sciter.uuid()` - uuid string generator
12. event `"reloaddocument"`;
13. samples/debug-peer.js (this will move inside sciter.dll) + inspector.exe, console log is operational there + F5 support (by debug-peer.js).


### Fixes

1. JSX, fix of <var>, etc parsing;


## 4.4.5.6, revision 8341, 2020-11-17

### New

1. WebSocket support, see sdk/samples/websockets/. Note: that is home grown implementation on top of libuv sockets - only basic functionality. 
2. Node.remove() added.

## 4.4.5.6, revision 8340, 2020-11-17

1. [css] hit test fix on inline-block/transform elements;

## 4.4.5.6, revision 8335, 2020-11-17

### New

1. `Window.modal()` - modal windowed message boxes and dialogs
   * `Window.modal(<info>...</info>)`
   * `Window.modal(<alert>...</alert>)`
   * `Window.modal(<error>...</error>)`
   * `Window.modal(<question>...</question>)`
   * `Window.modal{ params }` - showing arbitrary window as a modal dialog
2. `Element.classList`
   * `Element.classList.item()`
   * `Element.classList.add()`
   * `Element.classList.remove()`
   * `Element.classList.toggle()`
   * `Element.classList.contains()`
   * `Element.classList.length`
   * `Element.classList.entries()`
3. `class CustomEvent`
4. `Element.dispatchEvent(new CustomEvent(...))`
6. `window.dispatchEvent(new CustomEvent(...))`
7. `window.minSize = [w,h]`
8. `window.maxSize = [w,h]`
9. `window.on("eventname", cb)` and `window.addEventHandler("eventname", cb)`
9. `window.off("eventname" | cb)`
9. [Window events]: `"statechange"`, `"resolutionchange"`, `"replacementstart"`, `"replacementend"`
9. [API] `SciterCall()`, `SciterEval()` are operational
9. [@sciter module] `loadLibrary("name")` - load Sciter extension native library (dll,so,dylib). "name" is dll name without extension. The dll shall reside in the same folder as executable. SQLite demo operational in scapp.exe. 

### Fixes

1. [css] hit test fix on inline-block/transform elements;
2. [jsx] fix of white space runs handling.
3. [css] fix of box calculation in case of box-sizing:border-box / display:inline-block combination;


## 4.4.5.5 2020-11-12

### New

1. `Element.dispatchEvent()`
2. `Element.queryCommand()`
3. `Element.executeCommand()`
4. `Element.prepend(vnode)`
5. `Element.append(vnode)`
6. `Element.patch(vnode)` - core of the Sciter's Reactor, a.k.a. "Native React"
7. `Element.componentUpdate(props)` - Sciter's Reactor, request to render/patch the component.
