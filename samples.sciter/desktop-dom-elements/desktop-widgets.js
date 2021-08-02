
export class Widget extends Element
{
  constructor()
  {
    super();

    this.xoff = 0;
    this.yoff = 0;
    this.dragging = false;
		
		this.homeX = null;
		this.homeY = null;
		
		var me = this;
  }

  ["on click at button.go-home"]() { 
    me.goHome(); 
  }
  
  get placement() 
  { 
    const THRESHOLD = 64 * devicePixelRatio;
    var [vx1,vy1,vx2,vy2] = Window.this.box("rect","border",true);
    var [x1,y1,x2,y2] = this.state.box("rect","border","window",true); // screen pixels
    
    if( y1 > vy2 + THRESHOLD) return "far-bottom";
    if( y1 > vy2) return "bottom";
    if( y2 < vy1-THRESHOLD) return "far-top";
    if( y2 < vy1) return "top";
    if( x1 > vx2 + THRESHOLD) return "far-right";
    if( x1 > vx2) return "right";
    if( x2 < vx1-THRESHOLD) return "far-left";
    if( x2 < vx1) return "left";
    return "over";  
  }
  
	goHome()
	{
		this.attributes["placement"] = undefined;
		function whenDone()
		{
			this.$("text.status").text = "At home";
      this.takeOff(false); // discard moving state
	  }
	  this.animoveTo(this.homeX,this.homeY, whenDone);
	}
	  
  dragEnded()
  {
    var [vx1,vy1,vx2,vy2] = Window.this.box("rect","border",true);
    var [x,y,w,h] = this.state.box("xywh","inner","window", true);
    var [bx1,by1,bx2,by2] = this.state.box("rect","border","inner",true); // border+padding widths, in screen units
    
    switch( this.placement )
    {
      case "far-bottom":
      case "far-top":
      case "far-left":
      case "far-right": break;
      case "over": this.goHome(); return;
      case "bottom": this.animoveTo(x - bx1, vy2); break;
      case "top": this.animoveTo(x, vy1 - h - by1 - by2); break;
      case "left": this.animoveTo(vx1 - w - bx1 - bx2,y - by1); break;
      case "right":this.animoveTo(vx2,y - by1); break;
    }
  }
  
  // animated move
  animoveTo(posX,posY, onEnd = null)
  {
    posX /= devicePixelRatio;
    posY /= devicePixelRatio;
    const MAX_STEP = 20;
    var [x,y] = this.state.box("position", "inner", "window", false);
    this.timer(10,() => 
    {
      var delta_x = (x - posX) / 2;
      var delta_y = (y - posY) / 2;
      if( delta_x < -MAX_STEP ) delta_x = -MAX_STEP;
      else if( delta_x > MAX_STEP ) delta_x = MAX_STEP;
      if( delta_y < -MAX_STEP ) delta_y = -MAX_STEP;
      else if( delta_y > MAX_STEP ) delta_y = MAX_STEP;
      x -= delta_x;
      y -= delta_y;
      this.takeOff({x,y,relativeTo:"window"});
      if(!delta_x && !delta_y)
      {
        this.takeOff({x:posX,y:posY,relativeTo:"window",window:"attached"});
				if( onEnd )
				  onEnd.call(this);
        return false;
      }
      return true;
    });
  }

  onmousedown(evt) {
    var cap = this.$("caption");
    if( evt.target === cap)
    {
      if(this.homeX !== null)
        [this.homeX,this.homeY] = this.state.box("position", "inner", "window");
      this.xoff = evt.x; 
      this.yoff = evt.y;
      this.dragging = true;
      this.state.capture(true);
      this.doDrag();
      return true;
    }
  }

  onmouseup(evt) {
    if(this.dragging)
    {
      this.dragging = false;
      this.state.capture(false);
      return true;
    }
  }

  onmousemove(evt) {
    if( this.dragging )
    {
      this.takeOff({ x: evt.windowX - this.xoff,
                     y: evt.windowY - this.yoff,
                     relativeTo: "window", 
                     window: "detached" });
      var aPlacement = this.placement;
      if( this.attributes["placement"] != aPlacement )
      {
        this.attributes["placement"] = aPlacement;
        this.$("text.status").text = aPlacement;
      }
      return true;
    }
  }
  
  doDrag()
  {
    Window.this.doEvent("untilMouseUp");
    this.dragEnded(); 
  }

 
  
}