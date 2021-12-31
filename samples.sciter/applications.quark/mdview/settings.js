
import * as env from "@env";
import * as sys from "@sys";

import {encode, decode} from "@sciter";

let path;
const list = []; // list of persistable objects

// persistable settings

export async function store() {
  if (!path)
    return;

  let file;

  try {
    file = await sys.fs.open(path, "w+", 0o666);
    const data = {};
    for (const persistable of list)
      persistable.store(data);
    await file.write(encode(JSON.stringify(data, null, "  "), "utf-8"));
  }
  catch (e) {
    Window.modal(<warning>Cannot open file {path} for writing.<br/>{e}<br/>Settings will not be saved.</warning>);
  }
  finally {
    if (file) file.close();
  }
}

function restore() {
  let buffer;

  try {
    buffer = sys.fs.$readfile(path, "r");
  }
  catch (e) {
    return false;
  }

  try {
    const data = JSON.parse(decode(buffer, "utf-8"));
    for (const persistable of list)
      persistable.restore(data);
  }
  catch (e) {
    console.error("Restore error:", e);
  }
}

export function add(persistable) {
  list.push(persistable);
}

// window position persistence
add({
  store: function(data) {
    const [x, y, w, h] = Window.this.box("xywh", "border", "screen");
    data.window = {left: x, top: y, width: w, height: h};
  },
  restore: function(data) {
    if (data.window) {
      const x = Math.max(data.window.left, 0);
      const y = Math.max(data.window.top, 0);
      const w = Math.max(data.window.width, 800);
      const h = Math.max(data.window.height, 600);
      Window.this.move(x, y); // move to monitor
      Window.this.move(x, y, w, h); // replace on monitor
    }
  },
});

export function saveState() {
  if (!document.window) {
    Window.this.off(saveState); // document is unloaded
    return;
  }
  // throttled request to store the data
  document.timer(1000, store);
}

Window.this.on("move", saveState)
  .on("size", saveState);

export function init(APP_NAME) {
  path = env.path("USER_APPDATA", APP_NAME + ".json");
  restore();
}

