

class ComponentA extends Element {

  notifyOthers() {
    Window.post( new Event("app-wide-event") );
  }

  ["on click at button"]() {
    this.notifyOthers();
  }

  render() {
    return <div.a>
      <h2>ComponentA</h2>
      <button>Fire app wide event</button>
    </div>;
  }
}