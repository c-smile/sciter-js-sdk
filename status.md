# Sciter.JS: DOM and Runtime status

Implemented so far (list will be extended): 

* [Document](https://github.com/c-smile/sciter-js-sdk/wiki/DOM.Document)
* [Element](https://github.com/c-smile/sciter-js-sdk/wiki/DOM.Element)
* [Node](https://github.com/c-smile/sciter-js-sdk/wiki/DOM.Node)

### Event

#### properties:

* `event.bubbles`
* `event.cancelable`
* `event.currentTarget`
* `event.defaultPrevented`
* `event.eventPhase`
* `event.target`
* `event.type`

#### methods:

* `event.preventDefault()`
* `event.stopImmediatePropagation()`
* `event.stopPropagation()`

#### global methods

* `console.log()`
* `setTimeout(func,milliseconds)`
* `clearTimeout(tid)`
* `setInterval(func,milliseconds)`
* `clearInterval(iid)`
* `requestAnimationFrame(func): aid`
* `cancelAnimationFrame(aid)`

#### global methods, Sciter.JS specific 

* `devicePixels(cssPixels [, "width" | "height"]) : integer`

  Returns physical pixels of "CSS pixels" (that are dip's in fact - logical units equal to 1/96 of inch).

## Window

There is no concept of Window in browser sense. Window there is quite strange entity that has no relation with desktop windows.

`Window.this` is a reference to current window object - instance of Window class;

#### contructor:

* `new Window({params})`

  where `params` is an object with the fields:

  * `params.type` - optional, is one of:

    * `Window.POPUP_WINDOW`
    * `Window.TOOL_WINDOW`
    * `Window.CHILD_WINDOW`
    * `Window.FRAME_WINDOW` - default window type
    * `Window.DIALOG_WINDOW`

  * `params.parent` : Window - optional, instance of parent (owner window). When owner will be closed or minimized this window will be closed/minimized too.
  * `params.caption` : string - optional, window caption (or title).
  * `params.x` : integer - optional, screen pixels, horizontal position of the window on screen;
  * `params.y` : integer - optional, screen pixels, vertical position of the window from the top of the screen;
  * `params.width` : integer - screen pixels, window width;
  * `params.height` : integer - screen pixels, window height;
  * `params.client` : true | false - if `true` then x,y,w,h are coordinates of desired window client box on the screen;
  * `params.alignment` : 1..9 - optional, alignment of the window on monitor, if -1..-9 and parent is provided then it aligns the window against parent window.
  * `params.screen` : integer - optional, number of monitor on multi-home systems.

#### properties:
 
  * `window.state` - read/write, one of:

    * `Window.WINDOW_SHOWN`
    * `Window.WINDOW_MINIMIZED`
    * `Window.WINDOW_MAXIMIZED`
    * `Window.WINDOW_FULL_SCREEN`
    * `Window.WINDOW_HIDDEN`

#### methods:

  * `window.move(x,y [,width, height [, "client" ]])` - move/size window;
  * `window.close([value])` - request to close the window, the value is a return value used in modal dialogs;
  * `window.selectFile(...)` - file open/save dialog, TBD;
  * `window.selectFolder(...)` - folder open dialog, TBD;

#### class methods and properties:

  * `Window.this` - instance of Window class - this window reference;
  * `Window.screenBox([monitor,] whatBox, boxPart)` - reports geometry of desktop, TBD

## Sciter

`Sciter` is a namespace holding various Sciter specific methods and variables

#### properties:

  * `Sciter.version` - string, current engine version in the form "X.X.X.X";

#### methods:

  * `Sciter.launch(path)` - method to open documents and start applications, TBD;
    
    Example: `Sciter.launch("https://sciter.com")` will open default browser with that url.
