# class Graphics.Image

Represents an image.

#### Properties:

* `image.src` - read-only, url of the image.
* `image.width` - read-only, integer.
* `image.height` - read-only, integer.
* `image.packaging` - read-only, string, "png","webp", etc.

#### Constructors:

`new Image(width, height, painter(graphics) [,initColor])` - TBD  
`new Image(width, height, element)` - render DOM element into bitmap.

#### Methods:

* `image.update(painter(graphics)[,initColor])` - draw on the image surface (if bitmap) 
* `image.toBytes(packaging [,compression:int]) : ArrayBuffer` - packaging is one of "png","jpeg","webp","bgra"


#### Static methods:

* `Image.fromBytes( data: ArrayBuffer ) : Image` - construct image from bytes (PNG,JPEG, etc).
* `async Image.load( url ) : Image` - loads image from url. Note it is an async function (returns promise actually).
