# behavior: select

Standard behavior of `<select>` with dropdown lists.

## Elements

These elements have behavior:select applied by default:

* `<select></select>`
* `<select|dropdown></select>`

## Model

The `<select>` may contain `<option>` elements that can contain arbitrary markup inside.

The behavior treats `<option>'s` or any other DOM element with attribute `role="option"` as a selectable entity.

Selected option will have `:current`  state flag set.

Simple dropdown select:

```XML
<select>
  <option value="#ff0000" selected>Red</option>
  <option value="#00ff00">Green</option>
  <option value="#0000ff">Blue</option>
</select>
```

will have this DOM model after instantiation:

```XML
<select>
  <caption />
  <button />
  <popup>
    <option value="#ff0000" selected>Red</option>
    <option value="#00ff00">Green</option>
    <option value="#0000ff">Blue</option>
  </popup>
</select>
```

Each part of the select is individually styleable:

```CSS
select > caption { color:red; }
select > button { background: ...; }
select > popup { background: ...; }
```

## Attributes

This behavior knows about:

* `size=integer` - number of visible elements in the list. Note: height of the select element can be overridden by CSS.
* `name="name"` - standard attribute *name* - name of the input element on a form.
* `placeholder="text"` or `novalue="text"` - if select has no `<option selected>` initially it will have this text rendered.
* `as="type"` - defines `<option value="...">` interpretation rule, accepts:
  * `as="auto"`, default value, tries to parse option's value as integer, float, boolean or length value. If parsing fails it returns value as a string.
  * `as="integer"`, tries to parse option's value as integer. If parsing fails it returns value as a string.
  * `as="float"`, tries to parse option's value as float. If parsing fails it returns value as a string.
  * `as="numeric"`, tries to parse option's value as either integer or float. If parsing fails it returns value as a string.
  * `as="string"`, does not parse option's value. Returns value as a string.
* `editable[=true|false]` - if defined the attribute will make caption part editable.

## Events

Other than standard set of events (mouse, keyboard, focus) behavior:select generates:

* `"change"` event, generated when user changes selection of the select (click on one of options). Posted event.
* `"changing"` event, selection is about to change. Synchronous event.

## Methods

* `select.showPopup()` - shows popup list of options; 
* `select.hidePopup()` - closes popup list of options if it is open; 

## Properties

Other than standard properties of DOM elements the select also supports:

* `select.options` - reference to DOM element that holds `<option>` list, in this case this is the `<popup>` element.
   
   Use it to populate options at runtime: 

   ```JS
   const el = document.$("select");
   el.select.options.append(<option value="a">A</option>);
   el.select.options.append(<option value="b">B</option>);
   el.select.options.append(<option value="c">C</option>);
   el.value = "c"; // set current option
  ```
  
## Value

any, read/write. value of selected option. Value of the option is its value attribute or option's text if there is no value defined.

## Selection change handling in script

### raw `onchange` handler

```JavaScript
var sel = document.$("select#some");
sel.onchange = function() { var v = this.value; ... }
```

### `on()` subscription

```JavaScript
var sel = document.$("select#some");
sel.on("change", function() { ... event handling code ... });
document.on("change", "select#some", function() { ... event handling code ... });
```
