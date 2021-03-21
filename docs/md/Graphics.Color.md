# class Graphics.Color

Represents color value with red, blue. green and alpha components.

#### Properties:

* `color.r` - read/only, float(0..1.0), red channel.
* `color.g` - read/only, float(0..1.0), green channel.
* `color.b` - read/only, float(0..1.0), blue channel.
* `color.a` - read/only, float(0..1.0), alfa channel, 0.0 - fully transparent, 1.0 - fully opaque.

* `color.R` - read/only, int(0..255), red channel.
* `color.G` - read/only, int(0..255), green channel.
* `color.B` - read/only, int(0..255), blue channel.
* `color.A` - read/only, int(0..255), alfa channel, 0.0 - fully transparent, 1.0 - fully opaque.

* `color.hsv` - read/only, [hue:0..360, saturation:0..1, value: 0..1, alpha: 0..1], [HSV](https://en.wikipedia.org/wiki/HSL_and_HSV) color representation.
* `color.hsl` - read/only, [hue:0..360, saturation:0..1, lightness: 0..1], [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) color representation.

#### Methods:

* `color.toString(["RGB" | "RGBA" | "rgb" | "rgba"])` - produces strings in following formats "#RRGGBB", "#RRGGBBAA", "rgb(255,255,255)" or "rgba(255,255,255,1.0)" 
* `color.valueOf()` - integer, color packaged to uint32 as `(a << 24) | (b << 16) | (g << 8) | (r)`

#### Static methods:

* `Color.rgb( r, g, b [,a]) : Color` - creates color instance from r,g,b,a components - float numbers in `0.0 .. 1.0` range.
* `Color.RGB(0..255,0..255,0..255[,0..255])` same as above but components are integers in 0...255 range.
* `Color.hsv( h, s, v [,a]) : Color` - creates color instance from HSV components - float numbers in `0.0 .. 1.0` range but `h` is in `0.0 .. 360.0` range.
* `Color.hsl( h, s, l [,a]) : Color` - creates color instance from HSL components - float numbers in `0.0 .. 1.0` range but `h` is in `0.0 .. 360.0` range.
