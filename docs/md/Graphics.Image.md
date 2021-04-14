# class Graphics.Image

Represents an image.

#### Properties:

* `image.src` - read-only, url of the image.
* `image.width` - read-only, integer.
* `image.height` - read-only, integer.
* `image.packaging` - read-only, string, "png","webp", etc.

#### Constructors:

`new Graphics.Image(width, height, painter(graphics) [,initColor])` - TBD  
`new Graphics.Image(width, height, element)` - render DOM element into bitmap.

#### Methods:

* `image.update(painter(graphics)[,initColor])` - draw on the image surface (if bitmap) 
* `image.toBytes(packaging [,compression:int]) : ArrayBuffer` - packaging is one of "png","jpeg","webp","bgra"


#### Static methods:

* `Graphics.Image.fromBytes( data: ArrayBuffer ) : Image` - construct image from bytes (PNG,JPEG, etc).
* `async Graphics.Image.load( url ) : Promise(Image)` - loads image from url. Note it is an async function (returns promise actually).
