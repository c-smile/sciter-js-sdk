

export class Tabs extends Element 
{
    componentDidMount() { 
      if( ! this.firstElementChild )
        return; // empty
      if( ! this.$(">strip") )
        this.init();
        
      this.state.focusable = true;
        
      var label = this.$(">strip>label[selected]") ||
                  this.$(">strip>label:first-child");
      // initialy selected tab or the first one

      var name = label.attributes["for"];
      
      // find panel we need to show by default 
      var panel = this.$(`>panels>[name='${name}'],>panels>#${name}`);
      console.assert(panel,"Tab panel with the name %s not found",name);

      if(label) 
        this.post( () => {
          if( !this.$(">strip>label:current") ) // if it was not set by code
             this.activate(label, false);       // proceed with initialization.
        });
    }
     
    // get/set current tab by name
    get current() {
      var label = this.$(">strip>label:current");
      return label ? label.attributes["for"] : undefined;
    }

    set current(v) {
      var label = this.$(`>strip>label[for='${v}']`);
      this.activate(label,false);
    }

    ["on ^mousedown at >strip>label:not(:current)"](event,label) {
      return this.activate( label );
    }
    
    ["on keydown"](event) { 

      if(!this.state.focus)
        return false;

      var currentLabel = this.$(">strip>label:current");

      switch( event.code )
      {
        case "Tab": 
          if( event.ctrlKey ) 
            return this.activate( event.shiftKey? currentLabel.previousElementSibling : currentLabel.nextElementSibling );
          break;
        case "ArrowLeft": return this.activate( currentLabel.previousElementSibling );
        case "ArrowRight": return this.activate( currentLabel.nextElementSibling );
        case "Home": return this.activate( currentLabel.parentElement.firstElementChild );
        case "End": return this.activate( currentLabel.parentElement.lastElementChild );
      }
      return false; 
    }

    // a.k.a. select tab, label here is a <label> inside <strip> 
    activate( label, notify = true ) {
      if( !label )
        return false;
      if(label.state.current)
        // already selected, nothing to do...
        return true; // but we've handled it.
     
      var strip = this.$(">strip");
     
      //find currently selected element (tab and panel) and remove "selected" from them
      var currentPanel = this.$(">panels>[name]:expanded,:root>panels>[id]:expanded");
      var currentLabel = strip.$("label:current");

      // find new tab and panel       
      var name = label.attributes["for"];
      var panel = this.$(`>panels>[name='${name}'],:root>panels>#${name}`);
      
      console.assert(panel,"panel %s not found",name);

      if( currentPanel ) {
        currentPanel.state.collapsed = true; // set collapsed in case of someone use it for styling
        currentPanel.postEvent(new Event("collapsed",{bubbles:true}));
      }
      if( currentLabel )
        currentLabel.state.current = false; 

      panel.dispatchEvent(new Event("expanded",{bubbles:true}));
      strip.state.current = true; 
      panel.state.expanded = true; // expand it
      label.state.current = true;
      
      if(notify)
        this.postEvent(new Event("statechange",{bubbles:true}));
      
      return true;
    }
}