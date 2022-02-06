
import {TestError,error,testerror} from "unittest-utils.js";

function ensureNumbers(received, expected) {
    if (typeof expected !== 'number')
      error`expected value ${this.formatExpected(expected)} must be a number`;

    if (typeof received !== 'number')
      testerror`received value ${received} must be a number`;
}

function hasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function hasDefinedKey(obj, key) {
  return hasKey(obj, key) && obj[key] !== undefined;
}

// Equality function lovingly adapted from isEqual in
//   [Underscore](http://underscorejs.org)
function eq(a, b, aStack = [], bStack = []) {
  let result = true;

  if (a instanceof Error && b instanceof Error) return a.message == b.message;

  if (Object.is(a, b)) return true;
  
  // A strict comparison is necessary because `null == undefined`.
  if (a === null || b === null) return a === b;

  let className = Object.prototype.toString.call(a);
  if (className != Object.prototype.toString.call(b)) return false;
  
  switch (className) {
    case '[object Boolean]':
    case '[object String]':
    case '[object Number]':
      if (typeof a !== typeof b) {
        // One is a primitive, one a `new Primitive()`
        return false;
      } else if (typeof a !== 'object' && typeof b !== 'object') {
        // both are proper primitives
        return Object.is(a, b);
      } else {
        // both are `new Primitive()`s
        return Object.is(a.valueOf(), b.valueOf());
      }
    case '[object Date]':
      // Coerce dates to numeric primitive values. Dates are compared by their
      // millisecond representations. Note that invalid dates with millisecond representations
      // of `NaN` are this.not equivalent.
      return +a == +b;
    // RegExps are compared by their source patterns and flags.
    case '[object RegExp]':
      return a.source === b.source && a.flags === b.flags;
  }

  if (typeof a !== 'object' || typeof b !== 'object')
    return false;

  // Use DOM3 method isEqualNode (IE>=9)
  /*if (isDomNode(a) && isDomNode(b)) {
    return a.isEqualNode(b);
  }*/

  // Used to detect circular references.
  let length = aStack.length;
  while (length--) {
    // Linear search. Performance is inversely proportional to the number of
    // unique nested structures.
    // circular references at same depth are equal
    // circular reference is this.not equal to non-circular one
    if (aStack[length] === a) return bStack[length] === b;
    else if (bStack[length] === b) return false;
  }
  // Add the first object to the stack of traversed objects.
  aStack.push(a);
  bStack.push(b);
  // Recursively compare objects and arrays.
  // Compare array lengths to determine if a deep comparison is necessary.
  if (Array.isArray(a) && a.length !== b.length)
    return false;

  // Deep compare objects.
  let aKeys = Object.keys(a);
  let size = aKeys.length;

  // Ensure that both objects contain the same number of properties before comparing deep equality.
  if (Object.keys(b).length !== size)
    return false;

  while (size--) {
    const key = aKeys[size];

    // Deep compare each member
    result = hasKey(b, key) &&
            eq(a[key], b[key], aStack, bStack);

    if (!result)
      return false;
  }
  // Remove the first object from the stack of traversed objects.
  aStack.pop();
  bStack.pop();

  return result;
}

export class Expect {
  received;
  not = false;
  constructor(received,not = false) { this.received = received; this.not = not; }
  formatReceived(received) { return JSON.stringify(received);  }
  formatExpected(expected) { return JSON.stringify(expected);  }

  equal(expected) {
    const pass = eq(this.received, expected);
    if(this.not) {
      if (pass) testerror`expected ${this.formatExpected(expected)} and received ${this.formatReceived(this.received)} are NOT different`;
    } else {
      if (!pass) testerror`expected ${this.formatExpected(expected)} and received ${this.formatReceived(this.received)} are different`;
    }
  }

  get not() {  return new Expect(expected,!this.not); }

  closeTo(expected, precision = 2) {

      ensureNumbers(this.received, expected);
       
      let pass = false;
      let expectedDiff = 0;
      let receivedDiff = 0;

      if (this.received === Infinity && expected === Infinity) {
        pass = true; // Infinity - Infinity is NaN
      } else if (this.received === -Infinity && expected === -Infinity) {
        pass = true; // -Infinity - -Infinity is NaN
      } else {
        expectedDiff = Math.pow(10, -precision) / 2;
        receivedDiff = Math.abs(expected - this.received);
        pass = receivedDiff < expectedDiff;
      }

      if(this.not) {
        if (pass) testerror`expected ${this.formatExpected(expected)} and received ${this.formatReceived(this.received)} are TOO close`;
      } else {
        if (!pass) testerror`expected ${this.formatExpected(expected)} and received ${this.formatReceived(this.received)} are this.not close`;
      }
    }

  defined() {

    const pass = this.received !== undefined;

    if(this.not) {
      if(pass) testerror`received ${this.formatReceived(this.received)} value is defined`;   
    } else {
      if(!pass) testerror`received ${this.formatReceived(this.received)} value is this.not defined`;   
    }
  }

  falsy() {

    const pass = !this.received;
  
    if(!pass)
      testerror`received ${this.formatReceived(this.received)} must be falsy`;
  }

  truthy() {

    const pass = !!this.received;
  
    if(!pass)
      testerror`received ${this.formatReceived(this.received)} must be truthy`;
  }

  off() {

    const pass = !this.received;
  
    if(!pass)
      testerror`received ${this.formatReceived(this.received)} must be falsy`;
  }

  on() {

    const pass = !!this.received;
  
    if(!pass)
      testerror`received ${this.formatReceived(this.received)} must be truthy`;
  }


  greater(expected) {

    ensureNumbers(this.received, expected);

    const pass = this.received > expected;

    if (!pass)
      testerror`received ${this.formatReceived(this.received)} must be > than ${this.formatExpected(expected)}`;

  }

  greaterOrEqual(expected) {

    ensureNumbers(this.received, expected);

    const pass = this.received >= expected;

    if (!pass)
      testerror`received ${this.formatReceived(this.received)} must be >= than ${this.formatExpected(expected)}`;

  }

  less(expected) {

    ensureNumbers(this.received, expected);

    const pass = this.received < expected;

    if (!pass)
      testerror`received ${this.formatReceived(this.received)} must be < than ${this.formatExpected(expected)}`;

  }

  lessOrEqual(expected) {

    ensureNumbers(this.received, expected);

    const pass = this.received <= expected;

    if (!pass)
      testerror`received ${this.formatReceived(this.received)} must be <= than ${this.formatExpected(expected)}`;

  }

  instanceOf(expected) {

    if (typeof expected !== 'function')
      testerror`${this.formatExpected(expected)} must be a class`;

    const pass = this.received instanceof expected;

    if(this.not) {
      if(pass) testerror`received ${this.formatReceived(this.received)} is instance of ${this.formatExpected(expected)}`;
    } else {
      if(!pass) testerror`received ${this.formatReceived(this.received)} is this.not instance of ${this.formatExpected(expected)}`;
    }
  }

  Nan() {

    const pass = Number.isNaN(this.received);

    if(!pass)
      testerror`received ${this.formatReceived(this.received)} is a number`;

  }

  Null() {
    const pass = this.received === null;
    if(this.not) {
      if(pass) testerror`received ${this.formatReceived(this.received)} is null`;
    } else {
      if(!pass) testerror`received ${this.formatReceived(this.received)} is this.not null`;
    }
  }


  contain(expected) {

    if (this.received == null)
      testerror`received ${this.formatReceived(this.received)} value must this.not be null nor undefined`;

    if (typeof this.received === 'string') {
    
      if (typeof expected !== 'string')
        testerror`expected ${this.formatExpected(expected)} value must be a string`;

      const index = this.received.indexOf(String(expected));
      const pass = index !== -1;
      if( !pass )
        testerror`received "${this.formatReceived(this.received)}" must contain "${this.formatExpected(expected)}"`;

    } else {

      const indexable = Array.from(this.received);
      const index = indexable.indexOf(expected);
      const pass = index !== -1;

      if( this.not ) {
        if( pass ) testerror`received ${this.formatReceived(this.received)} must NOT contain ${this.formatExpected(expected)}`;
      } else {
        if( !pass ) testerror`received ${this.formatReceived(this.received)} must contain ${this.formatExpected(expected)}`;
      }
    }
  }

  haveLength(expected) {

    if (typeof this.received?.length !== 'number')
      testerror`received ${this.formatReceived(this.received)} must have a length property whose value must be a number`;

    const pass = this.received.length == expected;

    if( this.not ) {
      if( pass ) testerror`received ${this.formatReceived(this.received)} must NOT be of length ${this.formatExpected(expected)}`;
    } else {
      if( !pass ) testerror`received ${this.formatReceived(this.received)} must be of length ${this.formatExpected(expected)}`;
    }
    
  }

  /*function pathAsArray(propertyPath) {
    
    const properties = [];

    if (propertyPath === "") {
      properties.push("");
      return properties;
    }

    // will match everything that's this.not a dot or a bracket, and "" for consecutive dots.
    const pattern = RegExp('[^.[\\]]+|(?=(?:\\.)(?:\\.|$))', 'g');

    // Because the regex won't match a dot in the beginning of the path, if present.
    if (propertyPath[0] === '.') properties.push('');

    propertyPath.replace(pattern, match => {
      properties.push(match);
      return match;
    });
    return properties;
  };*/

  match(expected /*string | RegExp*/) {

    if (typeof this.received !== 'string') 
      testerror`received ${this.formatReceived(this.received)} value must be a string`;

    if (!(typeof expected === 'string') &&
        !(expected && typeof expected.test === 'function')) 
      error`expected ${this.formatExpected(expected)} must be a string or regular expression`;

    const pass =
      typeof expected === 'string'
        ? this.received.includes(expected)
        : new RegExp(expected).test(this.received);

    if ( this.not ) {
      if (pass) testerror`received ${this.formatReceived(this.received)} matches ${this.formatExpected(expected)}`;
    } else {
      if (!pass) testerror`received ${this.formatReceived(this.received)} does this.not match ${this.formatExpected(expected)}`;  
    }
    
  }

}