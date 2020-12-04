

class TabView extends Element 
{
  viewstate = {};  
  channel = null;

  constructor(props, className) {
    super();
    this.channel = props.channel;
    if(!this.channel.viewstate[className])
      this.channel.viewstate[className] = this.viewstate = {};
    else
      this.viewstate = this.channel.viewstate[className];
  }
}

class DOMTree extends TabView 
{
  constructor(props) { super(props,"DOMTree"); }

  componentDidMount() {
    if(!this.viewstate.stack)  
      this.loadInitialContent(); 
    this.channel.onStackHighlight = (stack) => this.showStack(stack);    
  }

  componentWillUnmount() {
    this.channel.onStackHighlight = null;
  }

  async getContentOf(nd) {
    let content = await this.channel.request("contentOf",nd.uid);
    if( typeof content == "string")
      nd.text = content;
    else
      nd.children = content;
      for(let ch of nd.children) {
        if(typeof ch == "object")
          ch.parent = nd;
      }
    return content;
  }

  async loadInitialContent() 
  {
    try {
      let stack = await this.channel.request("stackOf",null);
      this.viewstate.stack = stack;
      let root = stack[0];
      let rootContent = await this.getContentOf(root);

      let body = null;
       
      for(var rn of rootContent) 
        if( rn.tag == "body" ) {
          await this.getContentOf(body = rn);
          break;
        }
      this.componentUpdate();  
    } catch(e) {
      console.error(e);
    }
  }

  async showStack(stack) {
    for(let i = 1; i < stack.length; ++i) {
      let p = stack[i - 1];
      let c = stack[i];
      await this.getContentOf(p);
      if(p.children) for(let n = 0; n < p.children.length; ++n) {
        if( p.children[n].uid == c.uid ) {
          p.children[n] = c;
          c.parent = p;
          break;
        }
      }
    }
    let copt = this.$("option:current");
    if(copt) copt.state.current = false;
    this.viewstate.stack = stack;
    this.dispatchEvent(new Event("domstackchange",{bubbles:true}),true);
  }

  render() {

    function atts(nd) {
      var list = [];
      for(var n in nd.atts) 
        switch(n) {
          case "id": list.push(<span .id>#{nd.atts[n]}</span>); break;   
          case "class": list.push(<span .class>.{nd.atts[n].replaceAll(" ",".")}</span>); break;
          case "type": list.unshift(<span .type>|{nd.atts[n]}</span>); break;
          case "name": list.push(<span .name>({nd.atts[n]})</span>); break;
          default: list.push(<span .attr>{n}="{nd.atts[n]}"</span>); break;
        }
      return list;
    }

    function caption(nd,open) {
      if(open)
        return <caption><span .tag>{"<"+nd.tag}{atts(nd)}{">"}</span></caption>;
      else {
        let text = nd.length ? "…" : nd.text;
        return <caption><span .tag>{"<"+nd.tag}{atts(nd)}{">"}</span>{text}<span .tag>{"</"+nd.tag+">"}</span></caption>;
      }
    }

    function option(nd,curr) {
      if(typeof nd == "string")
        return <option key={nd} state-current={nd===curr}><caption>"{nd}"</caption></option>;
      else if(nd.length == 0) {
        return <option key={nd.uid} state-current={nd===curr}>{caption(nd,false)}</option>;
      }
      else {
        let children = []; if(nd.children) for(let ch of nd.children) children.push(option(ch,curr));
        let open = children.length > 0;
        return <option key={nd.uid} state-expanded={open} state-current={nd===curr}>{caption(nd,open)}{children}</option>;
      }
    }

    var curr = this.current;
    var nodes = this.root ? option(this.root,curr) : [];
    //console.log("C", curr, this.root, this.viewstate, this.viewstate.stack);
    return <select|tree treelines="" styleset="facade.css#dom-tree">{nodes}</select>;
  }

  get root() { return this.viewstate?.stack?.[0]; }
  get current() { return this.viewstate?.stack?.last; }

  findTheirNodeByUID(UID, nd) { 
    if( nd.uid == UID ) return nd;
    if( nd.children ) for(var cnd of nd.children) {
      let found = this.findTheirNodeByUID(UID, cnd);
      if( found ) return found;
    }
    return null;
  }

  ["on collapse at option"](evt, option) {
    let UID = option.getAttribute("key");
    let found = this.findTheirNodeByUID(UID, this.root);
    if( found )
      found.children = null;
    this.componentUpdate();
  }

  async ["on expand at option"](evt, option) {
    let UID = option.getAttribute("key");
    let found = this.findTheirNodeByUID(UID, this.root);
    if( found ) {
      await this.getContentOf(found);
      this.componentUpdate();  
    }
  }

  ["on change"](evt) 
  {
    let current = this.$("option:current");
    if(!current) return;
    let UID = current.getAttribute("key");
    let found = this.findTheirNodeByUID(UID, this.root);
    if( found ) {
      this.channel.notify("highlightElement",UID);
      let stack = [found];
      for(let pn = found.parent; pn; pn = pn.parent)
        stack.unshift(pn);
      this.viewstate.stack = stack;
      this.dispatchEvent(new Event("domstackchange",{bubbles:true}),true);
    }
  }

  static header(channel) 
  {
    var list = [];
    function atts(se) {
      let id = se.atts.id;
      return id ? <span .id>#{id}</span> : [];
    }
    var stack = channel.viewstate.DOMTree?.stack;
    if(stack) for(let se of stack)
      list.push(<span .tag>{se.tag}{atts(se)}</span>);
    return <div #dom-stack styleset="facade.css#dom-stack">{list}</div>;
  }
}

class ResourceView extends Element 
{
  constructor(props) { 
    super(); 
    this.channel = props.channel;
    this.resdef = props.resdef; // see debug-peer.js -> const rsdef = {...}
    //console.log("ctor",JSON.stringify(this.resdef));
    this.type="unknown";
    this.mimeType = this.resdef?.rsMimeType;
    switch(this.resdef?.rqType) {
      case "html": 
      case "style": 
      case "script": this.type="code"; break;
      case "image": this.type="image"; break;
      case "data": 
         if(this.resdef.rsMimeType.startsWith("text/")) { this.type="code"; break; }
         else if(this.resdef.rsMimeType.startsWith("image/")) { this.type="image"; break;}
    }
  }

  updateValue() {
    //console.log("updateValue",JSON.stringify(this.resdef));
    if(this.type == "code") {
      this.$("plaintext").value = this.resdef.rsData;
    }
    else if(this.type == "image") {
      var img = Graphics.Image.fromBytes(this.resdef.rsData);
      if(!img) return;
      this.$("picture").value = img;
      this.$("form").value = { width: img.width, height: img.height, type: img.packaging, size: this.resdef.rsData.byteLength };
    }
  }

  render() {
    if(this.parentElement)
      this.timer(1, this.updateValue );
    var viewer;
    switch(this.type) {
      case "code": viewer = <plaintext type={this.mimeType} readonly="on" linenumbers="on" />; break;
      case "image": viewer = 
        <figure type={this.mimeType}>
           <picture/>
            <form>
              <label>width (ppx)</label><output|integer(width)/>
              <label>height (ppx)</label><output|integer(height)/>
              <label>file type</label><output(type)/>
              <label>file size (bytes)</label><output|integer(size)/>
            </form>
        </figure>; 
        break;
      default:  viewer = []; break;
    }
    return <section #resource type={this.type} styleset="facade.css#resource">{viewer}</section>;
  }

  static header(channel) {
    <div></div>
  }
}

class ResourcesView extends TabView 
{
  constructor(props) { super(props,"ResourcesView"); }

  render() 
  {
    var rlist = Object.values(this.channel.theirResources);

    function group(rtype) {
      var items = rlist.filter( rd => rd.rqType == rtype );
      items = items.map( rd => <option value={rd.rqUrl}>{rd.rqUrl}</option>);
      items.unshift(<optgroup>{rtype}</optgroup>);
      return items;
    }

    return <frameset cols="200px,*" styleset="facade.css#resources">
      <select|list #resource-list> 
        { group("html") }
        { group("style") }
        { group("script") }
        { group("image") }
        { group("data") }
      </select>
      <splitter/>
      <ResourceView channel={this.channel} resdef={this.currentResDef} key={this.currentResDef.resUrl} />
    </frameset>;
  }

  get currentResDef() { return this.viewstate.resDef || {}; }

  set currentResDef(rd) { this.viewstate.resDef = rd; }

  static header(channel) { return <div></div>; }

  ["on change at select#resource-list"](evt,select) {
    var resUrl = select.value;
    var resDef = this.channel.theirResources[resUrl];
    this.componentUpdate({ currentResDef : resDef });
  }
}


class MemoryView extends TabView 
{

  constructor(props) { super(props,"MemoryView"); }

  render() {
    return <div>memory</div>;
  }

  static header(channel) {
    
  }
}

export class ChannelView extends Element {
  
  channel = null; 
  viewstate = {};

  constructor(props) {
    super();
    this.channel = props.channel;
    this.viewstate = this.channel.viewstate;
  }

  get currentTab() {
    return this.viewstate.tab || "dom";
  }
  set currentTab(v) {
    this.viewstate.tab = v;
  }


  render() {

    let currentTabView; 
    let currentHeaderView;
    switch(this.currentTab) {
      default:
      case "dom": 
        currentTabView = <DOMTree channel={this.channel} />; 
        currentHeaderView = DOMTree.header(this.channel); 
        break;
      case "resources": 
        currentTabView = <ResourcesView channel={this.channel} />; 
        currentHeaderView = ResourcesView.header(this.channel); 
        break;
      case "memory": 
        currentTabView = <MemoryView channel={this.channel} />; 
        currentHeaderView = MemoryView.header(this.channel); 
        break;
    } 

    //console.log("ChannelView render",this.channel.theirResources.length);
    let nResources = Object.values(this.channel.theirResources).length;

    return <section#channel-view styleset="facade.css#channel-view">
      <header>
        <label#resources state-current={ this.currentTab == "resources"}>Resources({nResources})</label>
        <label#memory state-current={ this.currentTab == "memory"}>Memory</label>
        <label#dom state-current={ this.currentTab == "dom"}>DOM</label>
        {currentHeaderView}
      </header>
      { currentTabView }
    </section>; 
  }  


  ["on click at label:not(:current)"](evt,label) 
  {
    this.componentUpdate { currentTab: label.id };
    return false;
  }

  ["on domstackchange"](evt) {
    this.componentUpdate();
    return false;
  }


}