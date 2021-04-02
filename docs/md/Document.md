# class Document

Note: in Sciter.JS `Document` extends [`Element`](Element.md) class - `document` represents root element of the document, so `document.documentElement === document`. Therefore all methods of Element class are available on `document` too.

#### Properties:

* `document.body`
* `document.head`
* `document.documentElement`

#### Methods:

* `document.querySelector()`
* `document.$()` synonym of above
* `document.querySelectorAll()`
* `document.$$()` synonym of above
* `document.getElementById()`
* `document.createElement()`
* `document.createTextNode()`
* `document.createComment()`
* `document.createDocumentFragment()`
* `document.createNodeIterator(root[, whatToShow[, filter]])` returns `NodeIterator`
