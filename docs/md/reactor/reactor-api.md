# Reactor, Top-Level API


## Creating Reactor Elements

#### `JSX(type,[props],[...children]): VNode`

Constructs virtual node. 

These two expressions are equivalent:

```JS
  const vn = <div id="foo">bar</div>;
```
is 
```JS
  const vn = JSX("div", {id="foo"}, ["bar"]);
```

#### `Reactor.cloneOf(velement,[props],[...children]): VNode`

Clone and return a new Reactor virtual element using _velement_ as the prototype. 

_props_ and _children_ are optional.

If _props_ is defined then the resulting element will have the original element’s props with the new props merged in shallowly. New children will replace existing children. _key_ prop from the original element will be preserved.

If _children_ array is defined it will replace children of original element.


## Inspection of virtual DOM


#### `Reactor.isNode(object): boolean`

Returns _true_ if the object is JSX literal or was constructed by either `JSX` function or `Reactor.cloneOf`

#### `Reactor.tagOf(vnode)`

Returns tag of virtual node. 
```JS 
   Reactor.tagOf(<div/>) == "div"; // true
```

#### `Reactor.propsOf(vnode)`

Returns properties (attributes) of virtual node as an object. 
```JS 
   Reactor.propsOf(<div id="foo" />).id == "foo"; // true
```

#### `Reactor.kidsOf(vnode)`

Returns children collection of virtual node as an array. 
```JS 
   Reactor.kidsOf(<div>bar</div>)[0] == "bar"; // true
```