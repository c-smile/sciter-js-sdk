
export class TestError {
  constructor(text) { this.message = text; } 
}

export function testerror(literals, ...substitutions) {
  let result = "";
  // run the loop only for the substitution count
  for (let i = 0; i < substitutions.length; i++) {
      result += literals[i];
      result += substitutions[i];
  }
  // add the last literal
  result += literals[literals.length - 1];
  throw new TestError(result);
}

export function error(literals, ...substitutions) {
  let result = "";
  // run the loop only for the substitution count
  for (let i = 0; i < substitutions.length; i++) {
      result += literals[i];
      result += JSON.stringify(substitutions[i]);
  }
  // add the last literal
  result += literals[literals.length - 1];
  throw new Error(result);
}
