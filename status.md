# Sciter.JS: DOM and Runtime status

Implemented so far (list will be extended): 

* [Document](https://github.com/c-smile/sciter-js-sdk/wiki/DOM.Document)

## Element extends Node

#### Properties:

* `element.className`
* `element.id`
* `element.tagName`
* `element.innerHTML`
* `element.outerHTML`
* `element.innerText`
* `element.firstElementChild`
* `element.lastElementChild`
* `element.nextElementSibling`
* `element.previousElementSibling`
* `element.value`

#### Methods:

* `element.appendChild(node)`
* `element.insertBefore(node, refNode)`
* `element.insertAfter(node, refNode)`
* `element.removeChild(node)`
* `element.replaceChild(newNode,oldNode)`
* `element.insertAdjacentHTML(where, html)`
* `element.querySelector(selector)`
* `element.querySelectorAll(selector)`
* `element.addEventListener(...)`
* `element.getAttribute()`
* `element.getAttributeNames()`
* `element.removeAttribute()`
* `element.setAttribute()`

#### Methods (Sciter.JS specific):

* `element.on(eventname: string, [selector: string,] handler: function): Element`

  jQuery style event subscription:
  
  * eventname may start with `^` for handling events in capturing phase;
  * eventname may contain namespace part: `"click.myns"` ;
  * the handler is called with `this` set to element matching the selector;
  * the method returns element itself allowing to chain `on` calls;

* `element.off(eventname: string): Element`

  Unsubscribe event handlers either by name  `"click"` or by namespace `".myns"`.

* `element.off(handler: function): Element`
  
  Unsubscribe event handlers by function reference;


### Node

#### properties:

* `node.nodeName`
* `node.nodeType`
* `node.nodeValue`
* `node.firstChild`
* `node.lastChild`
* `node.nextSibling`
* `node.previousSibling`
* `node.ownerDocument`
* `node.parentNode`
* `node.parentElement`
* `node.textContent`

#### methods:

* `node.cloneNode()`
* `node.contains()`
* `node.compareDocumentPosition()` - not yet
* `node.getRootNode()`
* `node.hasChildNodes()`
* `node.isEqualNode()`
* `node.isSameNode()`

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
