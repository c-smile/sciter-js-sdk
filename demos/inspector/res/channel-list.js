
class ChannelCaption extends Element 
{
  channel = null;

  constructor(props) {
    super();
    this.channel = props.channel;
  }

  componentDidMount() {
    // install receiver of snapshotBytes
    this.channel.onSnapshotBytes = (imageBytes) => {
      this.state.value = Graphics.Image.fromBytes(imageBytes);
    };
  }

  render(props) {
    const cls = this.channel.connected ? "active" : "gone";
    let isCurrent = props.current;
    return <picture title={this.key} class={cls} current={isCurrent} />;
  }

  ["on click"](evt) {
    this.dispatchEvent(new Event("channel-activate", {bubbles:true,detail:this.channel.key}), true);
  }

}

export class ChannelList extends Element 
{
  constructor(props) {
    super();
    this.all = props.all;
  }

  render(props) 
  {
    let currentChannel = props.current; // ChannelDriver
    var list = Object.values(this.all).map( (ch) => 
      <ChannelCaption key={ch.key} channel={ch} current={ ch === currentChannel } /> );
    return <section id="channel-list" styleset="facade.css#channel-list" >{ list }</section>
  }

}