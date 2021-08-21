# CSS Layout

Sciter use different layout engine than what is used in browsers.


## Flow/Flex

`flow : vertical|vertical-flow|horizontal|horizontal-flow`

`-flow` or `-wrap` will wrap overflowing elements.

### Grid

Space seperated quotes defining columns, inside the quotes are element indexes defining rows.

Indexes start with `1`, use `0` to define empty space.

```CSS
flow: "1 2"     | 1 | 2 |
      "1 3";    | 1 | 3 |

flow: grid(1 2, 1 3);
```

### Row

Comma seperated element name, inside `row` function; space seperated names operate as OR statement

```CSS
flow: row(label, input select, button); | <label> | <input or select> | <button> |
```

## Align

- `horizontal-align` : `center|left|right`
- `vertical-align` : `middle|top|bottom`

### Spacing

Define spacing between all direct child elements.

```CSS
border-spacing: LENGTH-UNIT;
```

## Misc

- [Sciter flex vs flexbox](https://terrainformatica.com/w3/flex-layout/flex-vs-flexbox.htm)

- [flex layout](https://sciter.com/docs/flex-flow/flex-layout.htm)

- `sciter-js-sdk\samples.css\css++` for more samples

