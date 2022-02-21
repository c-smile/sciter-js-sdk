## class Angle

Data type, represents angle units as they used in CSS.


```JS
const sector = 12deg;
const rotation = 2rad;
```

Angle literals are JS numbers immediately followed by unit charactes.

List of supported units, standard CSS units: 

* `rad` - radians;
* `deg` - degree;
* `grad` - gradian, is equivalent to 1⁄400 of a full circle;
* `turn` - 1turn == 360deg;

`90deg` is the same as `100grad` is the same as `1.508rad`.

### properties:

* `angle.quantity:number`

reports number of units in the angle. For `12px` it will return `12`.

* `angle.units:string`

reports unit name. For `12px` it will return `"px"`.

### methods:

* `angle.valueOf():number`

returns number of radians.

* `angle.toString():number`

returns string representation.

* `angle.add(angle):angle`

sum of two angles. Angles can be of different units, this:

```const sum = 12deg.add(1rad);```

is legal, result will be in `deg` units.

* `angle.sub(angle):angle`

subtraction of two angles. Angles can be of different units.

* `angle.mul(number):angle`

multiplies the angle by number.

* `angle.div(number):angle`

divides the angle by number.

### static methods:

 * `Angle.rad(n):angle`
 * `Angle.deg(n):angle`
 * `Angle.grad(n):angle`
 * `Angle.turn(n):angle`
 
 These above are all static constructors of angle values.