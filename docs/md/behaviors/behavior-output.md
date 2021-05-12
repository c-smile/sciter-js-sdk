# behavior: output

Formatted output behavior. The behavior can be applied to any text container, e.g. `<span>`, `<em>`, etc.

## Elements

that have this behavior applied by default:

* `<output type=..>` - output read-only element;

Note that you can use shortcut notations with the output in Sciter, so these three declarations are equivalent:

```XML
<output name="first" type="text" />
<output|text(first)/>
```

## Attributes

* `type` \- formatter type, one of:

  * `"text"` \- plain text output, the value is rendered as it is after *toString()* conversion;
  * `"integer"` \- integer output;
  * `"decimal"` \- decimal (float) formatter. Value is formatted and rendered according current locale rules;
  * `"currency"`  - currency formatter. Value is formatted and rendered according current locale rules;
  * `"date"` \- date formatter. Value is treated as UTC date value and formatted according current locale rules;
  * `"date-local"` \- date formatter. Value is treated as current time zone date value and formatted according current locale rules;
  * `"time"` \- date formatter. Time portion of the UTC date value is formatted according current locale rules;
  * `"time-local"` \- date formatter. Time portion of the local time zone date value is formatted according current locale rules;
  
* `name="name"` \- standard attribute *name* \- name of the input element on a form.
* `value="..."` \- standard value attribute. The value is formatted according to type and rendered.
* `novalue="no value text"` \- text that should appear if the output has no value set.
* `timezone="TZ"` \- timezone to convert the date/time to. TZ can be either `"local"` or `"+HH:MM" / "-HH:MM"`.

If the value cannot be converted to declared type then the element gets `:invalid` state flag;

If numeric value is negative then the element gets `negative` attribute set so it can be styled differently, e.g. `output\[negative\] { color:red; }`

## Events

N/A - no specific events.

## Value

`any` value, presumably matching declared type.

## Methods

N/A - behavior:output does not introduce any specific methods.