

export function FocusAnimator() {

  const focusColor = Color.RGB(255,0,0);
  const focusWidth = 3;

  let prevFocus = null;
  let focus = null;
  let that = this;  
  let fx1 = null,fy1,fx2,fy2;
  let tx1,ty1,tx2,ty2;
  let isAnimating = false;

  function step() {
    if( fx1 === null) return false;
    fx1 = (tx1 + fx1) / 2.0;
    fy1 = (ty1 + fy1) / 2.0;
    fx2 = (tx2 + fx2) / 2.0;
    fy2 = (ty2 + fy2) / 2.0;
    document.requestPaint();
    return (isAnimating = (fx1 != tx1 || fy1 != ty1 || fx2 != tx2 || fy2 != ty2));
  }

  document.on("focus", (evt) => {
    let [x1,y1,x2,y2] = evt.target.state.box("rect","border","document");
    tx1 = x1; ty1 = y1; tx2 = x2 ; ty2 = y2;
    if( evt.target === document ) {
      fx1 = null;
      document.requestPaint();
    }
    else if( fx1 === null) {
      fx1 = tx1; fy1 = ty1; fx2 = tx2; fy2 = ty2;
      document.requestPaint();
    }
    else if(!isAnimating)
      document.animate(step,{});
  });

  document.on("focusout", () => {
    fx1 = null;
    document.requestPaint();
  });

  // paint this at outline level - on top of everything
  document.paintOutline = function(gfx) {
    if( fx1 === null) return;
    gfx.strokeStyle = focusColor;
    gfx.strokeWidth = focusWidth;
    gfx.strokeRect(fx1,fy1,fx2 - fx1,fy2 - fy1);
  }

}