
# behavior: menu-bar

This behavior provides horizontal menu bar - top level container for popup menus.

Default style system of the engine does not provide default styling of menu bars. If your application needs menu bars use {sdk}/samples/menu/std-menu.css as a prototype.

## Elements

No elements has this behavior applied by default.  {sdk}/samples/menu/std-menu.css assumes that top level menu is defined by `<ul id="menu-bar">`  element.

## Model

Example of menu declaration in Sciter:

```XML
<ul id="menu-bar">
  <li>
    <caption>File</caption>
    <menu>
      <li id="file-open">Open File <span.accesskey>Ctrl+O</span></li>
      <hr>
      <li id="file-save">Save File <span.accesskey>Ctrl+S</span></li>
      <li id="file-save-as">Save File as ...<span.accesskey>Ctrl+Shift+S</span></li>
    </menu>
   <li>
   ...
</ul>
```

## Attributes

behavior:menu-bar is not using any specific attributes.

## Methods

No specific methods.

## States

* `:owns-popup` - state flag is set on menu owner element ( `menuOwnerElement` above ) when menu is shown;
* `:popup` - is set on the`<menu>`  element when it is shown.

## Events

* `"click"` - posted when user clicks on menu item, Event.target is the menu item.

## Value

N/A

### `on()` subscription

```JavaScript
document.on("click", "li#file-open", function(evt) {
  // 'this' here is that li#file-open item
});
```
