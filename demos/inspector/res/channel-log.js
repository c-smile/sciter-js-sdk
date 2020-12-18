
const CLASS_NAMES = ["info","warning","error"];
const SUBSYTEM_NAMES = ["dom","csss","css","script","eval"];

//const RE_FILE_LINE = /[(](\w+:[^()]+[(](?:\d+)[)])[)]/g;
const RE_FILE_LINE = /[(](\w+:[^()]+(?:[:]\d+|[(]\d+[)]))[)]/g;
//const RE_URL_LINENO = /[(](\w+:[^():]+)([:]\d+|[(]\d+[)])[)]/g;
//const RE_URL_LINENO = /(\w+:[^()]+)(?:[:](\d+)|[(](\d+)[)])/g;


class LogObjectData extends Element 
{
  constructor(props) {
    super();
    this.data = props.data;
  }

  render() {

    if(Array.isArray(this.data))
      this.type = "array";
    else if(this.data.__nto__)
      this.type = "object-nt"; // non-trivial
    else 
      this.type = "object";

    if(this.expanded)
      return <var.coll expanded="" type={this.type}>{this.renderAllItems()}</var>;
    else 
      return <var.coll type={this.type}>{this.renderFewItems()}</var>;
  }

  renderAllItems() 
  {
    let list = [];
    let props = this.data;
    if( this.type == "object-nt" ) 
    {
      let header = this.data.__nto__;
      if( header != this.data.class)
        header += `(${this.data.class})`;
      list.push(<header>{header}</header>);
      props = this.data.props;

      let meta = this.data.meta;
      if(meta) {
        for(var [key,val] of Object.entries(meta)) {
          key = key.toString();
          list.push(<span .meta>{key} :</span>);
          switch(typeof val) {
            case "string": list.push(<var .meta .string key={key}>{val}</var>); break; 
            case "number": list.push(<var .meta .number key={key}>{val.toString()}</var>); break;
            case "object": list.push(<LogObjectData .meta data={val} key={key} />); break;
            default: list.push(<var .meta .other key={key}>{val}</var>); break; 
          }
        }         
      }

    }

    for(var [key,val] of Object.entries(props)) {
      key = key.toString();
      list.push(<span>{key} :</span>);
      switch(typeof val) {
        case "string": list.push(<var .string key={key}>{val}</var>); break; 
        case "number": list.push(<var .number key={key}>{val.toString()}</var>); break;
        case "object": list.push(<LogObjectData data={val} key={key} />); break;
        default: list.push(<var .other key={key}>{val}</var>); break; 
      }
    }
    return list;
  }

  renderFewItems() 
  {
    function compact(val) {
      switch(typeof val) {
        case "string": return val.length > 10 ? ('"' + val.substr(0,10) + '…"'): ('"' + val + '"'); 
        case "object": return Array.isArray(val) ? "[…]":"{…}";
        default: return val.toString();
      }
    }
    var str = "";
    if( this.type == "array" ) {
      let n = 0;
      for(var val of this.data) {
        if(++n > 3) { str += ",…"; break; }
        if(str) str += ",";
        str += compact(val);
      }
      return `[ ${str} ]`;
    } else if( this.type == "object-nt" ) 
    {
      let header = this.data.__nto__;
      if( header != this.data.class)
        header += `(${this.data.class})`;
      let n = 0;
      for(var [key,val] of Object.entries(this.data.props)) {
        if(++n > 3) { str += ",…"; break; }
        if(str) str +=",";
        str += key + ":" + compact(val);
      }
      return `${header}{ ${str} }`;
    } 
    else //if( this.type == "object" ) 
    {
      let n = 0;
      for(var [key,val] of Object.entries(this.data)) {
        if(++n > 3) { str += ",…"; break; }
        if(str) str +=",";
        str += key + ":" + compact(val);
      }
      return `{ ${str} }`;
    }   
    
  }
  ["on click"](evt) {
    this.componentUpdate({expanded : !this.expanded });
    return false; // do not propagate it further
  }

}
 
function crackText(text)
{
  var t = text.split(RE_FILE_LINE);
  if( t.length == 1  )
    return text;
  let content = [];
  for( let i = 0; i < t.length; ++i ) { 
    let chunk = t[i];
    if( !chunk ) continue;
    if( i & 1 ) {
      const RE_URL_LINENO = /(\w+:[^()]+)(?:[:](\d+)|[(](\d+)[)])/g;
      let [src,url,ln1,ln2] = RE_URL_LINENO.exec(chunk);
      content.push(<a .location href={url} lineno={ln1 || ln2}>{chunk}</a>);
    } else 
      content.push(chunk);
  }
  return content;
}

// whole log list item, a.k.a. message
function LogListItem(props) 
{
  const logitem = props.logitem;
  const content = logitem.items.map((val,key) => {
    switch(typeof val) {
      case "string": return <span .string key={key}>{crackText(val)}</span>;
      case "number": return <var .number key={key}>{val.toString()}</var>;
      case "object": return <LogObjectData data={val} key={key} />;
      default: return <var .other key={key}>{val}</var>; 
    }
  });
  return <li class={ CLASS_NAMES[logitem.severity] + ' ' + SUBSYTEM_NAMES[logitem.subsystem]}>{content}</li>;
}

export class ChannelLog extends Element 
{
  channel = null;
  constructor(props) {
    super();
    this.channel = props.channel;    
  }

  componentDidMount() {
    //console.log("ChannelLog componentDidMount");
    this.handler = (evt) => { if(evt.detail === this.channel) { this.componentUpdate(); this.timer(20,this.ensureLastVisible)} };
    document.on("log-new", this.handler);
  }

  componentWillUnmount() 
  {
    //console.log("ChannelLog componentWillUnmount");
    document.off(this.handler);
  }

  ensureLastVisible() {
    this.$("list").lastElementChild.scrollIntoView {behavior:"smooth"};
  }

  render(props)
  {
    var list = this.channel.theirLogs.map((item) => <LogListItem logitem={item} key={item.key} />);
    return <section#channel-log styleset="facade.css#channel-log">
      <list>{list}</list>
      <textarea #toeval placeholder="eval" spellcheck="false" />
    </section>; 
  }

  ["on ^keydown at textarea#toeval"](evt,textarea) {
    if( evt.code != "KeyRETURN" ) return;
    if( evt.shiftKey || evt.ctrlKey) return;
    let toeval = textarea.value.trim();
    if( !toeval ) return;
    this.channel.theirLogs.push({
      severity: 0,
      subsystem: 4, // "eval"
      items: [toeval]
    })
    this.channel.notify("toeval",toeval);
    return false; // do not propagate, consumed
  }

}