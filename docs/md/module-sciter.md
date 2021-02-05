# module `@sciter`

The module contains Sciter specific functions.

#### constants:

  * `VERSION` - constant string, current engine version in the form "X.X.X.X";
  * `REVISION` - constant string, SVN build revision;
  * `QUICKJS_VERSION` - QuickJS version

#### functions:

  * `devicePixels(length: int | string[,axis])` - converts _length_ to device (screen) pixels. 
    - _length_ can be integer - number of dips (a.k.a. "CSS pixels")  
    - or a string like "2in" to get number of screen pixels in 2 inches of a ruler placed on screen.
    - _axis_ is either "width" or "height", note axis parameter makes sense only for devices that have different resolution on x/y axis.

  * `loadLibrary("name"): any` - loads Sciter extension native library (dll,so,dylib). "name" is dll name without extension. The dll shall reside in the same folder as executable. See /sqlite project that can be used to produce sciter-sqlite extension dll.  

  * `on("eventname" [, "selector" ], handler)` - subscribe to any DOM event, conceptually close to `document.on(...)`
  * `off("eventname" | handler)` - unsubscribe from DOM event.

  * `$("selector")` - returns first matched DOM element in current document.
  * `$$("selector")` - returns list (array) of matched DOM elements.


