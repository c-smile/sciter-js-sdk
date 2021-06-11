# class Graphics.Path

Represents 2D path. Also known as Path2D in browsers.

#### Properties:

#### Methods:

* `path.moveTo(x, y)`
* `path.lineTo(x, y)`
* `path.quadraticCurveTo(cpx, cpy, x, y)`
* `path.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`
* `path.arc(x, y, radius, startAngle, endAngle [, anticlockwise])`
* `path.arcTo(x1, y1, x2, y2, radius)`
* `path.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise])`
* `path.rect(x, y, width, height)`
* `path.closePath()`

* `path.isPointInside(x,y)`
* `path.bounds(): [x1,y1,x2,y2]`
* `path.combine(how, otherPath): Path` combines this and other paths using following modes:
  
  * `"union"` 
  * `"intersect"`
  * `"xor"`
  * `"exclude"`

