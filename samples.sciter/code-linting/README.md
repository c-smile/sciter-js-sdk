# Code linting

Linting is the automated checking of your source code for programmatic and stylistic errors.

In this example, we are linting javascript code using [eslint](https://github.com/eslint/eslint) and eslint requires [Node.js](https://nodejs.dev/) and its package manager `npm` to be installed.

## install linter

```sh
npm install
```

## review code for errors

```sh
./node_modules/.bin/eslint --config .eslintrc.json test/*
```

## review and fix code errors

```sh
./node_modules/.bin/eslint --config .eslintrc.json --fix test/*
```

## known issues with sciter

Some sciter JSX html attribute rules are not understood by the JSX parser and create parsing errors, namely:

- `#` shortcut for `id`
- `|` shortcut for `type`
- `()` shortcut for `name`

For example

```jsx
  return <section#projects>
      ...
    </section>;
```

## eslint rules

[https://eslint.org/docs/rules/](https://eslint.org/docs/rules/)

## eslint getting started

[https://eslint.org/docs/user-guide/getting-started](https://eslint.org/docs/user-guide/getting-started)

## code styles

standard, airbnb, google and xo

### top 3 code styles compared

[https://betterprogramming.pub/comparing-the-top-three-style-guides-and-setting-them-up-with-eslint-98ea0d2fc5b7](https://betterprogramming.pub/comparing-the-top-three-style-guides-and-setting-them-up-with-eslint-98ea0d2fc5b7)
