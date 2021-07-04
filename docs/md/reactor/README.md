
# What Reactor is

The Reactor is just these three features:

* Native support of [JSX](JSX.md) by script compiler. JSX syntax and expressions are integral parts of JavaScript in Sciter.
* Native implementation of real DOM / virtual DOM reconciliation. `element.patch(jsx-expression)` takes the vdom (JSX expression) and modifies DOM according to the JSX expression.

# What Reactor is not

* Reactor is not a framework or a library. It is just a built-in set of features of SciterJS 

## Hello World

The smallest Sciter's Reactor example:

```JavaScript
$(body).patch(<body>Hello, world!</body>);
```

As you would expect, execution of this line will produce this DOM structure:

```XML
<body>
  Hello, world!
</body>
```

Script expression `<body>Hello, world!</body>` here is a JSX literal.

Note: you do not need any external pre-compilers to run this code - [JSX](JSX.md) is an integral part of SciterJS.

## If Reactor is just a set of features ...

Then it means that you can use these features not just for [ReactJS](https://reactjs.org/) alike cases.

JSX, for example, can be used in cases where you need to populate existing DOM. 

For example you can call `element.append(<li>new list item</li>)` to add new item to a list.

## SciterJS::Reactor and Facebook::ReactJS

Sciter's Reactor uses roughly the same set of idioms and ideas as ReactJS.

But Facebook::ReactJS is a JavaScript library and SciterJS::Reactor is a native implementation of just two things : **JSX** and **element.patch()**. Surprisingly that is all that needed to achieve almost all functionality of ReactJS in SciterJS.

# Further reading

* [JSX](JSX.md) - basic terms and rationale
* [Rendering elements](rendering.md) - element.patch() reconciliator function
* [Components](component.md) - functional and class components
* [Component state and lifecycle](component-update.md) - componentUpdate(state), etc.
* [Styles, Events and Mounting points](component-styles-events.md)
* [Lists and Keys](lists-and-keys.md)
* [Technical details: Component Lifecycle](component-lifecycle.md)