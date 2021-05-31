
export class Special extends Element {

  render() {
    return <main>
      <header>Special View</header>
      <section .body>
         Some cool special content goes here.
      </section>
      <footer>
        <button href="route:quick">back</button>
        <button>More...</button>
      </footer>
    </main>;
  }
}
