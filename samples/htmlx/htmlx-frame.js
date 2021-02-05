
// NOT COMPLETE!

function History(frame)
{
  let stack = [];
  let stackPos = 0;
  
  function restore(stackItem) {
    // TBD
  }
  function store(stackItem) {
    stackItem.href = frame.contentHref;
    // relative scroll pos
    stackItem.rsp = { x: frame.scrollLeft / frame.scrollWidth,
                      y: frame.scrollTop / frame.scrollHeight }
  }

  function goForward(steps) {
    let newStackPos = stackPos + steps;
    if( newStackPos >= stack.length ) return false;
    store(stack[stackPos]);
    stackPos = newStackPos;
    restore(stack[stackPos]);
    return true;
  }

  function goBackward(steps) {
    let newStackPos = stackPos - steps;
    if( newStackPos < 0 ) return false;
    store(stack[stackPos]);
    stackPos = newStackPos;
    restore(stack[stackPos]);
    return true;
  }

  function goTo(steps = 0) {
    if( steps < 0 ) return goBackward(-steps);
    else if( steps > 0 ) return goForward(-steps);
    else return reload();
  }

  frame.on("ready", function(evt) {
    if( evt.target !== frame.contentDocument )
      return;

    switch(frame.navigateMode) {
      case "new":
        stack = stack.slice(0, stackPos + 1);
        stack.push({
          url: frame.contentDocument.url(),
          data: null
        });
        stackPos = stack.length;
        break;
      case "restore":
        break; 
    }
    frame.dispatchEvent(new Event("historychange"));
  });

  function storeCurrentState() {
    // need to store current doc state into stack[stackPos]
    //console.log("TODO:storeCurrentState", stackPos,stack[stackPos]);
  }

  frame.on("beforeunload", function(evt) {
    if( evt.target !== frame.contentDocument )
      return;
    storeCurrentState();
  });

  return {
    forward() { return goTo(1) },
    back() { return goTo(-1) },
    go(steps = 0) { return goTo(steps) },
    get length() { return stackPos; },
    get forwardLength() { return stack.length - stackPos - 1; },
  };

}

//function Storage(frame) {
//
//}

export class WebFrame extends Element
{
  navigateMode = "new";
  url = null;

  componentDidMount() {
    this.history = History(this);
    this.setAttribute("content-style", __DIR__ + "htmlx.css");
    this.frame.loadHtml("<html style='background:linear-gradient(to bottom,#ffffff,#f0f0f0)'><body>NOT COMPLETE!</body></html>","about:blank");
  }

  get contentDocument() { return this.frame.document; }
  get contentWindow() { return this.frame.document.this; } // document's namespace

  get src() { let doc = this.frame.document; return doc ? doc.url() : ""; }
  set src(href) { this.navigate(href, "new"); }

  get documentUrl() { 
    return new URL(this.src); 
  }

  ["on newdocument"](evt) {
    if( evt.target !== this.contentDocument )
      return;
    this.initDocumentNamespace();
  }

  initDocumentNamespace() {
    let ns = this.contentDocument.globalThis;
    // inject our .history and .location to the doc
    ns.history = this.history;
    ns.location = this.makeLocationObject();
  }

  navigate(href, mode) {
    let curl = this.documentUrl;
    let nurl = new URL(href);
    if( curl.origin == nurl.origin && curl.search == nurl.search) {
      if( curl.hash == nurl.hash )
        return;
    }
    this.frame.loadFile(href);
  }

  makeLocationObject() {

    let me = this;

    function setHash(newHash) {}

    return {
      get hash() { return me.documentUrl.hash },
      set hash(newHash) { setHash(newHash) },
      get protocol() { return me.documentUrl.protocol },
      get host() { return me.documentUrl.host },
      get hostname() { return me.documentUrl.hostname }, 
      get port() { return me.documentUrl.port },  
      get pathname() { return me.documentUrl.pathname },  
      get search() { return me.documentUrl.search },  
      get href() { return me.documentUrl.href },  
      set href(newUrl) { assign(newUrl) },
      assign(url) { this.navigate(url,"new") },
      reload() { this.navigate(this.src,"replace") },
      replace(url) { this.navigate(url,"replace") },
      toString() { return me.documentUrl.href },
    };
  }

  ["on click a[href]"](event) {
    let href = event.target.getAttribute("href");
    this.src = this.contentDocument.url(href);
  }


}