
import * as UnitTest from "unittest-module.js";
import * as DOM from "unittest-dom.js";

function evalTest(testUrl,test) {
  UnitTest.testSource(testUrl);
  try {
    let wrapper = eval("(function(expect,delay,test,testGroup,$expect,$$expect){" + test + "})");    
    wrapper(UnitTest.expect,UnitTest.delay,UnitTest.test,UnitTest.testGroup,DOM.ExpectedElement,DOM.ExpectedElements);
  } catch(e) {
    Window.this.modal(<alert caption=`Error in test script ${testUrl}`>{e.message}<br/>{e.stack}</alert>);
  }
}

// aspect function
export function link() {
  // 'this' is the link
  let testUrl = this.attributes["href"];
  if( !testUrl ) return;
  
  function loadTest(data,status) { evalTest(testUrl,data.text()); }
  function reportLoadTestError(err) { console.error("Cannot load " + testUrl); }
  
  fetch(document.url(testUrl))
    .then(loadTest)
    .catch(reportLoadTestError);
}

let window = null;

function present() 
{
  if(window) return;
  window = new Window({
    type  : Window.TOOL_WINDOW,
    url   : __DIR__ + "unittest-window.htm",
    state : Window.WINDOW_SHOWN,
    alignment: 9,
    parameters: {
       UnitTest: UnitTest
    }
  });
  window.on("close", () => {window = null});
}    

document.on("^keydown", function(evt) {
  if( evt.ctrlKey && evt.shiftKey && evt.code == "KeyT" )
  {
    present();
    return true;
  }
});
