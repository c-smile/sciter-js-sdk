## 4.4.8.18

### New features:

* [C++ api] + window::eval();
* [C++ api] + `sciter::window::close()` to force window closure. Also `sciter::window::request_close()`
* [integration] demos of call_function() and call_method();  
* `SciterLoadFile()`, support paths starting "./" and "../" - to open resources relative to CWD (whatever it means);

### Fixes:

* scrolling / animated scrolling: "overscroll" feature and touch specific functionality are disabled for now, more problems than solutions;
* [css] fix of `*` selector specificity handling;
* [reactor] `element.patch()` refactoring , speed up and better support of fragments;
* [MacOS] fullscreen fix;
* [MacOS] `window.move(...)` 1px offset fixed;
* [MacOS] fix of window closure delay;
* [MacOS] fix of role="window-caption" handling in custom frames;
* [win] scapp.exe + productDescription (David's patch);
* `Graphics.strokeRect()` fix;
* [inspector] fix of second instance detection handling;
* Fix of mem-leak alike timers pileup, see: https://sciter.com/forums/topic/serious-memory-leak-that-leads-to-frequent-crashes-reproducible/ ;
* Fix of popup closure: https://sciter.com/forums/topic/there-are-multiple-elements-on-the-page/ ;

## 4.4.8.17

### New:

* `Graphics.draw(element)`, see: sdk.js/samples.sciter/immediate-mode-painting/draw-element.htm
* [inspector] eval runs in context of 'this' that is set to current selected element.

### Fixes:

* win7 compatibility of usciter.exe, inspector.exe, etc. Note window-blurbehind works now on Win10 and above;
* graphics.clearRect() fix on MacOS;
* `sciter::value::call(...)` fix of error string generation.
* [MacOS] font ascent / descent calculation fix.
* [MacOS] fix of "missed idle events" bug that may manifset in non responsive UI.
* `<toggle disabled>` styling fix.
* [JS] `event.button` fix, see: https://sciter.com/forums/topic/bug-with-the-evt-button-processing-in-sciterjs/


## 4.4.8.16

### New features:

* [Windows] acrylic blur behind [is back](https://sciter.com/windows-acrylic-blur-behind-is-back/).
* `Window.send(event)` - send event synchronously to all windows.
* `Window.share : object` - data shared among all windows and documents - application wide data container. 
* `<select|dropdown>`: 
  1. `novalue` is back
  2. event `change` on `<select editable>`: `evt.source` is either `<caption>` or `<option>` that caused the change;
+ sdk.js/widgets/tag-list component.

### Fixes:

* `env.exec(...)` fix. See: https://sciter.com/forums/topic/call-executable-with-args/#post-74647
* fix of `overflow:scroll;` handling, see: https://sciter.com/forums/topic/scroll-function-will-freeze/
* event "change" from `<input|date>`;
* [reactor] reconciliation / focus fix;

## 4.4.8.15

### New features:

* Reactor namespace - [high-level Reactor API functions](docs/md/reactor/reactor-api.md).
* [css] role property, allows to define element role in CSS: 
  ```CSS
  tr { role:"option"; }
  header { role:"window-caption"; }
  ```
+ [JS] `sciter.import("module")` - sync version of `import("module")` JS built-in;
+ `element.animate(stepFn, {FPS:30})` to cap animation callback frequency;
+ `<input type=slider>` fix of "change" event generation;
* **CommonJS** modules support, `require()` function implementation: sdk.js/samples/commonJS;
* `<html disable-debug="true" >` to disable connection with inspector.
* [css] `var(--somename,#F00)` and `var(somename,#F00)` are equivalents now.

### Fixes:

* `<select|dropdown editable placeholder="...">` fix.
* [Win,a11y] fix of accName reporting if it was redefined by CSS content:"new text".
* [MacOS] fix of minimizable/maximizable button appearance.
* `Window.this.modal` styling;
* [MacOS] better painting;
* [MacOS] fix of layered windows (window-frame=transparent) update.
* [MacOS] date.toLocaleDateTimeString() fixes;
* [Win] Fix of `Clipboard.write(...)` - cleans clipboard first.
* JS, better error reporting on erroneous modules.
* Skia backend fix that prevents re-entrant engine creation, affects Sciter.Lite on all platforms and Sciter on MacOS.
* `document.on("beforeunload", function() { console.log("xxx") })` fix.


## 4.4.8.14

### New features:

* [JSX built-in internalization / translation](docs/md/reactor/JSX-i18n.md) support. Works with Reactor, ReactJS, PReact, Mithril - all libraries that provide JSX driver.
* `debug.callStackAt(level)` method, see: https://sciter.com/forums/topic/get-js-function-name-within-function/
* `Event.keyState("A"):boolean` - is key "A" pressed or not at the moment?

### Fixes:

* `slider.max` property handling fix.
* `SciterSetValue` / `SciterGetValue` to obey property `value` defined in script.
* `behavior:menu-bar`, keyboard operation fix.

## 4.4.8.13

### Fixes:

* `Audio.stop()` fix to stop async operation;
* [reactor] fix of fragment handling;
* `Storage.Index.delete(key)` implementation;
* `element.off(".ns")` fix (unsubscribe by namespace);
* [MacOS] fix of `Clipboard.write({...})`;
* 
## 4.4.8.12

### New features:

* `Audio.stop()` method. 

### Fixes:

* various regression fixes;

## 4.4.8.11

### Fixes:

* fix of `element.getElementById()`, see: https://sciter.com/forums/topic/getelementbyid-return-null-after-refresh-div-list/ ;
* fix of possible AV in textarea;
* [Skia backend], fix of possible deadlock on rendering;
* fix of `element.onsizechange()` callback generation in components;
* `sys.fs.splitpath()` fixes;
* `new Image(painter)` and `Image.update(painter)` fixes;
* `Graphics.ellipse()` fix;
* `Graphics.pushLayer(x,y,w,h,filter)` fix;
* CSS/painting, fix of text-decoration and selection painting;
* `element.append/perpend(<fragment>...</fragment>)` fix;
* `sys.fs.match(filename,pattern)` fix of string leak;
* VALUE API fix, correct coercion to T_BYTES in `nativeFunc(new ArrayBuffer(...))`;
* `Graphics.pushLayer("border-box")` generates error when Image based Graphics is used.
* [reactor] `.componentDidCatch(error,contextElement/*performing patch()*/)` - processing errors in render() methods (ReactJS notation);
  
### New features:

* `window.requestAttention("info" | "alert" | "stop")` - app icon blinking on OSes that support that (Windows, MacOS);
* JSX: <Foo {...props} /> support. See: https://sciter.com/forums/topic/react-spread-attributes/
* [SQLite] + recordset.field("name") method. See: https://sciter.com/forums/topic/name-can-not-be-used-as-column-name-of-sqlite/
* [reactor] <div attr={obj}> - warning if incompatible (non string convertible) value is passed.
* [JSX] fragment support using notation `<>...</>`, see: https://reactjs.org/docs/fragments.html#short-syntax

## 4.4.8.10

### Fixes:

* element.post() fix, see: https://sciter.com/forums/topic/virtual-list-vlist-navigate-issue/
* WM_INPUT handling fix (might causing non-handled exceptions);
* Windows: UIAutomation support is back, but requres SciterSetOption(NULL,SCITER_ENABLE_UIAUTOMATION,TRUE);
* env.home(path) - returns normalized path - without ".."; 
* flow:stack fix.
* VirtualSelect/VirtualList fix of the issue: https://sciter.com/forums/topic/virtual-list-vlist-navigate-issue/#post-73783
* reactor: fix of handling `(name)` as key in r13n;
* Tokenizer: fix of freeze on EOI marker;
* [JSX] better errors handling.
* fix of freeze in video rendering + behavior:file-icon/shell-icon;
* [CSS/JS] `prototype: Component`, fix of private fields handling;
* ["on click at :root"]() handling fix;
* Fix of hanging on `::after { position:absolute }` rules;
* Fix of script debugger in x64 versions;

### New features:

* `element.matches("selector")` / `element.$is("selector")`
*  API: `SciterEvalElementScript()` implementation for JS;
* `Element.animate(options,onEnd)` - non-promise version;
* `element.mapLocalToWindow(x,y)` and `element.mapWindowToLocal(x,y)`
* `element.swapWith(otherElement)`
* `image.colorAt(x,y): Color`
* `image.compose(other, op)` 

## 4.4.8.9

### Fixes:

* `overflow:scroll`, fix of non-overflow SB rendering. 
* [debugging] drain logs (a.k.a. flush) before document unload. See: https://sciter.com/forums/topic/wait-for-closerequest-function-calls-to-complete/
* leaflet.js compatibility fix, by adding document.createElementNS();  
* command event `"^exec:***"` handling fix;
* [VirtualList] fix of `render()`;
* [websocket] fix of AV in `new WebSocket("badaddr")`;
* `Clipboard.has("image"|"file"|"text")` - check if clipboard has needed data;
* `self` - yet another alias to current namespace ( `self == globalThis` ) 
* fix of splitter handling in Sciter.Lite.
* fix of element.click() event click generation.



### New features:

* samples/compatibility.js/.css - compatibility layer for browsers. Not complete, features will be added when required;
* samples/leaflet/test-geoJSON.htm sample - demo of layers in leaflet;


## 4.4.8.8-bis

### Fixes:

* `<select|list treelines>` rendering;
* leaflet.js compatibility fix;  


## 4.4.8.8

### Fixes:

* Fix of `<select|dropdown multiple>`
* Fix of `Audio.resume()`
* Fix of https://sciter.com/forums/topic/wrong-style-attribute-in-reactor-when-new-element-has-the-same-tag/ in Sciter.TIS and .JS
* Sciter.JS: events "change" (synchronous) and "input" (posted, asynchronous) are distinct now. 
* [virtual-list] + scroll-manner: scroll-manner(animation:false); //to disable animated scroll
* fix of divide by zero in esoteric situation of zero sized window.

### New features:

+ sdk.js/samples.sciter/virtual-list/virtual-multi-column.htm sample.

## 4.4.8.7

### Fixes:

* inspector exe fix to show real DOM structure;
* [osx] fix of ligatures handling in inputs;
* [osx] fix of transparent windows handling;
* [virtual-list] fix of scrollable table;
* [DOM] <div tabindex> === <div tabindex="0">

## 4.4.8.6

### New features:

* lottie playback API and samples in samples.sciter/lottie/
* `Window.this.monitor:int` - reports monitor index this window is on;
* `Window.monitors:int` - number of screens/monitors;

### Fixes:

* [JSX] fix of `<div tabindex state-selected={selected}>` parsing.
* [API/SOM] _integration.exe_, test of const methods.
* fix of Color values passing to built-in methods.

## 4.4.8.5

### New features:

* `new Graphics.Image(w,h,painter(gfx))` - generation of image by painting on it.
* `Window.this.screen:int` - reports monitor index this window is on;
* `Window.screens:int` - number of screens/monitors; 
* `Window.screenBox(N, "devicePixelRatio")` - reports dip/ppx ratio on Nth monitor; 
* New `EDIT_VALUE_CHANGE` event (JS: "change"). Sequence now: 
 
  * `EDIT_VALUE_CHANGING` (JS: "changing") - before changes, sync event;
  * `EDIT_VALUE_CHANGE` (JS: "change") - immediately after changes but before screen update, sync event;
  * `EDIT_VALUE_CHANGED` (JS: "input") - after changes, after screen update, async/posted event.
  * `behavior:video` -> `VIDEO_FRAME_REQUEST` event (a.k.a. animation frame)
  * `element.state.pixelsIn("1em")` - method to convert CSS length units to CSS pixels.
  * [DOM] attribute "selectable" - enables "HTML range selection" and copying on given element.
  * new sample sdk.js/samples.sciter/menu/custom-shape-menu.htm

### Fixes:

* SDK headers reorganization: sciter-x-primitives.h - non-GUI primitive types;
* fix of console.log() interaction with inspector;
* `placeholder` runtime change fix;
* [CSS] `html:owns-focus` flag on active window;
* [js] persistence fixes;
* virtual-list mouse hover fix;
* fix of mouse-over-scrollbar issue, see: https://sciter.com/forums/topic/sciter-scroll-popup-issue/
* `event.windowX/Y` are in CSS pixels (dips) now.
* color to string conversion fix.
* fix of behavior:virtual-list samples.
* [osx] window update fix on MacOS Mojave.
* websocket events notification fix.

## 4.4.8.4

### New features:

* [css] rgba(255,255,255,var(opacity)) - rgb() and rgba() may use variables now.
* `window-state="hidden" | "shown" | "minimized" | "maximized" | "full-screen"` attribute support on HTML element element. This attribute defines initial state of the window.

### Fixes:

* element.append/insert/children fixes;
* `element.takeOff(...)`  parameters are in dips (CSS pixels);
* fix of cascaded css vars;
* `element.componentDidMount()` invocation fix;
* behavior:pager fix of AV.
* [Storage] fixes.

## 4.4.8.3

### New features:

* [reactor] `this(props,kids)` method in reactive components, a.k.a Reactor's constructor.
* components, support of `>` in event handling selectors ["on click at >child"]() to match immediate child of `this`.

### Fixes:

* [css variables] fix of variable value resolving in cascaded rules.
* [vue|preact] compatibility, element.checked property.
* Fix of AV in timer in some cases.
* `fetch()`, allow use of relative URLs.
* [virtual-list] first|lastVisibleItem, fix of AV on empty list.
* [virtual-list] touchpad scrolling fix on MacOS.
* fix of sdk.js/samples.sciter/drag-n-drop/simplest.htm demo.

## 4.4.8.2

### Fixes:

* inspector fix.
* element.innerHTML fix.

## 4.4.8.1

### New features:

* [css] + support of + general sibling combinator (`~`):  `p ~ span { color: red; }`
* `behavior:hyperlink` support of `target="@system"` attribute to open link in system's default application (default browser for example) rather than Sciter.
* [module sciter], new functions
  * `sciter.compress()`
  * `sciter.decompress()`
  * `sciter.toBase64()`
  * `sciter.fromBase64()`
  * `sciter.md5()`
  * `sciter.crc32()`

### Fixes:

* `devicePixelRatio` fix.

## 4.4.8.0

### New features:

* CSS variables: 
  * now support all types of values (used to be just lengths and colors);
  * Sciter supports as its own `var(name)` as standard `--name` variable declarations. See /samples.css/css-variables;
* [html-window] window-min-width/height, window-max-width/height attributes.
* [css] svg image used as background/foreground image inherits stroke, fill colors and set of CSS variables of element where it is applied.
* zepto patch for mouseenter/mouseleave to work in Sciter. Sciter supports mouseenter/leave events but not mouseove/out.

### Fixes:

* [JS DOM API] fix of <select|dropdown> handling, os it is compatible now with Mithril/PReact, Vue, etc.;
* dispatchEvent preventing recursive call;
* virtual-list fixes;
* [QuickJS] `getTimezoneOffset()` implementation for Windows so Date reports values properly.

## 4.4.7.8

### New features:

* highlightion API, new methods:
  * `range.marks()`
  * `range.setToMark(name)` 
  * `element.rangeFromPoint(x,y)` 
  
  See /samples.sciter/editor-plaintext/highlighting-marks.htm

* `fetch()` API - POSTing JSON and other textual or binary data;

* sdk.js/samples.sciter/reactor-form/ - forms handling in reactor, inspired by Formik/ReactJS;

* SDK headers: SOM_PROP_EX + SOM_RO_PROP_EX

### Fixes:

* fix of window.close(val) for main window;
* virtual-list scroll fixes;
* fix of css::prototype and JS subclassing;
* optimiziation of `<img src="....svg">` handling;

## 4.4.7.7

### New features:

* new global functions:
  * `decode(arraybuffer,encoding): string`, character encoding/decoding 
  * `encode(string,encoding): arraybuffer` 
  * `btoa(arraybuffer): string` - Base64 encoding/decoding 
  * `atob(string): arraybuffer`
* `element.popup(element | vnode,options)` - popup generalization. This makes element.popupAt/For() functions obsolete;  
* `element.animate(stepfunc,options)` - another mode of animate function.  
* `element.state.occluded` - reports occlusion state of the element (partial or full invisibility);
* `Window.elementAt(screenX,screenY)` - find DOM element by screen coordinates;
* [reactor] + reactor-routing sample;
* sdk.js/samples.sciter/input-elements-styling - custom styling demos;
* sdk.js/samples.sciter/menu - menu samples;

### Fixes:

* fix of `element.onmouseXXXX()` handlers;
* [reactor] tunelling key attribute;
* scroll, 1ppx extra fix;
* [virtual-list] initialization fix;
* [css] fix of `currentcolor` handling;
* [dom] fix of `element.attributes["style"] = ...` updates (memory consumption);

## 4.4.7.6

### New features:

* [Clipboard](docs/md/Clipboard.md) support; 

### Fixes:

* `clearInterval()`` fix, see: https://sciter.com/forums/topic/calling-clearinterval-inside-setinterval-has-no-effect/
* [zepto.js] compatibility, element.style.cssText prop support;
* behavior: virtual-list fixes;

## 4.4.7.5

### New features:

* [`element.animate()`](Element.md#animate) - various animation effects;
* [`element.takeOff()`](Element.md#takeOff) - "airborn" DOM elements - replaced outside of host window;
* [`element.popupFor()`](Element.md#popupFor) - showing popup elements using this one as anchor;
* `node.parentWindow` - window that hosts this node;
* `Window.this.parent`  - parent window of this one;
* events "closerequest", "beforeunload", "close" on Window.this contain event.data of window.close(data) call;
* [svg] SVG images used as back/foreground images inherit CSS variables from host document. This allows change colors/lengths from CSS of host document, see: samples.sciter/svg-icons demo.

### Fixes:

* [virtual-list] fix on initialization sequence: samples.sciter/virtual-list/test-table.htm
* [reactor]  `render([props,kids])` - props and kids are not provided when rendering is don in response of `this.componentUpdate()`;
* [reactor]  fix of attribute "value" handling;
* graphics, path images, proper handling of repeat-x, repeat-y;
* http client, support of "content-type" override;
* Window's "size" event is generated after window size change *but* before DOM layout - can be used in cases when DOM needs to be changed in response of window size changing.

## 4.4.7.4

### New features:

* [windows] new demo sdk.js/demos/windows-directx demo project, demonstrates 
  * mixin style of Sciter integration;
  * use of Sciter on DirectX windows;

* `behavior:video`, "assetified", documented and sampled, see: sdk.js/samples.sciter/video/

* `printf(format, ...): string` - C-style [`printf()`](https://www.cplusplus.com/reference/cstdio/printf/) as a global function.
* `scanf(format, str): [...]` - C-style [`scanf()`](https://www.cplusplus.com/reference/cstdio/scanf/) as a global function.

* `fetch()` refactoring:
  * Request/Response split; 
  * samples/fetch(AJAX)/test-upload.htm - test of file upload

* transactional updates in &lt;plaintext&gt; , see samples.sciter/editor-plaintext/transactional-update.htm

### Fixes:

* fix of `element.innerText` for elements with behaviors.
* fix of AV in window event handlers - Window.this.on("...", function) - automatic un-subscription of subscribed documents.
* fix in `element.selection.setBaseAndExtent()` - offsets normalization.
* fix of asset methods calling in external behaviors.
* Implementation of missed `sciter::dom::element::call_method(...)`, `sciter::dom::element::call_function(...)`

## 4.4.7.3

### New features:

 * [behavior:richtext and behavior:plaintext] method `richtext|plaintex.update(function(tctx){})`` - transactional updates.

### Fixes:

* [sdk, C++ headers] sciter::vfunc() was replaced by sciter::value() constructors;
* fix of sys.fs.$readfile(), was not closing the file properly;
* [reactor.js] reconciliation fix.

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
