# behavior: plaintext

Multiline editing behavior that is optimized to handle relatively large (thousands of lines) texts.

## Elements

that have this behavior applied by default:

* `<plaintext>...</plaintext>`

## Attributes

that this behavior knows about:

* `readonly` -  declares that element is read only.
* `spellcheck` - boolean, "true" | "false", enable/disable spell checking.

## Model

Plaintext parses each line of text into a separate `<text>` element:

```XML
<plaintext>
   <text>Line 1</text>
   <text>Line 2</text>
   <text>Line 3</text>
</plaintext>
```

## Events

Together with the standard set of events (mouse, keyboard, focus) *behavior: button* generates:

* `"input"` or `"change"` / EDIT\_VALUE\_CHANGED event - value of the element was changed due to user actions. Posted (asynchronous) event.
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

## Commands

Commands supported by the behavior through `Element.execCommand()` and `Element.queryMethods()`:

* `"edit:cut"` \- cut selection - copy selection to the clipboard and remove it;
* `"edit:copy"` \- copy selection to the clipboard;
* `"edit:paste"` \- paste content of the clipboard;
* `"edit:selectall"` \- select whole content of the element;
* `"edit:undo"` \- undo last editing operation;
* `"edit:redo"` \- redo last operation that was undone;
* `"edit:delete-next"` \- if there is a selection - delete selected content, otherwise delete next character;
* `"edit:delete-prev"` \- if there is a selection - delete selected content, otherwise delete previous character;
* `"edit:delete-word-next"` \- if there is a selection - delete selected content, otherwise delete next word;
* `"edit:delete-word-prev"` \- if there is a selection - delete selected content, otherwise delete previous word;
* `"edit:insert-break"` \- inserts line break;
* `"edit:insert-text"` \- inserts text at current position: `element.execCommand("edit:insert-text", text);`
* navigational commands, move caret:
  * `"navigate:backward"`
  * `"navigate:forward"`
  * `"navigate:word-start`
  * `"navigate:word-end`
  * `"navigate:up"`
  * `"navigate:down"`
  * `"navigate:line-start"`
  * `"navigate:line-end"`
  * `"navigate:start`
  * `"navigate:end"`

## Script API

Note: API of plaintext is accessible on element by using *.plaintext.* interface modifier:

```JavaScript
const editor = document.$("plaintext#editor");
editor.plaintext.load("file://users/documents/readme.txt");
```

### Index accessor and enumeration

* `plaintext.children\[index:integer\]` - string, get/set text line at given position. Use it as: `var firstLine = el.plaintext\[0\];`
* `for(let line of el.plaintext.children)` - string, allows to enumerate text lines one by one.

### Properties

* `plaintext.content`: 
  
  * read, returns **string** - text with \\r\\n line separators;
  * write, accepts either **string** with \\r\\n line separators or **array of strings**.
  
* `plaintext.lines`
  read-only, **integer**, reports number of lines;

* `plaintext.selectionStart`
  `plaintext.selectionEnd`

  read-only, \[lineNumber, linePosition\], returns array that contains two elements: line number and position inside the line;

* `plaintext.selectionText`

  read-only, selected text or empty sting if there is no selection or selection is collapsed.

### Methods

* `plaintext.load(url:string): true|false`
  
  loads file from URL into the editor;

* `plaintext.save(url:string): true|false`
  
  saves content to file defined by the file url;

* `plaintext.selectRange(startLine:integer, startPosition:integer, endLine:integer, endPosition:integer)`
  
  selects text range;

* `plaintext.selectAll()`
  
  selects all text;

* `plaintext.appendLine(text:string | lines: array): true|false`
  
  appends line at the end of the text;

* `plaintext.insertLine(at: integer, text:string | lines: array): true|false`
  
  inserts line at position *n*;

* `plaintext.removeLine(at : integer \[, count: integer\]) : true|false`
  
  removes line\[s\] at the position;

* `plaintext.update(mutator:function(tctx) {}) : bool`

  Performs transactional update, see [richtext.update](behavior-richtext.md#update);

