# HTML

Sciter extends regular HTML with elements, features and easier ways of doing the same things.

The following is a table of the what can be done in 'Sciter-way' instead (can be mixed)  

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
| [`<plaintext>`](behaviors/behavior-plaintext.md) | Multiline text editor
| [`<htmlarea>`](behaviors/behavior-richtext.md) | WYSIWYG/richtext/html editor
| [`<frameset>`](behaviors/behavior-frame-set.md) | child elements to be resizable window blocks
| [`<select\|tree>`](behaviors/behavior-tree-view.md) | Tree-list select element, one of [behavior select](behaviors/README.md) types
| `<include src=""/>` | Inserts HTML file in place.


## Attributes

| Attribute  | Description |
| ---------  | ----------- |
| `spellcheck` | true/false enable or disable spellcheck
| `selectable` | allow content selection (behavior)
| `novalue`    | synonym of `placeholder`
| `role="window-caption"` | Allow to drag the window through this element


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
| `window-blurbehind` | `auto\|dark\|light\|ultra-dark\|ultra-light` translucent effect.
| `window-state` | `shown\|minimized\|maximized\|full-screen\|hidden` - initial state of HTML window
| `lang` | ISO 639-1 value, define dictionary for spellcheck, Date...


## Misc

- Sciter allow the use of the custom element tags, make sure to give it a default style.
- You can show popup with [`Element.popup`](Element.md#popup).
- Attribute events (onclick..) are not supported. (unless you implement method for it to work).
- String `&platform-cmd-mod;` is replaced with `Ctrl/CMD...`
- [List of input elements](https://sciter.com/developers/for-web-programmers/input-elements-map/)
