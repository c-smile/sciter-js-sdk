import * as sys from '@sys';
import * as sciter from '@sciter';
import * as env from '@env';

import { Remarkable } from 'remarkable/index.js';
import { HeaderIds } from 'remarkable/plugins/header-ids.js';

import * as Settings from 'settings.js';

const APP_NAME = "sciter.js.mdview";

const view = Window.this; // current window
const content = document.$("frame#content"); // content frame
const overlay = document.$("frame#overlay"); // content frame

const md = new Remarkable();
md.use( HeaderIds({ anchorText:" " }));

export async function load(href = null) {
  try {
    href = href || content.frame.document.url();
    //let text = sys.fs.$readfile( URL.toPath(href) );
    //let body = sciter.decode(text,"utf-8");
    var r = await fetch(href);
    let body = r.text();
    body = md.render(body);
    let html = `<html><body>${body}</body></html>`;
    content.frame.loadHtml(html,href);
    setCaption();
  } catch(e) {
    console.error(e.message);
  }
}

document.on("^click","a[href]", function(evt, a) {
  let href = a.getAttribute("href");
  if( href.startsWith("#") )
    return;

  href = a.ownerDocument.url(href);
  let url = new URL(href);  

  if( url.protocol == "file:" && url.extension == "md" ) {
    evt.stopPropagation();
    load(href);
  }
  else {
    // external URL
    evt.stopPropagation();
    env.launch(href);
  }
});

function getCurrentPath() {
  return URL.toPath(content.frame.document.url());
}

function setCaption() {
  var caption = getCurrentPath();
  view.caption = caption;
  document.$("window-caption").innerText = caption;
}

function onNewDocumentShown() {
  setCaption();
  document.timer(500,updateMonitor); // throttling monitor change
}

document.on("historystatechange", "frame#content", (evt,frame) => {
  document.$("button#home").state.disabled = frame.history.length == 0;
  document.$("button#back").state.disabled = frame.history.length == 0;
  document.$("button#fore").state.disabled = frame.history.forwardLength == 0;
  onNewDocumentShown();
});


document.on("click","button#daynight", function(evt, button) {
  document.attributes["theme"] = button.value ? "dark" : "light";
  Settings.saveState();
});

document.on("click", "button#home", () => {
  content.history.go(-content.history.length);
});

document.on("click", "button#back", () => {
  content.history.back();
  return true;
});

document.on("click", "button#fore", () => {
  content.history.forward();
  return true;
});

document.on("click", "button#print", (evt,button) => {
  if(button.value) {
    document.attributes["mode"] = "pager";
    overlay.attributes["hidden"] = undefined;
    overlay.frame.loadFile(__DIR__ + "printview/pager.htm");
  } else {
    document.attributes["mode"] = undefined;
    overlay.attributes["hidden"] = true;
    overlay.frame.loadEmpty();
  }
  return true;
});

let currentMonitor = null;

function isMonitorNeeded() { return document.$("button#watch").value; }

function updateMonitor() {
  if(currentMonitor) {
    currentMonitor.close();
    currentMonitor = null;
  }
  if(isMonitorNeeded()) {
    currentMonitor = sys.fs.watch(getCurrentPath(), function() {
      content.timer(100, load); // throttling reload
    });
  }
}

document.on("beforeunload", () => {
  if(currentMonitor)
    currentMonitor.close();
});

document.on("click", "button#watch", (evt,button) => {
  updateMonitor();
  saveState();
  return true;
});

document.on("provide-current-document", function(evt) {
  let doc = content.frame.document;
  evt.data = {
    html: doc.outerHTML,
    href: doc.url(),
  }
  return true;
});

Settings.add({
  store(data) { 
    data.daynight = document.$("button#daynight").value;
  },
  restore(data) { 
    document.$("button#daynight").value = data.daynight;
    document.attributes["theme"] = data.daynight ? "dark" : "light";
  }
});

Settings.init(APP_NAME);

document.ready = function() {
  let argv = view.scapp?.argv;
  let href = (__DIR__ + "hello.md");
  if( argv ) {
    let path = argv[argv.length - 1];
    if( path.endsWith(".md") )
      href = path;
  }
  href = URL.fromPath(href);
  load(href);
}

