# Behaviors - native extensisons of standard DOM elements

Behavors in Sciter are native "DOM element controllers" that get attached to DOM elements by CSS:

```CSS
div.editable {
  behavior:edit; // makes this div to behave as text editing field
  white-space:pre;
  overflow:hidden-scroll;
  border:1px solid;
}
```

Each behavior may have its own method and properties accessible by JavaScript.

In order to avoid name collisions with standard DOM elements those methods and properties are accessible by dot notation that contains behavior name as "interface name":

```JavaScript
let el = document.$("div.editable");

el.edit.setRange(0,10); // call of behavior method
```

Here is a list of such built-in behaviors that are available out of the box in Sciter:

* buttons 
  * [button](button.md) 
  * [clickable](clickable.md) 
  * [hyperlink](hyperlink.md) 
  * [check](check.md) 
  * [radio](radio.md) 
  * [label](label.md) 
  * [slider](slider.md) 
* editors 
  * [edit](edit.md) 
  * [password](password.md) 
  * [masked-edit](masked-edit.md) 
  * [integer](integer.md) 
  * [decimal](decimal.md) 
  * [number](number.md) 
  * [textarea](textarea.md) 
  * [plaintext](plaintext.md) 
  * [richtext](richtext.md) 
* selects 
  * [select](select.md) 
  * [select-multiple](select-multiple.md) 
  * [select-checkmarks](select-checkmarks.md) 
  * [tree-view](tree-view.md) 
  * [tree-checkmarks](tree-checkmarks.md) 
  * [dropdown-select](select-dropdown.md) 
* date/time input 
  * [calendar](calendar.md) 
  * [date](date.md) 
  * [time](time.md) 
* containers 
  * [form](form.md) 
  * [frame](frame.md) 
  * [frameset](frame-set.md) 
* outputs 
  * [output](output.md) 
  * [progress](progress.md) 
  * [video](video.md) 
  * [lottie](lottie.md) 
* lists
  * [vlist](vlist.md)
* menu 
  * [menu](menu.md) 
  * [menu-bar](menu-bar.md) 
* auxiliary 
  * [scrollbar](scrollbar.md)