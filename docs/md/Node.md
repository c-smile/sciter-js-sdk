# class Node 

Node is an abstract class that is inherited by [Element](Element.md), [Text](#class-text-extends-class-node) and [Comment](#class-comment-extends-class-node) classes.

#### properties:

* `node.nodeName`
* `node.nodeType`
* `node.nodeValue`
* `node.nodeIndex`
* `node.firstChild`
* `node.lastChild`
* `node.nextSibling`
* `node.previousSibling`
* `node.ownerDocument`
* `node.parentNode`
* `node.parentElement`
* `node.textContent`

#### methods:

* `node.cloneNode()`
* `node.contains()`
* `node.compareDocumentPosition()` - not yet
* `node.getRootNode()`
* `node.hasChildNodes()`
* `node.isEqualNode()`
* `node.isSameNode()`
* `node.remove()`


# class Text, extends class Node

The Text represents html text nodes.

#### properties:

* `text.data` read/write
* `text.length` read-only
* `text.wholeText` read-only

# class Comment, extends class Node

The Comment represents html comment nodes.

#### properties:

* `comment.data` read/write
* `comment.length` read-only
