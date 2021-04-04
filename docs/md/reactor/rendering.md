Note: this document is written intentionally close to [ReactJS/Rendering-Elements](https://reactjs.org/docs/rendering-elements.html) article to highlight differences and similarities with ReactJS.

## Rendering Elements

Reactor's virtual DOM element is a definition of real DOM element. At some point real DOM element will be created using virtual one as a prototype.

```JavaScript
const velement = <h1>Hello, world</h1>;
```

Unlike physical DOM elements, Reactor elements are plain script array literals, and are cheap to create. [Dedicated Sciter's DOM methods](JSX.md) take care of updating the DOM to match such virtual elements.

## Rendering an Element into the DOM

Let’s say there is a `<div>` somewhere in your HTML file:

```XML
<div id="root"></div>
```

Let's call this a "root" DOM node - everything inside it will be managed by Reactor.

Applications that use Reactor may have as a single root DOM node as many isolated root DOM nodes - whatever is required. And you can mix Reactor managed elements with elements managed by other means, e.g. scripting behavioral classes.

To render a Reactor element into a root DOM node, call `element.patch(velement)` method:

```JavaScript
const velement = <div id="root"><h1>Hello, world</h1></div>;
document.$("div#root").patch(velement);
```

That above will display "Hello, world" text inside that `<h1>` element.

## Updating the Rendered Element

To update already rendered element we simply call `element.patch(velement)` again on it with changed velement. The `element.patch()` native function will patch that existing DOM element by new velement definition.

Consider this ticking clock example:

```JavaScript
function tick() {
  const velement = <div id="root">
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>;
  document.$("div#root").patch(velement);
  return true; // to keep timer running
}

setInterval(tick,1000);
```

Code above will call `tick()` function every second. And the tick will update the <div> element.

## Element.patch() only updates what is necessary

The `element.patch(vdom)` function compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.

Even though we create an element describing the whole UI tree on every tick, only the text node whose contents has changed gets updated by `element.patch()`.

Therefore Reactor (`patch()` method in particular) allows to define single rule of how the UI should look at any given moment rather than how to change it over time.