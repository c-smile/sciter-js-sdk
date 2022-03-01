# module `@sciter`

The module contains Sciter specific functions.

## constants:

### `sctr.VERSION`

String, readonly, current engine version in the form "X.X.X.X";

### `sctr.REVISION`

String, readonly, SVN build revision;

### `sctr.QUICKJS_VERSION`

String, readonly, QuickJS version

## functions:

### `sctr.import(path:string):object`

That is the synchronous equivalent of standard JS [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports), so it can be used synchronously as

```JS
let module = sctr.import('modules/my-module.js');
```

That is essentially the dynamic equivalent of static import

```JS
import * as module from 'modules/my-module.js';
```

### `sctr.loadLibrary("name"): any`

Loads Sciter extension native library (dll,so,dylib). 

The "name" is the name of DLL without extension. 

The dll shall reside in the same folder as executable. See /sqlite project that can be used to produce sciter-sqlite extension dll.

### `sctr.parseValue(string): any`

Parses _string_ value by "JSON++ rules", here are valid inputs:

* `"true"` -> _true_ value;
* `"null"` -> _null_ value;
* `"1234"` ->  Numeric value 1234;
* `"0xFF"` ->  Numeric value 255 (hex);
* `"2021-12-01"` -> date 2021-12-01 (in ISO format);
* `"12px"` -> value of Length class;
* `"1rad"` -> value of Angle class;
* `"{name1:val1, name2:val2,...}"` -> object value;
* `"{some-name1:val1; some-name2:val2; ...}"` -> CSS kind of object value;
* `"[val1, val2, ...]"` -> array;

### `sctr.devicePixels(length: int | string[,axis])`
   
Converts _length_ to device (screen) pixels:

- _length_ can be integer - number of dips (a.k.a. "CSS pixels")  
- or a string like "2in" to get number of screen pixels in 2 inches of a ruler placed on screen.
- _axis_ is either "width" or "height", note axis parameter makes sense only for devices that have different resolution on x/y axis.


### `sctr.on("eventname" [, "selector" ], handler)`

Subscribe to any DOM event, conceptually close to `document.on(...)`

### `sctr.off("eventname" | handler)`

Unsubscribe event handler from DOM event.

### `sctr.$("selector"): Element`

Returns first matched DOM element in current document.

### `sctr.$$("selector"): array(Element)`

Returns list (array) of matched DOM elements.

### `sctr.uuid():string`

Returns [uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier) as a string.

### `sctr.encode(text:string, [encoding:string="utf-8"]):arrayBuffer`

Encodes text to sequence of bytes (ArrayBuffer). Default _encoding_ is "utf-8".

  _encoding_ is [IANA encoding](https://www.iana.org/assignments/character-sets/character-sets.xhtml) identifier

### `sctr.decode(bytes:arrayBuffer, [encoding:string="utf-8"]):string`

Decodes sequence of bytes of buffer to string. Default _encoding_ is "utf-8".

### `sctr.compress(in:arrayBuffer,[method]):arrayBuffer`

Returns compressed _in_ buffer.

Where _method_ is one of "gz","gzip" or "lzf" (default).

### `sctr.decompress(in:arrayBuffer,[method]):arrayBuffer`

Returns decompressed _in_ buffer.

_method_ is one of "gz","gzip" or "lzf" (default).

### `sctr.toBase64(in:arrayBuffer):string`

Returns string - base64 encoded _in_ buffer.

### `sctr.fromBase64(in:string):arrayBuffer`

Restores array buffer from base64 encoded string.

### `sctr.md5(in:arrayBuffer):string`

Returns md5 digest (a.k.a. hash) of the _in_ data.

### `sctr.crc32(in:arrayBuffer):integer`

Returns crc32 hash of the _in_ data.

