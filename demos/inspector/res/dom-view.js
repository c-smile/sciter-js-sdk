import { View } from "view.js";

export class DOMView extends View 
{
  constructor(props) { super(props,"DOMView"); }

  componentDidMount() {
    if(!this.viewstate.stack)  
      this.loadInitialContent(); 
    this.channel.onStackHighlight = (stack) => this.showStack(stack);
    this.channel.onContentChange = () => this.reloadContent();
  }

  componentWillUnmount() {
    this.channel.onStackHighlight = null;
  }

  async getContentOf(nd) {
    let content = await this.channel.request("contentOf",nd.uid);
    if( typeof content == "string")
      nd.text = content;
    else if(content) {
      nd.children = content;
      for(let ch of nd.children) {
        if(typeof ch == "object")
          ch.parent = nd;
      }
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
      console.error("loadInitialContent:",e,e?.stack);
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

  async reloadElement(el) {
    if(el.children)
      await this.getContentOf(el);
    if(el.children) for(let ch of el.children)
      this.reloadElement(ch);
    this.componentUpdate();
  }

  async reloadContent() {
    let nstack = await this.channel.request("stackOf",null);  
    if( nstack.uid != this.root.uid )
      this.loadInitialContent();
    else {
      this.reloadElement(this.root);
      this.componentUpdate();
    }
  }

  render() {

    if(!this.channel.connected)
      return <div></div>;

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
    //if(curr)
    //  console.log("C", curr, curr.uid, this.root);
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

  ["on input"](evt) 
  {
    let UID = this.value;
    let found = this.findTheirNodeByUID(UID, this.root);
    if( found ) {
      this.channel.notify("highlightElement",UID);
      let stack = [found];
      for(let pn = found.parent; pn; pn = pn.parent)
        stack.unshift(pn);
      this.viewstate.stack = stack;
      this.dispatchEvent(new Event("domstackchange",{bubbles:true}),true);
    }
    return false;
  }

  static header(channel)
  {
    if(!channel.connected)
      return <div/>;
    var list = [];
    function atts(se) {
      let id = se.atts.id;
      return id ? <span .id>#{id}</span> : [];
    }
    var stack = channel.viewstate.DOMView?.stack;
    if(stack) for(let se of stack)
      list.push(<span .tag>{se.tag}{atts(se)}</span>);
    return <div #dom-stack styleset="facade.css#dom-stack">{list}</div>;
  }
}

class ElementMetrics extends View {
  
  metrics = null;

  constructor(props) {
    super(props, "DOMView");
  }

  render() {

    this.metrics = this.viewstate.elementDetails?.metrics;

    if(!this.metrics) return <section #metrics />;

    let {margin,padding,border,inner,content,dppx} = this.metrics;

    let pxunits = this.viewstate.units == "px";

    function u(val) {
      if(!val) return '-';  
      if(pxunits) val /= dppx
      return val.toString();
    } 

    return <section styleset="facade.css#element-metrics">

      <header>Units:
        <button|radio .units value="ppx" checked={!this.units || this.units=="ppx"}>screen px</button>
        <button|radio .units value="px" checked={this.units=="px"}>css px</button></header>

      <div .box.margin>    
        <var>{u(margin[1])}</var>
        <var>{u(margin[0])}</var>
        <var>{u(margin[2])}</var>
        <var>{u(margin[3])}</var>
        <div .box.border>    
          <var>{u(border[1])}</var>
          <var>{u(border[0])}</var>
          <var>{u(border[2])}</var>
          <var>{u(border[3])}</var>
          <div .box.padding>
            <var>{u(padding[1])}</var>
            <var>{u(padding[0])}</var>
            <var>{u(padding[2])}</var>
            <var>{u(padding[3])}</var>
            <div .inner><var>{u(inner[2])}</var>x<var>{u(inner[3])}</var></div>
          </div>     
        </div>     
      </div>
      <dl .content>
        <dt>width min</dt><dd><var>{u(content[0])}</var></dd><dt>max</dt><dd><var>{u(content[2])}</var></dd>
        <dt>height min</dt><dd><var>{u(content[1])}</var></dd><dt>max</dt><dd><var>{u(content[3])}</var></dd>
      </dl>
    </section>;
  }

  ["on input at button.units"](evt,button) 
  {
    this.viewstate.units = button.getAttribute("value");
    //console.log(this.viewstate.units);
    this.componentUpdate();
    return false;
  }

} 

export class ElementDetailsView extends View 
{
  constructor(props) { 
    super(props,"DOMView");
  }

  checkDetails() {
    const fetch = async () => {
      let content = await this.channel.request("detailsOf",this.viewstate.currentUid);
      this.viewstate.elementDetails = content;
      //console.log(JSON.stringify(this.viewstate.elementDetails));
      this.componentUpdate();
    };
    let current = this.viewstate.stack?.last;
    if( current && (this.viewstate.currentUid != current.uid)) {
      this.viewstate.currentUid = current.uid;
      fetch();
    }
  }

  render() {

    if(!this.channel.connected)
      return <div></div>;

    this.checkDetails();

    const list = [];

    const ctab = this.currentTab;

    if(this.viewstate.elementDetails) 
    {
      function namvals(map) { return Object.entries(map).sort( (a,b)=> a[0].localeCompare(b[0]) ); }

      switch(ctab) {
        case "used" :
          for(let [prop,val] of namvals(this.viewstate.elementDetails.usedStyleProperties)) {
            list.push(<dt>{prop}</dt>);
            list.push(<dd>{val}</dd>);
          }
          break;
        case "inherited": {
            let def = this.viewstate.elementDetails.appliedStyleRules[0];
            if(def && !def.type)
              for(let [prop,val] of namvals(def)) {
                list.push(<dt>{prop}</dt>);
                list.push(<dd>{val}</dd>);
              }
          } 
          break;
        case "declared":
          for(var def of this.viewstate.elementDetails.appliedStyleRules) {
            let type = def.type;
            if(!type) continue;
            let {selector, file, properties, lineNo } = def;
            //console.log("def:",selector, file, properties, lineNo);
            if( type == "default-style" )
              list.push(<rule>default properties</rule>);
            else {
              let url = new URL(file);
              list.push(<rule .file>
                  <span .selector>{selector}</span>
                  <a .filename href={file} lineno={lineNo}>{url.filename}({lineNo})</a>
                </rule>);
            }
            for(var [prop,val] of namvals(properties)) {
              list.push(<dt>{prop}</dt>);
              list.push(<dd>{val}</dd>);
            }
          }
          break;
      }
    }
    /*
      {styleRules}
      {metrics}

    */

    return <section .tabs>
      <header>
        <caption>styles:</caption>
        <label #used current={ ctab == "used"}>used</label>
        <label #inherited current={ ctab == "inherited"}>inherited</label>
        <label #declared current={ ctab == "declared"}>declared</label>
      </header>
      <dl #element-details styleset="facade.css#element-details">
        {list}
      </dl>
      <ElementMetrics #element-metrics channel={this.channel} />  
    </section>
  }

  ["on click at label:not(:current)"](evt,label) 
  {
    this.componentUpdate { currentTab: label.id };
    return false;
  }

  get currentTab() {
    return this.viewstate.detailsTab || "declared";
  }
  set currentTab(v) {
    this.viewstate.detailsTab = v;
  }

}

