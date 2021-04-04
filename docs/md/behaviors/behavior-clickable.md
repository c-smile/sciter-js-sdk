# behavior:clickable

Clickable non-focusable element. Lightweight button if you wish that generates BUTTON\_CLICK events on MOUSE\_DOWN/UP events.

## Elements

These elements have `behavior:clickable` applied by default.

* `<toolbar><button></button></toolbar>` (button inside toolbar element)

## Attributes

N/A

## Events

Other than standard set of mouse event the `behavior:clickable` generates:

* `"click"` / BUTTON\_CLICK event, generated on mouse down/up or `spacebar` key press events when button is in focus. Posted (asynchronous) event.
* `"press"` / BUTTON\_PRESS event, generated on mouse down or `spacebar` key down when button is in focus. Synchronous event.

## Methods

N/A - `behavior:clickable` does not introduce any specific methods.

## Value

N/A

## Button clicks handling in script

### raw `onclick` handler

```
let btn = document.$("button#some");
btn.onclick = function() { ... event handling code ... }

```

### `on()` subscription

```
let btn = document.$("button#some");
btn.on("click", function() { ... event handling code ... });
document.on("click", "button#some", function() { ... event handling code ... });

```