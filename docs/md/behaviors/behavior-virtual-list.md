# behavior: virtual-list

This helper behavior implements logic of "sliding window" scrollable list.

It is used to present to a user potentially large set of records in a list. This behavior uses always fixed number of DOM elements in sliding window.


## Elements

By default the behavior is not applied to any element - you should assign it explicitly in CSS:

```
div.list {
  behavior:virtual-list;
  overflow-y:scroll;
}
```

## Attributes

M/A:

## Events

Together with the standard set of events (mouse, keyboard, focus) *behavior: virtual-list* generates:

* `"contentrequired"` - generated when the behavior needs more elements due to scrolling.

`event.data` contains the following structure

```
{ 
  where:int   // 0 - to replace current content, -1 - to add before first element, 1 - to add after last element
  start:int,  // index of first record
  length:int, // that number of records required from script to add or replace.
}
```

By handling the event the script shall populate requested number of elements and return the follwing object
in the data field:

```
{
  morebefore: int, // estimated number of records before start
  moreafter: int // estimated number of records after start+length-1
}
```
This information is used to setup scrollbar appropriately. 


## Value

N/A

## Methods

* `element.vlist.navigate(to: int | string)` - scroll to given record, where `to` is either:
  * integer - absolute record number;
  * "start" - very first record;
  * "end" - very last record;
  * "pagenext" - next page;
  * "pageprior" - previous page;
  * "itemnext" - next record;
  * "itemprior" - previous record;

## Properties

* `firstVisibleItem: Element` -  read-only, reference of first visible item in the buffer.
* `lastVisibleItem: Element` -  read-only, reference of last visible item in the buffer.
* `firstBufferIndex: int` -  read-only, that many of records expected before first element in the sliding buffer.
* `lastBufferIndex: int` -  read-only, firstBufferIndex - lastBufferIndex + 1 is current size of sliding window.
