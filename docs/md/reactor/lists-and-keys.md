## Lists and Keys

We can build collections of elements and include them in JSX using curly braces `{}`.

Below, we loop through the numbers array using the `map()` function. We return a `<li>` element for each item. Finally, we assign the resulting array of elements to listItems:

```JavaScript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

Then we include the entire `listItems` array inside a `<ul>` element, and render it to the DOM:

```JavaScript
document.body.content(<ul>{listItems}</ul>);
```

The code above will work effectively for static lists that we render with the `Element.content(vnodes)` function.

But if we plan to update the list using `Element.patch()` we need to add keys to list items. In this case the `patch()` can effectively perform reconciliation of DOM and its virtual representation.

The best way to pick a key is to use a string that uniquely identifies a list item among its siblings. Most often you would use IDs from your data as keys:

```JavaScript
const todoItems = todos.map( todo =>
  <li key={todo.id} status={todo.status}>
    {todo.text}
  </li>);
```

Note: It is not recommend to use indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state.

#### Keys Must Only Be Unique Among Siblings

Keys used within arrays should be unique among their siblings. However they don’t need to be globally unique.

#### Embedding map() into JSX expressions

JSX allows to embed any expression in curly braces so we could inline the `map()` result too:

```JavaScript
function NumberList(props) {
  const numbers = props.numbers;
  return
    <ul>
     { numbers.map((number) => <li key={number.toString()} />) }
    </ul>;
}
```
