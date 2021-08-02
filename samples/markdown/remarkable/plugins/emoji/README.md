# remarkable-emoji

A plugin to add emoji support for [Remarkable](https://github.com/jonschlinkert/remarkable).
The plugin can translate all emojis and most common emoticons to their unicode characters. It can be used in combination with 
client-side libraries such as Twitter's [Twemoji](https://github.com/twitter/twemoji) to generate cross platform image based emojis.

## Installation

This plugin can be installed via npm.

```bash
    npm install remarkable-emoji
```

## Usage

```javascript
    var Remarkable = require('remarkable');
    var remarkable-emoji = require('remarkable-emoji');
    var md = new Remarkable();
    
    md.use(remarkable-emoji);
    
    md.render("# I :laughing: when I am :)");
```

This plugin can be used in combination with Twemoji as such:

```javascript
    var renderedText = twemoji.parse(md.render("This is an airplane :airplane:"));
    console.log(renderedText);
```

ES2020'zed version of https://github.com/scrollback/remarkable-emoji