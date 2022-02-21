## class Duration

Data type, represents duration units as they used in CSS.


```JS
document.timer(20ms,function() {...});
```

List of duration units do far: 

* `ms` 
* `s`
* `mn` - planned
* `hr` - planned
* `da` - planned

### properties:

* `duration.quantity:number`

reports number of units in the duration. For `12s` it will return `12`.

* `duration.units:string`

reports unit name. For `12s` it will return `"s"`.

### methods:

* `duration.valueOf():number`

returns number of milliseconds in duration.

* `duration.toString():number`

returns string representation of the duration, for example "12s".

* `duration.add(duration):duration`

sum of two durations. Durations can be of different units, this:

```const sum = 12s.add(300ms);```

is legal, result will be in `s` units.

* `duration.sub(duration):duration`

subtraction of two durations. Durations can be of different units.

* `duration.mul(number):duration`

multiplies the duration by number.

* `duration.div(number):duration`

divides the duration by number.

### static methods:

 * `Duration.s(n):duration`
 * `Duration.ms(n):duration`
 
 These above are static constructors of duration values.