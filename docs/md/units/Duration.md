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

### operators:

Duration units support following operators:

* `a * n` - multiplication by number;
* `a / n` - division by number; 
* `a + b` - sum of two lengths;
* `a - b` - substraction of two lengths;
* `a == b` - equality of two lengths;
* `a < b`,`a > b`, `a <= b`, `a >= b` - comparison of two lengths;
* `+a` - unary plus operator;
* `-a` - unary minus operator;
* `++a`, `a++` - increment operator;
* `--a`, `a--` - decrement operator;


### static methods:

 * `Duration.s(n):duration`
 * `Duration.ms(n):duration`
 
 These above are static constructors of duration values.