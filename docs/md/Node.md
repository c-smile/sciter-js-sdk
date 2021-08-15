# class Node 

Node is an abstract class that is inherited by [Element](Element.md), [Text](#class-text-extends-class-node) and [Comment](#class-comment-extends-class-node) classes.

## properties:

* `node.nodeName` - read-only
* `node.nodeType` - read-only
* `node.nodeValue` - value of the current node
* `node.nodeIndex` - read-only
* `node.childNodes` - read-only, returns a nodeList containing all children
* `node.firstChild` - read-only
* `node.lastChild` - read-only
* `node.nextSibling` - read-only
* `node.previousSibling` - read-only
* `node.ownerDocument` - read-only
* `node.parentNode` - read-only
* `node.parentElement` - read-only
* `node.parentWindow` - instance of Window that hosts this node;
* `node.textContent` - textual content of an element and all its descendants

## methods:

* `node.cloneNode()`
* `node.contains()`
* `node.compareDocumentPosition()` - not yet
* `node.getRootNode()`
* `node.hasChildNodes(): bool`
* `node.isEqualNode(): bool`
* `node.isSameNode(): bool`
* `node.remove()`


# class Text, extends class Node

The Text represents html text nodes.

## properties:

* `text.data` read/write
* `text.length` read-only
* `text.wholeText` read-only

# class Comment, extends class Node

The Comment represents html comment nodes.

## properties:

* `comment.data` read/write
* `comment.length` read-only
