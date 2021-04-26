# behavior: scrollbar

Implements standalone scrollbar input element.

## Elements

that have this behavior applied by default:

* `<widget|vscrollbar />` and `<widget|hscrollbar />`- vertical and horizontal scrollbars

## Attributes

that this behavior knows about:

* `for="selector"` - declares that this scrollbar is bound to other scrollable element as its (external) scrollbar.

## Methods

* `scrollbar.values(position:int, min:int, max:int, page:int, step:int)`
  
  Sets values of scrollbar element - position, min, max, page - reflects to size of scrollbar slider, step - increment value of on arrow buttons clicks.

## Properties

* `scrollbar.position` - read/write, integer - current slider position.
* `scrollbar.min` - read-only, integer - min value.
* `scrollbar.max` - read-only, integer - max value.
* `scrollbar.page` - read-only, integer - page value, reflects also size of scrollbar's slider.
* `scrollbar.step` - read-only, integer - page value, defines position increment/decrement of clicks on arrow buttons.

## Value

integer, reflects position of slider, integer in range \[min ... max\].

## Events

Along with the standard set of events (mouse, keyboard, focus) *behavior: scrollbar* generates:

* `"scroll"`
* `"scroll-step-plus"`
* `"scroll-step-minus"`
* `"scroll-page-plus"`
* `"scroll-page-minus"`
* `"scroll-slider-press"`
* `"scroll-slider-release"`

Events are delivered to the element and are not bubbling up to its parents. Use `element.on("scroll",function(evt) {})` handler in script to handle scroll events.