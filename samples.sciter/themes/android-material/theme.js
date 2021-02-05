
export function Ripple() 
{
    // ripple - expanding touch animation     
    var x,y;
    var progress = 0.0; 
    const STEP = 0.03;
    var step; 
    var radii = 100;
    var h = 0, s = 1, l = 1, a = 1;
      
    const init = (evt) => {
      let [width, height] = this.state.box("dimension"); 
      radii = width > height ? width : height;
      x = evt.x; y = evt.y;
      progress = 0.0;
      step = STEP;
      let c = this.style.colorOf("background-color");
      if( c ) [h,s,l,a] = c.hsl;
    };

    const currentColor = () => Graphics.Color.hsl(h,s,l + (1.0 - l) * (1 - progress),a);

    function paint(gfx) {
      let color = currentColor();
      gfx.pushLayer("background-area");
      gfx.fillStyle = color;
      gfx.beginPath();
      gfx.arc(x, y, progress * radii, 0, Math.PI * 2, true);
      gfx.closePath();
      gfx.fill();
      gfx.popLayer();
    }

    this.on("^mousedown", (evt) =>
    {
      init(evt);
      const step = () => 
      {
        if(this.state.pressed) {
          if(progress > 1.0) { this.paintContent = null; return; }   
          progress += STEP;
        } else {
          if(progress <= 0.0) { this.paintContent = null; return; }
          progress -= STEP;
        }
        this.requestPaint();
        requestAnimationFrame(step);
      };
      this.paintContent = paint;
      requestAnimationFrame(step);
    });
}