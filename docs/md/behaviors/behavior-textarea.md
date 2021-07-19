# behavior: textarea

Multiline editing behavior for relatively small multiline texts.

For potentially large texts use [plaintext](behavior-textarea.md).

## Elements

that have this behavior applied by default:

* `<textarea>...</textarea>`

## Attributes

that this behavior knows about:

* `readonly` - declares that element is read only.
* `spellcheck` - boolean, "true" | "false", enable/disable spell checking.

## Events

Together with the standard set of events (mouse, keyboard, focus) *behavior: button* generates:

* `"input"` or `"change"` - value of the element was changed due to user actions. Posted (asynchronous) event.
* `"changing"` event - sent when value of the element is about to change. Synchronous event.

## Value

string, reflects current status of internal editing buffer.

## Special key combinations

* LEFT, CTRL+LEFT, SHIFT+LEFT, CTRL+SHIFT+LEFT
* RIGHT, CTRL+RIGHT, SHIFT+RIGHT, CTRL+SHIFT+RIGHT
* HOME, SHIFT+HOME
* END, SHIFT+END
* BACKSPACE, ALT+BACKSPACE, CTRL+BACKSPACE
* CTRL+A
* DELETE, SHIFT+DELETE, CTRL+DELETE
* INSERT, SHIFT+INSERT, CTRL+INSERT
* CTRL+X
* CTRL+V
* CTRL+Z
* CTRL+(LEFT)SHIFT and CTRL+(RIGHT)SHIFT - in forms having the `dir` attribute these key combinations switches between `dir="ltr"` and `dir="rtl"`.

## Script API

Note: API of plaintext is accessible on element by using *.textarea.* interface modifier:

```JavaScript
const editor = document.$("textarea#editor");
editor.textarea.insertText("foo");
```

### Properties

* `textarea.selectionStart`, `textarea.selectionEnd`: 
  
  read-only, integer, indexes of start and end of the selection. selectionEnd is an index of character next to selected text. 

* `textarea.selectionText`

  read-only, string, selected text or empty sting if there is no selection or selection is collapsed.

### Methods

* `textarea.selectAll()`
  
  selects whole text.

* `textarea.selectRange(start:integer, end:integer)`
  
  selects text range, *end* position is not included into selection.

* `textarea.appendText(text:string): true|false`
  
  appends the text at the end of the text;

* `textarea.insertText(text:string): true|false`
  
  Removes selected text (if any) and inserts the text at current position. 

* `textarea.removeText() : true|false`
  
  removes selected text;

