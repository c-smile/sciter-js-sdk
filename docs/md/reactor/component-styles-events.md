## Defining Default Style of a Component


Normally you define styles globally in your application. But some components may require some styling (e.g. particular layout) that is critical for their operation.


Reactor (Sciter's internal code in fact) offers simple way to define component styles using *styleset* attribute.


Let's redefine our `Clock` class that we used earlier :


```JavaScript
class Clock extends Element 
{
  const styleset = ["clock", $url(clock.css)]; // style set declaration

  time = new Date(); // setting initial state 

  componentDidMount() {
    this.timer(1000, function() {
      this.componentUpdate { time:new Date() };
      return true; // to keep the timer ticking
    });
  }

  render() {
    return <clock styleset={__DIR__ + "styles.css#clock"}>
      <div.greeting>Hello, world!</div>
      <div>It is {this.data.time.toLocaleTimeString()} now.</div>
     </clock>;
  } 
}
```

Note: `styleset={__DIR__ + "styles.css#clock"}` attribute above, it resolves to absolute URL using this script file location as a base.

And here is a content of clock.css file:

```CSS
@set clock 
{
  :root {
    display: block;
    flow:vertical;
  }
  span.time { 
    display:inline-block; 
    white-space:nowrap; 
  }
}
```

As you see it defines independent set of CSS rules that define content (and only content) of our clock component and its internals.

General consideration: if component is designed to be used in many applications then its default style set should include only rules needed for layout and those are critical for operation. Each application may add its own styling on top of these default styles.

Note that style sets in Sciter are not polluting global list of style rules and so are very effective - reduce time needed for style resolution of DOM elements.

## Events Handling in Components

In contrast with ReactJS Sciter does not require any special constructs for handling events - we can use normal (for the Sciter) event handling definitions in classes.

Sample of small component that encapsulates search block enclosing `<input>` and `<button>` in one entity:

```JavaScript
class Search extends Element {

  render() {
    return <search>
        <input|text />
        <button.do/>
    </search>;
  }

  ["on click at button.do"](evt, button) { 
    this.post(new Event("do-search", {data: this.$("input").value} )); 
  }
  ["on change at input"](evt,input) { 
    this.showSuggestionsFor( input.value ); 
  }

  get value() { return this.$("input").value; }
  set value(nv) { this.$("input").value = nv;

}
```

In this example we are handling two events: click on the button and change of the input.


Word about event handling functions like `\["on change at input"\]\(evt,input\)` above.

That format is a standard JS/ES2020 way of defining functions with [computable names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions#computed_property_names) or names that include namespaces. It is just in Sciter event handlers are using this form to describe event handling functions that have the following signatures:    

```JavaScript
["on eventname"](event) {}
["on eventname at selector"](event, selectorElement) {}
```

Where:  

* **on**\[space\] part marks the function as event handler;     
* *eventname* is a name of event - either standard HTML's one like click, input, focus, ... or custom event name;     
* \[space\]**at**\[space\], if present, signifies that selector will follow;    
* *selector* is CSS selector of child element inside this element. When event handler will be triggered selectorElement argument of the function will get reference to the matching child that generated the event.   

Such class based event handlers are especially effective in cases when there are many elements at the same time on screen. Such event subscription schema does not require addEventHandler calls for each element.

## HTML Resident Mounting Points

Reactor Components are executable entities even if they look as HTML.

Normally in ReactJS you see JSX code only inside `<script>` sections and JS code files like here:

```JavaScript
function App() {
  return
    <main>
       <Welcome name="Ivan" />
       <Welcome name="Olga" />
       <Welcome name="Andrew" />
    </main>;
}

document.body.patch( <App /> );
```

While this works in general it may look non-natural or inconvenient to someone.

Alternatively Sciter offers special `<reactor>` HTML element as a mounting point:

```XML
<body>
   <p>Test of Tabs component.</p>
      
   <reactor(Tabs) src="tabs.js">
     <tab(first) label="First tab">First tab content</tab>
     <tab(second) label="Second tab">Second tab content</tab>
     <tab(third) label="Third tab" src="tab-content.htm"></tab>
   </reactor>

</body>
```

The <reactor> element expects two attributes:

* *name* - name of component class and 
* *src* - url of the script file where that component is defined.

Please note that, while it looks like HTML, content between `<reactor>` and `</reactor>` is parsed by script rules (JSX in this case). Essentially you may think as the whole `<reactor>` section is just `<script>` element:

```XML
<body>
   <p>Test of &lt;Tabs> component.</p>
      
   <script type="text/javascript+jsx" component="Tabs" src="tabs.tis">
     <tab(first) label="First tab">First tab content</tab>
     <tab(second) label="Second tab">Second tab content</tab>
     <tab(third) label="Third tab" src="tab-content.htm"></tab>
   </script>

</body>
```

The only major difference of the `<reactor>`: it is a placeholder element - as soon as component gets instantiated it **replaces** the `<reactor>` DOM element. Therefore final DOM after `<reactor>`'s *execution* will look like:

```XML
<body>
   <p>Test of &lt;Tabs> component.</p>
      
   <tabs>
     <tab(first) label="First tab">First tab content</tab>
     <tab(second) label="Second tab">Second tab content</tab>
     <tab(third) label="Third tab" src="tab-content.htm"></tab>
   </tabs>

</body>
```