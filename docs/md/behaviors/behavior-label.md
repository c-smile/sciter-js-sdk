# behavior: label

This element redirects its mouse events to its labeled element. Therefore mouse click on the label will cause labeled element to receive focus or generate click event.

## Elements

These elements have behavior:label applied by default:

* `<label>`
* `<label for=...>`

## Attributes

* `for="id"` \- the ID of an input element labeled by this label.

## Events

N/A - this element does not generate any specific events.

## Methods

N/A - behavior:label does not introduce any specific methods.

## Value

N/A

## Examples

This markup:

```XML
<label>Click me <input|text></label>
<label for="buddy">And me too</label> <input|text id="buddy">
```

will create two labeled input elements.