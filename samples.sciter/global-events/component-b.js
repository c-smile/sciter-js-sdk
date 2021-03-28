

class ComponentB extends Element {

  counter = 0; // number of received events

  componentDidMount() {

    const callback = () =>
      this.componentUpdate {
        counter: this.counter + 1
      };

    this.onGlobalEvent("app-wide-event", callback );
  }

  render() {
    return <div.b>
      <h2>ComponentB</h2>
      Received {this.counter} events 
    </div>;
  }
}