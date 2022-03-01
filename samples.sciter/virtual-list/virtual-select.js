export class VirtualList extends Element {
    currentItem = null; // item, one of items
    selectedItems;// TODO: = new WeakSet();
    styleSet;
    props;

    this(props) {
        const {renderItem, renderList, ...rest} = props;
        super.this?.(rest);
        this.props = rest;
        this.renderItem = renderItem || this.renderItem;
        this.renderList = renderList || this.renderList;
        this.styleset = props.styleset || (__DIR__ + "virtual-select.css#virtual-select");
    }

    itemAt(at) { // virtual function, must be overriden
        return null;
    }

    totalItems() { // virtual function, must be overriden
        return 0;
    }

    indexOf(item) { // virtual function, must be overriden
        return -1;
    }

    render() {
        const list = [];
        if (!this.vlist) return this.renderList(list);

        const firstIndex = this.vlist.firstBufferIndex;
        let lastIndex = this.vlist.lastBufferIndex;
        const firstVisibleIndex = firstIndex + this.vlist.firstVisibleItem?.elementIndex || 0;
        const lastVisibleIndex = firstIndex + this.vlist.lastVisibleItem?.elementIndex;

        const totalItems = this.totalItems();

        if (this.vlist.itemsTotal != totalItems) { // number of items reduced, update scroll
            if (firstVisibleIndex == 0) {
                this.post(() => {
                    this.vlist.navigate("start");
                });
                return this.renderList([]); // render empty list and request "from start" navigation
            }

            if (lastVisibleIndex >= totalItems) {
                this.post(() => {
                    this.vlist.navigate("end");
                });
                return this.renderList([]); // render empty list and request "from end" navigation
            }

            lastIndex = Math.min(totalItems, firstIndex + this.vlist.slidingWindowSize) - 1;
            this.post(() => {
                this.vlist.itemsAfter = totalItems - this.vlist.itemsBefore - this.children.length;
            });
        }

        const {currentItem, selectedItems} = this;
        for (let index = firstIndex; index <= lastIndex; ++index) {
            const item = this.itemAt(index);
            if (item) list.push(this.renderItem(item, item === currentItem, selectedItems?.has(item)));
        }

        return this.renderList(list);
    }

    // scroll down
    appendElements(index, n) {
        const {currentItem, selectedItems} = this;
        if (index === undefined) index = 0;
        const elements = [];
        for (let i = 0; i < n; ++i, ++index) {
            if (index >= this.totalItems()) break;
            const item = this.itemAt(index);
            elements.push(this.renderItem(item, item === currentItem, selectedItems?.has(item)));
        }

        this.append(elements);
        return {moreafter: (this.totalItems() - index)}; // return estimated number of items below this chunk
    }

    // scroll up
    prependElements(index, n) {
        const {currentItem, selectedItems} = this;
        if (index === undefined) index = this.totalItems() - 1;
        const elements = [];
        for (let i = 0; i < n; ++i, --index) {
            if (index < 0) break;
            const item = this.itemAt(index);
            elements.push(this.renderItem(item, item === currentItem, selectedItems?.has(item)));
        }

        elements.reverse();
        this.prepend(elements);
        return {morebefore: (index < 0 ? 0 : index + 1)}; // return estimated number of items above this chunk
    }

    // scroll to
    replaceElements(index, n) {
        const {currentItem, selectedItems} = this;
        const elements = [];
        const start = index;
        for (let i = 0; i < n; ++i, ++index) {
            if (index >= this.totalItems()) break;
            const item = this.itemAt(index);
            elements.push(this.renderItem(item, item === currentItem, selectedItems?.has(item)));
        }

        this.patch(elements);
        return {
            morebefore: start <= 0 ? 0 : start,
            moreafter: this.totalItems() - index,
        }; // return estimated number of items before and above this chunk
    }

    renderList(items) // overridable
    {
        return <virtual-select {this.props} styleset={this.styleset}>{ items }</virtual-select>; 
    }

    renderItem(item, index) // overridable
    {
        return <option key={index}>item { index }</option>;
    }

    oncontentrequired(evt) {
        const {length, start, where} = evt.data;
        if (where > 0) evt.data = this.appendElements(start, length); // scrolling down, need to append more elements
        else if (where < 0) evt.data = this.prependElements(start, length); // scrolling up, need to prepend more elements
        else evt.data = this.replaceElements(start, length); // scrolling to index
        return true;
    }

    itemOfElement(element) {
        return this.itemAt(element.elementIndex + this.vlist.firstBufferIndex);
    }

    onkeydown(evt) {
        switch (evt.code) {
            case "ArrowDown":
                if (!this.currentItem)
                    this.componentUpdate({currentItem: this.itemOfElement(this.vlist.firstVisibleItem)});
                else {
                    let index = this.indexOf(this.currentItem);
                    if (++index < this.totalItems()) {
                        this.componentUpdate({currentItem: this.itemAt(index)});
                        this.vlist.navigate("advance", index);
                    }
                }

                break;
            case "ArrowUp":
                if (!this.currentItem)
                    this.componentUpdate({currentItem: this.itemOfElement(this.vlist.lastVisibleItem)});
                else {
                    let index = this.indexOf(this.currentItem);
                    if (--index >= 0) {
                        this.componentUpdate({currentItem: this.itemAt(index)});
                        this.vlist.navigate("advance", index);
                    }
                }

                break;
            case "End":
                this.currentItem = this.itemAt(this.totalItems() - 1);
                this.vlist.navigate("end");
                break;
            case "Home":
                this.currentItem = this.itemAt(0);
                this.vlist.navigate("start");
                break;
            default:
                return false;
        }

        this.post(new Event("input", {bubbles: true}));
        return true;
    }

    setCurrentOption(child) {
        let option;
        for (let node = child; node; node = node.parentElement) {
            if (node.parentElement === this) {
                option = node;
                break;
            }
        }

        if (option) {
            this.componentUpdate({currentItem: this.itemOfElement(option)});
            this.post(new Event("input", {bubbles: true}));
            return true;
        }
    }

    ["on mousedown"](evt) {
        if (evt.button == 1) this.setCurrentOption(evt.target);
    }

    ["on mousemove"](evt) {
        if (evt.button == 1) this.setCurrentOption(evt.target);
    }

    get value() {
        if (!this.currentItem) return;
        return this.currentItem;
    }
}

export class VirtualSelect extends VirtualList {
    items = [];

    this(props) {
        const {items, ...rest} = props;
        super.this(rest);
        this.items = items || [];
    }

    itemAt(at) { // virtual function, can be overriden
        return this.items?.[at];
    }

    totalItems() { // virtual function, can be overriden
        return this.items?.length || 0;
    }

    indexOf(item) { // virtual function, can be overriden
        return this.items?.indexOf(item);
    }

    render(props) {
        if ((props?.items && (this.items !== props.items)) || !this.vlist) {
            this.items = props?.items || [];
            this.post(() => {
                this.vlist.navigate("start");
            });
            return this.renderList([], props);
        }

        return super.render(props);
    }
}
