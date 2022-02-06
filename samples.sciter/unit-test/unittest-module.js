
import {Expect} from "unittest-expect.js";
import {TestError} from "unittest-utils.js";

export let root = { name: "All", list:[] };
let parent = root;
let counter = 0;
let file = ""; // test file name

export function testSource(url) {
  file = url;
}
  
export function test(name,func) 
{ 
  parent.list.push({ name:name, run: func, id: "t" + (++counter), url:file }); 
}

export function testGroup(name, func) 
{ 
  // group is a function that contains other unit test function declarations 
  let prevParent = parent;
  parent = { name:name, list: [], id: "t" + (++counter), url:file};
  prevParent.list.push(parent);
  func();
  parent = prevParent;
}

export function expect(received) { 
  return new Expect(received);
}

export async function run(cbStart, cbEnd, cbGroupStart) {

  let fail = 0;
  let succ = 0; 
  
  async function runOne(test) {
    try {
        cbStart(test,succ,fail);
        await test.run(expect);
        ++succ;
        cbEnd(test, "");
        return null;
    } catch(e) {
      ++fail;
      if(e instanceof TestError) {
        cbEnd(test,e.message);
        return null;
      }
      else {
        Window.this.modal(<alert caption=`Error in test ${test.name}`>
          <div>
            <p>file: {test.url}</p>
            <p>{e.message}</p>
            <pre>{e.stack}</pre>
          </div>
        </alert>);
        return e;
      }
    }
  }

  async function runGroup(group) {
    cbGroupStart(group);
    for( let item of group.list ) {
      if(!item.selected) continue;
      let r = item.list ? await runGroup(item) : await runOne(item);
      if (r) return r;
    }
    return null;
  }

  // run all
  let r = await runGroup(root);
  return {fail,succ,error:r};
}    

// promisified timeout, returns promise
export function delay(ms) {
  return new Promise( resolve => setTimeout(resolve, ms));
}


