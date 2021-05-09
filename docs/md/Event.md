### class Event

#### properties:

* `event.bubbles`
* `event.cancelable`
* `event.currentTarget`
* `event.defaultPrevented`
* `event.eventPhase`
* `event.target`
* `event.type`
* `event.data`
* `event.details`
* `event.keyCode`
* `event.altKey`
* `event.ctrlKey`
* `event.metaKey`
* `event.shiftKey`
* `event.button`
* `event.buttons`
* `event.clientX`
* `event.clientY`
* `event.screenX`
* `event.screenY`

#### properties (Sciter specific):

* `event.x` - sciter specific, coordinates are relative
* `event.y` - to `event.currentTarget`
* `event.source` - used in some events to indicate auxiliary "source" element. 

#### methods:

* `event.preventDefault()`
* `event.stopImmediatePropagation()`
* `event.stopPropagation()`


### Known Events

#### Mouse

* `"mousemove"`
* `"mouseenter"`
* `"mouseleave"`
* `"mouseidle"` - mouse stays not moving in the element, the event triggers tooltip show.
* `"mousetick"` - mouse is pressed for some time in element, periodic event
* `"mousedown"`
* `"mouseup"`
* `"mousewheel"`
* `"mousedragrequest"`
* `"dblclick"` | `"doubleclick"`
* `"tripleclick"`

#### Behaviors

* `"click"`
* `"input"` | `"change"` 
* `"press"` 
* `"changing"` 
* `"submit"` 
* `"reset"`  
* `"expand"`  
* `"collapse"`  
* `"statechange"` 
* `"visualstatechange"` 
* `"disabledstatechange"` 
* `"readonlystatechange"` 

* `"contextmenu"` - context menu request for the element
* `"contextmenusetup"` - notification to setup context menu, context menu DO< element is event.source
* `"animationend"`
* `"animationstart"` 
* `"animationloop"` 
* `"mediachange"` 
* `"contentchange"` 
* `"inputlangchange"` 
* `"pastehtml"` 
* `"pastetext"` 
* `"pasteimage"` 
* `"popuprequest"`  
* `"popupready"`    
* `"popupdismissing"` 
* `"popupdismissed"`  

* `"tooltiprequest"` 

#### Focus

* `"focusin"`
* `"focusout"` 
* `"focus"` 
* `"blur"` 

#### Keyboard

* `"keydown"`
* `"keyup"`  
* `"keypress"`
* `"compositionstart"`
* `"compositionend"`

#### Scroll

* `"scroll"`
* `"scrollanimationstart"` 
* `"scrollanimationend"` 

#### Document lifecycle

* `"close"` | `"unload"`
* `"beforeunload"`
* `"closerequest"`

* `"ready"` | `"DOMContentLoaded"` 
* `"parsed"` 
* `"complete"` 

#### Element's state change

* `sizechange` - change of element dimensions, use `element.onsizechange = function() {}` to setup the event handler;
* `visibilitychange` -  - change of element visibility status,  use `element.onvisibilitychange = function() {}` to setup the event handler;

#### Image 

* `"load"`
* `"error"`

#### Pager (print preview)

* `"paginationstart"`
* `"paginationpage"` 
* `"paginationend"` 

#### Drag-n-drop

* `"drag"`
* `"dragenter"` 
* `"dragleave"` 
* `"drop"` 
* `"dragcancel"` 
* `"dragaccept"` 
* `"willacceptdrop"`

#### Video 

* `"play"`
* `"ended"`

* `"videocoordinate"`
* `"videoframeready"`

