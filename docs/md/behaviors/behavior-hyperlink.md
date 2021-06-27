
# behavior: hyperlink

Standard hyperlink behavior. It can be applied to any DOM element having `href` attribute defined.

## Elements

These elements have this behavior by default:

* `<a href="url">...</a>`

## Attributes

This behavior knows about:

* `href="url"` - hyperlink url;
* `target="ID"` - ID of frame element where to load the URL content.
* `target="@system"` - this will instruct the engine to open the url in default application registered in the system for this file type.
  
   So `href="test.txt" target="@system"` will be opened in notepad.exe (or its equivalent) and `href="https://sciter.com" target="@system"` will be openeed in default browser. 

## Events

Other than standard set of events (mouse, keyboard, focus) *behavior:hyperlink* generates:

* `"click"/ HYPERLINK_CLICK event, generated on mouse down/up or `spacebar` key press events when button is in focus. Posted (asynchronous) event.

If this is event is not consumed by user's code then nearest document will handle URL loading.

## Methods

N/A - behavior:hyperlink does not introduce any specific methods.

## Value

N/A.

## Hyperlink click handling in script

### raw `onclick` handler

```JavaScript
var btn = document.$("a#some");
btn.onclick = function() { event handling code ...; 
                           return true; /*consume the event*/ }
```

### `on()` subscription

```JavaScript
var btn = document.$("a#some");
btn.on("click", function() { ... event handling code ... });
document.on("click", "a#some", function() { ... event handling code ... });
```

### class method handler

```JavaScript
class SomeComponentWithLinks extends Element {
  ...
  
  ["on click at a#some"](evt, a) {... event handling code ... }
}
```

