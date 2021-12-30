
import * as sys from "@sys";
import * as env from "@env";

export class FolderView extends Element
{
  #current = null;
  path = "";
  filter = null; // file filter
  currentNode = null; // like "foo.txt" or ".."
  elcontent = null; // dom element
  elpath = null;    // dom element  
  options = {};

  constructor(props) {
    super();
    this.options = props.options || {};
    this.filter = this.options.filter?.[0];
  }

  get initialPath() {

    if(Window.this.persistent) {
      const path = Window.this.persistent.fetchItem(this.options.id);
      if(path) return path;
    }

    return  this.options?.folder
         || this.attributes["path"]
         || (env.path("documents") + "/");
  }

  componentDidMount() {
    let filterAttr = this.attributes["filter"];
    if(filterAttr !== undefined)
      this.filter = filterAttr.split(";");
    this.navigateTo(this.initialPath);
  }

  activateCurrent() {
    var {type,name,path} = this.current;
    if( type == "folder" ) 
    {
      if(name == "..") {
        var [parent,child] = sys.fs.splitpath(this.path);
        [parent,child] = sys.fs.splitpath(parent);
        path = parent + "/";
        this.navigateTo(path,child);
      }
      else {
        this.navigateTo(path, "..");
      }
      this.post(new Event("folder-change",{data:path, bubbles:true}));
    } else {
      this.post(new Event("file-activate",{data:path, bubbles:true}));
    }
    return true;
  }

  navigateTo(path, currentNode = "..") 
  {
    if(sys.fs.match(path,"file://*") || sys.fs.match(path,"home://*"))
      path = URL.toPath(path);

    if(!path.endsWith("/")) 
      path += "/";

    try 
    {
      let list = sys.fs.$readdir(path); // note: to speed up things I use sync version of readdir
      let files = [];
      let folders = [];
      let filter = this.filter;
      for (const entry of list) {
        if(sys.fs.match(entry.name,".*") || sys.fs.match(entry.name,"~*"))
          continue; // these are "hidden" files 
        if( entry.type == 2) 
          folders.push(entry.name);
        else if(filter) {
          for(let f of filter.masks)
            if(sys.fs.match(entry.name,f)) {
              files.push(entry.name);
              break;
            }
        }
        else    
          files.push(entry.name);
      }

      folders.sort();
      files.sort();

      this.componentUpdate({
        path: path,
        files: files,
        folders: folders,
        //currentNode: currentNode
      });
      this.post(()=>{
        this.pathPane.$("option:first-child").click();
        this.pathPane.focus();
      });

      if(Window.this.persistent)
        Window.this.persistent.storeItem(this.options.id,path);

    } catch(e) {
      console.error(e.toString());
    }
  }

  fullPath(localName) { return this.path + localName; } 

  get current() { return this.#current; }

  get parentPath() { 
    var [parent,child] = sys.fs.splitpath(this.path);
    [parent,child] = sys.fs.splitpath(parent);
    return [parent + "/", child];
  }

  ["on dblclick at select.content"]() { 
    this.activateCurrent(); 
  }

  ["on input at select.content"]() { 
    var option = this.contentPane.$("option:current");
    if(option)
      this.#current = {
        type: option.classList.contains("folder") ? "folder" : "file",
        name: option.innerText,
        path: option.attributes["filename"] 
      }
    else 
      this.#current = null;
    
    this.post(new Event("input",{
      data: this.#current, 
      bubbles:true
    }));
    return true;
  }

  ["on input at select.path"]() { 
    var option = this.pathPane.$("option:current");
    if(option) {
      this.#current = {
        type: "folder",
        name: option.innerText,
        path: option.attributes["filename"]
      };
      this.post(new Event("input",{
        data: this.#current, 
        bubbles:true
      }));
    }
    else 
      this.currentNode = null;
    return true;
  }

  ["on keyup at select.content"](evt,content) {
    switch(evt.code) {
      case "KeyESCAPE" : 
        this.navigateTo(this.parentPath[0]); 
        return true;
      case "KeyRETURN": 
        this.activateCurrent();
        return true;
    }
  }

  ["on keydown at select.content"](evt) {
    switch(evt.code) {
      case "KeyUP" : //not handled by select.content - on very first item
      {
        var path = this.pathPane;
        path.$("option:first-child").click();
        path.focus();
        return true;
      }
      case "KeyESCAPE" : 
        return true;
      case "KeyRETURN" : 
        return true;
    }
  }

  ["on ^keydown at select.path"](evt) {
    switch(evt.code) {
      case "KeyDOWN" : //not handled by select.content - on very first item
      {
        var content = this.contentPane;
        content.$("option:first-child").click();
        content.focus();
        return true;
      }
      //case "KeyESCAPE" : 
      //  return true;
      case "KeyRETURN" : 
        return true;
    }
  }  

  ["on keyup at select.path"](evt,path) {
    switch(evt.code) {
      case "KeyESCAPE" : 
        this.navigateTo(this.parentPath[0]);
        return true;
      case "KeyRETURN" : {
        var current = path.$("option:current");
        if( !current || current.elementIndex == 0 ) {
          var [path,local] = this.parentPath;
          this.navigateTo(path,local);
        } else {
          var path = current.attributes["filename"];
          var next = current.nextElementSibling;
          var local = next ? next.innerText : null;
          this.navigateTo(path,local);
        }
        //this.post(()=>this.contentPane.focus());
        return true;
      }
        
    }
  }

  ["on mouseup at select.path>option"](evt,option) {
    if( option.elementIndex == 0 ) {
      var [path,local] = this.parentPath;
      this.navigateTo(path,local);
    } else {
      var path = option.attributes["filename"];
      var next = option.nextElementSibling;
      var local = next ? next.innerText : null;
      this.navigateTo(path,local);
    }
    //this.post(()=>this.contentPane.focus());
    return true;
  }

  get contentPane() {
    if(!this.elcontent)
      this.elcontent = this.$("select.content");
    return this.elcontent;
  }

  get pathPane() {
    if(!this.elpath)
      this.elpath = this.$("select.path");
    return this.elpath;
  }


  render() 
  {
    if(!this.folders)  
      return <folder styleset={__DIR__ + "folder-view.css#folder-view"} />;

    var path = this.path;

    var currentName = this.currentNode;

    var pathparts = path.split("/"); pathparts.pop();
    function partialpath(i) { return pathparts.slice(0,i+1).join("/"); }

    var folders = this.folders.map(name => <option.folder key={name+"/d"} filename={path + name}>{name}</option>);
    var files = this.files.map(name => <option.file key={name+"/f"} filename={path + name} >{name}</option>);
    
    var pathoptions = pathparts.map( (name,index) => <option.folder filename={partialpath(index)}>{name}</option>);
    var first = ( this.path && this.path != "/" ) ? <option.up filename={this.parentPath} state-current={currentName == ".."}></option> : [];

    return <folder path={path} styleset={__DIR__ + "folder-view.css#folder-view"}>
      <select|list.path>{first}{pathoptions}</select>
      <select|list.content #test>{folders}{files}</select>
    </folder>;
  }
}

//globalThis.FolderView = FolderView;