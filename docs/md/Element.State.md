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
* `value` - any value - runtime value coerced to particular type. Actual for input elements.

Properties of Element.State may cause CSS pseudo-class rules to be triggered: 

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
* `element.state.showPopup(...)` - TBD. 
* `element.state.closePopup()` - TBD. 
* `element.state.capture(false | true)` set/remove mouse capture, where:
  * `false` - remove capture if the element owns capture now;
  * `true` - captures mouse events by the element. Mouse events will be delivered to the element only.

