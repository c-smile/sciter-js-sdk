# URL Schemes supported by Sciter

## Common URL schemes:

### `http://...` and `https://...`

Access to remote resources using HTTP protocol. Sciter uses platform HTTP clients: WinINET(Windows), CoreNetwork (MacOS) and libcurl (Linux).  

### `file://...`

Access to local file system. Sciter uses direct reading from FS using memory mapped files.  

### `data://...`

[Standard inplace data encoded scheme](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs). 

## Sciter specific schemes:

### `home://path...`

Access to files in local file system relative to location in FS of running sciter.dll/.so or application executable if Sciter is linked statically.

Example, getting local file placed in the same folder:
```JS
let res = await fetch("home://config.json");
```

### `sciter:resource...`

Access to resources embedded into Sciter itself. 

Some resources that may be of interest for applications:

* `sciter:ux-master.css` and `sciter:master-base.css`  - so called master css declarations - default styling of elements.
* `sciter:msgbox.htm` and `sciter:msgbox.css`  - definition of built-in message boxes: `Window.this.modal(<alert>...</alert>)`, and so on.
* `sciter:icon-alert.png`, `sciter:icon-error.png`,`sciter:icon-information.png` and `sciter:icon-question.png` - icons used in message boxes.

### `path:...`

URL schema used in CSS to define vector paths (vector images):

```CSS
  div { background-image: url(path: M 0 0 L 1 1 Z); }
```

## Semi-official URL schemes:

 These schemes used in SDK only - outside of Sciter core - Sciter does not interpret them internally.

### `this://app/...`

Access to content of sciter archive - resources compiled in the application using blobs produced by packfolder[.exe] utilty.

See [SDK's resource loader sources](https://github.com/c-smile/sciter-js-sdk/blob/main/include/sciter-x-host-callback.h#L149).

```C++
// bind resource blob with sciter::archive instance:
sciter::archive::instance().open(aux::elements_of(resources)); // bind resources[] (defined in "resources.cpp") with the archive
...
window->load(WSTR("this://app/default.htm"));
```

### `res:resource-name`

MS Windows specific: access to resources bundled into application. 

See [SDK's resource loader sources](https://github.com/c-smile/sciter-js-sdk/blob/main/include/sciter-x-host-callback.h#L134).