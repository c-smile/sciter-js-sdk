# behavior: integer

Integer number input element behavior. This behavior can be applied to any suitable element.

## Elements

that have this behavior applied by default:

* `<input type="integer" />` - inline integer input element or just
* `<input|integer />`

## Model

Upon initialization the behavior creates following DOM structure:

```XML
<input>
  <caption /> 
  <button.plus />
  <button.minus />
</input>
```

Where `<caption>` will have [`behavior:edit`](behavior-edit.md) applied with corresponding filter set. `<button.plus>`/`<button.minus>` sub-elements will be created if the input has attribute `step` defined.

All sub-elements will have `:synthetic` state flag set on them.

## Attributes

that this behavior knows about:

* `value=integer` \- initial value of the input element
* `min=integer` \- minimal allowed value.
* `max=integer` \- maximal allowed value.
* `step=integer` \- increment/decrement step. If this property is defined the behavior will create additional -/+ buttons.
* `placeholder="text"` \- if editbox is empty then it shows text provided by the *novalue* attribute. You can style this state by using `:empty` CSS selector.
* `readonly` \-  declares that element is read only.

## Events

Aside of standard set of events (mouse, keyboard, focus) *behavior: button* generates:

* `"input"|"change"` / EDIT_VALUE_CHANGED event - value of the element was changed due to user actions. Posted (asynchronous) event.
* `"changing"` / EDIT_VALUE_CHANGING event - sent when value of the element is about to change. Synchronous event.

## Value

integer or undefined, reflects current status of internal editing buffer.

## Special key combinations

* LEFT, CTRL+LEFT, SHIFT+LEFT, CTRL+SHIFT+LEFT
* RIGHT, CTRL+RIGHT, SHIFT+RIGHT, CTRL+SHIFT+RIGHT
* HOME, SHIFT+HOME
* END, SHIFT+END
* BACKSPACE, ALT+BACKSPACE, CTRL+BACKSPACE
* CTRL+A
* DELETE, SHIFT+DELETE, CTRL+DELETE
* INSERT, SHIFT+INSERT, CTRL+INSERT
* CTRL+X
* CTRL+V
* CTRL+Z
* CTRL+(LEFT)SHIFT and CTRL+(RIGHT)SHIFT - in forms having the `dir` attribute these key combinations switches between `dir="ltr"` and `dir="rtl"`.

## Methods

N/A - this input element has no specific methods but `<caption>` sub-element has behavior:edit specific methods.