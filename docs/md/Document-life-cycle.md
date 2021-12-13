# Document Life Cycle events

Engine does the following in window construction phase:

1. creates the window (HWND) with undetermined dimensions;

2. Loads document:
2. a. parses the document;
2. b. loads styles
2. c. loads JS, this also runs code on zero level (initialization of variables, functions, etc);
2. d. assigns scripting behaviors according to CSS declarations;
2. e. runs `document.ready`, you can use here window.move(x,y,w,h) if you know window dimensions.

3. Sets window dimensions: either from attributes of root <html> if they were not set in script before.

4. Fires `ready` event (`document.on("ready", function() {})`. Note: window dimensions are known at this point so you can use window.move(x,y).

## Document Loading

> All `<script>` elements in Sciter are executed after document parsing. 
> As if they have "defer" attribute defined in browsers: `<script defer>`

Any script element may have code executed in it directly on load and/or contain event handlers and so:

```JavaScript
<script>

// Сode placed here gets executed as the first step after DOM loading ...
// Synchronous, inside SciterLoadFile() call  

document.ready = function() {
 // code executed as the second step after DOM 
 // loading and prototypes/aspect assignment...
 // Synchronous call, inside SciterLoadFile().  
 // all components declared by CSS prototype and aspect are instantiated - got their componentDidMount called
 // but the window is still in construction phase (eg. dimensions unknown)
}

document.on("ready",function() {
 // **posted** event handler executed as the third step 
 // asynchronous, **after** SciterLoadFile() call  
 // the window may be visible at this moment
});

// or:
document.on("DOMContentLoaded",function() {
 // **posted** event handler executed as the third step 
 // asynchronous, **after** SciterLoadFile() call  
 // the window may be visible at this moment
});
</script>
```

## Document Unloading

While unloading the following events are invoked and in this order 

```JavaScript
document.on("unloadequest", function(evt){
  // call this  
  evt.preventDefault();
  // if needed to prevent document unloading.
  // On root document this also prevents window from closing.
})
```

```JavaScript
document.on("beforeunload", function(evt){
  // non cancelable event.
  // The document is about to be unloaded, document script namespace 
  // is valid an operational at this moment.
})
```

```JavaScript
frame.on("unload", function(evt){
  // non cancelable event.
  // The document is almost gone. It make sense to handle this event on
  // document containers: <frame> or window.
})
```

