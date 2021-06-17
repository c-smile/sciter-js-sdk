# class Window

Instances of the Window class represent desktop windows.

`Window.this` is a reference to current window object - instance of Window class where HTML document is loaded.

NOTE: the _window_ below is an instance of Sciter's Window class - e.g. `Window.this` but not that strange "window" thing of browsers. 

## constructor:

* `new Window {params}`

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
  * `params.state` : - optional - window state, is one of:

    * `Window.WINDOW_HIDDEN`
    * `Window.WINDOW_SHOWN` - default type
    * `Window.WINDOW_MAXIMIZED`
    * `Window.WINDOW_MINIMIZED`
    * `Window.WINDOW_FULL_SCREEN`

  * `params.url` : string - optional, window html source code file.
  * `params.parameters` : array | string | object, ... - optional, extra parameters to pass to the new window.

## properties:
 
  * `window.state` - read/write, one of:
    * `Window.WINDOW_SHOWN`
    * `Window.WINDOW_MINIMIZED`
    * `Window.WINDOW_MAXIMIZED`
    * `Window.WINDOW_FULL_SCREEN`
    * `Window.WINDOW_HIDDEN`
  * `window.graphicsBackend` - read-only, string, reports current graphics backend used: "direct2d", "Skia/OpenGL", etc. 
  * `window.minSize = [w,h]` - get/set minimal size of resizable window. 
  * `window.maxSize = [w,h]` - get/set maximum size of resizable window.
  * `window.blurBehind = "none" | "auto" | "dark" | "ultra-dark" | "light" | "ultra-light"` - blur-behind effect configuration.
  * `window.isActive` - read-only, boolean, reports if window has input focus.
  * `window.isResizable` - read/write, boolean, true if window can be resized by the user.
  * `window.isMaximizable` - read/write, boolean, true if window can be maximized by the user.
  * `window.isMinimizable` - read/write, boolean, true if window can be minimized by the user.
  * `window.isTopmost` - read/write, boolean, true if window is topmost at z-order.
  * `window.isEnabled` - read/write, boolean, true if the window is allowed to accept user's input.
  * `window.aspectRatio` - read/write, float, width to height ratio to keep on window resizes.
  * `window.eventRoot = element | null` - if set by element, short circuits all UI events to that element and its children as if the window contains only that element. Used in lightbox dialog scenarios (see: samples.sciter/lightbox-dialog).
  * `window.focus` - read/write, DOM element in focus.
  * `window.parent` - read-only, Window | null - parent window of this one.
  * `window.document` - read-only, Document - root document of the window.

## methods:

  * `window.box(boxPart,boxOf[,"screen"]):[...]` reports geometry of the window, where:
  
    _boxPart_ defines what part of the box to return, is one of:
  
    * `"xywh"` or `"rectw"`  - [x,y,w,h], array, position and dimension of the rectangle.
    * `"rect"` - [x1,y1,x2,y2], array, positions of origin and corner of the rectangle.
    * `"position"` - [x,y], array, position of the rectangle.
    * `"dimension"` - [w,h], array, dimension of the rectangle.
    * `"left"`,`"top"`,`"right"`,`"bottom"`,`"width"`,`"height"` - individual integers.

    _boxOf_ is one of:

    * `"border"` - border area of the window that includes window caption and borders arouns client area;
    * `"client"` - client (content) area of the window.  

    If _"screen"_ parameter is provided then function returns coordinates relative to screen. 

    Note: the function returns values in screen pixels.
  
  * `window.move(x,y [,width, height [, "client" ]])` - move/size window;
  * `window.close([value])` - request to close the window, the value is a return value used in modal dialogs;
  * `window.selectFile(...)` - file open/save dialog, TBD;
  * `window.selectFolder(...)` - folder open dialog, TBD;
  * `window.mediaVar(varname[,value])` - gets/sets media variable that can be used in CSS as `@media varname {...}`
  * `window.mediaVars([values:object])` - gets/sets media variables. 
  * `window.addEventHandler("eventname", handler)` - subscribe to window related events 
  * `window.on("eventname", handler)` - subscribe to window related events 
  * `window.off("eventname" | handler)` - unsubscribe event handler either by name, namespace or handler reference  
  * `window.xcall(name:string [, arg0, ..., argN]): any`

    Interaction with native behaviors attached to the window. `window.xcall("foo")` will end up in [`handle_scripting_call()`](https://github.com/c-smile/sciter-js-sdk/blob/main/include/sciter-x-behavior.h#L749) of native behavior attached to the window using [SciterWindowAttachEventHandler](https://github.com/c-smile/sciter-js-sdk/blob/main/include/sciter-x-behavior.h#L898) API.

  * `window.trayIcon({image: Graphics.Image, text: string})` - show tray icon with the image and tooltip text.

    Tray icon will generate ["trayiconclick"](#trayiconclick) event on user clicks.

  * `window.trayIcon("remove")` - remove tray icon.
  * `window.trayIcon("place") : [x,y,w,h]` - reports location of the icon on desktop, coordinates are in screen pixels.
  * `window.screenBox(what [, boxPart])` - reports geometry of monitor this window is on. 

    _what_ defines what information to return, is one of:

    * `"frame"` - physical position and size of the monitor in screen pixels projected on desktop.
    * `"workarea"` - physical position and size of work area on the monitor ( frame minus taskbar )
    * `"device"` - string, name of the monitor.
    * `"isPrimary"` - boolean, true is that is primary monitor.
    * `"snapshot"` - Graphics.Image, returns snapshot (screenshot) of the monitor.

    _boxPart_ defines what part of the box to return, is one of:

    * `"xywh"` or `"rectw"`  - [x,y,w,h], array, position and dimension of the rectangle.
    * `"rect"` - [x1,y1,x2,y2], array, positions of origin and corner of the rectangle.
    * `"position"` - [x,y], array, position of the rectangle.
    * `"dimension"` - [w,h], array, dimension of the rectangle.
    * `"left"`,`"top"`,`"right"`,`"bottom"`,`"width"`,`"height"` - individual integers.

  * ##### `window.modal(JSX) : any` 
    
    shows message box: `<info>..</info>`, `<alert>..</alert>`, `<error>..</error>`, `<question>..</question>`.
  
  * ##### `window.modal({params}) : any`
    
    shows new window as dialog, for params see `new Window({params})` above. The function returns window close value of `window.close(valToReturn)` call inside the window. 

  * `window.performDrag(data:object, mode: "copy" | "move", dragIcon: Image | Element[, dragIconXoff:int, dragIconYoff:int] ): null | "copy" | "move"` - performs drag-and-drop using system D&D mechanism.

    `data` is an object that may contain one or several fields: 
    * `text: string` - plain text data;
    * `html: string` - HTML data; 
    * `file : [path1,path2,...] | path0` - single or multiple file names;
    * `json`: any - any data that can be JSON.stringify'ed;

  * ##### `window.focusable(dir [,reference:element]): element`
    
    The functions allows to enumerate elements in tab order. _dir_ there is one of:

    * "next" - next focusable element after the _reference_;
    * "prior" - previous focusable element after the _reference_;
    * "first" - first focusable DOM element on the window;
    * "last" - last focusable DOM element on the window;

    You can assign found element to `window.focus = element` set focus on it.

    
## class methods and properties:

  * `Window.this` 
    
    instance of Window class - this window reference;

  * `Window.screenBox(monitor:integer, what, boxPart)` 
   
    reports geometry and information of the given monitor. For _what_ and _boxPart_ parameters see window.screenBox() method above.

  * `Window.elementAt(screenX,screenY):Element` 
  
    returns DOM element under screenX/screenY position. 
    Note: this method may return DOM element belonging to any Sciter window in current process. 

  * `Window.ticks():milliseconds`

    returns value of internal timer. 

  * `Window.post( ge: Event )`

    posts global event *ge* to all windows in current process.   


## events

Use `window.on("eventname", handler)` to subscribe to these events: 

  * `"statechange"` - `window.state` flag have changed. 
  * `"resolutionchange"` - after window moved to another monitor with different resolution, or user have changed screen resolution. 
  * `"mediachange"` - one or several CSS media variables have changed. 
  * `"activate"` - the window was deactivated (evt.reason == 0) or got focus (evt.reason > 0)
  * `"replacementstart"` 
  * `"replacementend"` - user start/end moving or resizing window chrome.
  * `"move"` - user moved the window.
  * `"size"` - user changed size of the window.
  * <a id="trayiconclick"></a>`"trayiconclick"` - click on tray icon.

