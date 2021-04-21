# behavior: frame-set

This behavior handles functionality of `<frameset>` elements - containers of blocks-panes separated by so called splitters allowing to adjust the relative sizes of the panes.

it can be applied to any block container, `<div>` or `<section>` for example.

## Elements

These elements have *behavior:frame-set* applied by default:

* `<frameset>` - panes container.

## Model

In Sciter `<frameset>` element may contain as `<frame>` elements as any other block containers like `<div>` or `<section>` as panes.

Panes can be split by `<splitter>` elements if some special styling of splitters is required.

Example, typical help window layout:

```XML
<frameset cols="120px,*">
   <div id="help-index">
      <a href="first-topic.htm" target="help-content">First topic</a> 
   </div>
   <splitter/>
   <frame id="help-content">Select topic from index</frame>
</frameset>
```

First pane here is `<div>` element having static content. `<frame>` is a container of selected topic element and `<splitter>` element used for interactive size adjustment.

## Attributes

`<frame>` attributes that have special meaning:

* `cols="widths list"` - declares column layout and specifies initial size of columns in a `<frameset>`;
* `rows="height list"` - declares rows layout and specifies initial size of rows in a `<frameset>`;

Either cols or rows attribute has to be defined. width/height list is a comma separated list of Sciter length units: dips, px, mm, etc. including flex units (`*`).

## Events

N/A - no specific events.

## Properties

* `element.frameset.state : array` - gets/sets array of lengths - current widths/heights of panes in the frameset;

This property can be used to persist UI state of the frameset.

## Value

N/A

