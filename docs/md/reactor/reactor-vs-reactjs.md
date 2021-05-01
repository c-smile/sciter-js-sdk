# Reactor vs ReactJS

## `this` environment variable

* Reactor –  `this` is an instance of \[DOM\] Element to what this class is applied.
* React.JS – `this` is an instance of React.Component – not related to real DOM element. You should use Refs to get access real DOM elements.

## `constructor(props,kids,parent)` method

`constructor` in Reactor is called when DOM element is not attached to the DOM yet. The constructor is called **once** for the given DOM element/class.  Closest match of Reactor’s constructor is `componentWillMount()` in React.JS

## `componentDidMount()` method

This method has the same semantic in Reactor and React.JS. The method is called once – after the element is attached to the DOM.

## `componentWillUnmount()` method

This method has the same semantic in Reactor and React.JS. The method is called once – immediately before the element will be removed from the DOM.

## `render(props,kids)` method

In Reactor the render() method is called in two cases:

1. When VDOM to DOM transformation is needed, for example to create DOM element for JSX expression like: `<Component prop\="..." />`. In this case *props* will be an object – properties map. *Kids* will be an array (possibly empty).
1. When `element.componentUpdate({...})` is called for the given element. In this case both *props* and *kids* will be undefined.

Therefore Reactor.render() combines semantic of both, `ReactJS.constructor()` as `ReactJS.render()`.

## `state.reconciliation = true | false`

`element.state.reconciliation = false` will prevent reconciliation (patching) of element content while rendering. Effectively that is an equivalent of returning `false` from [**shouldComponentUpdate()**](https://reactjs.org/docs/react-component.html#shouldcomponentupdate) of ReactJS

