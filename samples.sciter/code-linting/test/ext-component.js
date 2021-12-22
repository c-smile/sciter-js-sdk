import {encode,decode} from "@sciter";

  export class myComponent extends Element

{
  counter = 0;
  
    componentDidMount(   )    {
    this.Render()
  }  

  /**
 * Incorrect documentation test
 * @param string test
 * @return bool
 */
  Render ()

  {
     var test = 10;

		  if (test == 1)
    console.log("test");

    this.innerHTML = `<button>inc</button> clicked <span.counter>${this.counter}</span> times`+" "  +  ' ';
  }

  ["on click at button"](   evt,button   ){
        ++this.counter
        this.Render()
      }
    }




