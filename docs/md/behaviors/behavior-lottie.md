# behavior: lottie

This behavior provides playback of Lottie animations. It parses [Adobe After Effects](http://www.adobe.com/products/aftereffects.html) animations exported as json with [Bodymovin](https://github.com/airbnb/lottie-web) and renders them natively inside the Sciter.

## Elements

that have this behavior applied by default to:

* `<lottie>` \- the lottie player element;
* `<param path="keyPath" property="propName" value="propVal" />` inside `<lottie>` \- redefines variable in the animation,
  used for parametrization and theming. For the meaning of attributes see [below](#redefining).

## Attributes

this behavior knows about:

* `src` - string, url of the lottie file (json).
* `autoplay` - if provided will start animation immediately after loading.
* `loop` - if provided will repeat playback.

## Properties

* `lottie.playing`, read-only,*true* | *false*, reports playback status. If *true* animation is playing at the moment.
* `lottie.speed`, read-write, *float*, speed multiplier, 1.0 by default. 2.0 will play animation 2 times faster, 0.5 will playback two times slower.
* `lottie.loop`, read-write, *true | false* if set to *true* will loop playback.
* `lottie.frame`, read-write, *integer*, current frame in range \[0..frames).
* `lottie.frames`, read-only, *integer*, total number of frames in animation.
* `lottie.position`, read-write, *float*, current animation position, number in range 0.0 .. 1.0
* `lottie.duration`, read-only, *duration*, total duration of full animation loop as defined by animation designer.
* `lottie.markers`, read-only, array (list) of marker definitions. Each definition is an array (tuple): \[*tagName*:string, *startFrame*: integer, *endFrame*: integer\].
  
  Markers can be used to rise events bound with particular named frame in animation, partial playbacks, etc. See [Controlling Lottie Animation with Markers](https://swiftsenpai.com/development/lottie-animation-markers/).

## Methods

* `lottie.load( url : string ) : bool` - load (potentially asynchronously) animation from JSON file at URL.
* `lottie.play( [ firstFrame : integer, lastFrame : integer ] ) : bool` - start playback. If first/last frame is provided will play only frames in the range.
* `lottie.stop() : bool` - stop (pause) animation.
* `lottie.update( keyPath: string, propName : string, value : color | float | integer ) : bool` - update animation properties dynamically at runtime. For *keyPath*, *propName* and *value* see [below](#redefining).

## Events

Besides of standard set of events (mouse, keyboard, focus) *behavior:lottie* generates following events:

* `"animationstart"` - the animation has been loaded successfully and animation has been started.
* `"animationloop"` - last frame shown and animation restarted from its beginning.
* `"animationend"` - animation playback stopped.

## Value

N/A, the behavior does not implement value concept.

## Redefining animation variables

### Understanding After Effects

To understand how to change animation properties in Lottie, you should first understand how animation properties are stored in Lottie. Animation properties are stored in a data tree that mimics the information hierarchy of After Effects. In After Effects a Composition is a collection of Layers that each have their own timelines. Layer objects have string names, and their contents can be an image, shape layers, fills, strokes, or just about anything that is drawable. Each object in After Effects has a name. Lottie can find these objects and properties by their name using a *KeyPath*.

### Usage

To update a property at runtime, you need 3 things:

1. KeyPath
1. PropName
1. Value

### KeyPath

A KeyPath is used to target a specific content or a set of contents that will be updated. A KeyPath is specified by a list of strings that correspond to the hierarchy of After Effects contents in the original animation. KeyPaths can include the specific name of the contents or wildcards:

* Wildcard `*` - Wildcards match any single content name in its position in the keypath.
* Globstar `**` - Globstars match zero or more layers.

### PropName

`PropName` is a name of property to set. They correspond to the animatable value in After Effects and the available properties are listed below:

* FillColor - color property of Fill object , value type is Color;
* FillOpacity - opacity property of Fill object , value type is number in range \[ 0 .. 100\];
* StrokeColor - color property of Stroke object , value type is Color;
* StrokeOpacity - opacity property of Stroke object , value type is number in range \[ 0 .. 100\];
* StrokeWidth - stroke with property of Stroke object , value type is float
* TrAnchor - transform Anchor property of Layer and Group object , value type is \[x,y\] array;
* TrPosition - Transform Position property of Layer and Group object , value type is \[x,y\] array - point;
* TrScale - Transform Scale property of Layer and Group object , value type is \[x,y\] array, x and y are numbers in range\[0 ..100\];
* TrRotation - Transform Scale property of Layer and Group object , value type is Angle;
* TrOpacity - Transform Opacity property of Layer and Group object , value type is number in range \[ 0 .. 100\].

### Setting Values

Animation values can be set as at design time by using set of `<param path="..." prop="..." value="..." />` declarations inside `<lottie>` element or at runtime by calling `el.lottie.update(path,prop,value)` method.
