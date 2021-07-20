# module `@debug`

The module contains Sciter debugging functions.

## functions:

* `setUnhandledExeceptionHandler(function)` - handle unhandeld exceptions

  ```js
  import * as debug from "@debug";

  debug.setUnhandledExeceptionHandler(function(err) {
    console.error(err.toString() + "\r\n" + err.stack);
  });
  ```

* `setConsoleOutputHandler(function)` - redirect console output

  works when the application is not connected to the inspector. [https://sciter.com/forums/topic/debug-2/]](https://sciter.com/forums/topic/debug-2/)

  ```js
  import * as debug from "@debug";

  function log(subsystem, severity, msg)
  {
    //...
  }

  debug.setConsoleOutputHandler(function(subsystem, severity, msg) {
    log(subsystem, severity, msg);
    return true;
  });
  ```

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

