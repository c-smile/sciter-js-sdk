# sciter-js-sdk
Sciter.JS - Sciter but with QuickJS on board instead of my TIScript

## Script

Sciter.JS uses [QuickJS](https://bellard.org/quickjs/) 

* ES6: async/await, classes, modules, destructuring;
* BigInt, BigFloat, BigDecimal - arbitrary precision IEEE 754 floating point operations and transcendental functions with exact rounding (currency, etc);
* Node.JS runtime (more or less full) is coming; 

## Platforms

* Windows - i32, i64 and arm64 - published;
* MacOS - i64 and arm64 - pending;
* Linux - i64, arm32, arm64 - pending;
* Mobiles - pending;

## Demo

![Browser and Sciter](https://sciter.com/wp-content/uploads/2020/10/Sciter.JS.Calc_-e1602390091709.png)

Browser and Sciter shows [the same HTML document](https://github.com/c-smile/sciter-js-sdk/blob/main/samples/calc/index.html).

To run demo start run-calculator-browser.bat or run-calculator-sciter.bat. The later will start bin.win/x32/scapp.exe - standalone Sciter engine.

## DOM and Runtime status

Implemented so far (list will be extended): 

### Document

Properties:

* document.body
* document.head
* document.documentElement

Methods:

* document.querySelector()
* document.querySelectorAll()
* document.getElementById()

### Element extends Node

Properties:

* element.className
* element.id
* element.tagName
* element.innerHTML
* element.outerHTML
* element.innerText
* element.nextElementSibling
* element.previousElementSibling
* element.value

Methods:

* element.appendChild(node)
* element.insertBefore(node, refNode)
* element.insertAfter(node, refNode)
* element.removeChild(node)
* element.replaceChild(newNode,oldNode)
* element.insertAdjacentHTML(where, html)
* element.querySelector(selector)
* element.querySelectorAll(selector)
* element.addEventListener(...)

### Node

Properties:

* node.nodeName
* node.nodeType
* node.nodeValue
* node.firstChild
* node.lastChild
* node.nextSibling
* node.previousSibling
* node.ownerDocument
* node.parentNode
* node.parentElement
* node.textContent

Methods:

* node.cloneNode()
* node.contains()
* node.compareDocumentPosition() - not yet
* node.getRootNode()
* node.hasChildNodes()
* node.isEqualNode()
* node.isSameNode()

### Event

properties:

* event.bubbles
* event.cancelable
* event.currentTarget
* event.defaultPrevented
* event.eventPhase
* event.target
* event.type

methods:

* event.preventDefault()
* event.stopImmediatePropagation()
* event.stopPropagation()

### global methods

* console.log()
* setTimeout(func,milliseconds)
* clearTimeout(tid)
* setInterval(func,milliseconds)
* clearInterval(iid)

## Window

There is no concept of Window in browser sense. Window there is quite strange entity that has no relation with desktop windows.

Instead Sciter.JS will offer `Sciter.window` object that represents current desktop window with [these properties and attributes](https://sciter.com/html-window/)

```javascript
  import {window} from 'Sciter'; // current window
  window.move(10,10,800,600);
```
