
import * as sys from "@sys";

let enabled = false;
let urls = {};
let watchers = {};

let on_reload = null;
let on_change = null;

let timerId = 0;
let frame;

// PRIVATE:

function reload() {
    if (!enabled) return;
    urls = {};
    if (on_reload) on_reload();
}

function scheduleReload() {
    if (on_change) on_change();
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(reload, 3000);
}

function addFile(url) {
    if (urls[url])
        return;

    const [dirpath, filename] = sys.fs.splitpath(URL.toPath(url));

    urls[url] = dirpath;
    //console.print("live: add ", url, " as ", dirpath);

    if (watchers[dirpath])
        return;

    watchers[dirpath] = sys.fs.watch(dirpath, () => scheduleReload());
}

function dataTypeFrom(uri) {
    const mimeType = uri.guessMimeType();
    if (mimeType == "text/html")
        return "html";
    if (mimeType == "text/css")
        return "style";
    if (mimeType.startsWith("image/"))
        return "image";
    return null;
}

function isTracked(rq, url) {
    const uri = new URL(url);
    if (uri.protocol != "file:")
        return false;

    let rt = rq.context;
    if (rt == "data")
        rt = dataTypeFrom(uri);

    return rt == "html" || rt == "style" || rt == "image";
}

function monitorRequests() {
    // install new requestresponse hook
    frame.onrequestresponse = rq => {
    // check this resource
        const url = rq.responseUrl || rq.requestUrl;
        const reloadable = enabled && isTracked(rq, url);
        // debug({url} rq {rq.status} {rq.isConsumed});

        // add a new URL to track
        if (reloadable)
            addFile(url);
    };
}

// PUBLIC:

export function stop() {
    //console.print("stop\n");
    enabled = false;
    for (const [path, watcher] of Object.entries(watchers))
        watcher.close();
    watchers = {};
    clearTimeout(timerId);
}

export function start(filename = null) {
    //console.print("start",filename);
    enabled = true;
    if (filename)
        addFile(filename);
    monitorRequests();
}

export function attachTo(frameElement) {
    frame = frameElement;
    const doc = frame.ownerDocument;
    doc.on("beforeunload", () => stop());
}

export function onReload(cb) {
    on_reload = cb;
}

export function onChange(cb) {
    on_change = cb;
}
