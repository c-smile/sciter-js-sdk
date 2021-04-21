# Markdown file viewer

This application is a viewer of Markdown files.

## Intended usage

This application should be compiled with [Sciter.Quark](https://quark.sciter.com) to produce ```mdview``` executable on target platform.

Then the executable can be called with a .md file name to view it:

```
> mdview file/to/view.md
```

You also can configure your desktop to open .md files in the viewer by clicking on filename in Explorer, etc. 

You can also view entire folder, this will list .md files.

```
> mdview folder/to/view
```

## Features

* Maintins view history. So you may have to start the viewer with the root/toc MD file - for example for viewing documentation pages.
* Supports day/night themes.
* It uses [Remarakable](https://github.com/jonschlinkert/remarkable) JS library for MD -> HTML conversion and so it is configurable - various [plugins are available](https://www.npmjs.com/search?q=keywords:remarkable).
* Supports printing but on Windows only so far.

