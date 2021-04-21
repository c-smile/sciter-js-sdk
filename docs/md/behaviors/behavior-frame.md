# behavior: frame

This behavior handles functionality of `<frame>`/`<iframe>` elements - containers of sub-documents inside host document.

The behavior can be applied to any block element, `<div>` or `<section>` for example.

## Elements

These elements have *behavior:frame* applied by default:

* `<frame>` - block document container;
* `<iframe>` - inline block document container.

In Sciter, `<frame>` is an ordinary DOM element that can appear in any context where other block elements can appear. Not only as a child of `<frameset>`.

## Model

`<frame>` element can have any arbitrary content initially. In this respect `<frame>` is not anyhow different from `<div>` or `<section>`.

```XML
<frame>
   <p>Select document to load</p> 
</frame>
```

After content loading ( due to *src* attribute handling or `.load()` method call ) the frame will have single child element - root element of loaded document, `<html>` for example.

The `<frame>` with loaded document:

```XML
<frame>
   <html>
     <head>...</head>  
     <body>...</body>  
   </html>
</form>
```

To access loaded document from script use `el.frame.document` property that will return child document element:

```JavaScript
var frm = document.$("frame#main");
var childDoc = frm.frame.document;
var someBtn = childDoc.$("button#some");
...

```

## Attributes

`<frame>` attributes that have special meaning:

* `src="url"` \- optional, URL of document to load in the frame;
* `content-style="url"` \- optional, URL of .css file to be applied to the content. Useful when host document needs to apply some specific styles on top of styles defined in document itself.

## State flags

* `:busy` \- this flag is in on state during document loading. It can be used to style "document loading..." state.

## Events

* `"newdocument"` / DOCUMENT\_CREATED event - generated as a first step of document loading. At this moment new document exists but empty;
* `"complete"` / DOCUMENT\_COMPLETE event - document has finished loading - DOM is ready and all pending resource requests have finished.

## Methods

* `el.frame.loadFile(url:string) : bool` - initiates loading of the document from the URL.
* `el.frame.loadHtml(html:string | ArrayBuffer, baseUrl: string) : bool` - loads content from the *html* string. baseUrl is used for resolving relative URLs inside the document.
* `el.frame.loadEmpty()` - clears the content of the frame by loading empty document in it.
* `el.frame.saveFile(fileUrl:string) : bool` - saves document to the file in UTF-8 encoding.
* `el.frame.saveBytes() : ArrayBuffer` - saves document into ArrayBuffer as sequence of UTF-8 encoded bytes.

## Properties

* `el.frame.document : Document`, read-only, document object loaded into the frame.
* `el.frame.mediaVars : object`, read/write, object (name/value map) - key/value map of media variables used by the document.
* `el.frame.url : string`, read/write, string - URL of document loaded into the frame.

## Value

N/A

## Frame events handling in script

```JavaScript
var frame = document.$("frame#some");
frame.on("complete", function(evt)
{
  ...
}
```