
import { SublimatedObject,SublimatedValue } from "value.js";

const CLASS_NAMES = ["info","warning","error"];
const SUBSYTEM_NAMES = ["dom","csss","css","script","eval"];


// whole log list item, a.k.a. message
function LogListItem(props) 
{
  const logitem = props.logitem;
  const channel = props.channel;
  if(logitem === "---")
    return <hr/>;
  else { 
    const content = logitem.items.map((val,key) => SublimatedValue(channel,val,key,true)); 
    return <li class={ CLASS_NAMES[logitem.severity] + ' ' + SUBSYTEM_NAMES[logitem.subsystem]}>{content}</li>;
  }
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
    this.$("list").lastElementChild?.scrollIntoView {behavior:"smooth"};
  }

  render(props)
  {
    let channel = this.channel;
    var list = channel.theirLogs.map((item) => <LogListItem channel={channel} logitem={item} key={item.key} />);
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
    return true; // do not propagate, consumed
  }

  list2clipboard() {
    var text = "";
    for(var opt of this.$$("li")) {
      if(text) text += "\r\n";
      text += opt.textContent;
    }  
    Clipboard.writeText(text);
  }

  ["on keydown"] (evt) {
    if( evt.code === "KeyC" && evt.ctrlKey) { 
      this.list2clipboard(); 
      return true; 
    }
  }
  
  ["on click at menu#for-log-list>li[command='edit:copy']"](evt, menu) { 
    this.list2clipboard();
    return true;
  }
  
  ["on click at menu#for-log-list>li[command='edit:clear']"](evt, menu) {
    this.channel.theirLogs = [];
    this.componentUpdate();
    return true;
  }
}