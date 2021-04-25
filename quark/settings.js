
import * as env from "@env";
import * as sys from "@sys";

import {encode,decode} from "@sciter";

var path;
var list = []; // list of persistable objects

// persistable settings

export async function store() 
{
  if(!path)
    return;

  var file;

  try {
    file = await sys.fs.open(path,"w+",0o666);
    var data = {};
    for(var persistable of list)
      persistable.uiStateStore(data);
    await file.write(encode(JSON.stringify(data, null, "  "),"utf-8"));
  } catch(e) {
    Window.this.modal(<warning>Cannot open file {path} for writing.<br/>{e}<br/>Settings will not be saved.</warning>);
  }
  finally {
    if(file) file.close();
  }
}

function restore() 
{
  var buffer;

  try {
    buffer = sys.fs.$readfile(path,"r");
  } catch(e) {
    return false;
  }

  try {
    var data = JSON.parse( decode(buffer,"utf-8") );
    for(var persistable of list)
      persistable.uiStateRestore(data);
  }
  catch(e) { 
    console.error("Restore error:",e); 
  }
}

export function add(persistable) { list.push(persistable); }

// window position persistence
add({
  uiStateStore : function(data) 
    {
       var [x,y,w,h] = Window.this.box("xywh","border","screen");
       data.window = {left:x,top:y,width:w,height:h};  
    },
  uiStateRestore : function(data) 
    {
      if( data.window ) {
        var x = Math.max(data.window.left,0);
        var y = Math.max(data.window.top,0);
        var w = Math.max(data.window.width,800);
        var h = Math.max(data.window.height,600); 
        Window.this.move(x,y); // move to monitor 
        Window.this.move(x,y,w,h); // replace on monitor
      }
    }
});
  
export function saveState()
{
  if(!document.window) {
    Window.this.off(saveState); // document is unloaded
    return;
  }
  // throttled request to store the data
  document.timer(1000,store);
}

Window.this.on("move",saveState)
           .on("size",saveState);

export async function init(APP_NAME) {
  path = env.path("USER_APPDATA", APP_NAME + ".json");
  restore();
}

