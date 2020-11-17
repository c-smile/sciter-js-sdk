
// aspect, uses attribute accept-drop like: filter="*.png *.jpg *.gif" 
// generates events:
//   "file-enter"/files
//   "file-leave"/files
//   "file-drop"/files

   
export function DropZone(params) 
{
  const container = params.container || this;  
  const filter = container.getAttribute("accept-drop") || params.filter || "*";
  const callback = params.ondrop;

  if(!(container instanceof Element))
    throw "no container";

  const REGEXP_PARTS = /(\*|\?)/g;
  var extensions = filter.split(";");
      extensions = extensions.map((mask) => new RegExp(mask.replace(REGEXP_PARTS, '\.$1')));

  var files = []; // filtered files

  function checkFiles(list) {
    if(!Array.isArray(list))
      list = [list];
    function flt(fn) 
    {
      for(let x of extensions) {
        if( x.test(fn) ) 
          return true;
      }
      return false;
    }
    files = list.filter(flt);
    return files.length > 0;
  }

  container.on("dragaccept",function(evt) {
    var detail = evt.detail;
    if((detail.dataType == "file") && checkFiles(detail.data)) {
      evt.stopPropagation(); // consume the event
    } 
  });

  container.on("dragenter",function(evt) {
    container.classList.add("allow-drop");
    //container.dispatchEvent(new CustomEvent("file-enter", {detail:files, bubbles:true}), true);
  });

  container.on("dragleave",function(evt) {
    container.classList.remove("allow-drop");
    //container.dispatchEvent(new CustomEvent("file-leave", {detail:files, bubbles:true}), true);
  });

  container.on("drag",function(evt) {
    evt.stopPropagation(); // consume the event
  });

  container.on("drop",function(evt) {
    container.classList.remove("allow-drop");
    //console.log("*");
    if( files.length ) {
      if(callback)
        callback(files);
      else
        container.dispatchEvent(new CustomEvent("file-drop", {detail:files, bubbles:true}), true);
    }
    evt.stopPropagation(); // consume the event
  });

} 


