# behavior: date

date input element with dropdown calendar.

## Elements

that have this behavior applied by default:

* `<input type="date" />` - inline date input element

## Model

Upon initialization the behavior creates following DOM structure:

```
<input>
  <caption>
    <span.year>
    <span.month>
    <span.day>
  </caption>
  <button>
</input>

```

Where `<caption>` will have `behavior:masked` applied. `<button>` triggers appearance of popup calendar.

## Attributes

that this behavior knows about:

* `value="YYYY-MM-DD"` - initial date of the input element
* `timezone="TZ"` - timezone to convert the date to. TZ can be either `"local"` or `"+HH:MM" / "-HH:MM"`.
* `firstdayofweek="N"` - first day of week, N is a number: `0` - Sunday, `1` - Monday, etc.

## Events

Aside of standard set of events (mouse, keyboard, focus) *behavior: button* generates:

* `"input"` or `"change"` / SELECT\_VALUE\_CHANGED event - value of the element (date) was changed due to user actions. Posted (asynchronous) event.

## Value

instance of Date or *undefined*, reflects current status of internal editing buffer.

## Methods

N/A