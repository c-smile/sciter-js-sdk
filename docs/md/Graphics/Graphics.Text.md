# class Graphics.Text

Represents text block to be drawn on graphics. 

It can represent and render as single as multi-line texts.

`Graphics.Text` instances can be styled as by implicit `text.style = "..."` as by CSS in document styles using class names `text.style = "..."`.

Full set of block and text styles is supported, so you may define

```JavaScript
  text.style = "border:1px solid red; font: 12pt Roboto, sans-serif; width:max-content";  
```

to have a bordered text box.

#### Properties:

* `text.lines: number` read-only, reports number of text lines in the text layout.
* `text.chars: string` read/write, text to render.
* `text.style: string` read/write, style of the text including fonts, alignment, borders and background.
* `text.class: string` read/write, class name of the text in document's CSS styles.

#### Methods:

* `text.width(): [minWidth,maxWidth,usedWidth]` - reports minimal, maximal and used width of the text block.
* `text.width(usedWidth)` - sets used width of the text block. Note: `text.lines` property may change after that
* `text.height(): [contentHeight,usedHeight]` - reports content and used height of the text block. 
* `text.height(usedHeight)` - sets used height of the text block. Note: vertical-align of text style may change location of glyphs on screen.
* `text.lineMetrics(lineNo) : [yPos, height, baselineOffset]` - line metrics
* `text.lineChars(lineNo) : string` - line text

