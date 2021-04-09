# class Element.Style

Instances of Element.Style class represent list of CSS properties set on element.

To get reference to style collection use ```element.style``` property.

#### Properties:  

To get/set a property use either camelCase notation as: 

```JavaScript
var bgColor = element.style.backgroundColor;
```

or the "hyphen-case" form:

```JavaScript
var bgColor = element.style["background-color"];
```

#### Methods:

* `element.style.getPropertyValue(name)`
* `element.style.setProperty(name, value [,important])`
* `element.style.removeProperty(name)`
* `element.style.colorOf(name)` reports color property _name_ as instance of [`Graphics.Color`](Graphics.Color.md) class.
* `element.style.variables() : {}` reports CSS variables seen by the element, reports the set as {name:value, ...} map.
* `element.style.variables({name:value,...})` sets CSS variables on the element.
* `element.style.setCursor(image | null,hotspotX,hotspotY)` set/reset element's cursor by image.

