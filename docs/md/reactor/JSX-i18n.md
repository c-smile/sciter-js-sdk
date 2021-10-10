# Internalization support in Sciter's JSX...

Sciter offers built-in, **zero-runtime-cost** mechanism for JSX literals translation.  

## Current state of affairs of i18n support in ReactJS.

Consider the following function that uses JSX literal:
```JS
render() {
  return <caption>Settings</caption>;
}
```
It is definitely a subject of translation to other languages. 

Ideally in, let's say, Russian version of the application, the function should look like this:

```JS
render() {
  return <caption>Настройки</caption>;
}
```

"Ideally" here means that English and Russion versions of the application will work in the same speed and CPU load. Each time we execute `render()` function our JavaScript VM will load and output string literal with exactly the same runtime cost no matter the language we use.

But in reality translation adds runtime cost, for example, in [React-i18n](https://react.i18next.com/) we may see such suggestions:

```JS
render() {
  return <caption>{t('Settings')}</caption>;
}
```
Note that each time you call the `render()` it will a) invoke global `t()` function that will do b) lookup for "Settings" key in some translation table to substitute the string. 

Both, (a) and (b), clearly have non-zero runtime cost. Usually it is not a problem to execute both steps once but what if you have a dynamic UI? On each render it will do the same lookup steps - not good, just a waste of CPU resources.

To solve the problem Sciter offers mechansim where the lookup will happen just once - at JS compilation phase - later render() invocation will use already translated string literals.

## Static translation markers

### Attribute to translate

In order to define HTML attribute that is subject of translation prepend its name with `@` sign and provide initial value:

```JS
  <button @title="Meeting preferences">Show preferences</button>
```
At parsing of such attribute Sciter runtime will call `JSX_translateText(text)` translation hook function and 
will place its resuslt into bytecode as a string literal. At the end DOM element will have `title` attribute translated and without `@` marker. 

So called translationID, unique identifier of the text in translation table, will be set to initial attribute text - `"Meeting preferences"` in this case.

### Text to translate

In order to mark DOM element as translatable put standaline `@` sign or `@name` as its attribute:

```JS
  <button @>Show preferences</button>
```
At parsing of such element Sciter runtime will call `JSX_translateText(text)` translation hook function and 
will place its resuslt into bytecode as string literal (text). That text will appear in the final DOM.

TranslationID in this case will be either original element's text or, if `@name` marker is used, the _name_.. 

### Text span to translate

Sometimes we just need to translate portion of a text. In such cases we can use "translateable fragment" marker:

```JS
render() {
  return <caption><@>Hello</>, {userName}!</caption>;
}
```
That `<@>...</>` marks fragment of text as translatable. That fragment will be its translation ID.


## Dynamic translation markers

In some cases we need more complex translation processing than just static case. Consider that we need to output somethnig like bottle counter:

```JS
render() {
  return <span @>{n} bottles</span>;
}
```
Idealy we should have output like these: "no bottles", "1 bottle", "2 bottles" ... 
In common case we cannot handle such construct with just static tables - numeral rules a) different in different languages, b) can be quite complex and c) can be different in diferent contexts.

The only option in this case is to implement such logic as a function. Sciter runtime will call `JSX_translateNode(node)` translation hook function in this case.


## Sciter translation hooks

Translation hooks are custom functions that needs to be defined on application side to support translation.  

### `JSX_translateText`

Is called to translate static text - either attribute value or element's text:  

```JS
JSX_translateText = function(text, context, isTextOfElement, fileName, lineNo) {
  ...
}
```
parameters:

* _text_ - string, text to translate;
* _context_ - string, for attribute it is a name of attribute, for element it is a tag name;
* _isTextOfElement_ - boolean, _false_ - it is an attribute,  _true_ - element's text;
* _fileName_ - string, URL of source script file;
* _lineNo_ - string, line number;

The function shall return a string - result of translation.


### `JSX_translateNode`

Is called to translate dynamic text, for example to pluralize some numeric value:  

```JS
JSX_translateNode = function(node, translationId, fileName, lineNo) {
  ...
}
```
parameters:

* _node_ - virtual DOM node, 3 element tuple: ["tag",{attributes},[children]];
* _translationId_ - string, either content string like "{} bottles" or explicit ID like "nbottles" in `<span @nbottles>{n} bottles</span>` 
* _fileName_ - string, URL of source script file;
* _lineNo_ - string, line number;

The function shall return virtual DOM node - result of translation. Use `JSX(tag,{...},[...])` to return transformed virtual DOM element.


### `JSX_translateTags`

That is a map of tags that need to be translated by default - without translation markers.

Example:
``` JS
JSX_translateTags = {
  "caption": true,
  "label": true,
  "button": true,
  "span": true,
};
```

## Declaring translation hooks

Translation hooks need to be defined before loading scripts that constitute rest of application. Reason: hooks shall exist at parse/compile time of scripts that use their services.  

Possible scenarios:

### In different script sections:

```HTML
  <head>
    <script type="module" src="i18n/hooks.js" /> 
    <script type="module" src="application/main.js" /> 
  </head>
```
First script will install hooks and second one is main root script of the application.

### Framed application:

```HTML
  <head>
    <script type="module" src="i18n.js" /> 
  </head>
  <body> 
     <frame lang="en" src="application.htm" />
  </body>
```

Such setup allows to switch UI language at runtime. To change UI language i18n.js script should:

1. load corresponding translation table;  
2. set `lang` attribute on the frame element (optional);  
3. reload "application.htm" in the frame - scripts will be reloaded and so recompiled with the new translation;


### Instrumental hooks

Application can define instrumental versions of hooks to generate translation table prototype in desired format: JSON, PO (gettext format), etc.





