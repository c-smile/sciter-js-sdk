
export function suggestionMenu(host,provider,selectedTags) {

  let menu;
  let tags;

  function renderMenuFor(text) {
     tags = provider(text,selectedTags);
     return <menu.popup.suggestions styleset={__DIR__ + "tags.css#suggestions"}>
       { tags.map( tag => <li key={tag.id}>{tag.caption}</li>) }
     </menu>;
  }

  function onclick(evt,li) {
    let tag = tags[li.elementIndex];
    host.post(new Event("add-tag",{bubbles:true,data:tag}));
    return true;
  }

  function hide() {
    if(menu)
      menu.state.popup = false;
  }

  function show(text) {
    let vmenu = renderMenuFor(text);
    if(menu)
      menu.patch(vmenu);
    else {
      menu = Element.create(vmenu);
      menu.on("click","li",onclick);
    }
    host.popup(menu);
  }

  function focus() {
    if(menu)
      menu.state.focus = true;  
  }

  host.on("keydown",function(evt) {
    if( evt.code == "KeyDOWN" ) {
       show(host.value);
       menu.firstElementChild.state.current = true;
       menu.state.focus = true;
       return true;
    }
  });

  return {
    hide,
    show
  }     
}