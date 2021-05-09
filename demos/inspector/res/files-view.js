import { View, FileUrl } from "view.js";
import { SourceCode } from "source-code.js";
import { ImageView } from "image-view.js";

class FileView extends View 
{
  fileshown = {}

  constructor(props) { 
    super(props,"FilesView");
  }

  getFileDefinition(url) {
    let resdef = this.channel.theirFiles[url] ;
    if(!resdef) {
      let response = fetch(url,{sync:true});
      if(response) {
        const mt = response.mimeType;
        const astext = mt.startsWith("text/") || mt.endsWith("/json") || mt.endsWith("javascript");
        resdef = {
          rqType: response.request.context,
          rqMethod: response.request.method,
          rqUrl: response.request.url,
          rsUrl: response.url,
          rqHeaders: response.request.headers,    
          rsStatus: response.status,
          rsHeaders: response.headers,
          rsMimeType: mt,
          rsData: astext ? response.text() : response.arrayBuffer()
        }
      }
    }
    return resdef;
  }

  render(props) {

    let filetoshow = props.filetoshow || this.viewstate.filetoshow;
    let lineno = null;
    if( filetoshow ) 
    {
      if(this.fileshown.url != filetoshow.url)  {
        this.fileshown = filetoshow;
        this.type="unknown";
        this.resdef = this.getFileDefinition(filetoshow.url);
        if(this.resdef) {
          this.mimeType = this.resdef.rsMimeType;
          lineno = filetoshow.lineno;
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
      else if(filetoshow.lineno)
        lineno = filetoshow.lineno;
      
      filetoshow.lineno = null;
    }

    var viewer;
    switch(this.type) 
    {
      case "code":  viewer = <SourceCode channel={this.channel} filename={this.resdef.rqUrl} lineno={lineno} text={this.resdef.rsData} type={this.mimeType} />; break;
      case "image": viewer = <ImageView channel={this.channel} filename={this.resdef.rqUrl} data={this.resdef.rsData} type={this.mimeType} />; break;
      default:  viewer = []; break;
    }


    return <section #file type={this.type} styleset="facade.css#file">{viewer}</section>;
  }

  static header(channel) {
    <div></div>
  }
}

export class FilesView extends View
{
  constructor(props) { 
    super(props,"FilesView");
  }

  render(props) 
  {

    var rlist = Object.values(this.channel.theirFiles);

    function group(rtype) {
      var items = rlist.filter( rd => rd.rqType == rtype );
      items = items.map( rd => <option value={rd.rqUrl}><FileUrl url={rd.rqUrl} /></option>);
      items.unshift(<optgroup>{rtype}</optgroup>);
      return items;
    }

    return <frameset cols="200px,*" styleset="facade.css#files">
      <select|list #file-list> 
        { group("html") }
        { group("style") }
        { group("script") }
        { group("image") }
        { group("data") }
      </select>
      <splitter/>
      <FileView channel={this.channel} filetoshow={props.filetoshow} />
    </frameset>;
  }

  static header(channel) { return <div></div>; }

  ["on input at select#file-list"](evt,select) {
    var res = { url:select.value, withDetails:true};
    this.dispatchEvent(new Event("file-show",{bubbles:true, detail:res}),true);
  }
}
