
Note: this document is written intentionally close to [ReactJS/JSX introduction](https://reactjs.org/docs/introducing-jsx.html).

## Introducing SciterJS::JSX

Consider this variable declaration:

```JavaScript
const velement = <h1 id="hw">Hello, world!</h1>;
```

It is called JSX, and it is an integral part of SciterJS  syntax - parsing of such JSX literals does not require invocation of any preprocessor as in JS for browsers.

That above is neither a string nor HTML but is a "tuple" declaration (array in JavaScript terms):

```JavaScript
const velement = ["h1", { id:"hw"}, ["Hello, world!"] ];
```

Technically JSX is not strictly required - we can use such tuple literals directly. It is just that such HTML-ish syntax is more familiar.

## Expressions in JSX

Here we declare a variable *name* and use it in tuple construction:

```JavaScript
const name = "Alice";
const velement = <h1>Hello, {name}</h1>;
```

That above can be written exactly as this:

```JavaScript
const velement = ["h1", {}, [name] ];
```

And you can put any valid JS expression inside those curly braces:

```JavaScript
const velement = <div>1 + 1 is { 1 + 1 }</div>;
```

## JSX is an expression too

As JSX literal is actually a tuple literal then we can use it in our code as any other literals:

```JavaScript
function getGreeting(user) {
  if (user)
    return <h1>Hello, {formatName(user)}!</h1>;
  else
    return <h1>Hello, Stranger.</h1>;
}
```

The above function returns one of two tuples defined there.

## Specifying Attributes in JSX

You may use quotes to specify string literals as attributes:

```JavaScript
const velement = <div tabindex="0"></div>;
```

You may also provide value of attribute from a variable or expression:

```JavaScript
const velement = <img src={user.avatarUrl}></img>;
```

Note: you should either use quotes (for string values) or curly braces (for expressions), but not both in the same attribute.

## Specifying children with JSX

If tag is empty then you may close it immediately with `/>` :

```JavaScript
const velement = <img src={user.avatarUrl} />;
```

Note: JSX does not support "tail-less" HTML tags like: `<img>`, `<input>` or `<br>`.  These one must be explicitly closed: `<img />`, `<input />` or `<br />`.

Yet JSX may contain children:

```JavaScript
const velement = 
  <div> 
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2> 
  </div>;
```

## Specifying runtime states with JSX

Along with attributes you may want to define runtime states of elements:

```JavaScript
const velement = 
  <li state-expanded={ isOpen(item) } > 
    <caption>Hello!</caption>
    <div></div> 
  </div>;
```

States here correspond to so called pseudo-classes in CSS: `:active`, `:hover`, `:checked` and so on.

### Specifying runtime value of input elements

To specify current runtime value of `<input>` elements use `state-value` runtime state attribute - it reflects current value of the input at runtime:

```JavaScript
<input|text(firstname) state-value="John" />
```

Note that just *value* attribute: `<input|text(firstname) value="Initial value" />` specifies *initial* value that is set once upon creation of the element.

### Specifying literal HTML content

In some cases you may need to set HTML content of an element from a string. In order to do that use `state-html` attribute in JSX: 

```JavaScript
const htmlContent = "<b>some</b> literal <i>HTML</i>";
<div state-html={Content} />
```

That above will generate 

```JavaScript
<div>
  <b>some</b> literal <i>HTML</i>
</div>
```

## Sciter's HTML parsing flavor support in JSX

JSX follows HTML parsing shortcut rules used in SciterJS and so:

* `<input(firstName) />` is an equivalent of *name* attribute declaration: `<input name="firstName" />`
* `<input|text />` is an equivalent of *type* attribute declaration: `<input type="text" />`
* `<input.search />` is an equivalent of *class* attribute declaration: `<input class="search" />`
* `<input#lookup />` is an equivalent of *id* attribute declaration: `<input id="lookup" />`

## JSX is a function  

Under the hood, this code:  

```JavaScript
const velement = <h1 id="hw">Hello, world!</h1>;
```

is translated into a call of built-in JSX function:

```JavaScript
const velement = JSX("h1", {id:"hw"}, ["Hello, world!"]);
```

Default implementation of that JSX function simply does this:

```JavaScript
function JSX(tagName,attributes,children) {
  return [tagName,attributes,children];
}
```

So by default JSX generates tuple literals (arrays with predefined structure). Tuples of such structure are known as *VNODE*s - virtual DOM node definitions:

```JavaScript
["tag", {attributes}, [children] ]

```

Where:

* *tag* - is a string matching HTML tags : `div`, `p`, `section`, etc.
* *attributes* - tuple element at index 1, is *null* or a plain script object - a map of name/"value" pairs. Attribute values are converted to strings before injecting into the DOM;
* *children* - tuple element at index 2, is *null* or a plain script array that contains either strings (representing DOM text nodes) or other vnodes (representing DOM elements);   

> Note: **JSX function can be redefined in JavaScript**. 
> For example in MithrilJS case it may look like as:
  ```JavaScript
  JSX = m; // m is a Mithril's function - constructor of vnodes
  ```

## VNODE: usage, a.k.a. rendering

Some methods of Element class allow to populate DOM by the vnode definitions:

```JavaScript
container.content(<div>Hello wonderful world</div>);
```

After that the container will have single child element: `<div>`

```JavaScript
var arr = [1,2,3];
var children = arr.map( (n) => <li>item #{n}</li> );
container.content(children);
```

The container will have three `<li>` children with texts "item #1", "item #3" and "item #3".

List of Element class functions that accept VNODEs and so SSX declarations: children with texts "item #1", "item #3" and "item #3".

* `element.content(vnode | array of vnodes)` \- content of the element is replaced by these elements;
* `element.append(vnode | array of vnodes)` \- these element\[s\] will be added to the end of element's content;
* `element.prepend(vnode | array of vnodes)` \- these element\[s\] will be added to the end of element's content;
* `element.patch(vnode)` \- patch existing DOM element by vnode definition, see below for more details;

### `element.patch(vnode)` \- DOM reconciliation (a.k.a patching) by vnode

The `element.patch(vnode)` function:

* Updates attributes from vnode `atts` object by removing, creating or changing DOM attributes.
* For each child:
  * if particular vnode's child does not match real DOM child then new DOM element is created from that vnode child;
  * else if particular DOM child does not match any vnode's child then existing DOM element gets removed;
  * else ( DOM child and vnode child match each other ) then the `patch()` is called for that pair recursively.

The `patch()` function uses the following **match criteria**. Particular element/vnode pair is considered as matching if:

* they both have the same value of **key** attribute;
* or if they have the same value of **id** attribute;
* or if they have the same value of **name** attribute;
* or if they have the same **tag**;

Otherwise DOM element and vnode treated as not matching.