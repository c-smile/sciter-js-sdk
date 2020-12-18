
export class View extends Element 
{
  viewstate = {};  
  channel = null;

  constructor(props, className) {
    super();
    this.channel = props.channel;
    if(!this.channel.viewstate[className])
      this.channel.viewstate[className] = this.viewstate = {};
    else
      this.viewstate = this.channel.viewstate[className];
  }
}
