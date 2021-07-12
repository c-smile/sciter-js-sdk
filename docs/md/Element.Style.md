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

<details>
<summary>element.style.<b>getPropertyValue</b>(name)</summary>

returns a string containing the value of a specified CSS property.

</details>
<details>
<summary>element.style.<b>setProperty</b>(name, value [,important])</summary>

sets a new value for a CSS property.

</details>
<details>
<summary>element.style.<b>removeProperty</b>(name)</summary>

removes a property value previously set by setProperty.

</details>
<details>
<summary>element.style.<b>colorOf</b>(name)</summary>

reports a value of property _name_ as an instance of [`Graphics.Color`](Graphics/Graphics.Color.md) class. Returns null if the propety is not a color.

</details>
<details>
<summary>element.style.<b>pixelsOf</b>(name): number</summary>

reports used value of property _name_ as a number of CSS pixels. Returns null if the propety is not a length.

</details>
<details>
<summary>element.style.<b>imageOf</b>(name):Image</summary>

reports used value of property _name_ as an instance of [`Graphics.Image`](Graphics/Graphics.Image.md). Returns null if the propety is not an image.

</details>
<details>
<summary>element.style.<b>variables</b>([{name:value,...}]):{name:value, ...}</summary>

if parameter is not provided reports CSS variables seen by the element, returns the set as {name:value, ...} map.

Otherwise, if the parameter is an object (name/value map), sets CSS variables on the element.

</details>
<details>
<summary>element.style.<b>setCursor</b>(null | image, hotspotX, hotspotY)</summary>

sets/resets element's cursor.

</details>