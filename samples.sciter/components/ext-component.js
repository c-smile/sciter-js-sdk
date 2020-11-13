export class MyComponent extends Element 
{
  counter = 0;
  
  componentDidMount() {
    this.render();
  }  

  render() {
    this.innerHTML = `<button>inc</button> clicked <span.counter>${this.counter}</span> times`;
  }

  ["on click at button"](evt, button) {
    ++this.counter;
    this.render();
  }
}
