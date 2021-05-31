
export class Initial extends Element {

  time;

  constructor() {
    super();
    this.time = new Date();
  }

  componentDidMount() {
    this.timer(1000, () => {
      this.componentUpdate({ time: new Date() });
      return true; // keep ticking
    }); 
  }

  render() {
    return <main>
      <section.body style="vertical-align:middle;text-align:center;">
         <p>{this.time.toLocaleTimeString()}</p>
      </section>
      <footer>
        <button href="route:quick">Go to Quick View</button>
      </footer>
    </main>;
  }

}

