export function Ripple() {
  // ripple - expanding touch animation
  let x;
  let y;
  let progress = 0;
  const STEP = 0.03;
  let step;
  let radii = 100;
  let h = 0;
  let s = 1;
  let l = 1;
  let a = 1;

  const init = (evt) => {
    const [width, height] = this.state.box("dimension");
    radii = width > height ? width : height;
    x = evt.x;
    y = evt.y;
    progress = 0;
    step = STEP;
    const c = this.style.colorOf("background-color");
    if (c) [h, s, l, a] = c.hsl;
  };

  const currentColor = () =>
    Graphics.Color.hsl(h, s, l + (1 - l) * (1 - progress), a);

  function paint(gfx) {
    const color = currentColor();
    gfx.pushLayer("background-area");
    gfx.fillStyle = color;
    gfx.beginPath();
    gfx.arc(x, y, progress * radii, 0, Math.PI * 2, true);
    gfx.closePath();
    gfx.fill();
    gfx.popLayer();
  }

  this.on("^mousedown", (evt) => {
    init(evt);
    const step = () => {
      if (this.state.pressed) {
        if (progress > 1) {
          this.paintContent = null;
          return;
        }

        progress += STEP;
      } else {
        if (progress <= 0) {
          this.paintContent = null;
          return;
        }

        progress -= STEP;
      }

      this.requestPaint();
      requestAnimationFrame(step);
    };

    this.paintContent = paint;
    requestAnimationFrame(step);
  });
}
