# CSS Render

Render quality can be controlled with CSS properties

## Font

`font-rendering-mode`

- `classic|snap-pixel` fastest, glyphs can be placed "between pixels".
- `enhanced|sub-pixel` higher quality, glyphs positions shall fall to pixel grid, this mode is desired for text editing scenarios so caret position will not overlap glyphs.

## Image

`image-rendering`

The image-rendering property provides a hint about the algorithm it should use to scale images. Supports one of the following values:
- `inherit` inherit value from parent
- `auto` bilinear or bicubic interpolation
- `crisp-edges` linear interpolation
- `pixelated` nearest-neighbour interpolation
- `default`	alias of crisp-edges
- `optimize-quality` alias of auto
- `optimize-speed` alias of pixelated

Default value is inherit - once it defined on a container it is used by rendering background and foreground images of all children (if they do not override it).

