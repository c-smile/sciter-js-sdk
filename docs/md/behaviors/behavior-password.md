# behavior: password

Standard single line input element behavior. This behavior can be applied to any element that has `flow:text` and `white-space:pre` model.

## Elements

that have this behavior applied by default:

* `<input type="password" />` - inline password input element
* `<input|password />` - inline password input element

## Attributes

that this behavior knows about:

* `value="text"` \- initial value of the input element
* `size=integer` \- determines value of (intrinsic and default) width of the element.
* `maxlength=integer` \- maximum number of characters that this element can contain.
* `filter="filter-expr"` \- limits set of characters allowed to input in the field. `filter-expr` string accepts single characters and character ranges. Example: ".@0~9a~zA~Z" - all alpha-numeric characters, '.' and '@'. If you just want to exclude some characters then you can prepend filter with '^' sign. So this `filter="^.,-"` filter will allow to input any character except '.', ',' and '-'.
* `novalue="text"` \- if textbox is empty then it shows text provided by the *novalue* attribute. You can style this state by using `:empty` CSS selector.
* `readonly` \-  declares that element is read only.
* `password-char="\*"` \- password char placeholder.

## Events

Together with the standard set of events (mouse, keyboard, focus) *behavior: button* generates:

* `"input"` or `"change"` / EDIT\_VALUE\_CHANGED event - value of the element was changed due to user actions. Posted (asynchronous) event.
* `"changing"` / EDIT\_VALUE\_CHANGING event - is sent before making any change of value of the element. By handling this event you can filter characters before they get inserted into the editor. Synchronous event where:

* event.reason is one of

  * const BY\_INS\_CHAR = 3; // changing by typing single character.
  * const BY\_INS\_CHARS = 4; // pasting from clipboard
  * const BY\_DEL\_CHAR = 5; // by DELETE/BACKSPACE click
  * const BY\_DEL\_CHARS = 6; // by selection removal

* event.data - string, read/write. Contains character(s) to be inserted if reason is one of BY\_INS\_\*\*\* values;

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

## Methods

* `element.edit.selectAll()` - select whole content.
* `element.edit.selectRange(\[start:int \[, end:int\]\])` - selects text between *start* (included) and *end* (excluded) position. If start and end are omitted - removes selection.
* `element.edit.removeText()` - removes selected text (if any).
* `element.edit.insertText(text: string)` - insert text at caret position, if selection is not empty removes selected text before insertion.
* `element.edit.appendText(text: string)` - appends the text at the end of existing text. 

## Properties

* `selectionStart: int` -  returns start position of the selection, or caret position if there is no selection.
* `selectionEnd: int` -  returns end position of the selection, or caret position if there is no selection.
* `selectionText: string` - returns selected text or empty string if there is no selection.