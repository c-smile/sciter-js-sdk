# class Document

Note: in Sciter.JS `Document` extends [`Element`](Element.md) class - `document` represents root element of the document, so `document.documentElement === document`. Therefore all methods of Element class are available on `document` too.

## Properties:

* `document.body`
* `document.head`
* `document.documentElement`

## Methods:

* `document.querySelector("selector")`
* `document.$("selector")` synonym of above
* `document.querySelectorAll("selector")`
* `document.$$("selector")` synonym of above
* `document.getElementById("id")`
* `document.createElement()`
* `document.createTextNode()`
* `document.createComment()`
* `document.createDocumentFragment()`
* `document.createNodeIterator(root[, whatToShow[, filter]])` returns `NodeIterator`


## Methods (Sciter specific):

<details>
<summary>`document.bindImage(url:string[, img:Graphics.Image]) : Graphics.Image`</summary>

This method associates the image with arbitrary url so it can be used in CSS.

JS:
```JavaScript
   document.bindImage("in-memory:dynback");
```
CSS:
```CSS
   div {
     /* uses image supplied by script: */
     background-image: url("in-memory:dynback"); 
   }
```
If *img* is omitted then the method returns previous image associated with the url.
</details>
<details>
<summary>`document.url([relpath]) : string`</summary>

returns absolute path of _relpath_ using the document URL as a base.

If _relpath_ is omitted the method returns url of the document itself.

</details>
