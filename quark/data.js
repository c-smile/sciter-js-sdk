
import * as Settings from "settings.js";
import * as Sciter from "@sciter";

export var projects = [];  // all projects 
export var project = null; // current project

function deepClone(obj) {
  if (typeof obj !== "object") {
    return obj;
  } else {
    let newObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      if (key)
        newObj[key] = deepClone(obj[key]);
    }
    return newObj;
  }
}

export function addNewProject() {
  project = {
    id : Sciter.uuid(),
    name : "{new}",
    exe : "",
    logo: "",
    resources: "",
    productVersion: "",
    productCopyright: "",
    productName: "",
    targets: [],
    out : "",
  };
  projects.push(project);
  document.post(new Event("current-project-change"));
  Settings.saveState();
}

export function cloneCurrentProject() {
  project = deepClone(project);
  project.id = Sciter.uuid();
  project.name += " copy";
  projects.push(project);
  document.post(new Event("current-project-change"));
  Settings.saveState();
}

export function deleteCurrentProject() {
  var index = projects.findIndex( p => p === project );
  if( index < 0 ) return;
  projects.splice(index,1);
  project = projects[0];
  document.post(new Event("current-project-change"));
  Settings.saveState();
}

export function selectProject(pid) {
  if( typeof pid == "object" ) 
    project = pid;
  else 
    project = projects.find( p => p.id == pid );
  document.post(new Event("current-project-change"));
}

export function updateCurrentProject(data) {
  Object.assign(project,data);
  document.post(new Event("current-project-property-change"));
  Settings.saveState();
}

Settings.add({
  uiStateStore: function(data) 
    {
      data.projects = projects;
    },
  uiStateRestore: function(data) 
    {
      if( !data.projects ) 
        addNewProject();
      else {
        projects = data.projects; 
        document.post(() => selectProject(projects[0]) );
      }
    }
});