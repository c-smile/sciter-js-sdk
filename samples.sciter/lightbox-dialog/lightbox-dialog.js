/*
  function dialogs shows params.body element as so called document modal dialog.
  params here is an object with following fields:
    - params.body: string | Element, body of the dialog, either html fragment (string) or existing <form> element
    - params.title: string, title of the dialog, html fragment string or plain text,
                            if title is not provided the function will try to use @title attribute of the params.body element
    - params.buttons: array of button definitions, objects of following structure:
                      {
                        caption: string,              // button caption      
                        value: primitive | function,  // return value or result of the function 
                        role: #cancel | #ok
                      }  
    - params.returns: if it == #values then return value is a collection of input fields rather than button pressed.
                            
 */
 
export function dialog(params)
{
  // init phase, build markup
  var body = params.body || "Nothing to say, eh?";
  
  var caption = params.caption || "?"; 
    
  var buttons = params.buttons ||
                [<button #ok>OK</button>,
                 <button #cancel>Cancel</button>];
  
  var frame = <div .dialog-frame><caption>{caption}</caption>
                                 <div .body>{body}</div>
                                 <text .buttons>{buttons}</text></div>;
  
  document.body.append(frame);
  
  var dlg = document.body.lastElementChild; // our dialog layer
  
  var ret_val = null; // value to return
  
  function handleValue(button)  
  {
    ret_val = button.id;
    if(ret_val == "ok") {
      let form = dlg.$("form");
      if(form) ret_val = form.value;
    } else if(ret_val == "cancel")
      ret_val = undefined;
    dlg.state.collapsed = true; // to signal that we are done with it.
  }
  
  // setup control event handler
  dlg.on("click", "text.buttons>button", function(evt, button)
  {
    handleValue(button);
    return true;
  });

  // setup keyboard event handler
  dlg.on("keydown", function(evt) {
    var cmd;
    if( evt.keyCode == "KeyESCAPE" )
      cmd = "cancel";
    else if( evt.keyCode == "KeyRETURN" )
      cmd = "ok";
    else 
      return; // we handle only ESCAPE and ENTER here.
      
    var button = dlg.$(`text.buttons>button[value="${cmd}"]`);
    if( button )
    {
      handleValue(button);
      return true;
    }
  });
  
 
  // and finally run the modal loop:
  
  dlg.state.expanded = true;

  document.body.classList.add("dialog-shown");

  dlg.post( () => dlg.classList.add("shown") );

  var wnd = Window.this;

  var savedFocus = wnd.focus;
  wnd.eventsRoot = dlg;
  while (!dlg.state.collapsed && wnd.state != Window.WINDOW_HIDDEN) 
     wnd.doEvent();
  wnd.eventsRoot = null;
  wnd.focus = savedFocus;
  
  dlg.remove(); // remove it from the DOM
  document.body.classList.remove("dialog-shown");
  
  return ret_val;
}