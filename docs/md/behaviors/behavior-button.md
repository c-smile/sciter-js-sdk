# behavior: button

Standard button behavior. It can be applied to any DOM element converting it to focusable and clickable area.

## Elements

These elements have behavior:button applied by default:

* `<button></button>`
* `<input type=button>`
* `<input type=reset>`
* `<input type=submit>`

## Attributes

This behavior knows about:

* `value="string"` caption that will appear on the `<input type=button>`.
* `name="name"` \- standard attribute *name* \- name of the input element on a form.

## Events

Other than standard set of events (mouse, keyboard, focus) *behavior:button* generates:

* `"click"` / BUTTON\_CLICK event, generated on mouse down/up or `spacebar` key press events when button is in focus. Posted (asynchronous) event.
* `"press"` / BUTTON\_PRESS event, generated on mouse down or `spacebar` key down when button is in focus. Synchronous event. Event "press" is always generated before "click".

## Methods

N/A - behavior:button does not introduce any specific methods.

## `value`

true/false - read-only, value of the button reflects pressed state of the button.

## Button clicks handling in script

### raw `onclick` handler

```JavaScript
let btn = document.$("button#some");
btn.onclick = function() { ... event handling code ... }
```

### `on()` subscription

```JavaScript
let btn = document.$("button#some");
btn.on("click", function() { ... event handling code ... });
document.on("click", "button#some", function() { ... event handling code ... });
```