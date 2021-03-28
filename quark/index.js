
const APP_NAME = "sciter-js-quark";

import * as Sciter from "@sciter";
import * as Settings from "settings.js";
import * as Data from "data.js";
import { FileSelector, FolderSelector } from "utils.js";
import * as Package from "package.js";
import { LogRunner } from "logrunner.js";


document.ready = function() // a.k.a. main()
{
  Settings.init(APP_NAME);
  document.timer(10, () => Window.this.state = Window.WINDOW_SHOWN);  
  Package.checkForImageMagic(function(found) {
    if(found) return;
    document.post(function() {
       Window.this.modal(<alert>ImageMagic convert utility not found\nPlease install it and run again!</alert>);
    })
  });
}

// list of projects
export class ProjectsView extends Element
{
  componentDidMount() {
    document.on("current-project-property-change", () =>  this.componentUpdate() );
    document.on("current-project-change", () =>  this.componentUpdate() );
  }

  render() 
  {
    var list = [];
    if(Data.projects)
      list = Data.projects.map(project => <option value={project.id}>
          <img src={ URL.fromPath(project.logo) } /> {project.name}
      </option>);

    return <section#projects> 
      <toolbar>
        <button.new title="new project" />
        <button.clone state-disabled={!Data.project} title="clone project" />
        <button.delete state-disabled={!Data.project} title="delete project" />
      </toolbar>
      <select|list state-value={ Data.project?.id } >{list}</select>
    </section>;
  } 

  ["on click at button.new"]()    { Data.addNewProject(); }
  ["on click at button.clone"]()  { Data.cloneCurrentProject(); }
  ["on click at button.delete"]() { Data.deleteCurrentProject(); }
  ["on input at select"](evt,select) { Data.selectProject(select.value); }
} 

globalThis.ProjectsView = ProjectsView;

// current project

export class ProjectView extends Element {

  componentDidMount() {
    document.on("current-project-change", () => { 
      this.patch(this.render());
      this.$("form").value = Data.project;
      document.$("button#assemble").state.disabled = !ProjectView.validate(Data.project);
    });
    if(Data.project)
      this.componentUpdate();
  }

  static validate(vals) {
    return vals.name 
        && vals.exe
        && vals.resources
        && vals.targets 
        && vals.targets.length
        && vals.out;
  }

  renderEmpty() {
     return <section #project>
       <div.introduction #introduction>
          <img.arrow src="stock:arrow-left"/> Create new project
          <h1>Sciter.JS.Quark v.{Sciter.VERSION}</h1> 
       </div>
     </section>;
  }

  render() {

    if(!Data.project)
      return this.renderEmpty();

    return <section #project>
      <form state-disabled={!Data.project}>
        <label>Project</label>
              <input|text(name) novalue="project name"/>
        <label>Executable</label>
              <input|text(exe) novalue="executable name (no ext)"/>
        <label>Icon</label>
              <FileSelector(logo) novalue="SVG icon" />
        <label>Resources</label>
              <FolderSelector(resources) novalue="app resources folder"/>
        <label>Product</label>
              <input|text(productName) novalue="product name"/>
        <label>Version</label>
              <input|text(productVersion) novalue="product version"/>
        <label>Copyright</label>
              <input|text(productCopyright) novalue="product copyright"/>
        <label>Targets</label>
            <select|select(targets) multiple="checkmarks">
              <option value="winX32">Windows X32</option>
              <option value="winX64">Windows X64</option>
              <option value="winARM64">Windows/ARM64</option>
              <option value="mac">Mac OSX</option>
              <option value="linuxX64">Linux</option>
              <option value="linuxARM32">Linux/ARM32</option>
              <option value="linuxARM64" disabled>Linux/ARM64</option>
              <option value="ios" disabled>iOS</option>
              <option value="android" disabled>Android</option>
            </select>
        <label>Output</label>
            <FolderSelector(out) novalue="output folder" />
      </form>
      <LogRunner />
      <button #assemble disabled>Assemble</button>
    </section>;
  }

  ["on change at form"] (evt,form) { 
    var vals = form.value;
    Data.updateCurrentProject(vals);
    this.$("button#assemble").state.disabled = !ProjectView.validate(vals);
  }

  ["on click at button#assemble"]() {
    Package.assemble(Data.project);
  }
  
} 

globalThis.ProjectView = ProjectView;