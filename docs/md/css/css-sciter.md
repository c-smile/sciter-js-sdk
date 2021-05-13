# Sciter CSS properties

* [`style-set`](README.md#styleset) named block of style rules declarations that are applied to elements DOM sub-tree.
* [`flow`](css-layout.md) direction of child elements in block containers (e.g. DIVs). This attribute defines type of layout manager (LM) used by the block container.
* `Foreground` image has the same set of attributes as background, but is drawn on top of everything.
* `context-menu` : `selector(#menu)` | `url(menu.htm)` use custom (right click) context menu
* `hit-margin` defines "hover area" of the element. Positive values increase hover area and negative values decrease it. Hit margins are calculated from border box of the element.
* `size` : `width height` short for declaring width and height.
* `behavior` names of native behaviors applied to this element.
* `prototype` : `name [ url(...) ]` Name of the class in the script, Such a class can define methods, properties and event handling methods of the whole class of elements this style applies to.
* `aspect` : `"functionName" [ url(...) ]` One or list of name/url pairs. Each element of the list is a full name of a function to be called for the element once in element's lifetime. The url is optional and if provided will cause script file from that url to be loaded.
* `content` : `"string"` | `attr()` | `parent-attr()` Allows to redefine textual content of the element in style.

* `scroll-manner` define scroll animation and behavior
* `vertical-scrollbar` : `style-set-name` - style set name that defines styles of vertical scrollbar.
* `horizontal-scrollbar` : `style-set-name` - style set name that defines styles of horizontal


- [Sciter CSS support map (incomplete)](https://sciter.com/docs/content/css/cssmap.html)