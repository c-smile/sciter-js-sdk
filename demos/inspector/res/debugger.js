
import { View, FileUrl } from "view.js";
import { SublimatedValue, SublimatedObject } from "value.js";

class Breakpoint extends Element
{
  constructor(props) {
    super();
    this.channel = props.channel;
    this.breakpoint = props.breakpoint;
  }
  render(props) {
    let bp = this.breakpoint;
/*    return <li .breakpoint><i checked={bp.enabled} /><a .filename href={bp.filename} lineno={bp.lineno}>
      <span .name>{bp.filename}</span>
      <span .lineno>({bp.lineno})</span>
    </a></li>;*/
    return <li .breakpoint><i checked={bp.enabled} /><FileUrl href={bp.filename} lineno={bp.lineno} /></li>;
  }
  ["on input at i"](evt,i) {
    this.breakpoint.enabled = i.value;
    this.channel.updateBreakpoint(this.breakpoint);
  }
}

function Breakpoints(props) {

  var channel = props.channel;

  if( !channel.breakpoints || (channel.breakpoints.length == 0))
    return [];

  let list = channel.breakpoints.map(bp => {return <Breakpoint channel={channel} breakpoint={bp} />}); 
  
  return <ul#breakpoints><header>breakpoints:</header>
    {list}
  </ul>;
}

export class DebuggerView extends View 
{
  frameId = 0;
  variablesId = null;

  constructor(props) { super(props,"FilesView"); }

  render() 
  {

    if(!this.channel.connected)
      return <div></div>;

    let atbreakpoint = this.channel.atBreakpoint;
    
    let callstack = [];
    //let variables = this.renderVariables();

    if(atbreakpoint)
      callstack = this.channel.callstack.map((csi,index) => this.renderCallstackItem(index,csi)); 
    
    let atts = atbreakpoint ? {awaiting:true} : {};

    return <section #debugger {atts} styleset="debugger.css#debugger">
      <toolbar>
        <caption>debug:</caption>
        <button .icon #continue disabled={!atbreakpoint} accesskey="!F5" title="F5 - continue"></button>
        <button .icon #step-over disabled={!atbreakpoint} accesskey="!F10" title="F10 - step over"></button>
        <button .icon #step-in disabled={!atbreakpoint} accesskey="!F11" title="F11 - step in"></button>
        <button .icon #step-out disabled={!atbreakpoint} accesskey="!_F11" title="SHIFT+F11 - step out"></button>
        <button .icon #stop title="SHIFT+F5 - stop"></button>
      </toolbar>
      <ul#callstack>{callstack}</ul>
      <Breakpoints channel={this.channel} />
    </section>;
  }
  // 0-DEBUGGER_CONTINUE, 1-DEBUGGER_STEP_IN, 2-DEBUGGER_STEP_OUT, 3-DEBUGGER_STEP_OVER
  ["on click at #continue"]() { this.channel.atBreakpointResponse("step",0); }
  ["on click at #step-in"]() { this.channel.atBreakpointResponse("step",1); }
  ["on click at #step-out"]() { this.channel.atBreakpointResponse("step",2); }
  ["on click at #step-over"]() { this.channel.atBreakpointResponse("step",3); }

  requestVariables() {
    if(this.variablesId !== this.channel.variablesId || this.frameId !== this.channel.variablesFrameId ) {
      this.variablesId = this.channel.variablesId;
      this.channel.variablesFrameId = this.frameId;
      this.channel.atBreakpointResponse("variables",this.frameId);
    }
  }

  renderVariables() 
  {
    this.requestVariables();

    if(!this.channel.variables)
      return <div#variables>empty</div>;

    let {local,closure,global} = this.channel.variables;
    local.caption = "local";
    closure.caption = "closure";
    global.caption = "global";
    return <div#variables>
      <SublimatedObject channel={this.channel} def={local} key="local" expanded="true"/>
      <SublimatedObject channel={this.channel} def={closure} key="closure" expanded="true" />
      <SublimatedObject channel={this.channel} def={global} key="global"  />
    </div>;
  }

  renderCallstackItem(index,item) {

    let variables;
    let atts;

    if(index == this.frameId) {
      variables = this.renderVariables();
      atts = {expanded:true};
    }
    else {
      variables = [];
      atts = {};
    }

/*    return <li key={index.toString()} {atts}>
        <caption><b .funcname>{item.name}</b>
        <a .filename href={item.filename} lineno={item.lineno}>
          <span .name>{item.filename}</span>
          <span .lineno>({item.lineno})</span>
        </a></caption>
        {variables}
      </li>;
*/      

    return <li key={index.toString()} {atts}>
        <caption><b .funcname>{item.name}</b><FileUrl href={item.filename} lineno={item.lineno} /></caption>
        {variables}
      </li>;


  }

  ["on click at b.funcname"](evt, b) {
    let li = b.$p("li");
    let index = parseInt(li.getAttribute("key"));
    this.componentUpdate { frameId:index };
  }


}