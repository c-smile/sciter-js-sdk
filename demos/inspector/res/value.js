
export class SublimatedObject extends Element 
{
  //this.def.type;         // "Array", "Object", "Element", etc
  //this.def.length;    - if "Array"
  //this.def.reference;    // sublimated reference 
  //this.def.elements   // if "Array"
  //this.def.properties // if object
  //this.def.caption    // toString() if object

  constructor(props) {
    super();
    this.channel = props.channel;
    this.expanded = props.expanded;    
  }

  render(props) {
    if(props?.def)
      this.def = props.def;
    
    if(!this.def) return [];
    return this.def.type == "Array" 
      ? this.renderArray() 
      : this.renderObject();
  }

  renderArray() 
  {
    let atts = {};
    let details = [];

    if(this.expanded)
    {
      atts = { expanded:"" };
      let n = 0;
      let list = [];
      for(let val of (this.def.elements || []))
      {
        let key = (n++).toString();
        list.push(<span>{key} :</span>);
        list.push(SublimatedValue(this.channel,val,key));
        if(n > 10) {
          list.push(<text>{this.def.length - 10} elements more...</text>); 
          break;  
        }
      }
      details = <div .details>{list}</div>;
    }
    return <var .coll {atts} type={this.def.type}><caption>Array({this.def.length})</caption>{details}</var>;
  }

  renderObject() {

    let atts = {};
    let details = [];

    if(this.expanded)
    {
      atts = { expanded:"" };
      let n = 0;
      let list = [];
      if(this.def?.properties) {
        for(let [key,val] of Object.entries(this.def.properties))
        {
          list.push(<span>{key} :</span>);
          list.push(SublimatedValue(this.channel,val,key));
          if(++n > 32) {
            list.push(<text>{this.def.length - 32} names more...</text>); 
            break;
          }
        }
      }
      details = <div .details>{list}</div>;
    }

    if(this.def.caption)
      return <var .coll {atts} type={this.def.type}><caption>{this.def.caption}</caption>{details}</var>; 
    else 
      return <var .coll {atts} type={this.def.type}><caption>Object</caption>{details}</var>; 
  }

  async requestDetails() {
    let details = await this.channel.request("objectElements",this.def.reference);
    if(this.def.type == "Array") {
      this.def.elements = details;
      this.componentUpdate();
    }
    else {
      this.def.properties = details;
      this.componentUpdate();
    }
  }

  ["on click at caption"](evt) {
    if(!this.expanded) {
      if(!this.def.elements && !this.def.properties)
        this.requestDetails();
      this.componentUpdate {expanded:true};  
    } else 
      this.componentUpdate {expanded:false};
    evt.stopPropagation();
  }
}

const RE_FILE_LINE = /[(](\w+:[^()]+(?:[:]\d+|[(]\d+[)]))[)]/g;

 
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

export function SublimatedValue(channel, val, key, forLog = false) 
{
  if(!key) key = JSON.stringify(val);

  if( val === null )
    return <var .null key={key}>null</var>; 
  else if( val === undefined )
    return <var .undefined key={key}>undefined</var>; 

  switch(typeof val) {
    case "string": 
      return forLog ? <span .string key={key}>{crackText(val)}</span>
                    : <var .string key={key}>{val}</var>; 
    case "number": 
      return <var .number key={key}>{val.toString()}</var>;
    case "object": 
      if( val !== null )
        return <SublimatedObject channel={channel} def={val} key={key} />; 
      // else fall through
    default: 
      return <var .other key={key}>{JSON.stringify(val)}</var>; 
  }
}


