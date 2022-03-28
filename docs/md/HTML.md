# HTML

Sciter extends regular HTML with elements, features and easier ways of doing things.

The table shows how things can be done the Sciter way:

| Sciter | Regular HTML |
| ------ | ------------ |
| `<input #id />`   | `<input id="id" />`
| `<input .class />` | `<input class="class" />`
| `<input \|text />` | `<input type="text" />`
| `<input (name) />` | `<input name="name" />`

_NOTE_ In Sciter, the space after the element is optional. Regular html and Sciter html can be mixed in the same document.

## Elements

Those are Sciter specific elements, most of them have a custom [behavior](behaviors/README.md) assigned.

| Element | Description |
| ------- | ----------- |
| `<popup>` | popup element (preferred to be placed in `<head>`)
| [`<menu .context>`](behaviors/behavior-menu.md)  | [context-menu styled](CSS/css-sciter.md) element
| [`<menu .popup>`](behaviors/behavior-menu.md)  | [context-menu styled](CSS/css-sciter.md) element
| [`<plaintext>`](behaviors/behavior-plaintext.md) | Multiline text editor
| [`<htmlarea>`](behaviors/behavior-richtext.md) | WYSIWYG/richtext/html editor
| [`<frameset>`](behaviors/behavior-frame-set.md) | child elements to be resizable window blocks
| [`<select\|tree>`](behaviors/behavior-tree-view.md) | Tree-list select element, one of [behavior select](behaviors/README.md) types
| `<include src="some.html"/>` | Inserts HTML fragment file in place.


## Attributes

| Attribute  | Description |
| ---------  | ----------- |
| `spellcheck` | true/false enable or disable spellcheck
| `selectable` | allow content selection (behavior)
| `novalue`    | synonym of `placeholder`
| `role="window-caption"` | Allow to drag the window through this element
| `role="window-minimize"` | Instructs the element to behave as window minimize button
| `role="window-maximize"` | Instructs the element to behave as window maximize button
| `role="window-close"` | Instructs the element to behave as window close button
| `role="window-icon"` | Instructs the element to behave as window icon - on Windows it shows window menu on click on it.


## Window Attributes

Window (`<html>`) specific attributes

| Attribute | Description |
| --------- | ----------- |
| `window-frame` | `default\|standard\|solid\|solid-with-shadow\|extended\|transparent` define window type
| `window-icon`  | Window icon URL
| `window-title` | Window title
| `window-width` | initial width of the window, CSS length units
| `window-height`| initial height of the window, CSS length units
| `window-min-width` | minimal width of the window, CSS length units
| `window-min-height`| minimal height of the window, CSS length units
| `window-max-width` | maximal width of the window, CSS length units
| `window-max-height`| maximal height of the window, CSS length units
| `window-resizable`  | `true\|false\|LENGTH-UNIT` i.e. `10px` counted from window frame inwards
| `window-minimizable` | `true\|false`
| `window-maximizable` | `true\|false`
| `window-blurbehind` | `auto\|dark\|light\|ultra-dark\|ultra-light` translucent effect.
| `window-state` | `shown\|minimized\|maximized\|full-screen\|hidden` - initial state of HTML window
| `lang` | ISO 639-1 value, define dictionary for spellcheck, Date...
| `disable-debug` | do not connect to inspector


## Misc

- **Attribute events (onclick..) are not supported. (unless you implement method for it to work).**
- Sciter allows the use of custom element tags, make sure to give them a default style.
- You can show popup with [`Element.popup`](Element.md#popup).
- String `&platform-cmd-mod;` is replaced with `Ctrl/CMD...`
- [List of input elements](https://sciter.com/developers/for-web-programmers/input-elements-map/)
