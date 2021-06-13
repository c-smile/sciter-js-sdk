# class Range

The Range represents a fragment of a document that can contain nodes and parts of text nodes.

#### Properties:  

* `range.isCollapsed:bool` - true if the range is collapsed to one position (start == end)
* `range.commonAncestorContainer:Element` - nearest container element that encloses as start as end positions
* `range.endContainer: Node`
* `range.endOffset: int`
* `range.startContainer:Node` - focusNode/Offset is a caret position.
* `range.startOffset:int`
* `range.start:[node,offser]`
* `range.end:[node,offser]`

#### Methods:

* `range.setStart(node,offset)`
* `range.setEnd(node,offset)`
* `range.setStartBefore(node)`
* `range.setEndBefore(node)`
* `range.setStartAfter(node)`
* `range.setEndAfter(node)`
* `range.selectNode(node)`
* `range.selectNodeContents(node)`
* `range.getRangeAt(index:uint):Range` - returns Range object at given index.
* `range.selectNodeContent(node)` - selects the node.
* `range.collapse([toStart:bool])` - sets either end or start positions.
* `range.cloneRange():Range` - returns copy of this range object.

#### Methods (Sciter specific):

* `range.applyMark(name | [name1, name2,...])` - apply mark(s) to the range so it can be styles by CSS `::mark(name) {...}`.
* `range.highlight(name | [name1, name2,...])` - synonym of `applyMark`.
* `range.clearMark(name | [name1, name2,...])` - removes mark(s) from the range.
* `range.clearHighlight()` - synonym of `clearMark`
* `range.marks():[]` - returns list (array) of mark names inside this range.
* `range.setToMark(name)` - sets the range to start/end of character range having _name_ mark set.