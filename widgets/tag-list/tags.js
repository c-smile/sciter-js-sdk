
import * as srt from "@sciter";
import {suggestionMenu} from "suggestions.js";

export class TagList extends Element {
  tags = []; // [{id:"xxx",caption:"yyy"}]
  smenu = null;

  constructor(props,kids) {
    super();
    this.tags = props.tags || [];
    this.suggestor = props.suggestor;
    this.placeholder = props.placeholder || "";
  }

  render() {
    return <widget styleset={__DIR__ + "tags.css#tag-list"}> 
      { this.tags.map( tag => <label.tag key={tag.id}>{tag.caption}</label> ) }
      <input|text key="input" placeholder={this.placeholder} />
    </widget>;
  }

  ["on keydown at input"](evt,input) {
    if( evt.code == "Enter" ) {
      this.addNewTag(input.value);
      input.value = "";
      return true;
    } if( evt.code == "Backspace" ) {
      if(!input.value && this.tags.length) {
        this.removeTag(this.tags[this.tags.length - 1]);
        return true;
      }
    }
  }

  ["on mousedown at label"](evt,label) {
    if( evt.isOnIcon ) {
      this.removeTag(this.tags[label.elementIndex]);
      return true;
    }
  }

  addNewTag(text) {
    this.tags.push {id:srt.uuid(),caption:text};
    this.componentUpdate();
    this.post(new Event("change",{bubbles:true}));
  }

  removeTag(tagObj) {
    if(this.smenu) this.smenu.hide();
    this.tags = this.tags.filter( tag => tag.id !== tagObj.id );
    this.componentUpdate();
    this.post(new Event("change",{bubbles:true}));
  }

  ["on change at input"](evt,input) {
    if(!this.smenu) this.smenu = suggestionMenu(input,this.suggestor);
    this.smenu.show(input.value,this.tags);
  }

  ["on add-tag"](evt) {
    this.tags.push(evt.data);
    const input = this.$("input");
    input.value = "";
    input.state.focus = true;
    this.componentUpdate();
  }


}