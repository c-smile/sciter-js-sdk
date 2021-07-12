# module `@sciter`

The module contains Sciter specific functions.

## constants:
<details>
<summary><code>VERSION</code></summary>

Constant string, current engine version in the form "X.X.X.X";

</details>
<details>
<summary><code>REVISION</code></summary>

Constant string, SVN build revision;

</details>
<details>
<summary><code>QUICKJS_VERSION</code></summary>

QuickJS version

</details>

## functions:
<details>
<summary><code>devicePixels(length: int | string[,axis])</code></summary>
   
Converts _length_ to device (screen) pixels:

- _length_ can be integer - number of dips (a.k.a. "CSS pixels")  
- or a string like "2in" to get number of screen pixels in 2 inches of a ruler placed on screen.
- _axis_ is either "width" or "height", note axis parameter makes sense only for devices that have different resolution on x/y axis.
</details>
<details>
<summary><code>loadLibrary("name"): any</code></summary>

Loads Sciter extension native library (dll,so,dylib). 

the "name" is dll name without extension. 

The dll shall reside in the same folder as executable. See /sqlite project that can be used to produce sciter-sqlite extension dll.  
</details>
<details>
  <summary><code>on("eventname" [, "selector" ], handler)</code></summary>

Subscribe to any DOM event, conceptually close to `document.on(...)`

</details>
<details>
<summary><code>off("eventname" | handler)</code></summary>

Unsubscribe event handler from DOM event.

</details>
<details>
<summary><code>$("selector")</code></summary>

Returns first matched DOM element in current document.

</details>
<details>
<summary><code>$$("selector")</code></summary>

Returns list (array) of matched DOM elements.

</details>
<details>
<summary><code>uuid():string</code></summary>

Returns [uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier) as a string.

</details>
<details>
<summary><code>encode(text:string,[encoding]):arrayBuffer</code></summary>

Returns encoded _text_ as arrayBuffer. Default _encoding_ is "utf-8".

</details>
<details>
<summary><code>decode(bytes:arrayBuffer,[encoding]):string</code></summary>

Returns decoded bytes as string. Default _encoding_ is "utf-8".

</details>
<details>
<summary><code>compress(in:arrayBuffer,[method]):arrayBuffer</code></summary>

Returns compressed _in_ buffer.

Where _method_ is one of "gz","gzip" or "lzf" (default).

</details>
<details>
<summary><code>decompress(in:arrayBuffer,[method]):arrayBuffer</code></summary>

Returns decompressed _in_ buffer.

_method_ is one of "gz","gzip" or "lzf" (default).

</details>
<details>
<summary><code>toBase64(in:arrayBuffer):string</code></summary>

Returns string - base64 encoded _in_ buffer.

</details>
<details>
<summary><code>fromBase64(in:string):arrayBuffer</code></summary>

Restores array buffer from base64 encoded string.

</details>
<details>
<summary><code>md5(in:arrayBuffer):string</code></summary>

Returns md5 digest (a.k.a. hash) of the _in_ data.

</details>
<details>
<summary><code>crc32(in:arrayBuffer):integer</code></summary>

Returns crc32 hash of the _in_ data.

</details>
