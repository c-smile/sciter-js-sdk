

export class VideoControls extends Element {

  status = "stopped";
  barIsShown = false;
  src = "";

  static vlog10 = [0,0,0.3010,0.4771,0.6020,0.6989,0.7781,0.8450,0.9030,0.9542,1];

  constructor(props) {
    super();
    this.src = props?.src;
  }

  render() {

    var content = "";

    if(this.video) { 
      // rendering on already instantiated element

      var m = this.video.duration;
      var t = this.video.position;
      var [th,tm,ts] = this.hms(t);
      var [mh,mm,ms] = this.hms(m);
      var vol = this.get_vlog10_idx(this.video.audioVolume);

      var times = printf("%d:%02d:%02d of %d:%02d:%02d", th,tm,ts,mh,mm,ms);

      content = <div class="bar" shown={this.barIsShown}>
            <button class="command" mode={this.status}/>
            <input type="hslider" class="position" min="0.0" max={m} state-value={t} />
            <span class="times">{times}</span>
            <input type="hslider" class="volume" min="1" max="10" state-value={vol} />
      </div>;
    }

    return <video src={this.src} styleset={__DIR__ + "video-controls.css#video-controls"}>{content}</video>;
  }

  componentDidMount() {
    if(!this.src) // true if this was instantiated as DOM component
      this.patch(this.render(),true/*only children*/);
  }
  
 // log10
  get_vlog10_idx(val) {
    for( var [index, element] of VideoControls.vlog10.entries() )
      if( element >= val ) return index;
    return 0;
  }
     
  hms(seconds)
  {
    let h,m,s;
    s = seconds % 60; seconds /= 60;
    m = seconds % 60; seconds /= 60;
    h = seconds % 60; return [h, m, s];
  }
  
  pulse() {
    this.componentUpdate();
    return this.barIsShown; // pulse only when barIsShown
  }
  
  showBar(onOff) { 
    this.componentUpdate { barIsShown: onOff };
    if( onOff ) {
      this.timer(500, this.pulse);
      this.pulse();
    }
  }

  //onready() {}

  onstart() { 
    this.componentUpdate({ status: "playing" });
  }
  onstop() { 
    this.componentUpdate({ status: this.video.isEnded ? "ended" : "stopped" });
  }

  onmouseenter() {
    this.showBar(true);
  }  
  onmouseleave() {
    this.showBar(false);
  }  

  ["on input at input.position"](evt,slider) {
    this.video.stop();
    this.video.position = slider.value;
  }

  ["on click at input.position"](evt,slider) {
    this.video.position = slider.value;
    this.video.play();
  }

  ["on input at input.volume"](evt,slider) {
    this.video.audioVolume = VideoControls.vlog10[slider.value];
  }

  ["on click at .command"]() {
    switch( this.status ) {
      case "playing": this.video.stop(); break;
      case "stopped": this.video.play(); break;
      case "ended": this.video.position = 0; this.video.play(); break;
    }
  }

}