/*JavaScript*/

import * as sciter from "@sciter";
import * as env from "@env";

export class SysInfo extends Element {

  componentDidMount() {
    console.log("SysInfo"); // will appear in VS Output window
    this.patch(this.render(),true /*only children*/);
  }

  render() {
    return <> 
 	    <header>Sciter</header>
	      <label>version:</label>	  <span>{sciter.VERSION}</span>
        <label>revision:</label>  <span>{sciter.REVISION}</span>
      <header>QuickJS</header>
        <label>version:</label>	  <span>{sciter.QUICKJS_VERSION}</span>
      <header>@env</header>
	      <label>OS type:</label>	   <span>{env.DEVICE}</span>
	      <label>OS version:</label> <span>{env.OS}</span>
        <label>GFX backend:</label><span>{Window.this.graphicsBackend}</span>
	      <label>user:</label>		   <span>{env.userName()}</span>
	      <label>machine:</label>	   <span>{env.machineName()}</span>
	      <label>domain:</label>	   <span>{env.domainName()}</span>
	      <label>country:</label>	   <span>{env.country()}</span>
	      <label>language:</label>	 <span>{env.language()}</span>
    </>;
  }
}