# behavior:check

Standard checkbox button implementation. Can be applied to any element to toggle `:checked` state on it.

## Elements

that have this behavior applied by default:

* `<input type="checkbox">` - standard HTML inline checkbox button;
* `<button type="checkbox">` - Windows like inline checkbox button, use it as `<button type=checkbox >caption</button>`.

## Attributes

that this behavior knows about:

* `checked` - if provided will initialize value of runtime state of the flag *checked*.
* `name="name"` - standard attribute *name* - name of the input element on a form.
* `value="..."` - standard value attribute (used by `behavior:form`).
* `as="string | integer | float | numeric | auto"` - defines how *value* propert is reported to script. By default value of element with `value="42"` will be just as a string `"42"` but `value="42" as="integer"` will yield integer `42`.

## Events

Together with the standard set of events (mouse, keyboard, focus) *behavior:check* generates:

* `"input"|"change"`/BUTTON\_STATE\_CHANGED event - the button just changed its state to checked. Asynchronous event.
* `"press"`/BUTTON\_PRESS event - mouse down or `spacebar` key down when button is in focus. Synchronous event.

## Value

If value is requested from the element directly then value will have `true` or `false` values - reflects current status of `:checked` state flag.

If checkbox element is placed inside a <form> then form's value collection will include value of checkbox@value attribute if it is checked.

## Methods

N/A - behavior:check does not introduce any specific methods.