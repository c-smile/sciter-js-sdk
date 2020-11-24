import * as sys from "@sys";
import * as sciter from "@sciter";
import * as BJSON from "@bjson";
import * as debug from "@debug";

const PIPE_NAME = "inspector-js";

var outbound = null; // function used to send stuff to inspector
                     // we have a connection if it is not null 

// handle request coming from inspector
function handle(name,data) {
  console.log('rq from inspector',name);
}

var logs = []; // logs buffer - storage for logged items 

async function drainLogs() {
  var tlogs = logs; logs = [];
  outbound("logs", tlogs);
}

/*
  enum OUTPUT_SUBSYTEMS {
    OT_DOM = 0, // html parser & runtime
    OT_CSSS = 1,    // csss! parser & runtime
    OT_CSS = 2,     // css parser
    OT_SCRIPT = 3,  // script parser & runtime
  };
  enum OUTPUT_SEVERITY {
    OS_INFO,
    OS_WARNING,
    OS_ERROR,
  };
*/

function log(subs,kind,args) {
  if(logs.length >= 500) logs.shift();
  logs.push([subs,kind,args]);
  if(outbound) 
    document.timer(20,drainLogs); // throttling messages
}

globalThis.console.log = (...args) => log(3,0,args);
globalThis.console.warn = (...args) => log(3,1,args);
globalThis.console.error = (...args) => log(3,2,args);

debug.setUnhandledExeceptionHandler(function(err) {
  if(!outbound) 
    return false; // proceed with default UEH 
  log(3,2,[err.toString() + "\r\n" + err.stack]);
  return true;
});

debug.setConsoleOutputHandler(function(subsytem,severity,msg) {
  if(!outbound) 
    return false; // proceed with default handler  
  log(susbsytem,severity,[msg]);
  return true;
});


document.on("keyup", function(evt) {
  if(evt.code == "KeyF5") {
    document.dispatchEvent(new Event("reloaddocument", {bubbles:true}),true);
    return false; // consume the event
  }
});

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function postSnapshot() {
  let [w,h] = document.state.box("dimension","border");
  if( !w || !h ) return;
  let dw = 64,dh = 64;
  if(w > h) dh *= w / h; else dw *= h / w; 
  let image = new Graphics.Image(document, w, h, dw, dh ); // make snapshot of the element in the image    
  if( image ) {
    var bytes = image.toBytes("webp");
    outbound("snapshot", bytes); 
  }
}

function rqSnapshotUpdate() {
  document.timer(1000, postSnapshot ); 
}

async function run() 
{
  var pipe = new sys.Pipe();
  var rqnumber = 0;

  let awaitingResponses = []; // list of callbacks awaiting responses

  
  do {
    try {
      await pipe.connect(PIPE_NAME);
      break;
    } catch (e) {
      if(e.message == "no such file or directory") {
        await timeout(2000);
        continue;
      }
      return; // no luck
    }
  } while(document);

  try 
  {
    
    document.on("beforeunload.debug-peer", () => pipe.close());
    document.on("contentchange.debug-peer", rqSnapshotUpdate );  

    outbound = function(name,data,callback = null) 
    {
      if(callback) {
        awaitingResponses.push(callback);
        pipe.write(BJSON.write([name,true, data]));
      } else 
        pipe.write(BJSON.write([name,false, data]));
    }

    outbound("hello",document.url());
    if(logs.length) drainLogs();
    rqSnapshotUpdate();

    while (true) 
    {
      var message = await pipe.read();
      if (!message) {
        //console.print('connection closed!');
        break;
      }
      BJSON.read(message, (chunk) => {
        const [name,needresp,data] = chunk;
        if( name == "resp")
          awaitingResponses.shift()(data);
        else {
          let answer = driver.handle(name,data);
          if( needresp )
            pipe.write(BJSON.write(["resp",false,answer]));
        }
      });
    }
  } catch (e) {
    console.print(e);
  }
  pipe.close();
}

run();