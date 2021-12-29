import { Observable } from 'object-observer/object-observer.js';

class Observer extends Element {
    #data = null;
    constructor(props,kids) {
        super();
        let data = props.data;
        if(!Observable.isObservable(data))
          console.error("Observer require Observable object");
        this.#data = data;
        data.observe( changes => { this.componentUpdate() } );   
    }
    get data() { return this.#data; }
}

export { Observable, Observer };