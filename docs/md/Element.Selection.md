# class Element.Selection

Represents current selection on elements that supports selection:
* `<htmlarea>` - WYSIWYG HTML editor;
* `<plaintext>` - Plain text multiline editor;
* any other element with `selectable` attribute set;

#### Properties:  

* `element.selection.isCollapsed:bool` - true if selection is collapsed to one position (anchor === focus)
* `element.selection.commonAncestorContainer:Element` - nearest container element that encloses as anchor as focus positions
* `element.selection.anchorNode: Node`
* `element.selection.anchorOffset: int`
* `element.selection.focusNode:Node` - focusNode/Offset is a caret position.
* `element.selection.focusOffset:int`
* `element.selection.rangeCount:uint` - number of ranges in the selection
* `element.selection.type: string` - one of:
  *  "Caret" - collapsed selection - only caret is visible, 
  *  "Selection" - continuous text selection,
  *  "Element" - whole element is selected (Sciter specific),
  *  "TableCells" - range of table cells is selected (Sciter specific);

#### Methods:

* `element.selection.collapse()` - collapse selection to current focus (caret) position. 
* `element.selection.collapseToEnd()` - collapse selection to either anchor or focus - whatever position is last in the DOM.
* `element.selection.collapseToStart()` - collapse selection to either anchor or focus - whatever position is first in the DOM.
* `element.selection.containsNode(node):bool` - true if the selection contains the node.
* `element.selection.empty()` - removes selection (but not its content).
* `element.selection.extend(node,offset)`- sets focus (caret) position without changing anchor position.
* `element.selection.getRangeAt(index:uint):Range` - returns [Range](Range.md) object at given index.
* `element.selection.selectNodeContent(node)` - selects the node.
* `element.selection.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)` - sets selection to given anchor and caret positions.
* `element.selection.toString():string` - returns selected text.

