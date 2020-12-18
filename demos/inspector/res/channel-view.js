import { ChannelLog } from "channel-log.js";
import { View } from "view.js";
import { ResourcesView } from "resources-view.js";
import { DOMView, ElementDetailsView } from "dom-view.js";
import { MemoryView } from "memory-view.js";

export class ChannelView extends Element {
  
  channel = null; 

  constructor(props) {
    super();
    this.channel = props.channel;
    this.viewstate = this.channel.viewstate;
  }

  componentDidMount() {
    document.on("resource-show.channel-view", (evt) => {

      const newState = { 
        currentView: "ResourcesView", 
        filetoshow : evt.detail 
      };
      if(evt.detail.withDetails)
        newState.currentDetailsView = "ResourcesDetailsView";

      this.componentUpdate(newState); 
      return false; 
    });
  }
  componentWillUnmount() {
    document.off(".channel-view");
  }
  
  render(props) {

    let viewContent;
    let headerViewContent;
    let detailsViewContent;
    switch(this.currentView) {
      default:
      case "DOMView": 
        viewContent = <DOMView channel={this.channel} />;
        headerViewContent = DOMView.header(this.channel);
        break;
      case "ResourcesView": 
      {
        let filetoshow = this.filetoshow; this.filetoshow = null;
        viewContent = <ResourcesView channel={this.channel} filetoshow={filetoshow}/>
        headerViewContent = ResourcesView.header(this.channel);
      }
      break;
      case "MemoryView": 
        viewContent = <MemoryView channel={this.channel} />; 
        headerViewContent = MemoryView.header(this.channel); 
        break;
    } 

    switch(this.currentDetailsView) {
      default:
      case "ElementDetailsView": detailsViewContent = <ElementDetailsView channel={this.channel} />; break;
      case "ResourcesDetailsView": detailsViewContent = <div />; break;
      case "MemoryDetailsView": detailsViewContent = <div/>; break;
    } 

    //console.log("ChannelView render",this.channel.theirResources.length);
    let nResources = Object.values(this.channel.theirResources).length;

    return <main>
      <frameset cols="*,300px">
        <section .tabs #channel-view>
          <header>
            <label#ResourcesView detailsId="ResourcesDetailsView" current={ this.currentView == "ResourcesView"}>Resources({nResources})</label>
            <label#MemoryView detailsId="MemoryDetailsView" current={ this.currentView == "MemoryView"}>Memory</label>
            <label#DOMView detailsId="ElementDetailsView" current={ this.currentView == "DOMView"}>DOM</label>
            {headerViewContent}
          </header>
          <frameset rows="2*,*" >
            <section #main-view>
              { viewContent }
            </section>
            <splitter/>
            <ChannelLog channel={this.channel} />
          </frameset>
        </section>
        <splitter/>
        <section #details-view>
          { detailsViewContent }
        </section>
      </frameset>
    </main>; 
  }  

  get currentView() { return this.viewstate.view || "DOMView"; }
  set currentView(v) { this.viewstate.view = v; }

  get currentDetailsView() { return this.viewstate.detailsView || "ElementDetailsView"; }
  set currentDetailsView(v) { this.viewstate.detailsView = v; }


  ["on click at label:not(:current)"](evt,label) 
  {
    this.componentUpdate { currentView: label.id, 
                           currentDetailsView: label.getAttribute("detailsId") };
    return false;
  }

  ["on domstackchange"](evt) {
    this.componentUpdate();
    return false;
  }


}