import { View } from "view.js";

class ResourceView extends View 
{
  fileshown = {}

  constructor(props) { 
    super(props,"ResourcesView");
  }

  updateValue() 
  {
    if(this.type == "code") {
      this.$("plaintext").value = this.resdef.rsData;
      if(this.lineno) {
        let child = this.$("plaintext").childElement(this.lineno - 1);
        this.lineno = undefined;
        if(child) {
          child.scrollIntoView({block:"start"});
          child.classList.add("highlighted");
          child.timer(2000, () => child.classList.remove("highlighted"));
        }
      }
    }
    else if(this.type == "image") {
      var img = Graphics.Image.fromBytes(this.resdef.rsData);
      if(!img) return;
      this.$("picture").value = img;
      this.$("form").value = { width: img.width, height: img.height, type: img.packaging, size: this.resdef.rsData.byteLength };
    }
  }

  updateLineNo() 
  {
    if(this.type == "code") {
      if(this.lineno) {
        let child = this.$("plaintext").childElement(this.lineno - 1);
        this.lineno = undefined;
        if(child) {
          child.scrollIntoView({block:"start"});
          child.classList.add("highlighted");
          child.timer(2000, () => child.classList.remove("highlighted"));
        }
      }
    }
  }


  getResourceDefinition(url) {
    let resdef = this.channel.theirResources[url] ;
    if(!resdef) {
      let rq = fetch(url,{sync:true});
      if(rq) {
        const mt = rq.responseMimeType;
        const astext = mt.startsWith("text/") || mt.endsWith("/json") || mt.endsWith("javascript");
        resdef = {
          rqType: rq.context,
          rqMethod: rq.method,
          rqUrl: rq.url,
          rsUrl: rq.responseUrl,
          rqHeaders: rq.requestHeaders,    
          rsStatus: rq.status,
          rsHeaders: rq.responseHeaders,
          rsMimeType: rq.responseMimeType,
          rsData: astext ? rq.text() : rq.arrayBuffer()
        }
      }
    }
    return resdef;
  }

  render(props) {

    let filetoshow = props.filetoshow || this.viewstate.filetoshow;

    if( filetoshow ) 
    {
      if(this.fileshown.url != filetoshow.url)  {
        this.fileshown = filetoshow;
        this.type="unknown";
        this.resdef = this.getResourceDefinition(filetoshow.url);
        if(this.resdef) {
          //console.log(this.resdef);
          this.mimeType = this.resdef.rsMimeType;
          this.lineno = filetoshow.lineno;
          switch(this.resdef.rqType) {
            case "html": 
            case "style": 
            case "script": this.type="code"; break;
            case "image": this.type="image"; break;
            case "data": 
               if(this.resdef.rsMimeType.startsWith("text/")) { this.type="code"; break; }
               else if(this.resdef.rsMimeType.startsWith("image/")) { this.type="image"; break;}
          }
          this.timer(1, this.updateValue );
        }
      }
      else if(filetoshow.lineno) {
        this.lineno = filetoshow.lineno;
        this.timer(1, this.updateLineNo );
      }
    }

    var viewer;
    switch(this.type) 
    {
      case "code": viewer = <plaintext id="text-view" type={this.mimeType} readonly="on" linenumbers="on" />; break;
      case "image": viewer = 
        <figure type={this.mimeType} id="picture-view">
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

export class ResourcesView extends View
{
  constructor(props) { 
    super(props,"ResourcesView");
  }

  render(props) 
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
      <ResourceView channel={this.channel} filetoshow={props.filetoshow} />
    </frameset>;
  }

  static header(channel) { return <div></div>; }

  ["on change at select#resource-list"](evt,select) {
    var res = { url :select.value, withDetails:true};
    this.dispatchEvent(new Event("resource-show",{bubbles:true, detail:res}),true);
  }
}
