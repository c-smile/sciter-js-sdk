# module `@debug`

The module contains Sciter debugging functions.

## functions:

* `setUnhandledExeceptionHandler(function)`

  ```js
  import * as debug from "@debug";

  debug.setUnhandledExeceptionHandler(function(err) {
    console.error(err.toString() + "\r\n" + err.stack);
  });
  ```

* `setConsoleOutputHandler(function)`
* `setResourceArrivalHandler(function)`
* `setBreakpointHandler()`
* `setBreakpoints()`
* `getElementByUID(int)`
* `getUIDofElement(element)`
* `highlightElement(element)`
* `getStyleRulesOfElement(element)`
* `containerId()`
* `objectKind(object)`
* `sublimatedValue(value,expanded)`
* `sublimatedValueElements()`
* `frameVariables(frameId)`

