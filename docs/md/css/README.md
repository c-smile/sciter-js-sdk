# CSS


## Units

The engine supports following length units:

- `px` - pixels, relative to the viewing device. On screen 1px is exactly one device pixel. On printer 1px is equal to 1/96 of inch.

- `em` - the font-size of the relevant font;
- `ex` - the x-height of the relevant font;
- `in` - inches - 1 inch is equal to 2.54 centimeters;
- `cm` - centimeters;
- `mm` - millimeters;

- `pt` - points - the points used by CSS 2.1 are equal to 1/72nd of an inch;
- `pc` - picas - 1 pica is equal to 12 points;

- `%` - percent - usually equals to precentage value of correspondent metric of parent element. But not always, see CSS specification.
- `vw` - 1/100th of view (window) width;
- `vh` - 1/100th of view (window) height;
- `vmin` - 1/100th of view's smallest side;
- `vmax` - 1/100th of view's largest view(window) size.

- `%%` - flex ("weight") - percentage of free space.
- `*` - flex ("weight") - 1* is equal to 100%%;
- `dip` - device independent pixels - logical units. 1dip = 1/96 of inch therefore on 96DPI display this will be one pixel. On high-dpi screens it will be resolved to larger number of physical pixels. For example: 2dip will take 3px on 120DPI screen. On printer 'dip' and 'px' units are equivalent.

- Its recommended to use `dip` and `*`.
- you can treat `px` as `dip` using [native property](https://sciter.com/road-to-sciter-js-step-i-supports-px-ppx-dip/).
- [Read more about `weight` unit](https://sciter.com/docs/flex-flow/flex-layout.htm)

## Colors

Engine supports following forms of defining color constants:

- `#f00`      - #rgb form.
- `#ff0000`   - #rrggbb form.
- `#aaff0000` - #aarrggbb form.

- `rgb(255,0,0)`      - rgb(0..255,0..255,0..255) form.
- `rgb(100%,0%,0%)`   - rgb(0..100%,0..100%,0..100%) form.
- `rgba(255,0,0,0.5)` - rgba(0..255,0..255,0..255,0..1) form.

- `hsl(300,0%,0%)`    - hsl(0..360,0..100%,0..100%) form - HSL color space.

- `morph(basecolor, ...)` - color morphing/transformation function: 
basecolor is either color constant or color variable.

The `morph()` function accepts one of several parameters:

- `hue:Adeg` - creates new color by changing H (Hue) component of basecolor in HSL color space. A is new angle, degree number 0...360 - absolute value of H component. 

- `rotate:Adeg` - changes H by relative rotation from base color, A is a rotation angle : -360deg ... +360deg.

- `lightness:p%` - creates new color by changing Lightness component of basecolor in HSL color space. p is a number 0...100 - absolute value of L component.

- `lightness:p%` - creates new color by changing L (Lightness) component of basecolor in HSL color space. p is a number 0...100 - absolute value of L component.

- `lighten:p%` - changes Lightness component of basecolor in HSL color space by increasing basecolor::L component. p is a number 0...100 - relative increment of L component.

- `darken:p%` - changes Lightness component of basecolor in HSL color space by decreasing basecolor::L component. p is a number 0...100 - relative decrement of L component.

- `saturation:p%` - creates new color by changing S (Saturation) component of basecolor in HSL color space. p is a number 0...100 - absolute value of S component.

- `saturate:p%` - changes S by increasing Saturation component of basecolor in HSL color space. p is a number 0...100 - relative increment of S component.

- `desaturate:p%` - changes S by decreasing Saturation component of basecolor in HSL color space. p is a number 0...100 - relative decrement of S component.

- `opacity:p%` - creates new color by changing A (alpha) component of basecolor in RGBA color space. p is a number 0...100 - absolute value of A component, if 100% then color is opaque and if 0% then color fully transparent.

- `opacify:p%` - changes A (alpha) by increasing or decreasing current A value of basecolor. p is a number -100%...100% - relative increment/decrement of A component.

- `mix:p%` - creates color that is between basecolor and color2, p is a number 0%...100% - ratio of the mix. If p == 0% then result is basecolor and if 100% - color2.

- `grayscale:p%` - converts the basecolor to grayscale. If p is 100% then result is pure grayscale color (R == G == B).  If p is 0% then result is original basecolor.

- `sepia:p%` - converts the basecolor to sepia. If p is 100% then result is pure sepia color, if p is 0% then result is original basecolor.


## Variables

Variable is declared as a property but with name wrapped into `var(...)` construct,
or default CSS `--name`, example:

```CSS
body {
  var(text-color): #000;
  var(base-width): 100dip;
  /* 4.4.8.0+ */
  --text-color: #000;
  --text-font : Arial;
}
```

Variables are inherited from parent to child. 

Variables can be used in other property value declarations - all places where string, color or length units are expected by using either:

- `var(name,defaultValue)` - substitutes the declaration by _defaultValue_ if _name_ not declared.

- `length(name)`

- `color(name)`

Examples of variable use:

```CSS
div {
  color: color(text-color);  /* #000 */
  width: length(base-width); /* 100dip */
  height: var(base-height,80dip); /* 80dip as base-height was not defined */
  font: var(--text-font); /* Arial */
}
```

## Constents

Constents can be declared globally as followed:

```CSS
@const DARK : #222;
body {
  background: @DARK;
}
```

## StyleSet

Style set is a named block of style rules declarations that are applied to elements DOM sub-tree.
it allow style declaration scoping like used in LESS and SASS

```CSS
div { 
  style-set: myStyle;
  style-set-base: parentStyle //| inherit styleset from
}

@set myStyle //| inheritance is allowed, myStyle < parentStyle
{ 
  :root { //| Element itself (div)
    ...
  }
  p {     //| Child element
    ...
  }
}
```

You can assign it from HTML, `file.css#myStyle` if the style file is not included.

```XML
<div styleset="#myStyle"></div>
```

## Mixin

Named set of CSS properties that can be applied by @name to CSS rules, can use params.

```CSS
@mixin LIKE-BUTTON(basecolor)
{
  behavior:button;
  color: #ffffff;
  background: linear-gradient(top, tint(basecolor,+0.3), basecolor);
}

div {
  @LIKE-BUTTON(#fff);
  ...
}
```

## ImageMap

```CSS
@image-map std-tree-icons
{
  src: url(sciter:tree-icons-x1.png) 100dpi,
       url(sciter:tree-icons-x2.png);
  cells:2 1; /* 2 columns, 1 row */
  /* logical names of the parts, see radios.png */ 
  items:
    plus,
    minus;
}
```

# MISC

- [Sciter CSS support map (incomplete)](https://sciter.com/docs/content/css/cssmap.html)

- [Style sets in Sciter](https://sciter.com/style-sets-in-h-smile-core/)

- [Sciter CSS and Browser CSS in single file](https://sciter.com/road-to-sciter-js-step-i-supports-px-ppx-dip/)

- [@mixin feature in Sciter’s CSS](https://sciter.com/mixin-feature-in-sciters-css/)
