# HTML

Sciter extends regular HTML with elements, features and easier ways of doing the same things.

The following is a table of the what can be done in 'Sciter-way' instead

| Sciter | Regular HTML |
| ------ | ------------ |
| `<input #id />`   | `<input id="id" />`
| `<input .class />`| `<input class="class" />`
| `<input\|text />` | `<input type="text" />`
| `<input(name) />` | `<input name="name" />`


## Elements

Those are Sciter specific elements, most of them have a custom [behavior](behaviors/README.md) assigned.

| Element | Description |
| ------- | ----------- |
| `<popup>` | popup element (preferred to be placed in `<head>`)
| [`<menu .context>`](behaviors/behavior-menu.md)  | [context-menu styled](CSS/css-sciter.md) element
| [`<plaintext>`](behaviors/behavior-plaintext.md) | Multiline text editor, each line is a `<text>` element
| `<htmlarea>` | WYSIWYG editor with [richtext behavior](behaviors/behavior-richtext.md)
| [`<frameset>`](behaviors/behavior-frame-set.md) | child elements to be resizable window blocks
| [`<select\|tree>`](behaviors/behavior-tree-view.md) | Tree-list select element, one of [behavior select](behaviors/README.md) types


## Attributes

| Attribute  | Description |
| ---------  | ----------- |
| `spellcheck` | true/false enable or disable spellcheck
| `selectable` | assign [behavior: selectable](behaviors/behavior-selectable.md)
| `novalue`    | synonym of `placeholder`
| `role="window-caption"` | Allow to drag the window through this element


## Window Attributes

Window (`<html>`) specific attributes

| Attribute | Description |
| --------- | ----------- |
| `window-frame` | `default\|standard\|solid\|solid-with-shadow\|extended\|transparent` define window type
| `window-icon`  | Window icon
| `window-title` | Window title
| `window-width` | initial width of the window
| `window-height`| initial height of the window
| `lang` | ISO 639-1 value, define dictionary for spellcheck


## Misc

- Sciter allow the use of the custom element tags, make sure to give it a default style.
- You can show popup with [`Element.popupAt`](Element.md).

