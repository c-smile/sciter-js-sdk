

export class RichtextEditor extends Element 
{
  // TBD, TBD, TBD
  toolbar = null;
  current = null; // current htmlarea
  observers = []; // bound UI objects

  componentDidMount() {
    this.toolbar = this.$("toolbar");
    this.current = this.$("htmlarea");
    this.setupToolbar();
    console.log("*");
  }

  setupToolbar() {

    const AVAILABLE = 0x00; // toolbar button flags
    const ACTIVE    = 0x01;
    const DISABLED  = 0x02;

    // binds UI thing (e.g. toolbar button) with command|function to be executed onClick
    let bind = (selector, cmd, param) => {
      var uiel = this.$(selector); //assert uiel;
      if(typeof cmd == "function") {
        uiel.on("click", () => cmd.call(this.current,"exec",param,uiel) );
        this.observers.push( () => {
          var cmdState = (current ? cmd.call(this.current,"query",param,uiel) : 0) || 0;
          uiel.state.checked  = (cmdState & ACTIVE) != 0;
          uiel.state.disabled = (cmdState & DISABLED) != 0;
        });
      } else if(typeof cmd == "string") {
        uiel.on("click",  () => this.current.executeCommand(cmd,param) );
        this.observers.push( () => {
          var cmdState = (this.current ? this.current.queryCommand(cmd,param) : 0) || 0;
          uiel.state.checked  = (cmdState & ACTIVE) != 0;
          uiel.state.disabled = (cmdState & DISABLED) != 0;
        });
      } else 
        throw "Bad cmd type " + cmd;
    };

    bind("button.bold",          "format:toggle-span:b|strong");    
    bind("button.italic",        "format:toggle-span:i|em");
    bind("button.underline",     "format:toggle-span:u");
    bind("button.del",           "format:toggle-span:del|strike");
    bind("button.sub",           "format:toggle-span:sub");
    bind("button.sup",           "format:toggle-span:sup");
    bind("button.code",          "format:toggle-span:code");

  }

  updateObservers() 
  {
    for(let func of this.observers) func(); 
  }

  ["on statechange at htmlarea"](evt, htmlarea) {
    this.timer(200,this.updateObservers); // NOTE: throttling updateObservers call
                                          //       to avoid frequent updates.
  } 

}



