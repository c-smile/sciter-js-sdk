# behavior: radio

Standard radio button implementation. Can be applied to any group of elements having the same name to achieve one-of-group checked functionality.

## Elements

that have this behavior applied by default:

* `<input type="radio">` - standard HTML inline radio button;
* `<button type="radio">` - inline radio button, use it as `<button|radio(group)>first</button>` `<button|radio(group)>second</button>`.

## Attributes

that this behavior knows about:

* `checked` \- if provided will initialize value of runtime state of the flag *checked*.
* `name="groupname"` \- standard attribute *name* has special meaning for the radio: radio buttons with the same name constitute single group.
* `value="..."` \- standard value attribute (used by `behavior:form`).
* `as="string | integer | float | numeric | auto"` - defines how *value* attribute is reported to script. By default value of element with `value="42"` will be just as a string `"42"` but `value="42" as="integer"` will yield integer `42`.

## Events

Aside of standard set of events (mouse, keyboard, focus) *behavior:radio* generates:

* `"click"` event - the button just changed its state to checked. Asynchronous event.
* `"change"` | `"input"` event - checked state of the element changed due to user action.

## Value

`true/false`, reflects current status of `:checked` state flag.

Note: behavior:form treats all radio elements of the group as a single value equal to "value" attribute of checked element in the group.