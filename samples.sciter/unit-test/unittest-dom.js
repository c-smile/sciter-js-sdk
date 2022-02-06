import {TestError,error,testerror} from "unittest-utils.js";
import {Expect} from "unittest-expect.js";

import * as srt from "@sciter";

class ExpectState extends Expect {
  el;
  stateName;

  constructor(el,stateName) {
     super(el.state[stateName]);
     this.el = el;
     this.stateName = stateName;
  }
  formatReceived(received) {
    return `${this.el.toString()}, state.${this.stateName} is ${received},`;
  }
}

class ExpectAttribute extends Expect {
  el;
  attrName;

  constructor(el,attrName) {
     super(el.attributes[attrName]);
     this.el = el;
     this.attrName = attrName;
  }
  formatReceived(received) {
    return `${this.el.toPrettyString()}, attribute["${this.attrName}"] is ${received},`;
  }
}


// DOM Element wrapper
export function ExpectedElement(selector, el = null) {

  if(!el) {
    el = srt.$(selector);
    if(!el) testerror`element ${selector} does not exist`;
  }

  function state(name) { return new ExpectState(el,name); }
  function attribute(name) { return new ExpectAttribute(el,name); }

  function click() { 
    el.click();
    return ExpectedElement(selector,el);
  }

  function changeValue(val) { 
    el.value = val;
    el.postEvent(new Event("change",{bubbles:true}));
    return ExpectedElement(selector,el);
  }

  function $(childSelector) { 
    let child = el.$(childSelector);
    if(!child)
        testerror`element ${selector} ${childSelector} does not exist`;
    return ExpectedElement(selector,child); 
  }

  return { state,attribute,click,changeValue,$,get element() { return el } }
}

// TODO-DO-DO...
export function ExpectedElements(selector) {
  return srt.$$(selector);
}