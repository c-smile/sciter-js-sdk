
## Overview

Sciter's Reactor allows you define components as classes or functions. Function components are used as content generators/transformers, while class based components allow also to define event and lifecycle handlers of components.

To define a Reactor component class, you need to extend `Element` DOM element class:

```JavaScipt
class Welcome extends Element {
  name = "World";
  render() {
    return <h1>Hello, {this.name}</h1>;
  }
}
```

> Note:
  
  Sciter's Reactor is different from ReactJS in this respect. In ReactJS React.Component is not associated directly with real DOM element, but in Reactor `this` in component methods, after mounting, refers to real DOM element. 

The only method you *must* define in class component is `render()`. All the other methods of a component are optional.

## The Component Lifecycle

Each component has several "lifecycle methods" that you can override to run code at particular times in the process.

### Mounting

These methods are called in the following order when an instance of a component is being created and inserted into the DOM:

* [**`constructor(props,kids)`**](#constructor)
* [**`this(props,kids)`**](#this)
* [**`render(props,kids)`**](#render)
* [**`componentDidMount()`**](#componentdidmount)

### Updating

An update of already mounted component can be caused by eiter `render()` call of parent component or by calling `componentUpdate()` on this element.

#### Updating by parent's render

* [**`this(props,kids)`**](#this)
* [**`render(props,kids)`**](#render)

#### Updating by `componentUpdate()`

* [**`render()`**](#render)

When you call `this.componentUpdate({... properties ...})` Reactor may call `render()` to re-render the component.

> Note:
  
  In case of `componentUpdate()` the `render()` is called without `props` and `kids` arguments as Reactor is not storing props/kids anywhere. If needed, you can store props and/or kids in `this(props,kids)` method.

### Unmounting

This method is called when a component is being removed from the DOM:

* [**`componentWillUnmount()`**](#componentwillunmount)

### Lifecycle Methods in detail

### `render([props,kids])`

```JavaScript

class Comp extends Element {
    render() {
      return <div>sample</div>;
    }
```

The `render()` method is the only required method in a class component.

When called, it shall return  **React element** typically created via [JSX](JSX.md). For example, `<div />` and `<MyComponent />` are Reactor elements that instruct Reactor to render a DOM node, or another user-defined component, respectively.

If you need to interact with the browser, perform your work in `componentDidMount()` or the other lifecycle methods instead. Keeping `render()` pure makes components easier to think about.

> Note
  
  `render()` can be called as on initial creation of the element (before creation of real DOM element) as on live DOM element (update of existing DOM element). To distinguish these two cases you can use  


### <a name="constructor"></a>`constructor(props,kids)`

```JavaScript
class Comp extends Element {
    constructor(props,kids) { super(); ...}
}
```

**JavaScript constructor is optional. If you don’t initialize state and you don’t bind methods, you don’t need to implement a constructor for your Reactor component.**

The constructor for a Reactor component is called before any other methods. When implementing the constructor for a Reactor component, you should call `super()` before any other statement - this is a JavaScript requirement for derived classes. 

### <a name="this"></a>`this(props,kids)`

```JavaScript
class Comp extends Element {
    this(props,kids) { ... }
}
```

The `this(props,kids)` method is called by Reactor runtime in two cases: on initial mountining (after constructor()) and on update by parent component - each time when props (attributes) or kids (content) may change.

Method `this()` is used to process passed properties and kids content uniformely.

```JavaScript
this(props,kids) {
  super.this(props,kids); // call of this() in superclass.
  ...
}
```

### <a name="componentDidMount"></a>`componentDidMount()`

```JavaScript
class Comp extends Element {
    componentDidMount() { ... }
}
```

`componentDidMount()` is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.

This method is a good place to set up any subscriptions. If you do that, don’t forget to unsubscribe in `componentWillUnmount()`.

### <a name="componentWillUnmount"></a>`componentWillUnmount()`

```JavaScript
class Comp extends Element {
  componentWillUnmount() { ... }
}
```

`componentWillUnmount()` is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method.
