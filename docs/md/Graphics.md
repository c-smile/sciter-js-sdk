# class Graphics

Class Graphics represents 2D graphics primitives.

In Sciter.JS Graphics is available :

1. at `<canvas>` element where it represents its offscreen buffer.
2. in `element.paintXXXX(graphics)` [methods](Element.md#paintXXX) to support so called immediate mode painting.
3. in `new Image(painter(graphics))` constructor to draw on Image surface.

Class Graphics also is a namespace that contains classes:

* [Graphics.Color](Graphics.Color.md)
* [Graphics.Image](Graphics.Image.md)
* [Graphics.Text](Graphics.Text.md)
* [Graphics.Path](Graphics.Path.md)
* [Graphics.Brush](Graphics.Brush.md)

#### Properties:

* `graphics.lineCap` 
* `graphics.lineJoin`
* `graphics.strokeStyle`, color | string
* `graphics.lineWidth`, width
* `graphics.fillStyle`, color | string
* `graphics.font`, string

#### Methods:

* `graphics.clearRect(x,y,w,h)`
* `graphics.beginPath()`
* `graphics.moveTo(x, y)`
* `graphics.lineTo(x, y)`
* `graphics.quadraticCurveTo(cpx, cpy, x, y)`
* `graphics.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`
* `graphics.arc(x, y, radius, startAngle, endAngle [, anticlockwise])`
* `graphics.arcTo(x1, y1, x2, y2, radius)`
* `graphics.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise])`
* `graphics.rect(x, y, width, height)`
* `graphics.closePath()`
* 
* `graphics.stroke([path])`
* `graphics.fill([path][,fillRule])`
* `graphics.fillRect(x,y,w,h)`
* 
* `graphics.setLineDash(n1,n2,...)`

* `graphics.save()`
* `graphics.restore()`

* `graphics.scale(x,y)`
* `graphics.translate(x,y)`
* `graphics.rotate(radians [,x,y])`
* `graphics.transform(a,b,c,d,e,f)`
* `graphics.setTransform(a,b,c,d,e,f)`

* `graphics.fillText(text,x,y,maxWidth)`

#### Methods (Sciter.JS specific):

* `graphics.draw(path, {params})` - TBD
* `graphics.draw(image, {params})` - TBD
* `graphics.draw(text, {params})`  - TBD 
* `graphics.draw(element, {params})` - TBD 

* `graphics.pushLayer(x,y,w,h[,opacity|filter])` rect clip with optional opacity or filter
* `graphics.pushLayer(imageMask, useAlpha [,opacity] )` image mask clip with optional opacity
* `graphics.pushLayer(clipAreaName[,opacity] )` area clip with optional opacity. Area name is one of:
  * `"background-area"` - element background area accounting border-radius;
  * `"border-box"`,
  * `"padding-box"`,
  * `"margin-box"`,
  * `"content-box"`
* `graphics.popLayer()` 



