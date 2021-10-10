# module `@debug`

The module contains Sciter debugging functions.

Debug and log can be viewed in `Inspector` application.

## Enabling

- uSciter : click the cog icon to launch Inspector

- Scapp : must be launched with `--debug` argument, `scapp main.html --debug`

- Native : `SciterSetOption(nullptr, SCITER_SET_DEBUG_MODE, TRUE);` in main function.


## functions:

* `setUnhandledExeceptionHandler(function)` 
 
  Catch unhandeld exceptions.

  ```js
  import * as debug from "@debug";

  debug.setUnhandledExeceptionHandler(function(err) {
    console.error(err.toString() + "\r\n" + err.stack);
  });
  ```

* `setConsoleOutputHandler(function)` 
 
  Redirect console output.

  Works when the application is not connected to the inspector. [https://sciter.com/forums/topic/debug-2/](https://sciter.com/forums/topic/debug-2/)

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

* `callStackAt(level:integer):object`

  Gets call stack item at _level_

  Returns object with the fields:

  * `isNative` - boolean, true if that call stack frame is of native function;
  * `functionName` - string;
  * `functionLineNo` - line number of function declaration;
  * `fileName` - string;
  * `lineNo` - line number inside the function;

  Use `callStackAt(0)` to get info about current function.

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

