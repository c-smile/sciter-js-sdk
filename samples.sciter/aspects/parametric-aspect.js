

// note: aspect function is called with 'this' set to the element it gets applied.
export function aspectWithParams(params) {
  this.innerHTML = `aspect params: ${JSON.stringify(params)}`;
}
