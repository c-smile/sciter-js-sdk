## 4.4.7.2

### Fixes:

* fix of issues in behavior:virtual-list; 
* [css] fix of max-width handling;

## 4.4.7.1

### Fixes:

* fix of https://sciter.com/forums/topic/svg-does-not-render-until-hover/
* fix of https://sciter.com/forums/topic/widthmax-intrinsic-bug-on-hover/
* css: horizontal-align / flow:vertical combination fix.
* `&lt;select&gt;` uses `@as="string"` by default in Sciter.JS.
* fix of https://sciter.com/forums/topic/aspect/

## 4.4.7.0

Unified API: ISciterAPI uses the same structure (list of functions) on all platforms and variants (Sciter and Sciter.Lite). Functions that are not available on particular platform/variant are set to NULL. 

Note: that is breaking change for Rust/Go/Python/C# wrappers - they need to be updated.

### Fixes:

* fix of scrollable rendering;
* [select|dropdown] fix of first item set when @novalue is used.
* [drawing] fix of position:absolute / outline drawing.
* behavior:virtual-list; fix of https://sciter.com/forums/topic/bug-scroll-indicator-not-work/ 

## 4.4.6.8

### New features

* `Windows.this.performDrag()` - initiates Drag-n-Drop from your code side. This way you can support dragging of text,html,files,JSON from your application to outside. + D&D samples in samples.sciter/drag-n-drop-system/

### Fixes

* fix of scrollables rendering;
* [Sciter.JS/SDK] `value::date()`` conversion fix.
* `behavior:virtual-list` fix of first/lastVisibleElement properties.
* more docs on behaviors (still not complete but closer).

## 4.4.6.7

[Sciter.API] Sciter and Sciter.Lite use the same struct SciterAPI {} so non-C++ language wrappers can be used as for Sciter as for Sciter.Lite. Functions that are not available in Sciter.Lite are just NULLs in SciterAPI struct.

### Fixes

* <frameset>, more Reactor friendly.
* [inspector] breakpoint handling fixes.

### New features

* support of element.onsizechange = function(){} 
* element.style.setCursor(image) - set custom cursor.

## 4.4.6.6

### New builds/assemblies

* Linux/iot/arm32 - Sciter.JS.Lite for Raspberry Pi.

### Fixes

* [scrollable] 1px off at last position.
* [inspector.js] enabling F5...F11 shortcuts in debugger.
* [inspector.js/debug] more reliable debug output in frames.
* [Sciter.JS] `input.value = null` support.
* [behavior:calendar] $(input).calendar.mode = "months"; or <input|calendar mode="months" />
* [behavior:virtual-list] fix of element.vlist.navigate("start"|"end") method;

### New features

* [SDK/headers], custom to/from sciter::value serialization support:
  ```
  T getter(const sciter::value& v, T*);
  sciter::value setter(const T& t); 
  ```
* `scrollanimationstart` and `scrollanimationend` events.
* [SciterJS] usciter + help button is operational. 
* [SciterJS] mdview update with the help of [MustafHi](https://github.com/c-smile/sciter-js-sdk/pull/66)  

## 4.4.6.5

### Fixes

* fix of breakpoint handling in inspector

## 4.4.6.4

### New features

* + `Element.selection` support.
* + `Element.onGlobalEvent()` and `Element.offGlobalEvent()`, see : samples.sciter/global-events/README.md for the idea.

### Fixes

* [JSX] fix of line number reports when JSX is used in presence of tabs (`\t`);
* [Sciter.JS, Reactor] fix of "falsy" values handling.
* [OSX] better font ascent/descent calculation.

## 4.4.6.3

### New builds/assemblies

* MacOS - inspector.app and usciter.app

### New features

* [sciter.js/JSX] + support of numeric and boolean attributes <td cols=2 valid=true> 
* [sciter.js] + sample : sdk.js/samples.sciter/lightbox-dialog.
* [Sciter.JS] window.load(url) - loads document into this window.

### Fixes

* [Sciter][Sciter.JS] Reactor fix of <select|dropdown> reconciliation. See: https://sciter.com/forums/topic/select-behaves-erratically-in-reactor-component/
* [Sciter.JS] better console.log() output when inspector is not present.
* [Sciter.JS] behavior:virtual-list - scroll animation outside of virtual scroll functionality.
* [linux] fix of AV on msgbox close.
* [inspector/debugger] fix of breakpoint set.
* [frameset] fix of https://sciter.com/forums/topic/frameset-column-changes-height-when-container-is-resized/ issue.
* [reactor] fix of missed didMount/willUnmount() call when element changes prototype.

## 4.4.6.2

### New builds/assemblies

* MacOS/ARM - MacOS binaries are universal now - contain as x64 as ARM (M1) code.

### New features

* Sciter.JS.Quark is operational now. Use bat/sh files in bin/quark. Source code of the Quark is in /quark folder.
* JSX support of HTML style no-value attributes like: <input disabled />
* `sys.fs.$readfile()` - synchronous file read.
* `canvas.canvasUpdate(function(gfx){...});` - transactional painitng on `<canvas>`, see [discussion](https://sciter.com/forums/topic/how-to-free-graphics-image/).
* [API] window::broadcast_event(BEHAVIOR_EVENT_PARAMS event); post/send customs events to all windows of the application. See demos/integration project.

### New samples

* MDView at sdk.js/samples.sciter/applications.quark/mdview - viewer of MD files:
  * can be compiled as Quark monolitic application;
  * demonstrates Sciter.JS printing support;

## 4.4.6.1

### New builds/assemblies

* Sciter.JS.Lite - GLFW based demo in demos.lite/sciter-glfw-opengl/
* Sciter.JS.Lite builds on:
  * Windows
  * MacOS
  * Linux

### New features

1. *CSS* - support of `@keyframes` inside `@set`'s;
2. *video* - new event "videocoordinate" - allows to coordinate output of multiple `<video>'`s. Coordinated output allows to reduce FPS rate of several videos running at the same time. See: sdk/samples/video/video-25-videos.htm
3. *Audio*, basic audio playback, see: sdk.js/samples.sciter/audio/test-basic.htm;
4. [module @storage](docs/md/storage/README.md) - persistent storage, NoSQL DB built into JS runtime.
5. `sys.fs.$readdir()` - sync version of readdir.
6. `Color.RGB(0..255,0..255,0..255[,0..255])`

### New samples

1. The `$` - Zepto (micro jQuery) sample, see: sdk.js/samples/$
2. samples.sciter/sys/folder.htm - `sys.fs.readdir()` demo.
3. samples.sciter/process/spawn.htm - process spawning demo with stdout redirection. 

### Fixes

* *inspector* fix of style url reporting, see: https://sciter.com/forums/topic/inspector-cant-loads-css-files/
* `<frame>`, fix of `frame.attributes["src"] = ...;`
* [core] `flow:vertical-wrap;` fix of stack overflow when percent units used.


## 4.4.6.0

### New features

* `behavior:virtual-list` - native virtual list;
* `element.post(function | event)` - posts either function or event to the element;
* [JS runtime] `sys.fs.watch(path,callback)` - watch changes on FS (folders and files);
* [JS runtime] `sys.fs.splitpath(path) -> [dirpath,file]` ;
* [usctier] LiveReload functionality is operational;

### New samples

* samples.sciter/virtual-list - vurtual list samples;

### New builds/assemblies

* Sciter.JS.Lite - Linux 

## 4.4.5.12

### New samples

* demos/integration - demonstrates native code <-> JavaScript interaction, running native worker threads, exposing native classes and objects, etc.  
* docs/md - documentation as part of SDK, markdown formatted. 
* samples.sciter/input-elements/ - home of various samples of built-in input elements.
* samples.sciter/themes/ - demo of built-in theme (light/dark), MS Metro and Android Material.
* samples.sciter/tray-icon/ - tray icon demo.
* samples.sciter/window/ - demo of different types of window chromes (window frame types).
* samples/markdown/ - demo of RemarkableJS library.

### New features

* graphics.push/popLayer() - clipping(rect,path,bitmap), filters, opacity layers. 
* graphics.draw(path|text|image|element, {options}) - drawing those objects. 
* class [Graphics.Text](docs/md/Graphics.Text.md) - text drawing and measurement.
* class [Graphics.Path](docs/md/Graphics.Path.md) - paths 
* class [Graphics.Color](docs/md/Graphics.Color.md) - color object (RGBA/HSLA/HSLV) 
* element.style.colorOf(prop) - getting used color values
* element.style.pixelsOf(prop) - getting used length values
* window.isResizable, isMinimizable and other prperties. 

### New builds

* Sciter.JS.Lite - Windows
* Sciter.JS.Skia - Windows
* Sciter.JS.Lite - Android

## 4.4.5.10, revision 8422, 2021-01-15

### New

#### JS Runtime

* Immediate mode drawing support, element.paintBackground, element.paintForeground, element.paintContent and element.paintOutline properties/methods.

### Fixes

* debugger/inspector support by sciter.dll and scapp.exe

## 4.4.5.10, revision 8420, 2021-01-13

By this release Sciter.JS has reached BETA phase.

### New

#### HTML/CSS

* [CSS] + `appearance` property. Example `button { appearance:none; }` will suppress default styling of button elements.
* [CSS] + support of `transition: ... cubic-bezier(x1,y1,x2,y2);` ease function.

#### JS Runtime

* + support of JavaScript debugger in scapp, usciter and user applications. Window shall be created with SW_ENABLE_DEBUG flag in order to be debugable. 
* Element.onclick and other property-ehandlers.
* `window.xcall("name"[,arg0,... argN])` and `element.xcall("name"[,arg0,... argN])` - calling methods of native behaviors attached to window and elements.

#### Frameworks

* [PReact](https://preactjs.com/) framework is generally operational "as it is". JSX (built-in native implementation) can be used with PReact by defining `JSX = h;` - `h()` function of PReact is used as a driver of JSX expressions.
  See: sdk.js/samples/preact/ demos.

### Fixes

* various fixes in HTML/CSS core;
* QuickJS has upgraded to latest (2020-11-08) version. This fixes several issues in JS core. 


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
