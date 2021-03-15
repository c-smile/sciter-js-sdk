

export class FileSelector extends Element
{
  name = "";
  novalue = "";
  type = "file";

  constructor(props) { 
    super(props);
    Object.assign(this,props); 
  }

  render() {
    return <fileselector {{class:this.type}} styleset="utils.css#fileselector">
      <input|text novalue={this.novalue} />
      <button.select />
    </fileselector>;
  }

  get value() {
    return this.$("input").value;
  }

  set value(v) {
    this.$("input").value = v;
  }

  doSelect() {
    return Window.this.selectFile {
      filter: "SVG Files (*.svg)|*.svg|All Files (*.*)|*.*" , 
      extension: "svg",
      mode: "open",
      caption: "Select SVG file"
    };
  }

  ["on click at button.select"]() { 
    var fn = this.doSelect(); 
    if(fn) {
      this.$("input").value = URL.toPath(fn); 
      this.post(new Event("input", {bubbles:true}));
    }
    return true;
  }
}

export class FolderSelector extends FileSelector {

  constructor(props) { 
    super(props);
    this.type = "folder";
  }

  doSelect() {
    return Window.this.selectFolder();
  }
}

