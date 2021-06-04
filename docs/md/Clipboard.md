# Clipboard namespace

Includes functions dealing with system clipboard. 

## Methods:

* #### `Clipboard.read()` 
  
  returns [object containing clipboard data](#clipboard-data)

* #### `Clipboard.readText()` 

  returns either string or undefined if clipboard is doe not contain textual data.

* #### `Clipboard.write(data)` 

  Puts [data](#clipboard-data) into clipboard.  

* #### `Clipboard.writeText(string)` 

  Puts the string into clipboard.  

## Clipboard Data Object

Clipboard data object is a plain JS object that may contain following properties:

* `text`: string - text;
* `html`: string - html fragment;
* `json`: value - arbitrary JSON data;
* `file`: [path0,path1, ...] - list of file paths;
* `link`: { caption: string, url: string} - link to some file / location;
* `image`: Graphics.Image - image object;

