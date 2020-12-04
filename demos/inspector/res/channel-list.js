
class ChannelCaption extends Element 
{
  channel = null;
  constructor(props) {
    super();
    this.channel = props.channel;
    this.current = props.current;
  }

  componentDidMount() {
    // install receiver of snapshotBytes
    this.channel.onSnapshotBytes = (imageBytes) => {
      this.state.value = Graphics.Image.fromBytes(imageBytes);
    };
  }

  render() {
    const cls = this.channel.connected ? "active" : "gone";
    return <picture title={this.key} class={cls} state-current={this.current} />;
  }
}

export class ChannelList extends Element 
{
  constructor(props) {
    super();
    this.current = props.current; // ChannelDriver
    this.all = props.all;
  }

  render() 
  {
    var list = Object.values(this.all).map( (ch) => 
      <ChannelCaption key={ch.key} channel={ch} current={ ch === this.current } /> );
    return <section id="channel-list" styleset="facade.css#channel-list" >{ list }</section>
  }
}