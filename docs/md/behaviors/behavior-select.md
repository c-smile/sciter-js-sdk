# behavior: select

Standard behavior of `<select>` lists. In principle it can be applied to any DOM element.

## Elements

These elements have behavior:select applied by default:

* `<select size="2...N"></select>`
* `<select|list></select>`

## Model

The `<select>` may contain `<option>` elements contained in arbitrary markup.

The behavior treats `<option>'s` or any other DOM element with attribute `role="option"` as a selectable entity.

Selected option will have `:current`  state flag set.

Examples, simple select:

```XML
<select>
  <option value="#ff0000" selected>Red</option>
  <option value="#00ff00">Green</option>
  <option value="#0000ff">Blue</option>
</select>
```

and `<table>` behaving as a select:

```XML
<style>
  table.select > tbody { behavior:select; }
  table.select > tbody > tr:current { color:white; background:blue; }
</style>

<table.select>
  <tbody>
    <tr role=option value="#ff0000"><td>Red</td><td>#FF0000<td></tr>
    <tr role=option value="#00ff00"><td>Green</td><td>#00FF00<td></tr>
    <tr role=option value="#0000ff"><td>Blue</td><td>#0000FF<td></tr>
  </tbody>
</table>
```

## Attributes

This behavior knows about:

* `size=integer` \- number of visible elements in the list. Note: height of the select element can be overridden by CSS.
* `name="name"` \- standard attribute *name* \- name of the input element on a form.
* `novalue="text"` \- if select has no `<option selected>` initially it will have this text rendered.
* `as="type"` \- defines `<option value="...">` interpretation rule, accepts:
  * `as="auto"`, default value, tries to parse option's value as integer, float, boolean or length value. If parsing fails it returns value as a string.
  * `as="integer"`, tries to parse option's value as integer. If parsing fails it returns value as a string.
  * `as="float"`, tries to parse option's value as float. If parsing fails it returns value as a string.
  * `as="numeric"`, tries to parse option's value as either integer or float. If parsing fails it returns value as a string.
  * `as="string"`, does not parse option's value. Returns value as a string.

## Events

Other than standard set of events (mouse, keyboard, focus) behavior:select generates:

* `"change"` event, generated when user changes selection of the select (click on one of options). Posted event.
* `"changing"` event, selection is about to change. Synchronous event.

## Methods

N/A - behavior:select does not introduce any specific methods.

## Commands

Note: commands are invoked by calling `element.execCommand("cmd-name"\[,params\])`

* **"set-current"** \- when the command is sent to an `<option>` inside the select it causes the option to be current;

## Properties

Other than standard properties of DOM elements the select also supports:

* `options` - reference to DOM element that holds `<option>` list, in this case this is the element itself.

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
