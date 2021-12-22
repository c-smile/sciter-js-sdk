# Code linting

Linting is the automated checking of your source code for programmatic and stylistic errors.

In this example, we are linting javascript code.

Code linting uses [eslint](https://github.com/eslint/eslint) and requires [Node.js](https://nodejs.dev/) and its package manager `npm` to be installed.

## install linter

```sh
npm install
```

## review code for errors

```sh
./node_modules/.bin/eslint test/*
```

## fix errors

```sh
# fix errors
./node_modules/.bin/eslint --fix test/*
```
