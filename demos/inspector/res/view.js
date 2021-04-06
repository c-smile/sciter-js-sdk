
export class View extends Element 
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

export function FileUrl(props) {
  let surl = props.url || props.href;
  let url = new URL(surl);
  let isLink = !!props.href;
  let filename = url.filename;
  let prefix = surl.substr(0,surl.length - filename.length);
  let lineno = props.lineno;
  if(isLink) {
    if( lineno )
      return <a .url href={surl} lineno={lineno}><span .path>{prefix}</span><b .filename>{filename}</b><span .lineno>{lineno}</span></a>;
    else 
      return <a .url href={surl}><span .path>{prefix}</span><b .filename>{filename}</b></a>;
  } else 
    return <span .url><span .path>{prefix}</span><b .filename>{filename}</b></span>;
}

