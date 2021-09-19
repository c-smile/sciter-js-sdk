# class Graphics.Image

Represents an image.

## Properties:

* `image.src` - read-only, url of the image.
* `image.width` - read-only, integer.
* `image.height` - read-only, integer.
* `image.packaging` - read-only, string, "png","webp", etc.

## Constructors:

* #### `new Graphics.Image(width, height, painter(graphics) [,initColor])`   

  render arbitrary graphics on bitmap.

* #### `new Graphics.Image(width, height, element)` 

  render [DOM element](../Element.md) onto bitmap.

## Methods:

* #### `image.update(painter(graphics)[,initColor])` 

  draw on the image's surface. Image must be a bitmap.

* #### `image.toBytes(packaging [,compression:int]) : ArrayBuffer` 

  packaging is one of "png","jpeg","webp","bgra".

* #### `image.colorAt(x,y): Color | null` 

  returns pixel color at x/y.

* #### `image.compose(src:Image, op: string, [dstx,dsty [,srcx,srcy,srcw,srch]]): Image` 

  compose this image with _src_ image. 
  
  _op_ is one of: "src-over", "dst-over", "src-in", "dst-in", "src-out", "dst-out", "src-atop", "dst-atop", "xor", "copy".

  Returns the image.

## Static methods:

* #### `Graphics.Image.fromBytes( data: ArrayBuffer ) : Image` 

  construct image from bytes (PNG,JPEG, etc).

* #### `async Graphics.Image.load( url ) : Promise(Image)` 

  loads image from url. Note: it is an async function (returns promise actually).