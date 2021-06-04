# class Element.State

NOTE: Sciter specific - browsers do not provide this feature at all

Instances of Element.State class represent **runtime** flags and state on element. 

Most of the time Element.State reflect state so called CSS pseudo-classes (flags): 

```JavaScript
element.state.visited = true;
```

will trigger 

```CSS 
element:visited {
  color: red;
}
```

rule to be applied.

#### Properties:  

* `link`
* `hover`
* `active`
* `focus`
* `ownsfocus`
* `visited`
* `current`
* `checked`
* `selected`
* `disabled`
* `readonly`
* `expanded`
* `collapsed`
* `incomplete`
* `invalid`
* `animating`
* `focusable`
* `anchor`
* `ownspopup`
* `tabfocus`
* `empty`
* `busy`
* `dragover`
* `droptarget`
* `moving`
* `copying`
* `dragsource`
* `pressed`
* `popup`
* `ready`
* `reactive` - `element.state.reconciliation = false;` will prevent reconciliation of element's content by Reactor
* `value` - any value - runtime value coerced to particular type. Actual for input elements.
* `occluded:integer` - read-only, reports visibility status of the element, if `0` then the element is visible in full, otherwise combination of these flags:
  * `0x1` - left side of border box is clipped out (invisible).
  * `0x2` - top side is clipped.
  * `0x4` - right side is clipped.
  * `0x8` - bottom side is clipped.
  `0xf` value means that the element is completely clipped out - invisible.

Some properties of Element.State may cause CSS pseudo-class rules to be triggered:

```JavaScript
section.state.expanded = true;
```

will trigger second rule here

```CSS
section > div.content { visibility:none; /* a.k.a. display:none */ }
section:expanded > div.content { visibility:visible; }
```

#### Methods:

* `element.state.contentWidths() : [minWidth,maxWidth]`
* `element.state.contentHeight(forWidth) : height`

* `element.state.metrics(...)` - returns various metrics of the element (that is `element.box()` in Sciter), TBD. 

* `element.state.capture(false | true)` set/remove mouse capture, where:
  * `false` - remove capture if the element owns capture now;
  * `true` - captures mouse events by the element. Mouse events will be delivered to the element only.

* #### `element.state.box(what,boxOf[,relativeTo[, asPpx: bool ]])`

  Returns various metrics of the element. 

  _what_ determines structure of return value and is one of:

  * "xywh" - function returns [x,y,width,height] values of the rectangle; 
  * "position" - [x,y], position of the rectangle;
  * "dimension" - [width,height];
  * "left", "right", "top", "bottom" - single number;
  * "width", "height" - single number;

  _boxOf_ defines particular metric of the element:

  * "inner" - inner box of the element in terms of CSS box model;
  * "border" - border box of the element;
  * "padding" - padding box of the element;
  * "margin" - margin box of the element;
  * "client" - client box of the element - scrollable area of the element, usually that is padding box minus scrollbars;
  * "content" - content outline of the element. For scrollable elements that is size of scrollable content;
  * "caret" - caret postion (if any);
  * "icon" - position of foreground image of the element;

  _relativeTo_ defines offset of x/y values of returned box, one of:

  * "screen" - relative to screen - absolute coordinates of the element on screen (desktop);
  * "window" - relative to client area of the window;
  * "document" - relative to root element - document;
  * "parent" - relative to DOM parent of the element;
  * "container" - relative to layout container - for position'ed elements this tells position relative to nearest positioned container;
  * "self" - default, relative to the element itself, "inner" x/y are 0 in this case;

  _asPpx_ if defined and is _true_ tells the function to return coordinates in screen pixels. By default the function returns logical CSS pixels, a.k.a. DIPs - logical units, 1/96 of inch.   