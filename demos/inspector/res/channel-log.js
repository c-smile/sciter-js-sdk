
const CLASS_NAMES = ["info","warning","error"];
const SUBSYTEM_NAMES = ["dom","csss","css","script"];

class LogObjectData extends Element 
{
  constructor(props) {
    super();
    this.data = props.data;
  }

  render() {
    const type = Array.isArray(this.data) ? "array":"object";
    if(this.expanded)
      return <var.coll expanded="" type={type}>{this.renderAllItems()}</var>;
    else 
      return <var.coll type={type}>{this.renderFewItems()}</var>;
  }

  renderAllItems() 
  {
    var list = [];
    for(var [key,val] of Object.entries(this.data)) {
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
    if( Array.isArray(this.data) ) {   
      let n = 0;
      for(var val of this.data) {
        if(++n > 3) { str += ",…"; break; }
        if(str) str += ",";
        str += compact(val);
      }
      return `[ ${str} ]`;
    } else {
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

// whole log list item, a.k.a. message
function LogListItem(props) 
{
  const logitem = props.logitem;
  const content = logitem.items.map((itemdata,itemindex) => {
    if(typeof itemdata == "string")
      return itemdata;
    if(typeof itemdata == "object")
      return <LogObjectData data={itemdata} key={itemindex} />;
    return "" + itemdata;
  });
  return <li class={ CLASS_NAMES[logitem.severity] + ' ' + SUBSYTEM_NAMES[logitem.susbsystem]}>{content}</li>;
}

export class ChannelLog extends Element 
{
  channel = null;
  constructor(props) {
    super();
    this.channel = props.channel;
  }

  componentDidMount() {
    this.handler = (evt) => { if(evt.detail === this.channel) this.componentUpdate() };
    document.on("log-new", this.handler);
  }

  componentWillUnmount() 
  {
    document.off(this.handler);
  }

  render() 
  {
    var list = this.channel.theirLogs.map((item) => <LogListItem logitem={item} key={item.key} />);
    return <section#channel-log styleset="facade.css#channel-log">
      <list>{list}</list>
      <input|text novalue="eval" />
    </section>; 
  }  
}