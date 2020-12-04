
import { $,$$,on } from "@sciter";
import { serve } from "server.js";
import { ChannelDriver } from "driver.js";

import { ChannelList } from "channel-list.js";
import { ChannelView } from "channel-view.js";
import { ChannelLog } from "channel-log.js";

Object.defineProperty(Array.prototype, 'last', { get() { return this[this.length - 1]; } });
Object.defineProperty(Array.prototype, 'first', { get() { return this[0]; } });

export class App extends Element
{
  componentDidMount() {
    document.on("channel-new", () => this.componentUpdate() );
    document.on("channel-gone", () => this.componentUpdate() );
    document.on("resource-new", () => this.componentUpdate() );
  }

  render() 
  {
    var current = ChannelDriver.current;
    if( current ) {
      return <body.channels>
        <ChannelList current={current} all={ChannelDriver.all} />
        <frameset rows="2*,*" >
          <ChannelView channel={current} />
          <splitter/>
          <ChannelLog channel={current} />
        </frameset>
      </body>;
    }
    else
      return <body>
        <frame src="intro.htm" />
      </body>;
  }
}

document.ready = function() {
  serve(ChannelDriver.factory);
  Window.this.state = Window.WINDOW_SHOWN;
}


