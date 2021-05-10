# behavior: menu

This behavior provides basic hierarchical menu functionality

## Elements

that have this behavior applied by default to:

* `<menu class="context">` - context menu;
* `<menu class="popup">` - popup menu.

## Model

Example of menu declaration in Sciter:

```XML
<menu.popup>
  <li id="file-open">Open File <span.accesskey>Ctrl+O</span></li>
  <hr>
  <li id="file-save">Save File <span.accesskey>Ctrl+S</span></li>
  <li id="file-save-as">Save File as ...<span.accesskey>Ctrl+Shift+S</span></li>
</menu>
```

`<li>` elements or any other block element that has `role=menu-item` attribute defined are treated as selectable menu items and so generate "click" events.

For example, this markup:

```XML
<menu.popup>
  <table>
    <tr><td role="menu-item" id="red">Red</td>
        <td role="menu-item" id="green">Green</td>
        <td role="menu-item" id="blue">Blue</td></tr>
    <tr><td role="menu-item" id="cyan">Cyan</td>
        <td role="menu-item" id="magenta">Magenta</td>
        <td role="menu-item" id="yellow">Yellow</td></tr>
  </table>
</menu>
```

will render popup menu with menu items organized in 3x2 table.

Menu items may have sub-`<menu>`s

```XML
<menu.popup>
  <li id="file-open">Open File <span.accesskey>Ctrl+O</span></li>
  <hr>
  <li>Recent Files
    <menu id="LRU">
      <li>My file.htm</li>
      <li>His file.htm</li>
      <li>Her file.htm</li>
    </menu>
  </li>
</menu>
```

## Attributes

behavior: menu is not using any specific attributes.

## Methods

Normally menus are invisible - declared with display:none styles. As menus have quite specific life cycle their visibility cannot be described in terms of CSS.

To show the menu you shall call `menuOwnerElement.popup(menuElement, ...)`. Where the `menuOwnerElement` is the DOM element that will "own" the menu and menuElement is one of `<menu>` elements that you want to present for the owner element.

## States

* `:owns-popup`  state flag is set on menu owner element ( `menuOwnerElement` above ) when menu is shown;
* `:popup` \- is set on the `<menu>` element when it is shown.

## Events

* `"click"` - posted when user clicks on menu item, Event.target is the menu item.

## Value

N/A

## Menu item clicks handling in script

```JavaScript
var menuitem = document.$("menu#some>li:first-child");
menuitem.onclick = function(evt) { ... }
```

### `on()` subscription

```JavaScript
document.on("click", "menu#some > li.file-open", function(evt) { 
  // 'this' here is that li#file-open item  
});
```
