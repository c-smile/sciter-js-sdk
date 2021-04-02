# class Element

class Element represents DOM element and extends [Node](Node.md) and so all its methods are available on element.

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
* `element.disabled`
* `element.readonly` 
* `element.src`

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
* `element.dispatchEvent(event: CustomEvent [,post: boolean)` sends or posts instance of [Event](Event.md) class. The _post_ is a Sciter specific flag - if it is provided and is `true` then the function places event into event queue for later dispatch. 
* `element.scrollTo()`
* `element.scrollIntoView()`
* `element.click()` - generates click event on the element 
* `element.focus()` - sets input focus to the element

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

* `element.popupAt(screenX,screenY,alignment)`

  Shows this element as out of canvas popup on screen. _alignment_ is a number in 0..9 range (see keyboard numpad for the meaning). Example `div.popupAt(1000,1000,3)` will show the element with bottom/right corner at 1000/1000 screen pixel. 

* `element.popupFor(anchorElement)`

  Shows this element as out of canvas popup relative to anchorElement.



#### Methods (Sciter.JS/Reactor specific):

* `element.append( vnode )` - appends element defined by JSX expression:
  
   ```JavaScript
   list.append(<li>yet another item</li>);
   ```

* `element.prepend( vnode )` - insert the element as first child

* `element.patch( vnode )` - patches content of the element by `vnode` using rules of ReactJS .

* `element.componentUpdate( obj )` - does the following:  

   ```JavaScript
   Object.assign(element,obj);      // 1. merge properties
   element.post( (element) => {     // 2. enqueue update
     var vnode = element.render();  // 3. calls .render() that must return vnode (JSX expression)
     element.patch(vnode);          // 4. reconciliation / patching
   });
  ```
