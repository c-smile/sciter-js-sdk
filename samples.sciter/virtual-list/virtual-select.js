

export class VirtualList extends Element {

  currentItem = null; // item, one of items
  selectedItems;// TODO: = new WeakSet();
  styleSet;

  constructor(props) {
    super();
    this.renderItem = props.renderItem || this.renderItem;
    this.renderList = props.renderList || this.renderList;
    this.styleset = props.styleset || (__DIR__ + "virtual-select.css#virtual-select");
  }

  itemAt(at) {     // virtual function, must be overriden
    return null;
  }
  totalItems() {   // virtual function, must be overriden
    return 0; 
  }
  indexOf(item) {  // virtual function, must be overriden
    return -1;
  }

  render(props) {

    let list = [];

    if(this.vlist) {
      let firstIndex = this.vlist.firstBufferIndex;
      let lastIndex = this.vlist.lastBufferIndex;
      let firstVisibleIndex = this.vlist.firstVisibleItem?.elementIndex || 0;
      let lastVisibleIndex = this.vlist.lastVisibleItem?.elementIndex || lastIndex;

      let totalItems = this.totalItems();

      if(firstVisibleIndex == 0)
        this.post( () => { this.vlist.navigate("start") } );
      else if( lastVisibleIndex >= totalItems ) // number of items reduced so buffer is past total count
        this.post( () => { this.vlist.navigate("end") } );
      else if(this.vlist.itemsTotal != totalItems) { // number of items reduced, update scroll
        lastIndex = firstIndex + Math.min(totalItems,this.vlist.slidingWindowSize) - 1;
        this.post( () => { this.vlist.itemsAfter = totalItems - this.vlist.itemsBefore - this.children.length; });
      }

      let {currentItem, selectedItems } = this;
      for( let index = firstIndex; index <= lastIndex; ++index ) {
        let item = this.itemAt(index);
        if(item) list.push(this.renderItem(item,item === currentItem, selectedItems?.has(item)));
      }
    } else 
      this.componentUpdate(); 
    
    return this.renderList(list);
  }

  // scroll down
  appendElements(index,n) 
  {
    let {currentItem, selectedItems } = this;
    if( index === undefined ) index = 0;
    let elements = [];
    for(let i = 0; i < n; ++i, ++index) {
      if(index >= this.totalItems()) break;
      let item = this.itemAt(index);
      elements.push( this.renderItem(item,item === currentItem, selectedItems?.has(item)) );
    }
    this.append(elements);
    return { moreafter: (this.totalItems() - index) }; // return estimated number of items below this chunk
  }

  // scroll up
  prependElements(index,n) 
  {
    let {currentItem, selectedItems } = this;
    if( index === undefined ) index = this.totalItems() - 1;
    let elements = [];
    for(let i = 0; i < n; ++i, --index) {
      if(index < 0) break;
      let item = this.itemAt(index);
      elements.push( this.renderItem(item,item === currentItem, selectedItems?.has(item)) );
    }
    elements.reverse();
    this.prepend(elements);
    return { morebefore: (index < 0 ? 0 : index + 1) }; // return estimated number of items above this chunk
  }

  // scroll to
  replaceElements(index,n) 
  {
    let {currentItem, selectedItems } = this;
    let elements = [];
    let start = index;
    for(let i = 0; i < n; ++i, ++index) {
      if(index >= this.totalItems()) break;
      let item = this.itemAt(index);
      elements.push( this.renderItem(item,item === currentItem, selectedItems?.has(item)) );
    }
    this.patch(elements);
    return { 
      morebefore: start <= 0 ? 0 : start,
      moreafter:  this.totalItems() - index
    }; // return estimated number of items before and above this chunk
  }

  renderList(items) // overridable
  { 
    return <virtual-select styleset={this.styleset}>{ items }</virtual-select>; 
  }

  renderItem(item,index) // overridable
  {
    return <option key={index}>item { index }</option>;
  }
  
  oncontentrequired(evt)
  {
    let {length, start, where} = evt.data;
    if(where > 0) evt.data = this.appendElements(start,length);  // scrolling down, need to append more elements
    else if(where < 0) evt.data = this.prependElements(start,length); // scrolling up, need to prepend more elements
    else evt.data = this.replaceElements(start,length); // scrolling to index
    return true;
  }

  itemOfElement(element) {
    return this.itemAt(element.elementIndex + this.vlist.firstBufferIndex);
  }

  onkeydown(evt) {
    switch(evt.code) {
      case "KeyDOWN" : 
        if(!this.currentItem) { 
          this.componentUpdate { currentItem : this.itemOfElement(this.vlist.firstVisibleItem) };
        } else {
          let index = this.indexOf(this.currentItem);
          if( ++index < this.totalItems() ) {
            this.componentUpdate { currentItem : this.itemAt(index) };
            this.vlist.navigate("advance",index);
          }
        }
        break;
      case "KeyUP" : 
        if(!this.currentItem) { 
          this.componentUpdate { currentItem : this.itemOfElement(this.vlist.lastVisibleItem) };
        } else {
          let index = this.indexOf(this.currentItem);
          if( --index >= 0 ) {
            this.componentUpdate { currentItem : this.itemAt(index) };
            this.vlist.navigate("advance",index);
          }
        }
        break;
      case "KeyEND" : 
        this.currentItem = this.itemAt(this.totalItems() - 1);
        this.vlist.navigate("end");
        break;
      case "KeyHOME" : 
        this.currentItem = this.itemAt(0);
        this.vlist.navigate("start");
        break;
      default:
        return false;
    }
    this.post(new Event("input", {bubbles:true}));
    return true;
  }

  setCurrentOption(child) {
    let option;
    for(let node = child; node; node = node.parentElement) {
      if(node.parentElement === this) {
        option = node;
        break; 
      }
    }
    if(option) {
      this.componentUpdate { currentItem : this.itemOfElement(option) };
      this.post(new Event("input", {bubbles:true}));
      return true;
    }
  }

  ["on mousedown"](evt) { if(evt.button == 1) this.setCurrentOption(evt.target); }
  ["on mousemove"](evt) { if(evt.button == 1) this.setCurrentOption(evt.target); }

  get value() {
    if(!this.currentItem) return undefined;
    return this.currentItem;
  }

}


export class VirtualSelect extends VirtualList {
    items = [];

    constructor(props) {
      super(props);
      this.items = props.items || [];
    }

    itemAt(at) {     // virtual function, can be overriden
      return this.items?.[at];
    }
    totalItems() {   // virtual function, can be overriden
      return this.items?.length || 0; 
    }
    indexOf(item) {  // virtual function, can be overriden
      return this.items?.indexOf(item);
    }

    render(props) {
      if((props?.items && (this.items !== props.items)) || !this.vlist) {
        this.items = props?.items || [];
        this.post( () => { this.vlist.navigate("start") } );
        return this.renderList([]);
      }
      return super.render();
    }


}

