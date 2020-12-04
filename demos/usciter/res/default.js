import { $, on } from "@sciter";
import { launch } from "@env";
import { DropZone } from "drop-zone.js";

const APP_NAME = "jsciter.app";

//include "settings.js";
//include "drop-zone.js";
//include "live-reload.tis";


const view = Window.this;

const content = $("frame#content");
const inspectorButton = $("button#inspector");

var filename = null;
const file_filter = "files *.htm,*.html,*.svg,*.zip,*.scapp|*.htm;*.html;*.svg;*.zip;*.scapp|" +
   "HTML files only(*.htm,*.html)|*.htm;*.html|" +
   "SVG files only(*.svg)|*.svg|" +
   "SCAPP files only (*.zip,*.scapp)|*.zip;*.scapp|" +
   "All Files (*.*)|*.*";
   
var debugIsActive = false; 

// for testing SciterEval and SciterCall APIs
globalThis.test = function(param) {
  console.log(param);
  return param;
}

function loadFile(fn)
{
  //liveReload.reset();
  filename = fn;
  content.frame.loadFile(fn, true);
  $("button#reload").state.disabled = false;
  inspectorButton.state.disabled = false;
  //if(debugIsActive)
  //  view.launchDebugView();

  var croot = content.frame.document;
  if(!croot) return;
  var title = croot.$("head>title");
  if(title) {
    title = `uSciter: ${ title.text || "" }`;
    view.windowCaption = title;
    var capEl = $("window-caption");
    if( capEl )
      capEl.innerText = title;
  }
}

on("click","button#open", function() {
    var fn = view.selectFile("open",file_filter);
    if( fn ) 
      loadFile(fn);
  })

on("click","button#reload", function () {
    //liveReload.reset();
    if( filename ) {
      loadFile(filename);
      //if(debugIsActive)
      //  view.launchDebugView();
    }
  })

on("click", "button#open-in-view", function() {
  var fn = view.selectFile("open",file_filter);
  if( fn ) 
    view.load(fn);
})

function setTheme(lightAmbience, blurbehind) {
  var bg = $("button#glass");
  if( lightAmbience ) {
    view.windowBlurbehind = blurbehind ? "light" : "none";
    document.attributes["theme"] = "light";
    bg.state.checked = true;
  }
  else {
    view.windowBlurbehind = blurbehind ? "dark" : "none";
    self.attributes["theme"] = "dark";
    bg.state.checked = false;
  }
}

function onMediaChange() {
  var blurbehind = view.mediaVar("ui-blurbehind"); // WM is blurbehind capable and uses it now
  var lightAmbience = view.mediaVar("ui-ambience") == "light"; // WM uses light theme
  setTheme(lightAmbience, blurbehind);
}

function setSystemGlass(onOff) {
  var bg = $("button#glass");
  var sbg = $("button#system-glass");
  if(onOff) {
    onMediaChange();
    bg.state.disabled = true; 
    sbg.state.checked = true;
    view.on("mediachange", onMediaChange);
  } else {
    bg.state.disabled = false; 
    sbg.state.checked = false;
    view.off(onMediaChange);
  }
}

on("click", "button#system-glass", function()
{
  setSystemGlass(this.value);
  //saveState();
});

on("click", "button#glass", function()
{
  setTheme(this.value, true);
  //saveState();
});

DropZone { 
  container: content,
  accept: "*.htm;*.html;*.xhtml;*.svg",
  ondrop: function(files) { 
    if( Array.isArray(files))
      loadFile(files[0]);
    else 
      loadFile(files);
    }
}

/*var liveReload = new LiveReload(function() {
  if( filename ) {
    content.load(filename);
    if(debugIsActive)
      view.launchDebugView();
  }
});

event click $(button#live-reload)
{
  if(this.value) {
    liveReload.start();
  } else {
    liveReload.stop();
  }
}*/

/*event change-detected {
  $(button#live-reload).state.visited = true;
}
event change-processed {
  $(button#live-reload).state.visited = false;
}*/

/*Settings.add
{
  store: function(data)
    {
      data.glass = {
        useSystem : $(button#system-glass).state.checked;  
        lightTheme : $(button#glass).state.checked; 
      };
    },
  restore: function(data) 
    {
      if(data.glass) {
        setSystemGlass(data.glass.useSystem);
        if( !data.glass.useSystem ) {
          var lightAmbience = data.glass.lightTheme;
          setTheme(lightAmbience, view.mediaVar("ui-blurbehind"));
        }
      }
    }
};*/


/*on("click", "button#help", function() 
{
  var path = System.home("../doc/main.htm");
  if(!System.scanFiles(path))
    path = System.home("../../doc/main.htm");
  if(!System.scanFiles(path)) {
    view.msgbox(#alert, path + " not found");
    return true;
  }

  view.window 
  {
    url: URL.fromPath(path),
    type: View.FRAME_WINDOW,
    state: View.WINDOW_SHOWN,
    alignment:5,
    width: 1024,
    height: 800
  };
});


event click $(button#inspector)
{
  if( var connectToInspector = view.connectToInspector ) {

    const SUFFIX = { Windows: ".exe", OSX: ".app" };
    const PREFIX = { Windows: "", OSX: "../../../" };

    var inspectorPath = System.home((PREFIX[System.PLATFORM] || "") + "inspector" + (SUFFIX[System.PLATFORM] || ""));
    
    if( !System.scanFiles(inspectorPath) ) {
      view.msgbox(#alert, "Cannot find " + inspectorPath);
      return;
    }
    Sciter.launch(inspectorPath);
    self.timer(500ms, function() { connectToInspector($(frame#content)) });
    
  }
}

function self.ready() {
  Settings.restore();
}
*/

