# behavior: history

This behavior provides navigation history support, close to what browsers do on go-back go-forward buttons clicks.

## Elements

`<frame history>` - standard frame element but with attribute history defined.

## Model

This behavior is applicable to any elements containing frames inside. For example it can be applied to `<frameset>` if needed.

## Attributes

`behavior:history` is not using any specific attributes.

## Methods

* `back() : true|false` - goes back on navigational stack, returns `true` if navigation was successful.
* `forward() : true|false` - goes forward on navigational stack, returns `true` if navigation was successful. 

## Properties

* `length : integer` - depth of history in backward direction.
* `forwardLength : integer` - depth of history in forward direction.

## States

N/A

## Events

The behavior generates the following event:

* "historystatechange" / HISTORY_STATE_CHANGED - generated when state of internal navigation stack is changed.

## Value

N/A

