import * as env from "@env";
import * as sys from "@sys";

import {encode, decode} from "@sciter";

let path;
let list = []; // list of persistable objects

// persistable settings

export async function store() {
  if (!path)
    return;

  let file;

  try {
    file = await sys.fs.open(path, "w+", 0o666);

    const data = {};
    for (const persistable of list)
      persistable.uiStateStore(data);

    await file.write(encode(JSON.stringify(data, null, "  "), "utf-8"));

    console.log("Settings stored");
  }
  catch (e) {
    Window.this.modal(<warning>Cannot open file {path} for writing.<br/>{e}<br/>Settings will not be saved.</warning>);
  }
  finally {
    if (file) file.close();
  }
}

function restore() {
  if (sys.fs.$stat(path) === null)
    return false;

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
      persistable.uiStateRestore(data);
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
  uiStateStore: function(data) {
    const [x, y, w, h] = Window.this.box("xywh", "border", "screen");
    data.window = {left: x, top: y, width: w, height: h};
  },
  uiStateRestore: function(data) {
    if (data.window) {
      const x = Math.max(data.window.left, 0);
      const y = Math.max(data.window.top, 0);
      const w = Math.max(data.window.width, 800);
      const h = Math.max(data.window.height, 600);

      // move to monitor
      Window.this.move(x, y);

      // replace on monitor
      Window.this.move(x, y, w, h);
    }
  },
});

export function saveState() {
  if (!document.parentWindow) {
    // document is unloaded
    Window.this.off(saveState);
    return;
  }

  // throttled request to store the data
  document.timer(1000, store);
}

Window.this.on("move", saveState)
  .on("size", saveState);

export async function init(APP_NAME) {
  path = env.path("USER_APPDATA", APP_NAME + ".json");
  restore();
}
