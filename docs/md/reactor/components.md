
Note: this document is written intentionally close to [ReactJS/Components and Props](https://reactjs.org/docs/components-and-props.html) article to highlight differences and similarities with ReactJS.

## Components and Props

Conceptually, components are script functions. They accept arbitrary inputs (called “props”) and return virtual elements describing what should appear on the screen.

## Function and Class Components

The simplest way to define a component is to write a script function:

```JavaScript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

This function is a valid Reactor component because it accepts a single "props" object argument with data and returns a virtual element. We call such components "function components" because they are literally script functions.

You can also use classes to define a component:

```JavaScript
class Welcome extends Element {
  function this(props) { 
    this.props = props; 
  }
  function render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

These two components will do exactly the same when used.

Class-based components have some additional features that we will discuss in the next sections. Until then, we will use function components for their conciseness.

#### Note: Component names (either functional or class-based) shall start from capital letter.

### Component-functions and component constructors signatures

Full declaration of component functions and constructors may look like as:

```
function FunctionComponent(props,kids[,parent]) {} 
```

Where:

* *props* are passed attributes;
* *kids* are child, content VNodes;
* *parent* is a parent DOM element where the component will appear.     
* *this* environment variable can be either `null` for brand new element, or an object `instanceof Element` for existing element.

Example, this declaration:

```XML
<FunctionComponent mode="start">
   <div>bar</div>
</FunctionComponent>
```

will get call of FunctionComponent() with this parameters:

* *props* - `{ mode: "start" }`
* *kids* - `[ <div>bar</div> ]`

Constructors of class components follow the same convention:

```JavaScript
class ClassComponent extends Element {
  constructor(props,kids,parent) {...} 
}
```

The *parent* argument receives DOM element - future or existing container DOM element.

## Rendering a Component

Previously, we only encountered Reactor virtual elements that represent DOM tags:

```JavaScript
const velement = <div />;
```

However, elements can also represent user-defined components:

```JavaScript
const velement = <Welcome name="John" />;
```

When script compiler sees an element representing a user-defined component, it passes its attributes to this component as a single object. We call this object “props”.

For example, this code renders “Hello, Ivan!” on the page:

```JavaScript
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

const velement = <Welcome name="Ivan" />;

document.body.content(velement);
```

Let us recap what happens in the example above:

1. We call `element.content(velement)` with the `<Welcome name="Ivan" />` element.
1. Sciter runtime calls the `Welcome` component with `{name: "Ivan"}` as the props object.
1. Our `Welcome` component returns a `<h1>Hello, Ivan</h1>` virtual element as the result.
1. `element.content()` function inserts DOM element `<h1>Hello, Ivan!</h1>` using that virtual element definition.

## Composing Components

Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail. A button, a form, a dialog, all those may commonly be expressed as components.

For example, we can create an `App` component that renders `Welcome` many times:

```JavaScript
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return <body>
       <Welcome name="Ivan" />
       <Welcome name="Olga" />
       <Welcome name="Andrew" />
    </body>;
}

document.body.patch( <App /> );
```

## Extracting Components

Don’t be afraid to split components into smaller components.

For example, consider this `Comment` component:

```JavaScript
function Comment(props) {
  return
    <div .comment>
      <div .userinfo>
        <img .avatar src={props.author.avatarUrl} alt={props.author.name} />
        <div .userinfo-name>{props.author.name}</div>
      </div>
      <div .comment-text>{props.text}</div>
      <div .comment-date>{formatDate(props.date)}</div>
    </div>;
}
```

It accepts `author` (an object), `text` (a string), and `date` (a date) as props, and describes a comment in a chat implementation for example.

This component can be tricky to change and maintain because of all the nesting, and it is also hard to reuse individual parts of it.

Let’s extract a few components from it. First, we will extract `Avatar`:

```JavaScript
function Avatar(props) {
  return <img.avatar
          src={props.user.avatarUrl}
          alt={props.user.name}/>;
}
```

Next, we will extract a `UserInfo` component that renders an `Avatar` next to the user’s name:

```JavaScript
function UserInfo(props) {
  return <div.userinfo>
      <Avatar user={props.user} />
      <div.userinfo-name>{props.user.name}</div>
    </div>;
}
```

And finally simplified `Comment` that is composed from the above:

```JavaScript
function Comment(props) {
  return <div.comment>
   <UserInfo user={props.author} />
   <div.comment-text>{props.text}</div>
   <div.comment-date>{formatDate(props.date)}</div>
  </div>;
}
```

Extracting components might seem like grunt work at first, but having a palette of reusable components pays off in larger apps. 

A good rule of thumb is that if a part of your UI is used several times (`Button`, `Panel`, `Avatar`), or is complex enough on its own (`App`, `FeedStory`, `Comment`), it is a good candidate to be a reusable component.