
export function suggestionMenu(host,provider) {

  let menu;
  let tags;

  function renderMenuFor(text,selectedTags) {
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

  function show(text,selectedTags) {
    let vmenu = renderMenuFor(text,selectedTags);
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
    if( evt.code == "ArrowDown" ) {
      host.popup(menu);
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