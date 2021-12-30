
import {FolderView} from "folder-view.js";
import * as env from "@env";

export class FileOpenDialog extends Element {
  static instance;
  folder;
  path;
  type;
  options;

  this(props,kids) {

    const defaultOptions = { 
        id: "open-file", 
        caption: "Select a file",
        filter:[{caption:"Any file(*.*)",masks:["*.*"]}],
        folder: env.path("documents") + "/" 
    };
    this.options = Object.assign({}, defaultOptions, props.options || {});
  }

  componentDidMount() {
    this.folder = this.$("folder");
  }

  render() {
    return <dialog styleset={__DIR__ + "file-open-dialog.css#dialog"} >
      <header>{this.options.caption}</header>
      <FolderView options={this.options} />
      <footer>
        <button #ok>Open</button>
        <button #cancel>Cancel</button>
      </footer>
    </dialog>;
  }

  ["on file-activate"](evt) {
    FileOpenDialog.instance.close();
    return true;
  }

  ["on input at folder"](evt) {
    let t = evt.data;
    this.path = t.path;
    this.type = t.type;
    //console.log("on input at folder",t);
    this.$("button#ok").state.disabled = !this.path || this.type != "file";
  }

  ["on click at button#ok"](evt){
    if(this.type == "file")
      //this.post(new Event("file-activate",{data:path, bubbles:true}));
      FileOpenDialog.instance.close();
    else
      this.folder.navigateTo(this.path);
  }

  get value() {
    return this.type == "file" ? this.path : null; 
  }

  static selectFile(cb, options) {
    FileOpenDialog.instance = lightbox(<FileOpenDialog options={options}/>);
    FileOpenDialog.instance.onclose = function(path) {
      FileOpenDialog.instance = null;
      cb(path);
    }
  }

}

// async lightbox
function lightbox(jsxDialog)
{
  // check if it has styleset defined
  document.body.append(jsxDialog);
  
  var dlg = document.body.lastElementChild; // our dialog layer
  
  var retval = null; // value to return
  var savedFocus = null;
  var closeCallback = null;

  function close(rv) {
    if(rv === undefined)
      retval = dlg.value;
    wnd.eventsRoot = null;
    wnd.focus = savedFocus;
    dlg.remove(); // remove it from the DOM
    document.body.classList.remove("dialog-shown");
    if(typeof closeCallback == "function")
      closeCallback(retval);
  }
  
  function handleValue(button)
  {
    retval = button.id;
    if(retval == "ok") {
      let rv = dlg.value || dlg.$("form")?.value;
      if(rv !== undefined) retval = rv;
    } else if(retval == "cancel")
      retval = undefined;
    close();
  }
  
  // setup control event handler
  dlg.on("click", "footer>button", function(evt, button)
  {
    handleValue(button);
    return true;
  });

  // setup keyboard event handler
  dlg.on("keydown", function(evt) {
    var cmd;
    if( evt.code == "KeyESCAPE" )
      cmd = "cancel";
    else if( evt.code == "KeyRETURN" )
      cmd = "ok";
    else 
      return; // we handle only ESCAPE and ENTER here.
      
    var button = dlg.$(`footer>button#${cmd}`);
    if( button )
    {
      handleValue(button);
      return true;
    }
  });
 
  // just show it without modal loop 
  dlg.state.expanded = true;

  document.body.classList.add("dialog-shown");

  dlg.post( () => dlg.classList.add("shown") );

  var wnd = Window.this;

  savedFocus = wnd.focus;
  wnd.eventsRoot = dlg;
   
  return {
    close: close,
    set onclose(v) { closeCallback = v; }
  };
}
