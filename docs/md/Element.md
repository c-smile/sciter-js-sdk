# class Element

class Element represents DOM element and extends [Node](Node.md) and so all its methods are available on element.

## Properties:

* `element.id`
* `element.elementIndex`
* `element.tagName`
* `element.tag` - lower case version of .tagName
* `element.className`

* `element.innerHTML`
* `element.outerHTML`
* `element.innerText`

* `element.firstElementChild`
* `element.lastElementChild`
* `element.nextElementSibling`
* `element.previousElementSibling`
* `element.childElementCount`

* `element.value`
* `element.style` - returns reference to [Element.Style](Element.Style.md) class.
* `element.state` - returns reference to [Element.State](Element.State.md) class (Sciter.JS specific).

* `element.classList` : 
   * `element.classList.item(n)`
   * `element.classList.add(name, ...)`
   * `element.classList.remove(name, ...)`
   * `element.classList.toggle(name [,force: bool])`
   * `element.classList.contains(name)`
   * `element.classList.length`
   * `element.classList.entries()` - array, list of classes

* `element.children` : list of child DOM elements
   * `element.children[n]` - Nth child element;
   * `element.children.item(n)` - Nth child element;
   * `element.children.length: integer` - quantity of children;
   * `for(let child of element.children)` - iteration of chidren.

* `element.disabled`
* `element.readonly` 
* `element.src`

## Methods:

* `element.appendChild(node)`
* `element.insertBefore(node, refNode)`
* `element.insertAfter(node, refNode)`
* `element.removeChild(node)`
* `element.replaceChild(newNode,oldNode)`
* `element.childElement(n)`
* `element.insertAdjacentHTML(where, html)`

* `element.querySelector(selector)`    | `element.$(selector)`
* `element.querySelectorAll(selector)` | `element.$$(selector)`

* `element.getAttribute()`
* `element.getAttributeNames()`
* `element.removeAttribute()`
* `element.setAttribute()`

* `element.scrollTo()`
* `element.scrollIntoView()`

* `element.click()` - generates click event on the element 
* `element.focus()` - sets input focus to the element

* `element.addEventListener(name, eventHandler [,flags])` 
* `element.removeEventListener(name, eventHandler)` 
* `element.dispatchEvent(event)` 
* `element.postEvent(event)` sciter specific, async version of .dispatchEvent()

## Methods (Sciter specific):

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

* `element.onGlobalEvent(eventname: string, handler: function): Element`

  jQuery style event subscription to application wide events:
  
  * eventname may contain namespace part: `"click.myns"` ;
  * the handler is called with `this` set to the element;
  * the method returns element itself allowing to chain `onGlobalEvent` calls;

The element gets unsubscribed automatically when it gets disconnected from DOM.

See [global-events](../../samples.sciter/global-events/README.md) for the rationale.

* `element.offGlobalEvent([eventname: string | handler: function]): Element`

  Unsubscribe event handlers either by name  `"click"` or by namespace `".myns"` or by handler reference. If no parameter provided then the function will unsubscribe this element from any global event.

* `element.timer(milliseconds, callback: function): true | false`
  
  Starts timer on element. If the element already has timer with that callback it first gets removed and new timer started instead. This allows to implement effective throttling. If the callback function returns `true` value then the timer will keep ticking (like interval timer). The callback is called with `this` set to the element. 

* `element.post(function | event)`

  Posts either function or event to event queue. 

  `element.post(function)` conceptually is equivalent to `setTimeout(function,0)` but with two differences:  
  1. The function will be called with `this` set to the element;
  2. `element.post` checks input queue before sending and if input queue already contains that element/function pair the function will be called only once. 

  `element.post(event)` is equivalent to `element.dispatchEvent()` but instead of immediate dispatch execution it will post the event into event queue for later execution.


* `element.checkCommand(command [, params]): flags`
* `element.executeCommand(command [, params]): flags`

  Support of editing input elements: `<htmlarea>` (WYSIWYG editor), `<plaintext>` (multiline text editor), `<textarea>` and `<input|text>`. TBD.

* `element.xcall(name:string [, arg0, ..., argN]): any`

  Interaction with native behaviors attached to the element. `element.xcall("foo")` will end up in [`handle_scripting_call()`](https://github.com/c-smile/sciter-js-sdk/blob/main/include/sciter-x-behavior.h#L749) of native behavior attached to the element.

* <a name="paintXXX"></a>`element.paintBackground = function(graphics)`
* `element.paintForeground = function(graphics)`
* `element.paintContent = function(graphics)`
* `element.paintOutline = function(graphics)` 

  Immediate mode drawing "ports". Functions assigned to these properties will be called when the element is rendered on screen so they can draw anything on top (or below) of default HTML/CSS rendering.

* `element.requestPaint()` 

  Schedules re-paint of the element. This will trigger `element.paintXXXX` later calls (if any). On Windows this will end up in [InvalidateRect](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-invalidaterect) call.

* <a name="popup"></a>`element.popup(popup:Element | VNode, params : Object )`

  Shows the _popup_ element or VNode (JSX) in out-of-canvas popup window on desktop. Params is an object that may have following fields:

  * _anchorAt_ - 1..9, reference point on anchor border box (see keyboard numpad for the meaning);
  * _popupAt_ - 1..9, reference point on popup's margin box; 
  * _x_, _y_ - optional, explicit window coordinates of _popupAt_ point.

  Engine tries to replace popup so _popupAt_ position is at _anchorAt_ on screen.

* <a name="animate"></a> `element.animate(changer:function,params:object)`  
  
  various animation effects, where *params* contains following fields:

  * `params.duration` - integer, milliseconds - duration of the animation;
  * `params.ease` - string, name of ease function, one of: 
    
    <a name="animate-ease"></a> "linear","ease","ease-in","ease-in-out","ease-out","quad-in","quad-out","quad-in-out","cubic-in","cubic-out","cubic-in-out",
    "quart-in","quart-out","quart-in-out","quint-in","quint-out","quint-in-out","sine-in","sine-out","sine-in-out",
    "expo-in","expo-out","expo-in-out","circ-in","circ-out","circ-in-out","elastic-in","elastic-out","elastic-in-out",
    "back-in","back-out","back-in-out","x-back-in","x-back-out","x-back-in-out","xx-back-in","xx-back-out","xx-back-in-out",
    "bounce-in","bounce-out","bounce-in-out";

  * **`params.effect`** - string, name of transition method, one of: 
    * "blend",
    * "blend-atop",
    * "slide-top",
    * "slide-bottom",
    * "slide-left",
    * "slide-right",
    * "slide-over-top",
    * "slide-over-bottom",
    * "slide-over-left",
    * "slide-over-right",
    * "remove-top",
    * "remove-bottom",
    * "remove-left",
    * "remove-right",
    * "scroll-top",
    * "scroll-bottom",
    * "scroll-left",
    * "scroll-right"

* <a name="animate-step"></a> `element.animate(step:function,params:object)`

  The method offers "manual" animation support. The _step_ function has following signature `function step(progress:0.0 ... 1.0): true | false`

  Sciter will call step function with animation frame rate passing current progress value. If the function returns *false* animation stops.

  *params* may contain following fields:

  * `params.duration` - integer, milliseconds - duration of the animation;
  * `params.ease` - string, optional, name of ease function, see [params.ease](#animate-ease) above. This parameter detemines curvature of *progress* values. 

* <a name="takeOff"></a> `element.takeOff([params:object])` - "airborn" DOM elements - replaced outside of host window. *params* are:

  * `params.x`,`params.y` - numeric, element coordinates, *screen* pixels - new position of DOM element;
  * `params.width`,`params.height`  - optional, numeric, new dimensions in *screen* pixels;
  * `relativeTo` - string, defines meaning of *x* and *y*, one of: "screen","document","window","parent" or "self"
  * `window` - string, defines type of window that will host the element, one of: 
    * "attached" - attached window, will move in sync with the host window; 
    * "detached" - detached window, position will be independent from the host window;
    * "popup" - same as "detached" window, put also will be placed as topmost - on top of other windows on desktop.


* `element.append( vnode )` - appends element defined by JSX expression:
  
   ```JavaScript
   list.append(<li>yet another item</li>);
   ```

* `element.prepend( vnode )` - insert the element as first child

* `element.content( vnode )` - replaces element content by the VNode

* `element.patch( vnode [, onlyChildren:true] )` - patches content of the element by `vnode` using rules of React[or]. If second parameter is provided and is _true_ the function patches only children but not element itself.

* `element.componentUpdate( obj )` - does roughly the following:  

  ```JavaScript
  if(Object.assignIf(element,obj))    // 1. merge properties and if they are different
     element.post( (element) => {     // 2. enqueue update
       var vnode = element.render();  // 3. calls .render() that must return vnode (JSX expression)
       element.patch(vnode);          // 4. reconciliation / patching
     });
  ```

* `element.rangeFromPoint(x,y) : Range | null` 

  Returns collapsed range (caret position) at point x/y. x/a are local coordinates - relative to origin of element's inner box.   
