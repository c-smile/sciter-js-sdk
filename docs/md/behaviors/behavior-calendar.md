# behavior: calendar

calendar is date input element allowing to select particular date.

## Elements

that have this behavior applied by default:

* `<input type="calendar" />` - inline date input element.

## Model

The calendar has four different view modes:

* century view mode - table of 10-year decades;
* years view - table of 10 years in decade;
* months view - table of 12 months in a year;
* days view - table of days in a month.

Each mode uses `<table>` to render content of the view. Use DOM inspector to discover DOM structure of each view if you will need to style content of the calendar in some specific manner.

## Attributes

that this behavior knows about:

* `mode="days" | "months" | "years" | "century"` - initial view mode.
* `value="YYYY-MM-DD"` - initial date, string in ISO 8601 format.
* `firstdayofweek="N"` - first day of week, N is a number: `0` - Sunday, `1` - Monday, etc.

## Events

Aside of standard set of events (mouse, keyboard, focus) *behavior: calendar* generates:

* `"input"` (SELECT\_VALUE\_CHANGED) event - date changed. Posted (asynchronous) event.
* `"change"` - alias of the "input" event, you can use either one of these names.
* `"statechange"` (UI\_STATE\_CHANGED) event - view mode, current month or year change. Posted (asynchronous) event.

## Value

Date value or undefined, reflects current selection.

## Properties

* `element.calendar.mode` : string, one of `"days"` | `"months"` | `"years"` | `"century"` - gets/sets current view mode.   

## Methods  

* `element.calendar.stepDown(\[number\])` - Decrements the value by 1 or a specified number. Depends of current mode it will advance either day or month or year or decade.
* `element.calendar.stepUp(\[number\])` - Increments the value by 1 or by a specified number.