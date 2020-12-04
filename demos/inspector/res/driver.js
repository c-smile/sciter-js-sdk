
import {uuid} from "@sciter";

export class ChannelDriver
{
  request = null; // function to request data from debugee 
  notify = null; // function to notify debugee 

  theirLogs = [];
  theirResources = {};
  key = null;

  viewstate = {}; // storage of view states

  constructor(outboundRq) 
  {
    this.request = function(name,params) { return new Promise((resolve,reject) => { outboundRq(name,params,resolve); }); }
    this.notify = outboundRq;
  }

  get connected() { return this.request !== null; }
  // debugee is gone, channel closed
  gone() {
    this.request = null;
    //console.log("this.connected",this.connected);
    document.dispatchEvent(new Event("channel-gone"),true);
  }

  // handle inbound message from debugee
  handle(name,data) {
    var fcn = ChannelDriver[name];
    if(fcn) return fcn.call(this,data);
    else console.log("unknown message", name);
  }

  static all = {}; // by key 
  static current = null; // current channel

  static factory(outboundRq) 
  {
    return new ChannelDriver(outboundRq);
  }

  // particular message drivers 
  
  static logs(payload) {
    //console.log("received logs:", JSON.stringify(payload));
    for(var logItem of payload)
      this.theirLogs.push({key:uuid(),subsystem:logItem[0],severity:logItem[1],items:logItem[2]});
    document.dispatchEvent(new Event("log-new", {detail:this}), true);
  }

  static hello(theirUrl) {
    this.key = theirUrl; // ???
    ChannelDriver.all[theirUrl] = this;
    ChannelDriver.current = this;
    document.dispatchEvent(new Event("channel-new"),true);
  }

  static snapshot(imageBytes) {
    if(this.onSnapshotBytes)
      this.onSnapshotBytes(imageBytes);
  }

  static highlighted(stack) {
    if(this.onStackHighlight)
      this.onStackHighlight(stack);
  }

  static resources(rsdefs) {
    for(var rd of rsdefs)
      this.theirResources[rd.rqUrl] = rd;
    document.dispatchEvent(new Event("resource-new"), true);
  }



}

