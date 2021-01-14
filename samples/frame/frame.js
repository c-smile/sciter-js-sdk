

function History(frame)
{
  let stack = [];
  let stackPos = 0;
  
  function restore(stackItem) {}
  function store(stackItem) {}

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
  });

  return {
    forward() { return goTo(1) },
    back() { return goTo(-1) },
    go(steps = 0) { return goTo(steps) },
    get length() { return stackPos; },
    get forwardLength() { return stack.length - stackPos - 1; }
  };

}

export class Frame extends Element
{
  navigateMode = "new";
  url = null;
  
  constructor() {
    super();
    this.history = History(this);
  }

  get contentDocument() { return this.frame.document; }

  get src() { return this.frame.document.url(); }
  set src(href) { this.navigate(href, "new"); }

  get documentUrl() { return new URL(this.src); }

  ["on newdocument"](evt) {
    if( evt.target !== this.contentDocument )
      return;
    this.initDocumentNamespace();
  }

  initDocumentNamespace() {
    let ns = this.contentDocument.this;
    // inject our .history and .location to the doc
    ns.history = this.history;
    ns.location = this.makeLocationObject();
  }

  navigate(url, mode) {
    let curl = this.documentUrl;
    let nurl = new URL(href);
    if( curl.origin == nurl.origin && curl.search == nurl.search) {
      if( curl.hash == nurl.hash )
        return;
      
    }
  }

  makeLocationObject() {

    let me = this;

    function setHash(newHash) {}

    return {
      get hash() { return me.documentUrl.hash },
      set hash(newHash) { setHash(newHash) } 
      get protocol() { return me.documentUrl.protocol },
      get host() { return me.documentUrl.host },
      get hostname() { return me.documentUrl.hostname }, 
      get port() { return me.documentUrl.port },  
      get pathname() { return me.documentUrl.pathname },  
      get search() { return me.documentUrl.search },  
      get href() { return me.documentUrl.href },  
      set href(newUrl) { assign(newUrl) }
      assign(url) { this.navigate(url,"new"); }
      reload() { this.navigate(this.src,"replace"); }
      replace(url) { this.navigate(url,"replace"); }
      toString() { return me.documentUrl.href }
    };
  }

  ["on click [href]"](event) {
    let href = event.target.getAttribute("href");
    this.src = this.contentDocument.url(href);
  }



}