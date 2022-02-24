# Code linting

Linting is the automated checking of your source code for programmatic and stylistic errors.

In this example, we are linting javascript code using [xo](https://github.com/xojs/xo). Xo requires [Node.js](https://nodejs.dev/) and its package manager `npm` to be installed.

## install linter

```sh
npm install
```

## review code for errors

```sh
npx xo test/*
```

## review and fix code errors

```sh
npx xo --fix test/*
```

## known issues

The sciter flavor of `JSX` causes the linter to crash because the under the hood JSX parser [`acorn`](https://github.com/acornjs/acorn) cannot parse the sciter shortcuts for attributes `id` (`#`), `class` (`.`), `type` (|) and `name` (`()`).

This cannot be parsed:

```jsx
const jsx = <section .myClass #myId>
    ...
</section>;
```

while the regular jsx equivalent works just fine:

```jsx
const jsx = <section class="myClass" id="myId">
    ...
</section>;
```

If you have the skills it takes to fork `acorn` and update the parser, that would be great!

## eslint rules

[https://eslint.org/docs/rules/](https://eslint.org/docs/rules/)

## eslint getting started

[https://eslint.org/docs/user-guide/getting-started](https://eslint.org/docs/user-guide/getting-started)

## code styles

standard, airbnb, google and xo

### top 3 code styles compared

[https://betterprogramming.pub/comparing-the-top-three-style-guides-and-setting-them-up-with-eslint-98ea0d2fc5b7](https://betterprogramming.pub/comparing-the-top-three-style-guides-and-setting-them-up-with-eslint-98ea0d2fc5b7)
