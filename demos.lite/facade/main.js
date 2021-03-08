
const content = document.$("frame#content");

document.on("click","button#home", function()
{
  content.frame.loadFile(__DIR__ + "sys-info.htm");
  return true;
});

document.on("click", "button#select", function()
{
  content.frame.loadFile(__DIR__ + "file-selector/file-selector.htm");
  return true;
});

document.on("click", "button#test", function()
{
  content.frame.loadFile(__DIR__ + "tests/native-drawing.htm");
  return true;
});

document.on("click", "button#theme", function(evt,button)
{
  document.attributes["theme"] = button.value ? "dark" : "light";
  return true;
});

document.on("file-activate", function(evt) {
  content.frame.loadFile(URL.fromPath(evt.data));
});


function init() {
  
  var caption = document.$("header>caption>span");
  caption.innerText = "...";
  
  var deltas = [1];
  var ptick = Window.ticks();
  var counter = 0;
  
  caption.paintContent = function(gfx) {
    var tick = Window.ticks();
    deltas.push( tick - ptick );
    ptick = tick;
    if( deltas.length > 10 )
      deltas.shift();
    if(++counter > 30) {
      var avdelta = deltas.reduce((a,b) => a + b) / deltas.length;
      caption.post( () => caption.innerText = (1000 / (avdelta || 1)).toFixed(0) );
      counter = 0;
    }
    caption.requestPaint();
  };
  caption.requestPaint();
}

init();

