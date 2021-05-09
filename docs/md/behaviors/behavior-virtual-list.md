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

N/A.

But the behavior uses `vertical-align: top | bottom` CSS property to determine initial rendering. If it is `vertical-align: bottom` then 
the list initially appears scrolled to the end.

## Events

Together with the standard set of events (mouse, keyboard, focus) *behavior: virtual-list* generates:

* `"contentrequired"` - generated when the behavior needs more elements due to scrolling.

`event.data` contains the following structure

```
{ 
  where:int   // 0 - to replace current content, -1 - to add before first element, 1 - to add after last element
  start:int,  // index of first record
  length:int, // that number of records required to be added or replaced by script.
}
```

By handling the event the script shall populate requested number of elements and return the follwing object
in the data field:

```
{
  morebefore: int, // estimated number of items before the buffer start
  moreafter: int // estimated number of records after the buffer end
}
```
This information is used to setup scrollbar appropriately. 


## Value

N/A

## Methods

### `element.vlist.navigate(to: int | string)` 
  
  scroll to given record, where `to` is either:

  * integer - absolute record number;
  * "start" - very first record;
  * "end" - very last record;
  * "pagenext" - next page;
  * "pageprior" - previous page;
  * "itemnext" - next record;
  * "itemprior" - previous record;

## Properties

### `firstVisibleItem: Element` 
  
  read-only, reference of first visible item in the buffer.

### `lastVisibleItem: Element` 
  
  read-only, reference of last visible item in the buffer.

### `firstBufferIndex: int` 

  read-only, that many of records expected before first element in the sliding buffer.

### `lastBufferIndex: int` 
  
  read-only, firstBufferIndex - lastBufferIndex + 1 is current size of sliding window.

### `itemsBefore: int` 
  
  read-write, how many items were reported before the buffer (sliding window).

### `itemsAfter: int` 
  
  read-write, how many items were reported after the buffer (sliding window).

### `itemsTotal: int` 
  
  read-only, how many items, the behavior thinks, are in total (itemsBefore + element.children.length + itemsAfter) .
