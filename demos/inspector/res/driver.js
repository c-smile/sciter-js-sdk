
export class ChannelDriver 
{
  constructor(outboundRq, view) {
    this.requestData = outboundRq;
    this.view = view;
  }
  // debugee is gone, channel closed
  gone() {}

  // handle message
  handle(message) {}
}