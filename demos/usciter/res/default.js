import { $, on } from "@sciter";
import { launch, home, PLATFORM, exec } from "@env";
import * as sys from "@sys";
import { DropZone } from "drop-zone.js";
import * as Settings from "settings.js";
import * as LiveReload from "live-reload.js";

const APP_NAME = "usciter.js.app";

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

function updateCaption() {
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

function loadFile(fn)
{
  //liveReload.reset();
  filename = fn;
  content.frame.debugMode = true;
  content.frame.loadFile(fn);
  $("button#reload").state.disabled = false;
  inspectorButton.state.disabled = false;
  updateCaption();
}

function reloadFile()
{
  content.frame.loadFile(filename);
  updateCaption();
}

on("click","button#open", function(e,btn) {
  if(btn.ownerDocument !== document)
    return false;
  var fn = view.selectFile("open",file_filter);
  if( fn ) 
    loadFile(fn);
})

on("click","button#reload", function (e,btn) {
  if(btn.ownerDocument !== document)
    return false;

  //liveReload.reset();
  if( filename )
    reloadFile();
})

on("click", "button#open-in-view", function(e,btn) {
  if(btn.ownerDocument !== document)
    return false;

  var fn = view.selectFile("open",file_filter);
  if( fn ) 
    view.load(fn);
})

let theme = {
  ambience: "light",
  blurBehind : true,
  useSystemAmbience:true
};

function equal(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) return false;
  for (let key of keys1)
    if (object1[key] !== object2[key])
      return false;
  return true;
}

function setupTheme(params,force)
{
  if(!params) { force = true; params = {} }

  let newTheme = Object.assign({},theme,params); 
  if(!Window.this.mediaVar("ui-blurbehind"))
    newTheme.blurBehind = false;
  if(newTheme.useSystemAmbience)
    newTheme.ambience = Window.this.mediaVar("ui-ambience"); // WM uses light theme

  if(!force && equal(theme,newTheme))
    return;

  theme = newTheme;

  const bg = $("button#ambience");
  const bb = $("button#enable-blurbehind");
  const bsa = $("button#system-ambience");

  Window.this.blurBehind = theme.blurBehind ? theme.ambience : "none";
  document.attributes["blurbehind"] = theme.blurBehind ? "" : undefined;
  document.attributes["theme"] = theme.ambience;

  bg.state.checked = theme.ambience == "light";
  bb.state.checked = theme.blurBehind;

  bg.state.disabled = theme.useSystemAmbience;
  bsa.state.checked = theme.useSystemAmbience;

  Settings.saveState();
}


function onMediaChange() {
  setupTheme { ambience: view.mediaVar("ui-ambience") };
}

on("click", "button#system-ambience", function(evt,button)
{
  setupTheme { useSystemAmbience: button.value };
});

on("click", "button#ambience", function(evt,button)
{
  setupTheme { ambience: button.value ? "light" : "dark" };
});

on("click", "button#enable-blurbehind", function(evt,button)
{
  setupTheme { blurBehind: button.value };
});

Window.this.on("mediachange", function() {
  if(theme.useSystemAmbience)
    setupTheme({ ambience : Window.this.mediaVar("ui-ambience") },true);
});


on("click", "button#inspector", async function() 
{
  const SUFFIX = { Windows: ".exe", OSX: ".app" };
  const PREFIX = { Windows: "\\", OSX: "/../../../" };

  let inspectorPath = home((PREFIX[PLATFORM] || "") + "inspector" + (SUFFIX[PLATFORM] || ""));

  try {
    await sys.fs.stat(inspectorPath);
    launch(inspectorPath);
  } catch (e) {
    Window.modal(<alert>Cannot find {inspectorPath}</alert>);
  }
  
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
};

Settings.init(APP_NAME).then(function(){
  Window.this.state = Window.WINDOW_SHOWN;
});


Settings.add
{
  store: function(data) {
    data.theme = theme;
  },
  restore: function(data) {
    setupTheme(data.theme);
  }
};

const btnLiveReload = $("button#live-reload");

LiveReload.attachTo(content);

LiveReload.onReload( function () {
  if( filename )
    loadFile(filename);
  // indication of pending change reload
  btnLiveReload.state.visited = false;
}); 

LiveReload.onChange( function() {
  btnLiveReload.state.visited = true;
}); 

btnLiveReload.on("click", function(evt,button)
{
  if(button.value)
    LiveReload.start(filename);
  else
    LiveReload.stop();
  return true;
});

on("click", "button#help", function() 
{
  const scappn = PLATFORM == "Windows" ? "scapp.exe" : "scapp";
  const scapp = home(scappn);
  const mdview = home("../../../samples.sciter/applications.quark/mdview/main.htm");
  const docfolder = home("../../../docs/md");
  exec(scapp,mdview,docfolder);
});

