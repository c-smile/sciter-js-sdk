import * as sys from '@sys';
import * as sciter from '@sciter';

// process runner + log 
export class LogRunner extends Element
{
  lines = [];
  static instance;

  componentDidMount() { LogRunner.instance = this; }

  render() {
    LogRunner.instance = this;
    if(this.lines.length) this.post(() => this.lastElementChild?.scrollIntoView()); // ensure last line is visible
    return <plaintext id="log" readonly="">
      { this.lines.map( (line,index) => <text key={index} {{class:line.type}}>{line.text}</text> ) }
    </plaintext>;
  }

  static add(text,type = "stdout") {
    let me = LogRunner.instance;   
    me.lines.push { type:type, text:text };
    me.componentUpdate();
  }

  static async run(args) { 

    LogRunner.add( args.join(" "), "initial");

    async function readPipe(pipe, name) {
      try {
        while(pipe) {
          var buffer = await pipe.read();
          if(buffer.byteLength == 0)
            break;
          var text = sciter.decode(buffer); 
          LogRunner.add(text,name);
        }
      } catch(e) {}
    }

    var proxy = sys.spawn(args, { stdout:"pipe", stderr:"pipe"} );

    readPipe(proxy.stdout, "stdout");
    readPipe(proxy.stderr, "stderr");

    var ro = await proxy.wait();

    return ro.exitCode;
  }

  static clear() {
    let me = LogRunner.instance;
    me.lines = [];
    me.componentUpdate();
  }

}

