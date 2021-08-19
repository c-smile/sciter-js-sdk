# Markdown file viewer

This application is a viewer of Markdown files.

This application should be compiled with [Sciter.Quark](https://quark.sciter.com) to build the `mdview` executable on the target platform.

## Features

* Maintains view history. So you may have to start the viewer with the root/toc MD file - for example for viewing documentation pages.
* Supports day/night themes.
* It uses [Remarakable](https://github.com/jonschlinkert/remarkable) JS library for MD -> HTML conversion and so it is configurable - various [plugins are available](https://www.npmjs.com/search?q=keywords:remarkable).
* Supports printing but on Windows only so far.

## how to use

To view a document

```
> mdview README.md
```

You can also view an entire folder, this will list all .md files.

```
> mdview folder/to/view
```

You also can configure your desktop to open .md files in the viewer by clicking on filename in Explorer, etc. 
