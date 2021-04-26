# behavior:progress

Behavior of progress indicator.

## Elements

that have this behavior applied by default:

* `<progress>`;
* `<meter>`;

## Attributes

* `max=float` - maximum value, 1.0 by default;
* `value=float` - progress value, decimal number in `0.0 ... max` range.
* `name="name"` - standard attribute *name* \- name of the element.

If the element has no max and no value attributes defined it gets rendered with infinite animation.

## Events

N/A - no specific events.

## Value

`float`, progress value in `0.0 ... max` range.

## Methods

N/A - behavior:progress does not introduce any specific methods.