import {encode,decode} from "@sciter";

  export class MyComponent extends Element

{
  counter = 0;
  
    componentDidMount(   )    {
    this.render()
  }  

  /**
 * Incorrect documentation test
 * @param string test
 * @return bool
 */
  render ()

  {
    this.innerHTML = `<button>inc</button> clicked <span.counter>${this.counter}</span> times`+" "  +  ' ';
  }

  ["on click at button"](evt,button){
        ++this.counter
        this.render()
      }
    }
