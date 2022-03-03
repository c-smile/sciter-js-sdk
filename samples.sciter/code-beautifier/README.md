# Code beautifier

In this example, we are beautify html, css and js code using [prettier](https://github.com/prettier/prettier). prettier requires [Node.js](https://nodejs.dev/) and its package manager `npm` to be installed.

## install

```sh
npm install
```

## beautify code

```sh
npx prettier --write test
```

## known issues

The sciter additions to `html` cause `prettier` to report errors because it cannot parse the shortcuts for attributes `id` (`#`), `class` (`.`), `type` (|) and `name` (`()`) when no space is used after the html element.

This cannot be parsed:

```html
<select|dropdown(theme)>
</select>
```

while this works:

```html
<select |dropdown(theme)>
</select>
```
